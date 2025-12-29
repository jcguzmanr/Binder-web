# Brief Técnico: Integración AWS Lambda + Bubble Webhook

## Resumen Ejecutivo

Este documento describe la implementación de la infraestructura AWS necesaria para recibir datos del formulario de contacto de Binder y enviarlos a Bubble mediante un webhook. El frontend ya está implementado y enviará los datos al endpoint de AWS API Gateway.

---

## 1. Arquitectura de la Solución

```
[Frontend React] 
    ↓ POST JSON
[API Gateway (AWS)]
    ↓ Lambda Proxy Integration
[Lambda Function: binder-contact-webhook]
    ↓ POST JSON
[Bubble Webhook]
    ↓
[Bubble Database]
```

### Componentes AWS Requeridos:
1. **API Gateway REST API** - Endpoint público para recibir requests
2. **Lambda Function** - Procesamiento y validación de datos
3. **CloudWatch Logs** - Logging y monitoreo
4. **IAM Roles** - Permisos para Lambda

---

## 2. Payload de Entrada (Desde Frontend)

El frontend enviará un POST request con el siguiente payload JSON:

```json
{
  "name": "Juan Pérez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": "+51 999 999 999",
  "challenge": "Gestión documental desordenada",
  "consent": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "contact-form"
}
```

### Campos:
- **name** (string, requerido): Nombre completo del usuario
- **company** (string, requerido): Nombre de la empresa
- **email** (string, requerido): Correo electrónico (debe ser válido)
- **phone** (string, opcional): Número de teléfono
- **challenge** (string, opcional): Desafío seleccionado del dropdown:
  - "Gestión documental desordenada"
  - "Trazabilidad baja de procesos"
  - "Exceso de tareas operativas"
  - "Riesgo por plazos invisibles"
  - "Sin indicadores de desempeño"
- **consent** (boolean, requerido): Consentimiento del usuario
- **timestamp** (string, ISO 8601): Timestamp de la submission
- **source** (string): Siempre "contact-form"

---

## 3. Especificación del Endpoint

### API Gateway Configuration

**Endpoint:** `POST /webhook`  
**Content-Type:** `application/json`  
**CORS:** Habilitado para todos los orígenes (o dominio específico de producción)

**URL Final:** 
```
https://{api-id}.execute-api.{region}.amazonaws.com/{stage}/webhook
```

**Ejemplo:**
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/webhook
```

---

## 4. Lambda Function: binder-contact-webhook

### 4.1 Configuración

- **Runtime:** Node.js 20.x
- **Timeout:** 30 segundos
- **Memory:** 256 MB
- **Architecture:** x86_64
- **Handler:** `index.handler`

### 4.2 Variables de Entorno

Configurar las siguientes variables de entorno en Lambda:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `BUBBLE_WEBHOOK_URL` | URL completa del webhook de Bubble | `https://bubble.io/api/1.1/wf/webhook-name` |
| `BUBBLE_API_KEY` | (Opcional) API Key si Bubble lo requiere | `Bearer token123...` |

### 4.3 Código Lambda (index.js)

