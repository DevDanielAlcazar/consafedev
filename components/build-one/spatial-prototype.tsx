'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';

const SpatialCanvas = dynamic(() => import('./spatial-canvas'), { ssr: false });

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothStep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function subscribeToReviewUrl(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

function getReviewUrl() {
  return typeof window === 'undefined' ? '' : window.location.search;
}

function useSceneProgress(sectionRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      setProgress(clamp01(-section.getBoundingClientRect().top / travel));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  return progress;
}

function StoryCopy({ progress }: { progress: number }) {
  const heroOut = smoothStep((progress - 0.17) / 0.15);
  const fragmentationIn = smoothStep((progress - 0.18) / 0.1);
  const fragmentationOut = smoothStep((progress - 0.28) / 0.08);
  const understandingIn = smoothStep((progress - 0.27) / 0.1);
  const understandingOut = smoothStep((progress - 0.34) / 0.08);
  const structureIn = smoothStep((progress - 0.39) / 0.08);
  const structureOut = smoothStep((progress - 0.62) / 0.08);

  return (
    <div className="v4a-copy">
      <div
        className="v4a-copy__hero"
        style={{ opacity: 1 - heroOut, transform: `translate3d(0, ${heroOut * -24}px, 0)` }}
      >
        <h1 id="v4a-hero-title">Lo complejo puede funcionar simple.</h1>
        <p className="v4a-copy__lead">
          Diseñamos software a medida que conecta procesos, automatiza operaciones y convierte
          problemas reales de negocio en sistemas que funcionan.
        </p>
        <div className="v4a-copy__actions">
          <Link className="cs-button cs-button--primary" href="#v4a-scene">
            Hablemos de lo que necesitas resolver
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link className="cs-explore-link" href="#v4a-scene">
            Explora cómo lo hacemos
            <ArrowDown size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div
        className="v4a-copy__beat v4a-copy__beat--fragmentation"
        style={{ opacity: fragmentationIn * (1 - fragmentationOut), transform: `translate3d(0, ${(1 - fragmentationIn) * 20}px, 0)` }}
      >
        <h2>Los problemas rara vez empiezan en el software.</h2>
        <p>Empiezan entre procesos, herramientas y decisiones que dejaron de trabajar juntas.</p>
      </div>

      <div
        className="v4a-copy__beat v4a-copy__beat--understanding"
        style={{ opacity: understandingIn * (1 - understandingOut), transform: `translate3d(0, ${(1 - understandingIn) * 20}px, 0)` }}
      >
        <h2>Primero entendemos qué está ocurriendo.</h2>
        <p>Porque construir bien empieza mucho antes de escribir código.</p>
      </div>

      <div
        className="v4a-copy__beat v4b-copy__beat--structure"
        style={{ opacity: structureIn * (1 - structureOut), transform: `translate3d(0, ${(1 - structureIn) * 20}px, 0)` }}
      >
        <h2>Diseñamos alrededor del problema. No de una plantilla.</h2>
      </div>
    </div>
  );
}

function ProductCopy({ progress, narrativeMode = false }: { progress: number; narrativeMode?: boolean }) {
  const copyIn = narrativeMode ? smoothStep((progress - 0.76) / 0.08) : smoothStep((progress - 0.47) / 0.12);

  return (
    <div className="v4c-copy">
      <div
        className="v4c-copy__beat"
        style={{ opacity: copyIn, transform: `translate3d(0, ${(1 - copyIn) * 18}px, 0)` }}
      >
        <h2 id="v4c-product-title">Después lo convertimos en software que tu equipo puede usar.</h2>
      </div>
    </div>
  );
}

export function SpatialPrototype() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);
  const reducedMotion = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const reviewUrl = useSyncExternalStore(subscribeToReviewUrl, getReviewUrl, () => '');
  const review = new URLSearchParams(reviewUrl).get('review') ?? '';
  const reviewNoCopy = review.includes('no-copy') || review.includes('living-product') || review.includes('clarity');
  const reviewAngle = review.includes('depth-angle');
  const reviewLivingProduct = review.includes('living-product');
  const reviewClarity = review.includes('clarity');
  const reviewNarrativeTransition = review.includes('narrative-transition');
  const sceneProgress = reducedMotion ? Math.round(progress * 5) / 5 : progress;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!reviewLivingProduct && !reviewClarity && !reviewNarrativeTransition) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const targetProgress = reviewClarity ? 0.95 : reviewLivingProduct ? 0.9 : 0;
      window.scrollTo(0, section.offsetTop + travel * targetProgress);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reviewClarity, reviewLivingProduct, reviewNarrativeTransition]);

  return (
    <section ref={sectionRef} id="v4a-scene" className="v4f-space" aria-labelledby="v4a-hero-title">
      <div className="v4f-space__sticky">
        <div className="v4f-space__atmosphere" aria-hidden="true" />
        <SpatialCanvas progress={sceneProgress} reducedMotion={Boolean(reducedMotion)} mobile={mobile} reviewAngle={reviewAngle} narrativeMode />
        <div className={reviewNoCopy ? 'v4a-copy--review-hidden' : undefined}>
          <StoryCopy progress={progress} />
          <ProductCopy progress={progress} narrativeMode />
        </div>
        <p className="sr-only">
          La escena muestra seis fragmentos persistentes de una operación: una solicitud, un documento,
          un responsable, una fecha, un estado pendiente y una revisión. Al desplazarte, la solicitud
          entra en escena, el documento responde como evidencia, el responsable y la fecha encuentran
          contexto, y la revisión emerge como acción dentro de una superficie de software continua.
          Después, la misma superficie confirma una secuencia de atención, evidencia, contexto y acción,
          mientras Pendiente permanece sin cambios.
        </p>
      </div>
    </section>
  );
}
