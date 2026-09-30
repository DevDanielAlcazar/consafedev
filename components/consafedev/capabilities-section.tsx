const capabilityPaths = [
  {
    index: "01",
    problem: "Tu equipo persigue información entre hojas, correos y mensajes.",
    intervention:
      "Convertimos el flujo real en un sistema interno que concentra contexto, responsables, estados y decisiones.",
    outcome: "Una operación visible y trazable.",
    detail: "Solicitudes · aprobaciones · seguimiento · operación",
  },
  {
    index: "02",
    problem: "Hay trabajo que se repite porque nadie lo automatizó bien.",
    intervention:
      "Detectamos pasos repetitivos, validaciones y handoffs. Automatizamos lo que sí conviene, con IA sólo cuando aporta.",
    outcome: "Menos tareas manuales. Más tiempo para decidir.",
    detail: "Validaciones · alertas · documentos · automatización",
  },
  {
    index: "03",
    problem: "Tus herramientas saben cosas distintas y tu equipo hace de puente.",
    intervention:
      "Conectamos sistemas y datos para que la información llegue donde debe sin recapturas, dobles procesos ni puntos ciegos.",
    outcome: "Una operación conectada, no una colección de sistemas.",
    detail: "Ventas · inventario · proveedores · datos",
  },
  {
    index: "04",
    problem: "Lo que hoy usas ya no alcanza para cómo creció el negocio.",
    intervention:
      "Diseñamos una plataforma o producto a medida que pueda evolucionar sin obligarte a reconstruir todo cada vez.",
    outcome: "Software que crece contigo.",
    detail: "Plataformas · portales · producto digital · sistemas internos",
  },
] as const;

export function CapabilitiesSection() {
  return (
    <section className="editorial-section capabilities capabilities--decision" id="capacidades">
      <div className="capabilities__intro">
        <p className="eyebrow eyebrow--dark">Qué podemos resolver</p>
        <h2>
          No necesitas saber qué tecnología pedir. Necesitas que el problema deje de estorbar.
        </h2>
        <p>
          Llegas con una operación, una fricción o una idea. Nosotros aterrizamos qué conviene construir, automatizar o conectar para que el resultado tenga sentido.
        </p>
      </div>

      <div className="capability-paths">
        <div className="capability-paths__legend" aria-hidden="true">
          <span />
          <span>Lo que hoy pasa</span>
          <span>Lo que hacemos</span>
          <span>Lo que cambia</span>
        </div>

        {capabilityPaths.map((capability) => (
          <article className="capability-path" key={capability.index}>
            <span className="capability-path__index">{capability.index}</span>

            <div className="capability-path__problem">
              <span className="capability-path__label">Lo que hoy pasa</span>
              <h3>{capability.problem}</h3>
            </div>

            <div className="capability-path__intervention">
              <span className="capability-path__label">Lo que hacemos</span>
              <p>{capability.intervention}</p>
            </div>

            <div className="capability-path__outcome">
              <span className="capability-path__label">Lo que cambia</span>
              <strong>{capability.outcome}</strong>
              <small>{capability.detail}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
