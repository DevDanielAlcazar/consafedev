const capabilities = [
  {
    index: "01",
    title: "Software que encaja con tu operación",
    body: "Aplicaciones, plataformas, sistemas internos y herramientas a medida para procesos que no caben bien en una plantilla.",
    detail: "Web apps · plataformas internas · SaaS · soluciones a medida",
  },
  {
    index: "02",
    title: "Operaciones que dejan de depender de trabajo manual",
    body: "Automatizamos pasos repetitivos, validaciones, seguimiento y decisiones operativas. Con IA cuando aporta valor; sin IA cuando no hace falta.",
    detail: "Automatización · IA aplicada · flujos · orquestación",
  },
  {
    index: "03",
    title: "Herramientas que trabajan juntas",
    body: "Conectamos sistemas, información y equipos para reducir duplicidad, retrabajo y puntos ciegos entre procesos.",
    detail: "Integraciones · APIs · datos · sistemas conectados",
  },
  {
    index: "04",
    title: "Productos que pueden crecer contigo",
    body: "Construimos experiencias digitales con una base técnica preparada para evolucionar sin convertir cada cambio en una reconstrucción.",
    detail: "Web · móvil · plataformas comerciales · producto digital",
  },
] as const;

export function CapabilitiesSection() {
  return (
    <section className="editorial-section capabilities" id="capacidades">
      <div className="editorial-section__intro">
        <p className="eyebrow eyebrow--dark">Qué podemos construir</p>
        <h2>La tecnología cambia. El problema correcto sigue siendo el punto de partida.</h2>
        <p>
          Elegimos arquitectura, automatización e interfaces por lo que tu operación necesita conseguir, no por lo que esté de moda esa semana.
        </p>
      </div>

      <div className="capability-list">
        {capabilities.map((capability) => (
          <article className="capability-row" key={capability.index}>
            <span className="capability-row__index">{capability.index}</span>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
            <small>{capability.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
