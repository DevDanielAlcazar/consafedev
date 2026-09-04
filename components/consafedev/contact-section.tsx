import { configuredHref, isExternalHref, siteConfig } from "@/lib/consafedev/site-config";

export function ContactSection() {
  const bookingHref = configuredHref(siteConfig.bookingUrl);
  const bookingExternal = isExternalHref(siteConfig.bookingUrl);
  const whatsappExternal = isExternalHref(siteConfig.whatsappUrl);

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="contact-section__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="contact-section__copy">
        <p className="eyebrow">El siguiente paso puede ser simple</p>
        <h2 id="contact-title">Cuéntanos qué necesitas resolver.</h2>
        <p>
          Revisamos contigo el problema, el contexto y lo que tendría sentido construir. Si vemos una oportunidad real de generar valor, definimos el siguiente paso. Si no, terminamos la sesión sin compromiso y sin problema.
        </p>
      </div>

      <div className="contact-section__actions">
        <a
          className="button button--primary button--large"
          href={bookingHref}
          target={bookingExternal ? "_blank" : undefined}
          rel={bookingExternal ? "noreferrer" : undefined}
          data-booking-configured={siteConfig.bookingUrl ? "true" : "false"}
        >
          Agendar una conversación
          <span aria-hidden="true">↗</span>
        </a>

        {siteConfig.whatsappUrl ? (
          <a
            className="button button--outline button--large"
            href={siteConfig.whatsappUrl}
            target={whatsappExternal ? "_blank" : undefined}
            rel={whatsappExternal ? "noreferrer" : undefined}
          >
            Escribir por WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>

      {!siteConfig.bookingUrl && process.env.NODE_ENV !== "production" ? (
        <p className="contact-section__config-hint">
          La URL de agenda se conecta con <code>NEXT_PUBLIC_CONSAFEDEV_BOOKING_URL</code> antes de publicar.
        </p>
      ) : null}
    </section>
  );
}
