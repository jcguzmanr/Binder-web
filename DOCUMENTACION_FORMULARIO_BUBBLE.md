# Documentación: Integración Formulario de Contacto → Bubble

## 📋 Resumen Ejecutivo

Este documento describe el flujo completo de datos desde el formulario de contacto en el sitio web de Binder hasta Bubble, incluyendo la estructura de datos que se envía y las instrucciones para procesar y guardar la información en las tablas correspondientes.

---

## 🔄 Flujo de Datos

```
[Formulario Web (React)] 
    ↓ POST JSON
[Webhook de Bubble]
    ↓
[Workflow de Bubble - binderla-formulario/initialize]
    ↓
[Procesamiento por Carlos]
    ↓
[Tablas de Base de Datos en Bubble]
```

---

## 🌐 Configuración del Webhook

### URL del Webhook
```
https://binder0.bubbleapps.io/version-test/api/1.1/wf/binderla-formulario/initialize
```

### Método HTTP
- **Método:** `POST`
- **Content-Type:** `application/json`
- **CORS:** Habilitado

### Variable de Entorno
El frontend utiliza la variable de entorno `VITE_WEBHOOK_URL` que debe estar configurada en:
- **Desarrollo:** Archivo `.env` local
- **Producción (Vercel):** Variables de entorno en el dashboard de Vercel

### Webinar / eventos (`/eventos/:slug`)
Las landing de eventos usan un webhook **separado**:
- **`VITE_EVENTS_WEBHOOK_URL`** — URL del endpoint que recibirá el registro (mismo patrón `POST` + `Content-Type: application/json`).
- Payload incluye: `firstName`, `lastName`, `email`, `jobTitle`, `company`, `phone`, `phoneCountry`, `consent`, `timestamp`, `source` (p. ej. `evento-webinar-legalops-binder-niubox`), `eventSlug`.
- Opcional: **`VITE_LINKEDIN_PARTNER_ID`** — ID del LinkedIn Insight Tag (solo se inyecta el script si está definido).

---

## 📦 Estructura de Datos Enviados

### Payload JSON Completo

Cuando un usuario completa y envía el formulario, se envía el siguiente JSON al webhook:

```json
{
  "name": "Juan Pérez",
  "company": "Empresa XYZ S.A.C.",
  "email": "juan.perez@empresa.com",
  "phone": "+51 999 999 999",
  "phoneCountry": "PE",
  "challenge": "Gestión documental desordenada",
  "consent": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "contact-form"
}
```

### Descripción de Campos

| Campo | Tipo | Requerido | Descripción | Ejemplo |
|-------|------|-----------|-------------|---------|
| `name` | string | ✅ Sí | Nombre completo del usuario | `"Juan Pérez"` |
| `company` | string | ✅ Sí | Nombre de la empresa o estudio legal | `"Estudio Legal ABC"` |
| `email` | string | ✅ Sí | Correo electrónico corporativo (validado en frontend) | `"juan@empresa.com"` |
| `phone` | string \| null | ❌ No | Número de teléfono completo con código de país | `"+51 999 999 999"` o `null` |
| `phoneCountry` | string | ❌ No | Código ISO del país del teléfono (por defecto: "PE") | `"PE"`, `"US"`, `"MX"` |
| `challenge` | string \| null | ❌ No | Desafío seleccionado del dropdown | Ver opciones abajo |
| `consent` | boolean | ✅ Sí | Consentimiento del usuario para ser contactado | `true` o `false` |
| `timestamp` | string (ISO 8601) | ✅ Sí | Fecha y hora de envío del formulario | `"2024-01-15T10:30:00.000Z"` |
| `source` | string | ✅ Sí | Origen del formulario (siempre "contact-form") | `"contact-form"` |

### Opciones del Campo `challenge`

El campo `challenge` puede contener uno de los siguientes valores o `null`:

1. `"Gestión documental desordenada"`
2. `"Trazabilidad baja de procesos"`
3. `"Exceso de tareas operativas"`
4. `"Riesgo por plazos invisibles"`
5. `"Sin indicadores de desempeño"`

---

## ✅ Validaciones Realizadas en el Frontend

Antes de enviar los datos, el formulario valida:

