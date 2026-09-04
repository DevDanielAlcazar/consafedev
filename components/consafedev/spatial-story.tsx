"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { SpatialOperatingSystem } from "./spatial-operating-system";

type BeatProps = {
  progress: MotionValue<number>;
  className?: string;
  range: [number, number, number, number];
  eyebrow?: string;
  title: string;
  body?: string;
  children?: ReactNode;
};

function NarrativeBeat({
  progress,
  className = "",
  range,
  eyebrow,
  title,
  body,
  children,
}: BeatProps) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [28, 0, 0, -20]);

  return (
    <motion.div
      className={`narrative-beat ${className}`}
      style={{ opacity, y }}
      aria-live="off"
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p className="narrative-beat__body">{body}</p> : null}
      {children}
    </motion.div>
  );
}

function HeroBeat({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.1, 0.19], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.12, 0.19], [0, 0, -24]);

  return (
    <motion.div className="hero-copy" style={{ opacity, y }}>
      <p className="eyebrow">Software a medida · sistemas que sí encajan</p>
      <h1>Lo complejo puede funcionar simple.</h1>
      <p className="hero-copy__support">
        Diseñamos software a medida que conecta procesos, automatiza operaciones y convierte problemas reales de negocio en sistemas que funcionan.
      </p>
      <div className="hero-copy__actions">
        <a className="button button--primary" href="#contacto">
          Hablemos de lo que necesitas resolver
          <span aria-hidden="true">↗</span>
        </a>
        <a className="button button--quiet" href="#sistema">
          Explora cómo lo hacemos
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </motion.div>
  );
}

export function SpatialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 66,
    damping: 24,
    mass: 0.58,
    restDelta: 0.0005,
  });

  const stageDarkness = useTransform(progress, [0.82, 0.94, 1], [1, 0.92, 0]);
  const handoffOpacity = useTransform(progress, [0.9, 0.97, 1], [0, 0.55, 1]);

  if (reduceMotion) {
    return (
      <section className="spatial-story spatial-story--reduced" id="sistema" ref={sectionRef}>
        <div className="reduced-intro">
          <p className="eyebrow">Software a medida · sistemas que sí encajan</p>
          <h1>Lo complejo puede funcionar simple.</h1>
          <p>
            Diseñamos software a medida que conecta procesos, automatiza operaciones y convierte problemas reales de negocio en sistemas que funcionan.
          </p>
          <div className="hero-copy__actions">
            <a className="button button--primary" href="#contacto">Hablemos de lo que necesitas resolver</a>
            <a className="button button--quiet" href="#capacidades">Explora cómo lo hacemos</a>
          </div>
        </div>
        <SpatialOperatingSystem progress={progress} reducedMotion />
        <div className="reduced-narrative">
          <article><p className="eyebrow">01 · Operación</p><h2>El problema no suele empezar en el software.</h2></article>
          <article><p className="eyebrow">02 · Comprensión</p><h2>Primero entendemos qué está ocurriendo.</h2></article>
          <article><p className="eyebrow">03 · Diseño</p><h2>Diseñamos alrededor del problema. No de una plantilla.</h2></article>
          <article><p className="eyebrow">04 · Software</p><h2>Después lo convertimos en software que tu equipo puede usar.</h2></article>
        </div>
      </section>
    );
  }

  return (
    <section className="spatial-story" id="sistema" ref={sectionRef}>
      <div className="spatial-story__sticky">
        <motion.div
          className="spatial-story__dark-field"
          style={{ opacity: stageDarkness }}
        />

        <div className="spatial-story__copy-layer">
          <HeroBeat progress={progress} />

          <NarrativeBeat
            progress={progress}
            range={[0.135, 0.19, 0.285, 0.34]}
            eyebrow="01 · Operación"
            title="El problema no suele empezar en el software."
            body="Empieza en información dispersa, decisiones que dependen de contexto y procesos que el equipo sostiene como puede."
          />

          <NarrativeBeat
            progress={progress}
            range={[0.31, 0.37, 0.465, 0.525]}
            eyebrow="02 · Comprensión"
            title="Primero entendemos qué está ocurriendo."
            body="Qué es evidencia. Qué es contexto. Qué activa una decisión. Qué debería pasar después."
          />

          <NarrativeBeat
            progress={progress}
            range={[0.50, 0.56, 0.655, 0.715]}
            eyebrow="03 · Diseño"
            title="Diseñamos alrededor del problema. No de una plantilla."
            body="La estructura aparece antes que la interfaz. La tecnología llega cuando ya sabemos qué tiene que resolver."
          />

          <NarrativeBeat
            progress={progress}
            range={[0.69, 0.755, 0.865, 0.925]}
            eyebrow="04 · Software"
            title="Después lo convertimos en software que tu equipo puede usar."
            body="La complejidad no desaparece por magia. Queda contenida en un sistema más claro, operable y hecho para tu realidad."
          />
        </div>

        <SpatialOperatingSystem progress={progress} />

        <motion.div
          className="spatial-story__handoff"
          style={{ opacity: handoffOpacity }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
