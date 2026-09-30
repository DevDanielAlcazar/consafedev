const methodSteps = [
  {
    index: "01",
    label: "Necesidad",
    body: "Qué está estorbando, costando o frenando.",
  },
  {
    index: "02",
    label: "Operación",
    body: "Cómo sucede hoy, con personas, excepciones y contexto.",
  },
  {
    index: "03",
    label: "Decisiones",
    body: "Qué debe saber el sistema para mover algo al siguiente estado.",
  },
  {
    index: "04",
    label: "Arquitectura",
    body: "Qué conviene conectar, automatizar o construir.",
  },
  {
    index: "05",
    label: "Software",
    body: "Una experiencia que tu equipo puede usar y hacer evolucionar.",
  },
] as const;

const safeguards = [
  {
    label: "Acompañamiento",
    title: "No desaparecemos cuando se publica.",
    body: "Incluimos un periodo de soporte en nuestros desarrollos y dejamos una ruta clara para evolución, ajustes y siguientes etapas.",
  },
  {
    label: "Garantía",
    title: "Respondemos por el software que entregamos.",
    body: "Nuestros desarrollos incluyen un año de garantía contra fallas atribuibles a nuestro software.",
  },
  {
    label: "Criterio",
    title: "Si no necesitas una plataforma enorme, no te la vendemos.",
    body: "Ajustamos alcance y prioridades a lo que realmente necesita la operación y al presupuesto disponible, sin disfrazar una plantilla como software a medida.",
  },
] as const;

export function TruthSection() {
  return (
    <>
      <section className="editorial-section method-section" aria-labelledby="method-title">
        <div className="method-section__intro">
          <div>
            <p className="eyebrow eyebrow--dark">Cómo decidimos qué construir</p>
            <h2 id="method-title">No empezamos por una pantalla. Empezamos por cómo debería funcionar la operación.</h2>
          </div>
          <p>
            Eso nos permite decidir si necesitas un sistema nuevo, integrar lo que ya tienes, automatizar un tramo o simplemente dejar de construir cosas que no resuelven nada.
          </p>
        </div>

        <div className="method-track" aria-label="Proceso de decisión de ConSafeDev">
          {methodSteps.map((step) => (
            <article className="method-track__step" key={step.index}>
              <span className="method-track__index">{step.index}</span>
              <div className="method-track__node" aria-hidden="true" />
              <h3>{step.label}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>

      </section>

      <section className="editorial-section client-voice" aria-labelledby="client-voice-title">
        <div className="client-voice__heading">
          <p className="eyebrow eyebrow--dark">Voces del cliente</p>
          <h2 id="client-voice-title">Cuando el software sí encaja, se nota en la operación.</h2>
          <p>
            No son promesas de marketing. Son clientes describiendo qué cambió cuando el equipo entendió primero el problema y construyó después.
          </p>
        </div>

        <figure className="client-voice__lead">
          <blockquote>
            “No simplemente recopilaron requisitos; nos ayudaron a pensar en problemas complejos y tradujeron nuestros desafíos en soluciones prácticas.”
          </blockquote>
          <figcaption>
            <strong>Department Manager</strong>
            <span>Eye Recommend · Red de clínicas de optometría</span>
          </figcaption>
        </figure>

        <div className="client-voice__support">
          <figure>
            <blockquote>
              “Esta nueva versión ha reducido sustancialmente los tickets de soporte de usuarios, lo cual es genial para nuestros clientes y nuestras operaciones.”
            </blockquote>
            <figcaption>
              <strong>Simon Robinson</strong>
              <span>Senior Product Owner · 4Com Technologies Limited</span>
            </figcaption>
          </figure>

          <figure>
            <blockquote>
              “No solo ejecutan nuestra visión, sino que también contribuyen con ideas valiosas que hemos implementado exitosamente.”
            </blockquote>
            <figcaption>
              <strong>Grzegorz Wosicki</strong>
              <span>Fundador y CEO · RideCraft</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="confidence-section confidence-section--decision" aria-labelledby="confidence-title">
        <div className="confidence-section__heading">
          <div>
            <p className="eyebrow">Después del sí</p>
            <h2 id="confidence-title">Un buen proyecto también se nota en cuánto riesgo te quita.</h2>
          </div>
          <p className="confidence-section__lede">
            Queremos que sepas qué ocurre después de aprobar: quién responde, qué protegemos y cómo evitamos construir de más.
          </p>
        </div>

        <div className="confidence-grid">
          {safeguards.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