1. **Nombre:** Campo requerido, no puede estar vacío
2. **Empresa:** Campo requerido, no puede estar vacío
3. **Email:** 
   - Campo requerido
   - Formato válido de email
   - **Bloqueo de dominios personales:** No se permiten correos de Gmail, Hotmail, Yahoo, etc. Solo correos corporativos
4. **Teléfono:** Campo opcional
5. **Consentimiento:** Debe estar marcado (requerido)

Si alguna validación falla, el formulario no se envía y se muestran mensajes de error al usuario.

---

## 📍 Dónde Llegan los Datos en Bubble

### Workflow: `binderla-formulario/initialize`

Los datos llegan al workflow de Bubble configurado en:
- **Nombre del Workflow:** `binderla-formulario/initialize`
- **Tipo:** Webhook (API Workflow)
- **Método:** POST

### Acceso a los Datos en Bubble

En el workflow de Bubble, los datos estarán disponibles a través de:

- **`Current User's`** → No aplica (webhook no tiene usuario autenticado)
- **`Current Thing's`** → No aplica inicialmente
- **`Data sent to this workflow`** → Aquí encontrarás todos los campos del JSON

### Estructura de Acceso en Bubble

```
Data sent to this workflow
├── name (text)
├── company (text)
├── email (text)
├── phone (text o empty)
├── phoneCountry (text o empty)
├── challenge (text o empty)
├── consent (yes/no)
├── timestamp (text)
└── source (text)
```

---

## 📝 Instrucciones para Carlos: Procesamiento y Guardado

### Paso 1: Verificar Recepción de Datos

1. Abre el workflow `binderla-formulario/initialize` en Bubble
2. Verifica que el workflow se esté ejecutando cuando se envía el formulario
3. Usa un elemento **"Debug"** o **"Log"** para ver los datos recibidos:
   - Agrega una acción "Log to console" o "Show message"
   - Inspecciona `Data sent to this workflow` para confirmar que todos los campos llegan correctamente

### Paso 2: Mapear Datos a las Tablas Correspondientes

#### Tabla Principal: Contactos / Leads / Formularios

Crea o utiliza una tabla (por ejemplo: `Contactos`, `Leads`, `FormulariosContacto`) con los siguientes campos:

| Campo en Bubble | Tipo | Valor desde Webhook | Notas |
|-----------------|------|---------------------|-------|
| `Nombre` | Text | `Data sent to this workflow:name` | Nombre completo |
| `Empresa` | Text | `Data sent to this workflow:company` | Nombre de la empresa |
| `Email` | Text | `Data sent to this workflow:email` | Email corporativo |
| `Telefono` | Text | `Data sent to this workflow:phone` | Puede estar vacío |
| `PaisTelefono` | Text | `Data sent to this workflow:phoneCountry` | Código ISO (PE, US, etc.) |
| `Desafio` | Text | `Data sent to this workflow:challenge` | Puede estar vacío |
| `Consentimiento` | Yes/No | `Data sent to this workflow:consent` | Siempre debe ser "yes" |
| `FechaEnvio` | Date | `Data sent to this workflow:timestamp` | Convertir de ISO 8601 a Date |
| `Origen` | Text | `Data sent to this workflow:source` | Siempre "contact-form" |
| `FechaCreacion` | Date | `Current date/time` | Fecha de creación del registro |
| `Estado` | Text | `"Nuevo"` o `"Pendiente"` | Estado inicial del lead |

### Paso 3: Crear el Workflow en Bubble

#### Acciones del Workflow:

1. **Crear una nueva cosa (Create a new thing)**
   - Tipo: `Contactos` (o el nombre de tu tabla)
   - Campos a llenar:
     ```
     Nombre = Data sent to this workflow:name
     Empresa = Data sent to this workflow:company
     Email = Data sent to this workflow:email
     Telefono = Data sent to this workflow:phone
     PaisTelefono = Data sent to this workflow:phoneCountry
     Desafio = Data sent to this workflow:challenge
     Consentimiento = Data sent to this workflow:consent
     FechaEnvio = [Convertir timestamp a Date]
     Origen = Data sent to this workflow:source
     FechaCreacion = Current date/time
     Estado = "Nuevo"
     ```

2. **Convertir Timestamp a Date (si es necesario)**
   - Si Bubble no convierte automáticamente el timestamp ISO 8601:
     - Usa una expresión para parsear: `convert [Data sent to this workflow:timestamp] to date`
     - O crea un campo de texto temporal y luego conviértelo

