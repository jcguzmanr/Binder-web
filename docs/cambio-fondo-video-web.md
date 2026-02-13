# Cambio Temporal: Fondo Global con Video

## Objetivo
Reemplazar temporalmente la animacion de fondo global por un video:

- `public/videos/videobackground.mp4`

Y mantener la posibilidad de aplicar un fondo propio en secciones puntuales.

## Cambios aplicados
1. Se activo el fondo global en video full-screen con:
   - `position: fixed`
   - `width/height: 100vw/100vh`
   - `object-fit: cover`
   - `muted + autoplay + loop + playsInline`

2. Se comento temporalmente el render de animaciones anteriores en:
   - `src/components/ui/BackgroundRenderer.tsx`

3. Se migro la preferencia de fondo guardada en `localStorage`:
   - Valores legacy (`gentle-waves`, `canyon-flows`, `flow-pattern`, `antigravity`) ahora pasan a `video`.
   - Nuevo tipo de fondo soportado: `video`.
   - Opcion `none` se mantiene.

4. Se dejo una utilidad para fondos por seccion cuando exista fondo global:
   - Clase: `section-has-local-background`
   - Variables CSS:
     - `--section-bg`
     - `--section-bg-color`
     - `--section-bg-image`

## Como usar fondo local en una seccion
En la seccion que necesite fondo propio:

```tsx
<section
  className="mi-seccion section-has-local-background"
  style={{ '--section-bg': '#FFFFFF' } as React.CSSProperties}
>
  ...
</section>
```

Opcionalmente se puede usar imagen:

```tsx
<section
  className="mi-seccion section-has-local-background"
  style={{
    '--section-bg-image': 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)'
  } as React.CSSProperties}
>
  ...
</section>
```

## Archivos tocados
- `src/context/BackgroundContext.tsx`
- `src/components/ui/BackgroundRenderer.tsx`
- `src/components/ui/BackgroundRenderer.css`
- `src/components/ui/BackgroundToggle.tsx`
- `src/styles/globals.css`
- `docs/cambio-fondo-video-web.md`

## Nota
Este cambio esta pensado como etapa temporal para avanzar con direccion visual basada en video, sin eliminar aun el codigo de animaciones previas.