```javascript
const https = require('https');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  
  // Validar método HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed',
        code: 'METHOD_NOT_ALLOWED'
      })
    };
  }

  try {
    // Parsear body
    const body = typeof event.body === 'string' 
      ? JSON.parse(event.body) 
      : event.body;

    // Validar campos requeridos
    const requiredFields = ['name', 'company', 'email', 'consent'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
          code: 'VALIDATION_ERROR'
        })
      };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        })
      };
    }

    // Validar consent
    if (body.consent !== true) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Consent is required',
          code: 'CONSENT_REQUIRED'
        })
      };
    }

    // Generar ID de submission
    const submissionId = uuidv4();
    
    // Preparar datos para enviar a Bubble
    const bubblePayload = {
      submissionId,
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone || null,
      challenge: body.challenge || null,
      consent: body.consent,
      timestamp: body.timestamp || new Date().toISOString(),
      source: body.source || 'contact-form',
    };

    // Enviar a Bubble webhook
    const bubbleWebhookUrl = process.env.BUBBLE_WEBHOOK_URL;
    
    if (!bubbleWebhookUrl) {
      console.error('BUBBLE_WEBHOOK_URL environment variable not set');
      throw new Error('BUBBLE_WEBHOOK_URL environment variable not set');
    }

    // Hacer POST a Bubble
    const bubbleResponse = await postToWebhook(bubbleWebhookUrl, bubblePayload);

    // Log para CloudWatch
    console.log('Bubble response:', JSON.stringify(bubbleResponse, null, 2));

    // Si Bubble retorna error, loguear pero no fallar (dependiendo de requerimientos)
    if (bubbleResponse.statusCode >= 400) {
      console.error('Bubble webhook returned error:', bubbleResponse);
      // Decidir si retornar error o éxito dependiendo de requerimientos de negocio
    }

    // Retornar respuesta exitosa
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        submissionId
      })
    };

  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        message: error.message
      })
    };
  }
};

// Función helper para POST a webhook
function postToWebhook(url, data) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(url);
      const postData = JSON.stringify(data);

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.pathname + urlObj.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      // Agregar Authorization header si existe API key
      if (process.env.BUBBLE_API_KEY) {
        options.headers['Authorization'] = `Bearer ${process.env.BUBBLE_API_KEY}`;
      }

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const parsed = JSON.parse(responseData);
            resolve({
              statusCode: res.statusCode,
              data: parsed
            });
          } catch (e) {
            resolve({
              statusCode: res.statusCode,
              data: responseData
            });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.setTimeout(25000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.write(postData);
      req.end();
    } catch (error) {
      reject(error);
    }
  });
}
```

### 4.4 Dependencias (package.json)

```json
{
  "name": "binder-contact-webhook",
  "version": "1.0.0",
  "description": "Lambda function to process contact form submissions and forward to Bubble",
  "main": "index.js",
  "dependencies": {
    "uuid": "^9.0.0"
  }
}
```

**Nota:** Para instalar dependencias:
```bash
npm install
```

Luego crear un ZIP con `index.js`, `node_modules/` y `package.json` para subir a Lambda.

---

## 5. Configuración de API Gateway

### 5.1 Crear REST API

1. Ir a API Gateway Console
2. Crear nueva REST API
3. Nombre: `binder-contact-api`
4. Descripción: "API para recibir submissions del formulario de contacto"

### 5.2 Crear Resource y Method

1. Crear Resource: `/webhook`
2. Crear Method: `POST`
3. Integration Type: **Lambda Function**
4. Lambda Function: `binder-contact-webhook`
5. Use Lambda Proxy Integration: **Sí**

### 5.3 Configurar CORS

1. Seleccionar el resource `/webhook`
2. Actions → Enable CORS
3. Configuración:
   - Access-Control-Allow-Origin: `*` (o dominio específico en producción)
   - Access-Control-Allow-Headers: `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`
   - Access-Control-Allow-Methods: `POST,OPTIONS`
4. Guardar

### 5.4 Crear OPTIONS Method (para CORS preflight)

1. Crear Method: `OPTIONS` en `/webhook`
2. Integration Type: **Mock**
3. Response:
   - Status: 200
   - Headers:
     - `Access-Control-Allow-Origin`: `*`
     - `Access-Control-Allow-Methods`: `POST,OPTIONS`
     - `Access-Control-Allow-Headers`: `Content-Type`

### 5.5 Deploy API

1. Actions → Deploy API
2. Deployment stage: `prod` (o crear nuevo stage)
3. Deploy
4. Copiar la **Invoke URL** generada

**URL Final será:**
```
{Invoke URL}/webhook
```

---

## 6. IAM Role para Lambda

### 6.1 Permisos Requeridos

La Lambda necesita los siguientes permisos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

### 6.2 Trust Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

---

## 7. Respuestas del API

### 7.1 Respuesta Exitosa (200)