3. **Validaciones Adicionales (Opcional)**
   - Verificar que el email no exista ya en la base de datos
   - Si existe, actualizar el registro en lugar de crear uno nuevo
   - O crear un registro de "nuevo contacto" cada vez

4. **Notificaciones (Opcional)**
   - Enviar email de notificación al equipo de ventas
   - Crear una tarea o recordatorio
   - Enviar a un CRM externo

### Paso 4: Manejo de Errores

Agrega manejo de errores en el workflow:

1. **Try/Catch o Conditional**
   - Si la creación falla, registrar el error
   - Enviar notificación de error
   - Retornar un mensaje de error al webhook (opcional)

2. **Respuesta del Webhook**
   - El workflow debe retornar un status 200 si todo está bien
   - Si hay error, retornar status 400 o 500 con mensaje de error

### Paso 5: Testing

1. **Probar el Formulario**
   - Completa el formulario en el sitio web
   - Verifica que el workflow se ejecute en Bubble
   - Confirma que se cree el registro en la tabla

2. **Verificar Datos**
   - Revisa que todos los campos se guarden correctamente
   - Verifica formatos de fecha, teléfono, etc.
   - Confirma que los campos opcionales manejen valores `null` correctamente

---

## 🔍 Ejemplo de Workflow en Bubble

### Estructura Sugerida:

```
1. Trigger: Webhook (binderla-formulario/initialize)
   ↓
2. Conditional: Verificar que consent = "yes"
   ├─ Yes → Continuar
   └─ No → Retornar error
   ↓
3. Conditional: Verificar si el email ya existe
   ├─ Existe → Actualizar registro existente
   └─ No existe → Crear nuevo registro
   ↓
4. Create a new thing: Contactos
   - Llenar todos los campos
   ↓
5. (Opcional) Send email: Notificar al equipo
   ↓
6. Return result: Success (200)
```

---

## 📊 Estructura de Tabla Recomendada

### Tabla: `Contactos` o `Leads`

```
Contactos
├── Nombre (Text)
├── Empresa (Text)
├── Email (Text) [Unique]
├── Telefono (Text)
├── PaisTelefono (Text)
├── Desafio (Text)
├── Consentimiento (Yes/No)
├── FechaEnvio (Date)
├── Origen (Text)
├── FechaCreacion (Date)
├── Estado (Text) [Dropdown: "Nuevo", "Contactado", "Calificado", "Convertido", "Descartado"]
├── Notas (Text)
└── AsignadoA (User)
```

---

## 🚨 Consideraciones Importantes

### Seguridad
- El webhook es público, pero los datos ya están validados en el frontend
- Considera agregar validación adicional en Bubble si es necesario
- El campo `consent` siempre debe ser `true` para procesar el lead

### Duplicados
- Decide si quieres permitir múltiples envíos del mismo email
- Opciones:
  - **Opción 1:** Crear un nuevo registro cada vez
  - **Opción 2:** Actualizar el registro existente si el email ya existe
  - **Opción 3:** Rechazar si el email ya existe

### Formato de Teléfono
- El teléfono viene con código de país incluido (ej: "+51 999 999 999")
- El campo `phoneCountry` contiene solo el código ISO (ej: "PE")
- Puedes usar ambos campos según necesites

### Timestamp
- El timestamp viene en formato ISO 8601: `"2024-01-15T10:30:00.000Z"`
- Bubble debería poder convertirlo automáticamente a Date
- Si no, usa una expresión de conversión

---

## 📞 Soporte y Contacto

Si tienes dudas sobre:
- **Frontend/Webhook:** Revisar código en `src/components/sections/Contact.tsx`
- **Configuración:** Verificar variable `VITE_WEBHOOK_URL` en Vercel
- **Workflow Bubble:** Contactar a Carlos para ajustes en el workflow

---

## ✅ Checklist de Implementación

- [ ] Workflow `binderla-formulario/initialize` creado en Bubble
- [ ] Tabla de base de datos creada con todos los campos necesarios
- [ ] Workflow configurado para crear/actualizar registros
- [ ] Manejo de errores implementado
- [ ] Testing realizado con formulario real
- [ ] Notificaciones configuradas (opcional)
- [ ] Validaciones adicionales en Bubble (opcional)
- [ ] Documentación actualizada con cualquier cambio

---

**Última actualización:** Enero 2024  
**Versión:** 1.0










