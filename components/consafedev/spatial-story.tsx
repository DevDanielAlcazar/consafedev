"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode, type Ref } from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
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

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

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
  const y = useTransform(progress, range, [20, 0, 0, -14]);

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
  const opacity = useTransform(progress, [0, 0.11, 0.155], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.11, 0.155], [0, 0, -18]);

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


function CinematicHeroSequence({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);

  const synchronizeVideoToProgress = () => {
    const video = videoRef.current;
    const latest = progress.get();
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    video.pause();
    const normalized = Math.min(1, Math.max(0, (latest - 0.14) / (0.9 - 0.14)));
    const target = normalized * Math.max(0, video.duration - 0.1);
    targetTimeRef.current = target;
    if (Math.abs(video.currentTime - target) > 0.035) video.currentTime = target;
  };

  /*
   * The 10 s master is treated as a visual timeline, not as autoplay.
   * The first ~14% of page progress lets the prospect read the Hero.
   * The final state is held before Clarity Horizon so the resolved system can breathe.
   */
  useMotionValueEvent(progress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    const start = 0.14;
    const end = 0.9;
    const normalized = Math.min(1, Math.max(0, (latest - start) / (end - start)));
    targetTimeRef.current = normalized * Math.max(0, video.duration - 0.1);

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const media = videoRef.current;
      if (!media) return;

      const target = targetTimeRef.current;
      if (!media.paused) media.pause();
      if (Math.abs(media.currentTime - target) > 0.035) {
        media.currentTime = target;
      }
    });
  });

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div className="cinematic-hero" aria-hidden="true">
      <div className="cinematic-hero__media">
        <video
          ref={videoRef}
          className="cinematic-hero__video"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          onLoadedMetadata={synchronizeVideoToProgress}
          onLoadedData={synchronizeVideoToProgress}
        >
          <source src="/media/consafedev-operation-resolve-v2.mp4" type="video/mp4" />
        </video>
        <div className="cinematic-hero__left-fade" />
        <div className="cinematic-hero__vignette" />
      </div>
      <div className="cinematic-hero__caption">
        <span>OPERACIÓN</span>
        <i aria-hidden="true" />
        <strong>FRAGMENTADA → RESUELTA</strong>
      </div>
    </div>
  );
}