```json
{
  "success": true,
  "message": "Form submitted successfully",
  "submissionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 7.2 Errores

#### 400 - Bad Request (Campos faltantes)
```json
{
  "success": false,
  "error": "Missing required fields: name, email",
  "code": "VALIDATION_ERROR"
}
```

#### 400 - Bad Request (Email inválido)
```json
{
  "success": false,
  "error": "Invalid email format",
  "code": "INVALID_EMAIL"
}
```

#### 400 - Bad Request (Consent requerido)
```json
{
  "success": false,
  "error": "Consent is required",
  "code": "CONSENT_REQUIRED"
}
```

#### 405 - Method Not Allowed
```json
{
  "success": false,
  "error": "Method not allowed",
  "code": "METHOD_NOT_ALLOWED"
}
```

#### 500 - Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "message": "Error details..."
}
```

---

## 8. Configuración de Bubble

### 8.1 Crear Webhook en Bubble

1. Ir a Bubble → Settings → API
2. Crear nuevo Webhook
3. Nombre: `binder-contact-form`
4. URL del webhook: Copiar esta URL
5. Método: POST
6. Headers (si es necesario): 
   - `Content-Type: application/json`
   - `Authorization: Bearer {API_KEY}` (si se usa)

### 8.2 Estructura de Datos Esperada en Bubble

El webhook recibirá:

```json
{
  "submissionId": "550e8400-e29b-1d4-a716-446655440000",
  "name": "Juan Pérez",
  "company": "Empresa XYZ",
  "email": "juan@empresa.com",
  "phone": "+51 999 999 999",
  "challenge": "Gestión documental desordenada",
  "consent": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "contact-form"
}
```

### 8.3 Configurar Workflow en Bubble

1. Crear workflow que se active con el webhook
2. Guardar datos en la base de datos de Bubble
3. (Opcional) Enviar notificación por email
4. (Opcional) Crear tarea o lead en CRM

---

## 9. Monitoreo y Logging

### 9.1 CloudWatch Logs

- **Log Group:** `/aws/lambda/binder-contact-webhook`
- Los logs incluyen:
  - Eventos recibidos
  - Errores de validación
  - Respuestas de Bubble
  - Errores de procesamiento

### 9.2 Métricas de API Gateway

Monitorear en CloudWatch:
- **4XXError**: Errores de cliente (validación)
- **5XXError**: Errores de servidor
- **Count**: Número total de requests
- **Latency**: Tiempo de respuesta

### 9.3 Alertas Recomendadas

Crear CloudWatch Alarms para:
- **5XXError > 5 en 5 minutos**: Error crítico
- **4XXError > 20 en 5 minutos**: Posible problema de validación
- **Latency > 5 segundos**: Performance degradada

---

## 10. Seguridad

### 10.1 Rate Limiting

Configurar en API Gateway:
- **Throttle**: 100 requests/segundo
- **Burst**: 200 requests

### 10.2 API Key (Opcional)

Si se requiere autenticación adicional:
1. Crear API Key en API Gateway
2. Crear Usage Plan
3. Asociar API Key al Usage Plan
4. Configurar en el frontend (header `x-api-key`)

### 10.3 Validación de Origen (Opcional)

En Lambda, validar el origen del request:
```javascript
const allowedOrigins = ['https://binder.com.pe', 'https://www.binder.com.pe'];
const origin = event.headers.origin || event.headers.Origin;
if (!allowedOrigins.includes(origin)) {
  return { statusCode: 403, ... };
}
```

---

## 11. Testing

### 11.1 Test Local de Lambda

Usar AWS SAM o probar directamente en la consola de Lambda con este evento de prueba:

```json
{
  "httpMethod": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "{\"name\":\"Test User\",\"company\":\"Test Company\",\"email\":\"test@example.com\",\"phone\":\"+51 999 999 999\",\"challenge\":\"Gestión documental desordenada\",\"consent\":true,\"timestamp\":\"2024-01-15T10:30:00.000Z\",\"source\":\"contact-form\"}"
}
```

### 11.2 Test de API Gateway

Usar Postman o curl:

