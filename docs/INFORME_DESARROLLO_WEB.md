# Informe de Desarrollo Web - Binder Web

## 1. Resumen ejecutivo
Este documento describe la arquitectura, estructura y funcionamiento del sitio web de marketing de Binder, desarrollado como una SPA (Single Page Application) con React, TypeScript y Vite. Se detalla la organizacion por secciones, la gestion de contenido, las paginas internas y los componentes que soportan SEO, analitica, cookies, formularios y experiencia de usuario.

## 2. Objetivo del sitio
- Presentar la propuesta de valor de Binder (plataforma legal con IA).
- Mostrar soluciones y casos de uso (CLM, gestion de procesos, expediente digital).
- Capturar leads mediante un formulario de contacto.
- Brindar paginas legales y de soporte informativo.

## 3. Stack tecnologico y herramientas
- Framework: React 18 + TypeScript.
- Bundler: Vite (build rapido y desarrollo con HMR).
- Routing: React Router.
- SEO: react-helmet-async para meta tags y Open Graph.
- Analitica: Google Analytics (gtag) con tracking por ruta.
- Estilos: CSS modular por componente + `src/styles/globals.css`.
- Dependencias de UI/animacion: classnames, framer-motion, swiper.

Scripts disponibles:
- `npm run dev` (desarrollo)
- `npm run build` (build de produccion)
- `npm run preview` (preview)
- `npm run lint` (lint)

## 4. Arquitectura general
La aplicacion se organiza en:
- **App principal y rutas**: `src/App.tsx` centraliza rutas, layout global y proveedores de contexto.
- **Componentes de seccion**: `src/components/sections/` agrupa bloques visuales reutilizables.
- **Paginas**: `src/pages/` arma vistas con secciones y configuracion SEO.
- **Contenido desacoplado**: `src/content/` contiene textos y datos para actualizar sin tocar el componente.
- **Contextos y hooks**: `src/context/` y `src/hooks/` para estado global y efectos UI.

Despliegue recomendado en Vercel con `vercel.json` configurando rewrite a `index.html` para soportar rutas SPA.

## 5. Mapa de rutas y secciones
### 5.1. Home (una pagina con secciones)
Ruta `/` con secciones principales:
- `Home` (hero con video y CTA)
- `WhyBinder` (carrusel con auto-advance)
- `Solutions` (tabs + accordion en mobile)
- `Apps` (cards de apps)
- `Contact` (formulario)
- `Footer`

### 5.2. Paginas informativas
- `/porquebinder`: contenido de la propuesta de valor.
- `/sobrebinder`: informacion corporativa.
- `/funcionalidades`: detalle de funcionalidades.
- `/soluciones`: pagina de soluciones.
- `/testimonios`: seccion de testimonios.
- `/contacto`: pagina de contacto.
- `/gracias`: pagina de agradecimiento post-formulario.

### 5.3. Casos de uso
- `/casos-uso/clm` (CLM con IA)
- `/casos-uso/gestion-procesos` (gestion de procesos legales)
- `/casos-uso/expediente-digital` (expediente digital y mesa de partes)

Cada pagina de casos de uso compone:
- Hero, stats, tabs, comparativo, FAQ y contacto.
- Schema de FAQ para SEO.

### 5.4. Paginas legales
- `/legal/privacidad`
- `/legal/cookies`
- `/legal/terminos`
- `/legal/aviso`
- `/legal/seguridad`
- `/legal/reclamaciones`

Se renderizan con `InternalPage` para mantener layout y estilos consistentes.

## 6. Gestion de contenido
- Contenidos en `src/content/` (home, soluciones, testimonios, etc.).
- Permite actualizar textos, items y listas sin modificar JSX.
- Mejora mantenibilidad y reduce riesgo de cambios involuntarios en logica.

## 7. Componentes clave y logica
### 7.1. Layout y navegacion
- `Navigation`: barra fija, menu responsive, scroll smooth en home y navegacion con hash en paginas internas.
- `ScrollToTop`: asegura posicion correcta al cambiar rutas o hashes.
- `Footer`: enlaces internos, externos y hashes con gestion diferenciada.

### 7.2. Secciones principales
- `Home`: hero con video, placeholder de imagen y subtitulo con efecto typewriter.
- `WhyBinder`: carrusel auto-avanzado con emojis flotantes y pausa al hover.
- `Solutions`: tabs en desktop y accordion en mobile; imagenes por tab y contenidos data-driven.
- `Apps`: cards con colores por app y links a casos de uso.
- `Contact`: formulario con validaciones, selector de paises y webhook de envio.

### 7.3. Hooks y animaciones
- `useScrollAnimation`: IntersectionObserver para animar aparicion de secciones.
- `useTypewriter`: animacion de texto en el hero.
- `useNumberAnimation` (disponible para counters en stats).

## 8. Formularios y datos
- Formulario de contacto con validaciones de campos requeridos y formato de email.
- Bloqueo de dominios personales via `blockedEmailDomains.json`.
- Lista de paises y prefijo telefonico desde `countries.json`.
- Envio por `fetch` a `VITE_WEBHOOK_URL` (variable de entorno).
- Al completar, guarda datos en `sessionStorage` y redirige a `/gracias`.

## 9. SEO y analitica
- `PageHead`: set de title, description, canonical, Open Graph y Twitter cards.
- `SchemaMarkup`: Organization, BreadcrumbList y FAQPage.
- `GoogleAnalytics`: page view por cambio de ruta con `gtag`.

## 10. Cookies y cumplimiento
- `CookieContext`: gestiona consentimiento y preferencias.
- `CookieBanner`: muestra opciones aceptar/rechazar/configurar.
- `CookieSettings`: modal de preferencias con categorias esenciales y analiticas.
- Cookies esenciales incluyen tema, fondo y datos temporales del formulario.

## 11. UI, estilo y responsive
- Variables CSS globales con paleta de colores, tipografia y escalas fluidas.
- Breakpoints y layouts responsive por seccion.
- Accesibilidad: labels, aria, focus visible y roles en modales.

## 12. Consideraciones de despliegue
- SPA con rutas manejadas por React Router.
- `vercel.json` agrega rewrite para permitir rutas directas.
- Build de produccion via `vite build` y `tsc`.

## 13. Conclusiones
El proyecto implementa una arquitectura moderna, escalable y orientada a marketing, con componentes reutilizables, contenido desacoplado y enfoque en SEO, analitica y captacion de leads. La separacion por secciones y paginas facilita el mantenimiento, mientras que el uso de Vite y React asegura performance y desarrollo agil.

## 14. Recomendaciones tecnicas (siguientes pasos)
1. Integrar el webhook con un backend estable y manejo de errores centralizado.
2. Completar assets finales (imagenes y videos definitivos).
3. Ejecutar auditorias de performance (Lighthouse) y optimizar imagenes.
4. Asegurar cumplimiento legal con textos finales en paginas legales.
5. Configurar monitoreo y eventos en Google Analytics (conversiones del formulario).
