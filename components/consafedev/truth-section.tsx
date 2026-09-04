const safeguards = [
  {
    label: "Acompañamiento",
    title: "La entrega no es el final de la conversación.",
    body: "Incluimos un periodo de soporte en nuestros desarrollos y dejamos una ruta clara para evolución, ajustes y siguientes etapas.",
  },
  {
    label: "Garantía",
    title: "Respondemos por lo que construimos.",
    body: "Nuestros desarrollos incluyen un año de garantía contra fallas atribuibles a nuestro software.",
  },
  {
    label: "Alcance",
    title: "Buscamos la solución que tenga sentido.",
    body: "Podemos ajustar alcance y prioridades al presupuesto disponible sin disfrazar una plantilla como software a medida.",
  },
] as const;

export function TruthSection() {
  return (
    <>
      <section className="editorial-section evidence-posture" aria-labelledby="evidence-title">
        <div className="evidence-posture__lead">
          <p className="eyebrow eyebrow--dark">Sin humo</p>
          <h2 id="evidence-title">Preferimos una conversación relevante a una pared de logos.</h2>
        </div>
        <div className="evidence-posture__body">
          <p>
            Los casos que importan son los que se parecen a tu contexto. Cuando entendamos el problema, podemos revisar ejemplos comparables, explicar decisiones y hablar con precisión de qué tendría sentido construir.
          </p>
          <p>
            No usamos métricas inventadas, testimonios sin fuente ni cifras decorativas para aparentar una escala que no necesitas para tomar una buena decisión.
          </p>
        </div>
      </section>

      <section className="confidence-section" aria-labelledby="confidence-title">
        <div className="confidence-section__heading">
          <p className="eyebrow">Menos riesgo para empezar</p>
          <h2 id="confidence-title">Un proyecto serio también se nota en lo que pasa después del “sí”.</h2>
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