```bash
curl -X POST https://{api-id}.execute-api.{region}.amazonaws.com/prod/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "company": "Test Company",
    "email": "test@example.com",
    "phone": "+51 999 999 999",
    "challenge": "Gestión documental desordenada",
    "consent": true,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "source": "contact-form"
  }'
```

### 11.3 Test de Integración End-to-End

1. Enviar request desde el frontend
2. Verificar logs en CloudWatch
3. Verificar que los datos lleguen a Bubble
4. Verificar respuesta 200 al frontend

---

## 12. Checklist de Implementación

### AWS Setup
- [ ] Crear Lambda function `binder-contact-webhook`
- [ ] Subir código y dependencias a Lambda
- [ ] Configurar variables de entorno (`BUBBLE_WEBHOOK_URL`, `BUBBLE_API_KEY`)
- [ ] Crear IAM role con permisos necesarios
- [ ] Asociar IAM role a Lambda
- [ ] Crear API Gateway REST API
- [ ] Crear resource `/webhook`
- [ ] Crear método POST con integración Lambda
- [ ] Habilitar CORS
- [ ] Crear método OPTIONS para CORS
- [ ] Deploy API a stage `prod`
- [ ] Obtener Invoke URL
- [ ] Configurar rate limiting (opcional)
- [ ] Configurar API Key (opcional)

### Bubble Setup
- [ ] Crear webhook en Bubble
- [ ] Obtener URL del webhook
- [ ] Configurar workflow en Bubble para procesar datos
- [ ] Probar recepción de datos

### Testing
- [ ] Probar Lambda function localmente
- [ ] Probar API Gateway endpoint con Postman/curl
- [ ] Probar integración end-to-end desde frontend
- [ ] Verificar logs en CloudWatch
- [ ] Verificar datos en Bubble

### Monitoreo
- [ ] Configurar CloudWatch Alarms
- [ ] Configurar dashboards (opcional)
- [ ] Documentar proceso de troubleshooting

---

## 13. Troubleshooting

### Error: "BUBBLE_WEBHOOK_URL environment variable not set"
- **Solución:** Configurar variable de entorno en Lambda

### Error: "Request timeout"
- **Solución:** Verificar que Bubble webhook esté respondiendo. Aumentar timeout de Lambda si es necesario.

### Error: CORS
- **Solución:** Verificar configuración de CORS en API Gateway. Asegurar que OPTIONS method esté configurado.

### Error: 502 Bad Gateway
- **Solución:** Verificar que Lambda esté funcionando correctamente. Revisar CloudWatch Logs.

### Datos no llegan a Bubble
- **Solución:** 
  1. Verificar URL del webhook en variables de entorno
  2. Verificar logs de Lambda para ver respuesta de Bubble
  3. Verificar configuración del webhook en Bubble

---

## 14. Costos Estimados

### Lambda
- **Invocaciones:** $0.20 por 1M requests
- **Compute:** $0.0000166667 por GB-segundo
- **Estimado mensual (1000 submissions):** ~$0.20

### API Gateway
- **REST API:** $3.50 por millón de requests
- **Data transfer:** $0.09 por GB
- **Estimado mensual (1000 requests):** ~$0.0035

### CloudWatch Logs
- **Ingestion:** $0.50 por GB
- **Storage:** $0.03 por GB/mes
- **Estimado mensual:** ~$0.10

**Total estimado mensual (1000 submissions):** ~$0.30 USD

---

## 15. Próximos Pasos

1. **Obtener URL del webhook de Bubble** y configurarla en Lambda
2. **Implementar Lambda function** siguiendo el código proporcionado
3. **Configurar API Gateway** según las especificaciones
4. **Probar integración** end-to-end
5. **Configurar monitoreo** y alertas
6. **Proporcionar URL del API Gateway** al equipo de frontend para configurar `VITE_WEBHOOK_URL`

---

## 16. Contacto y Soporte

Para preguntas sobre esta implementación, contactar al equipo de desarrollo.

**Nota:** Este brief asume que el frontend ya está implementado y solo necesita la URL del webhook para funcionar. El frontend manejará la redirección a la página de agradecimiento automáticamente después de recibir una respuesta exitosa (200) del API Gateway.







