import { configuredHref, isExternalHref, siteConfig } from "@/lib/consafedev/site-config";

export function ContactSection() {
  const bookingHref = configuredHref(siteConfig.bookingUrl);
  const bookingExternal = isExternalHref(siteConfig.bookingUrl);
  const whatsappExternal = isExternalHref(siteConfig.whatsappUrl);

  return (
    <section className="contact-section contact-section--problem" id="contacto" aria-labelledby="contact-title">
      <div className="contact-section__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="contact-section__copy">
        <p className="eyebrow">Empecemos por el problema</p>
        <h2 id="contact-title">Cuéntanos dónde se está rompiendo tu operación.</h2>
        <p>
          No necesitas llegar con requerimientos, diagramas ni saber qué tecnología pedir. Explícanos qué pasa hoy, qué debería pasar o dónde estás perdiendo tiempo, dinero o control. Nosotros te ayudamos a convertirlo en un siguiente paso concreto.
        </p>
      </div>

      <div className="contact-section__actions">
        <a
          className="button button--primary button--large"
          href={bookingHref}
          target={bookingExternal ? "_blank" : undefined}
          rel={bookingExternal ? "noopener noreferrer" : undefined}
          data-booking-configured={siteConfig.bookingUrl ? "true" : "false"}
        >
          Revisemos tu operación
          <span aria-hidden="true">↗</span>
        </a>

        {siteConfig.whatsappUrl ? (
          <a
            className="button button--outline button--large"
            href={siteConfig.whatsappUrl}
            target={whatsappExternal ? "_blank" : undefined}
            rel={whatsappExternal ? "noopener noreferrer" : undefined}
          >
            Contarlo por WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>

      <p className="contact-section__microcopy">
        30 min · Google Meet · Sin compromiso
      </p>

      {!siteConfig.bookingUrl && process.env.NODE_ENV !== "production" ? (
        <p className="contact-section__config-hint">
          La URL de agenda se conecta con <code>NEXT_PUBLIC_CONSAFEDEV_BOOKING_URL</code> antes de publicar.
        </p>
      ) : null}
    </section>
  );
}