function EditorialHandoff({
  reduceMotion,
  sectionRef,
  progress,
}: {
  reduceMotion: boolean;
  sectionRef: Ref<HTMLElement>;
  progress: MotionValue<number>;
}) {
  const eyebrowOpacity = useTransform(progress, [0.944, 0.965], [0, 1]);
  const eyebrowY = useTransform(progress, [0.944, 0.965], [10, 0]);
  const headingOpacity = useTransform(progress, [0.952, 0.982], [0, 1]);
  const headingY = useTransform(progress, [0.952, 0.982], [22, 0]);
  const bodyOpacity = useTransform(progress, [0.962, 0.997], [0, 1]);
  const bodyY = useTransform(progress, [0.962, 0.997], [15, 0]);

  if (reduceMotion) {
    return (
      <section className="editorial-handoff" ref={sectionRef}>
        <div className="editorial-handoff__inner">
          <p className="eyebrow">DE LA COMPLEJIDAD A LA CLARIDAD</p>
          <h2>Así llevamos una operación fragmentada hacia un sistema que sí funciona.</h2>
          <p className="editorial-handoff__body">
            Entendemos primero cómo opera tu negocio, dónde se rompe el flujo y qué necesita conectarse. Después diseñamos la arquitectura, los procesos y la experiencia que convierten esa complejidad en software útil.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="editorial-handoff editorial-handoff--understage"
      ref={sectionRef}
    >
      <div className="editorial-handoff__inner">
        <motion.p className="eyebrow" style={{ opacity: eyebrowOpacity, y: eyebrowY }}>
          DE LA COMPLEJIDAD A LA CLARIDAD
        </motion.p>
        <motion.h2 style={{ opacity: headingOpacity, y: headingY }}>
          Así llevamos una operación fragmentada hacia un sistema que sí funciona.
        </motion.h2>
        <motion.p className="editorial-handoff__body" style={{ opacity: bodyOpacity, y: bodyY }}>
          Entendemos primero cómo opera tu negocio, dónde se rompe el flujo y qué necesita conectarse. Después diseñamos la arquitectura, los procesos y la experiencia que convierten esa complejidad en software útil.
        </motion.p>
      </div>
    </motion.section>
  );
}

export function SpatialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const handoffRef = useRef<HTMLElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
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
  const stageY = useTransform(progress, [0.92, 1], ["0%", "-100%"]);

  /*
   * Build 03.2 — Seamless Chapter Transition
   *
   * Read the actual surface boundary against the fixed header. The light style
   * starts only after clarity reaches the whole header, then reverses with it.
   */
  useEffect(() => {
    const syncNavigation = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      const boundary = reduceMotion
        ? document.querySelector<HTMLElement>(".editorial-handoff")?.getBoundingClientRect().top
        : document.querySelector<HTMLElement>(".spatial-story__dark-stage")?.getBoundingClientRect().bottom;
      const headerTop = header?.getBoundingClientRect().top;

      document.documentElement.classList.toggle(
        "consafe-clarity-nav",
        boundary !== undefined && headerTop !== undefined && boundary <= headerTop,
      );
    };

    syncNavigation();
    const unsubscribeStory = progress.on("change", syncNavigation);
    window.addEventListener("scroll", syncNavigation, { passive: true });

    return () => {
      unsubscribeStory();
      window.removeEventListener("scroll", syncNavigation);
      document.documentElement.classList.remove("consafe-clarity-nav");
    };
  }, [progress, reduceMotion]);

  /*
   * Build 03.2 — Seamless Chapter Transition
   *
   * The resolved story and film leave as one dark stage. The opaque clarity
   * chapter and its copy sit directly beneath that moving surface.
   */
  if (reduceMotion) {
    return (
      <>
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
          <div className="reduced-narrative">
            <article><p className="eyebrow">01 · Operación</p><h2>El problema no suele empezar en el software.</h2></article>
            <article><p className="eyebrow">02 · Comprensión</p><h2>Primero entendemos qué está ocurriendo.</h2></article>
            <article><p className="eyebrow">03 · Diseño</p><h2>Diseñamos alrededor del problema. No de una plantilla.</h2></article>
            <article><p className="eyebrow">04 · Software</p><h2>Después lo convertimos en software que tu equipo puede usar.</h2></article>
          </div>
          <SpatialOperatingSystem progress={progress} reducedMotion />
        </section>
        <EditorialHandoff reduceMotion sectionRef={handoffRef} progress={progress} />
      </>
    );
  }

  return (
    <>
      <section className="spatial-story" id="sistema" ref={sectionRef}>
        <div className="spatial-story__sticky">
          <motion.div className="spatial-story__dark-stage" style={{ y: stageY }}>
            <div className="spatial-story__dark-field" />

            <div className="spatial-story__copy-layer">
              <HeroBeat progress={progress} />

              <NarrativeBeat
                progress={progress}
                range={[0.17, 0.195, 0.305, 0.33]}
                eyebrow="01 · Lo que hoy existe"
                title="Tu operación puede tener todas las piezas y seguir funcionando a medias."
                body="Solicitudes, documentos, responsables, fechas y revisiones viven en lugares distintos. El equipo termina haciendo de integración humana."
              />

              <NarrativeBeat
                progress={progress}
                range={[0.35, 0.375, 0.49, 0.515]}
                eyebrow="02 · Entender"
                title="Primero hacemos visible cómo se relaciona todo."
                body="Qué información activa una decisión. Qué es evidencia. Quién necesita contexto. Qué debería ocurrir después."
              />

              <NarrativeBeat
                progress={progress}
                range={[0.535, 0.56, 0.68, 0.705]}
                eyebrow="03 · Diseñar"
                title="Convertimos esa lógica en un sistema, no en otra capa de trabajo."
                body="La estructura nace de tu operación. La tecnología entra cuando ya sabemos qué debe coordinar, automatizar y simplificar."
              />

              <NarrativeBeat
                progress={progress}
                range={[0.725, 0.75, 0.895, 0.925]}
                eyebrow="04 · Resolver"
                title="El resultado es software que tu equipo puede usar."
                body="Menos seguimiento manual. Menos piezas sueltas. Más claridad para que el proceso avance."
              />
            </div>

            <CinematicHeroSequence progress={progress} />
          </motion.div>
          <EditorialHandoff reduceMotion={false} sectionRef={handoffRef} progress={progress} />
        </div>
      </section>
    </>
  );
}
