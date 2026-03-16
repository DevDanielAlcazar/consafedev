# Product Requirements Document (PRD) - ConSafeDev

## Visión General
ConSafeDev se posiciona como una fábrica de soluciones de software de alto rendimiento, apalancando la experiencia de su CEO, Jesús Daniel Nava Alcázar. La propuesta de valor central es: **"El software dejó de ser un gasto y se convierte en el motor de rentabilidad de la empresa"**.

La arquitectura del proyecto está basada en **Next.js 16 + React 19** con un diseño ultra-moderno (**Liquid Glass / Glassmorphism 2.0**) enfocado en la conversión B2B High-Ticket.

---

## Estado de Implementación

### ✅ Lo que se ha implementado (Completado)

1. **Identidad Visual y Diseño Base**
   - Paleta de colores implementada: *Deep Navy* (Base), *Transformative Teal* (Acento), *Hyper-Coral* (Conversión).
   - Tipografía configurada: *Space Grotesk* (Títulos) e *Inter* (Cuerpo).
   - Componentes UI reutilizables: `GlassCard` (Efecto Liquid Glass con bordes translúcidos y desenfoque).
   - Logo SVG personalizado integrado en el Navbar.
   - **Navbar Inteligente**: Animación dinámica que oculta la barra al hacer scroll hacia abajo y la muestra al subir, mejorando la experiencia de usuario (UX).

2. **Sección Hero (Fascinación Inicial)**
   - Titular de impacto enfocado en rentabilidad.
   - Animaciones *Kinetic Typography* con Framer Motion.
   - Imagen de equipo de ingeniería con *Glass Overlay* y métricas flotantes holográficas.
   - *Nota: Se eliminó el globo de "Boutique de Ingeniería Universal" según solicitud.*

3. **Bento Grid de Servicios (Claridad y Escaneo)**
   - Componente `bento-services.tsx` que muestra los pilares: Desarrollo Web/Mobile, Sistemas de Misión Crítica, IA & Automatización, y Modernización de Legados.

4. **Testimonios (Prueba Social)**
   - Componente `testimonials.tsx` integrado.
   - Casos de éxito convincentes y realistas con empresas de alto nivel (Arca Continental, Cadena Comercial OXXO, SIEMENS).
   - Diseño en tarjetas de cristal con animaciones escalonadas.

5. **Calculadora de ROI (Validación Lógica)**
   - Componente interactivo `roi-calculator.tsx`.
   - Permite al usuario ajustar horas manuales y costo por hora para visualizar el "Costo Anual de Ineficiencia" y el "Ahorro Anual Estimado (85%)".

6. **Formulario Conversacional (Cierre de Venta)**
   - Componente `conversational-form.tsx` con flujo de 4 pasos (Proceso -> Contacto -> Preferencia -> Fecha/Hora).
   - Flexibilidad B2B/B2C: Solicita "Correo Electrónico" en lugar de corporativo. Los campos "Empresa" y "Teléfono" son opcionales (se envía "NA" por defecto al webhook si están vacíos).
   - Calendario moderno (`react-day-picker`) localizado al **Español**, con disponibilidad de Lunes a Domingo.
   - Feedback visual en el calendario: Días pasados claramente deshabilitados (en gris, tachados y no seleccionables) y un mensaje claro de la fecha seleccionada. Solo permite elegir del día actual en adelante.
   - Selección de horarios ampliada de **7:00 AM a 7:00 PM** con UI optimizada (scroll personalizado).
   - Animaciones de transición suaves entre pasos y pantalla de éxito personalizada.
   - **Server Action (`app/actions/schedule.ts`)** configurada para enviar los datos al Webhook de n8n.

7. **SEO y Despliegue**
   - **SEO Optimizado**: Metadatos completos (OpenGraph, Twitter Cards), JSON-LD para Schema.org, `sitemap.ts` y `robots.ts` generados dinámicamente para la mejor indexación en Google.
   - **Estrategia de Despliegue**: Documentación (`despliegue.md`) para servidor Debian usando Git, PM2 para aislamiento de procesos y exposición segura a través de Cloudflare Tunnels (`cloudflared`).

7. **Integración Backend (n8n)**
   - Flujo de n8n configurado y activo.
   - Escucha el Webhook, añade una fila en Google Sheets y notifica por Telegram de forma inmediata.

7. **CEO Footer (Confianza Final)**
   - Componente `ceo-footer.tsx` que presenta a Jesús Daniel Nava Alcázar.
   - Destaca métricas reales (78% reducción de incidencias, impacto global).
   - Fotografía profesional integrada con diseño editorial.

8. **SEO Local y Metadatos**
   - Metadatos dinámicos en `app/layout.tsx` optimizados para "Desarrollo de Software en León, Gto".
   - Integración de Schema Markup (JSON-LD) tipo `ProfessionalService` para posicionamiento en Google Maps.

---

## ⏳ Lo que falta por integrar (Pendiente / Próximos Pasos)

1. **Imágenes Definitivas**
   - Actualmente se utilizan imágenes de alta calidad de Unsplash como *placeholders* (Hero y CEO).
   - *Acción requerida*: Reemplazar estas URLs por las fotografías reales del equipo y del CEO cuando estén disponibles, o mantenerlas si se ajustan a la visión final.

2. **Optimización de Rendimiento (Opcional pero recomendado)**
   - Configurar Google Analytics 4 (GA4) o PostHog para medir la interacción con la Calculadora de ROI y el embudo del formulario conversacional.
   - Verificar el perfil de Google Business (Google Mi Negocio) para asegurar que la dirección y datos coincidan exactamente con el JSON-LD implementado.

3. **Páginas de Políticas (Legal)**
   - Crear páginas de "Aviso de Privacidad" y "Términos y Condiciones" (requerido para formularios de captación de leads en México).
