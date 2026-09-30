# ConSafeDev — migración futura de `qzz.io` a `.com`

## Estado actual

Dominio canónico de producción:

`https://consafedev.qzz.io`

Mientras éste sea el sitio público real, canonical, Open Graph, JSON-LD,
robots y sitemap deben apuntar a `qzz.io`.

No publiques `consafedev.com` como canonical antes de que el dominio exista,
resuelva correctamente y esté listo para recibir tráfico.

## SEO mientras usamos qzz.io

El sitio puede rastrearse, indexarse y posicionarse en Google usando
`https://consafedev.qzz.io`.

Configura ahora en Google Search Console una propiedad de prefijo de URL:

`https://consafedev.qzz.io/`

Esto es especialmente útil si no controlas DNS del dominio raíz `qzz.io`.

Envía:

`https://consafedev.qzz.io/sitemap.xml`

y monitoriza indexación, consultas, clics, cobertura y Core Web Vitals.

## Cuando compremos `consafedev.com`

1. Configura DNS/hosting del `.com`.
2. Añade y verifica `consafedev.com` en Google Search Console.
3. Construye el sitio con:

   `NEXT_PUBLIC_CONSAFEDEV_SITE_URL=https://consafedev.com`

4. Verifica en el `.com`:
   - canonical;
   - Open Graph URL;
   - JSON-LD;
   - robots;
   - sitemap;
   - iconos;
   - media;
   - booking y WhatsApp.

5. Publica el `.com`.
6. En el host `consafedev.qzz.io`, configura redirección permanente
   `301` o `308` hacia la URL equivalente del `.com`, conservando path y query.
7. En Search Console usa Cambio de dirección del sitio antiguo al nuevo
   cuando la propiedad sea elegible.
8. Envía el sitemap nuevo.
9. Actualiza enlaces propios y perfiles externos para apuntar directamente
   al `.com`.
10. Conserva los redirects del dominio antiguo durante al menos un año;
    idealmente, mientras mantengas control del host.
11. Monitoriza ambas propiedades durante la transición.

## Importante

Una migración de dominio puede producir fluctuaciones temporales de
visibilidad mientras Google vuelve a rastrear y transfiere señales.

No cambies simultáneamente arquitectura, contenido y dominio salvo que sea
necesario. La intención es que la migración sea exclusivamente de hostname.
