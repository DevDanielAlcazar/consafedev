'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef, type CSSProperties } from 'react';

type Point3 = [number, number, number];
type ActorId = 'solicitud' | 'documento' | 'responsable' | 'fecha' | 'estado' | 'accion';

type ActorSpec = {
  id: ActorId;
  position: Point3;
  size: [number, number];
  rotation: [number, number, number];
  depth: 'near' | 'mid' | 'far';
};

// These six actors stay in the scene for the whole V4A sequence. Their meaning
// comes from their restrained physical cues, not from a dashboard layout.
const ACTORS: ActorSpec[] = [
  { id: 'solicitud', position: [-3.34, 1.68, 1.22], size: [2.22, 0.82], rotation: [0.05, -0.02, -0.08], depth: 'near' },
  { id: 'documento', position: [2.02, 0.98, -1.12], size: [1.34, 1.72], rotation: [-0.03, 0.14, 0.08], depth: 'mid' },
  { id: 'responsable', position: [2.55, -1.28, -1.62], size: [1.34, 0.58], rotation: [0.04, -0.08, -0.02], depth: 'far' },
  { id: 'fecha', position: [3.22, 1.68, -2.25], size: [1.02, 0.36], rotation: [0.02, -0.04, 0.03], depth: 'far' },
  { id: 'estado', position: [-2.6, -0.08, -1.82], size: [1.16, 0.34], rotation: [0.02, 0.02, -0.12], depth: 'far' },
  { id: 'accion', position: [1.14, -1.55, 0.18], size: [1.12, 0.4], rotation: [0.02, 0.03, -0.06], depth: 'mid' },
];

// V4B destinations are intentionally asymmetric. They create a readable
// relationship between the fragments without turning the scene into a map,
// diagram, or workflow.
const STRUCTURE_TARGETS: Record<ActorId, { position: Point3; rotation: Point3 }> = {
  solicitud: { position: [0.25, 1.2, 0.62], rotation: [0.04, -0.015, -0.03] },
  documento: { position: [2.1, 1.02, -0.18], rotation: [-0.02, 0.07, 0.025] },
  responsable: { position: [0.18, -0.12, -0.52], rotation: [0.025, -0.04, -0.01] },
  fecha: { position: [3.0, -0.42, -1.16], rotation: [0.015, -0.02, 0.015] },
  estado: { position: [2.2, -1.68, -0.5], rotation: [0.015, 0.015, -0.035] },
  accion: { position: [0.08, -1.48, 0.28], rotation: [0.015, 0.02, -0.025] },
};

// Product positions are embedded destinations, not a new UI layout. The
// offsets keep the three relationships readable while the common material
// gives them one operational surface.
const PRODUCT_TARGETS: Record<ActorId, { position: Point3; rotation: Point3; scale: number }> = {
  solicitud: { position: [0.18, 0.78, 0.18], rotation: [0.015, 0.01, -0.012], scale: 0.96 },
  documento: { position: [2.02, 0.76, -0.18], rotation: [-0.01, 0.04, 0.012], scale: 0.78 },
  responsable: { position: [0.05, -0.2, -0.04], rotation: [0.01, -0.015, -0.006], scale: 0.86 },
  fecha: { position: [2.72, -0.48, -0.08], rotation: [0.01, -0.01, 0.01], scale: 0.86 },
  estado: { position: [2.25, -1.04, -0.02], rotation: [0.01, 0.01, -0.012], scale: 0.84 },
  accion: { position: [0.52, -1.02, 0.12], rotation: [0.01, 0.015, -0.012], scale: 0.9 },
};

// Mobile is recomposed as one vertical instrument. The semantic roles stay the
// same, but their shared context is readable without cropping the desktop stage.
const PRODUCT_MOBILE_TARGETS: Record<ActorId, { position: Point3; rotation: Point3; scale: number }> = {
  solicitud: { position: [-0.3, 1.02, 0.18], rotation: [0.015, 0.01, -0.012], scale: 0.82 },
  documento: { position: [0.78, 1.0, -0.22], rotation: [-0.01, 0.04, 0.012], scale: 0.68 },
  responsable: { position: [-0.38, -0.08, -0.04], rotation: [0.01, -0.015, -0.006], scale: 0.76 },
  fecha: { position: [0.7, -0.08, -0.1], rotation: [0.01, -0.01, 0.01], scale: 0.76 },
  estado: { position: [0.62, -1.17, 0.02], rotation: [0.01, 0.01, -0.012], scale: 0.76 },
  accion: { position: [-0.22, -1.17, 0.1], rotation: [0.01, 0.015, -0.012], scale: 0.78 },
};

// V4F.1 keeps the mobile recognition phase inside the viewport, then locks
// the same three semantic rows used by the approved product composition.
const NARRATIVE_MOBILE_POSITIONS: Record<ActorId, Point3> = {
  solicitud: [-1.02, 1.16, 0.12],
  documento: [0.86, 1.12, -0.2],
  responsable: [-0.68, -0.08, -0.12],
  fecha: [0.74, 0.08, -0.12],
  estado: [0.62, -1.11, 0.02],
  accion: [-0.38, -1.08, 0.1],
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothStep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function ActorSurface({ id, referenceReveal, productMode, livingState }: { id: ActorId; referenceReveal: number; productMode: boolean; livingState: 'focus' | 'evidence' | 'metadata' | 'ready' | 'state' | null }) {
  const surfaceClass = `${productMode ? ' v4c-actor' : ''}${livingState ? ` v4c-actor--living-${livingState}` : ''}`;

  if (id === 'solicitud') {
    return (
      <article className={`v4a-actor${surfaceClass} v4a-actor--solicitud`} aria-hidden="true">
        <span className="v4a-actor__mark" />
        <span className="v4a-actor__label">Solicitud</span>
        <span className="v4a-actor__line">Necesito revisar...</span>
        <span className="v4a-actor__ref" style={{ opacity: referenceReveal }}>2481</span>
      </article>
    );
  }

  if (id === 'documento') {
    return (
      <article className={`v4a-actor${surfaceClass} v4a-actor--documento`} aria-hidden="true">
        <span className="v4a-documento__fold" />
        <span className="v4a-documento__rule v4a-documento__rule--one" />
        <span className="v4a-documento__rule v4a-documento__rule--two" />
        <span className="v4a-documento__id">2481</span>
      </article>
    );
  }

  if (id === 'responsable') {
    return (
      <article className={`v4a-actor${surfaceClass} v4a-actor--responsable`} aria-hidden="true">
        <span className="v4a-person-mark"><i /></span>
        <span className="v4a-actor__label">Responsable</span>
        <span className="v4a-actor__dash">—</span>
      </article>
    );
  }

  if (id === 'fecha') {
    return (
      <article className={`v4a-actor${surfaceClass} v4a-actor--fecha`} aria-hidden="true">
        <span>18 SEP</span>
      </article>
    );
  }

  if (id === 'estado') {
    return (
      <article className={`v4a-actor${surfaceClass} v4a-actor--estado`} aria-hidden="true">
        <span className="v4a-status-dot" />
        <span>Pendiente</span>
      </article>
    );
  }

  return (
    <article className={`v4a-actor${surfaceClass} v4a-actor--accion`} aria-hidden="true">
      <span className="v4a-action-mark"><i /></span>
      <span>Revisión</span>
    </article>
  );
}

function Actor({ spec, progress, reducedMotion, mobile, productMode = false, narrativeMode = false }: { spec: ActorSpec; progress: number; reducedMotion: boolean; mobile: boolean; productMode?: boolean; narrativeMode?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const narrativeConvergence = narrativeMode ? smoothStep((progress - 0.35) / 0.33) : 0;
  const narrativeProductProgress = narrativeMode ? clamp01((progress - 0.35) / 0.47) : 0;
  const narrativeLivingProgress = narrativeMode ? 0.66 + clamp01((progress - 0.82) / 0.18) * 0.31 : 0;
  const livingTimeline = productMode ? progress : narrativeMode ? narrativeLivingProgress : 0;
  const productAlignment = productMode ? smoothStep((progress - 0.1) / 0.6) : narrativeConvergence;
  const contextLanding = productMode ? smoothStep((progress - 0.27) / 0.16) : 0;
  const coordinationLanding = productMode ? smoothStep((progress - 0.4) / 0.17) : 0;
  const actionLanding = productMode ? smoothStep((progress - 0.54) / 0.16) : 0;
  const livingFocus = productMode || narrativeMode ? smoothStep((livingTimeline - 0.66) / 0.12) : 0;
  const livingEvidence = productMode || narrativeMode ? smoothStep((livingTimeline - 0.72) / 0.12) : 0;
  const livingMetadata = productMode || narrativeMode ? smoothStep((livingTimeline - 0.78) / 0.1) : 0;
  const livingReady = productMode || narrativeMode ? smoothStep((livingTimeline - 0.84) / 0.12) : 0;
  const livingState = productMode || narrativeMode ? smoothStep((livingTimeline - 0.88) / 0.08) : 0;
  const productLanding = productMode
    ? spec.id === 'solicitud' || spec.id === 'documento'
      ? contextLanding
      : spec.id === 'responsable' || spec.id === 'fecha'
        ? coordinationLanding
        : actionLanding
    : 0;
  const narrativeRoleConvergence = narrativeMode
    ? spec.id === 'solicitud'
      ? smoothStep((progress - 0.35) / 0.2)
      : spec.id === 'documento'
        ? smoothStep((progress - 0.4) / 0.18)
        : spec.id === 'responsable' || spec.id === 'fecha'
          ? smoothStep((progress - 0.45) / 0.16)
          : spec.id === 'accion'
            ? smoothStep((progress - 0.5) / 0.14)
            : smoothStep((progress - 0.52) / 0.12)
    : 0;
  const eventReveal = smoothStep((progress - 0.06) / 0.24);
  const documentCross = smoothStep((progress - 0.09) / 0.23);
  const settling = smoothStep((progress - 0.36) / 0.16);
  const understanding = smoothStep((progress - 0.48) / 0.28);
  const referenceReveal = smoothStep((progress - 0.59) / 0.15);
  const structureAmount = spec.id === 'solicitud' || spec.id === 'documento'
    ? smoothStep((progress - 0.76) / 0.1)
    : spec.id === 'responsable'
      ? smoothStep((progress - 0.79) / 0.11)
      : spec.id === 'fecha'
        ? smoothStep((progress - 0.82) / 0.12)
        : spec.id === 'accion'
          ? smoothStep((progress - 0.85) / 0.11)
          : smoothStep((progress - 0.87) / 0.1);
  const initialOpacity = {
    solicitud: 0.18,
    documento: 0.22,
    responsable: 0.08,
    fecha: 0.04,
    estado: 0.06,
    accion: 0.03,
  }[spec.id];
  const finalOpacity = {
    solicitud: 0.68,
    documento: 0.68,
    responsable: 0.63,
    fecha: 0.61,
    estado: 0.57,
    accion: 0.56,
  }[spec.id];
  const stateOpacity = lerp(initialOpacity, finalOpacity, eventReveal);
  const productOpacity = {
    solicitud: 0.78,
    documento: 0.7,
    responsable: 0.72,
    fecha: 0.7,
    estado: 0.66,
    accion: 0.68,
  }[spec.id];
  const renderedOpacity = productMode || narrativeMode ? lerp(stateOpacity, productOpacity, productAlignment) : stateOpacity;
  const startPosition = spec.id === 'documento' ? [3.2, 1.56, -2.45] as Point3 : spec.position;
  const initialPosition = productMode
    ? STRUCTURE_TARGETS[spec.id].position
    : narrativeMode
      ? mobile ? NARRATIVE_MOBILE_POSITIONS[spec.id] : spec.position
      : mobile && spec.id === 'documento'
        ? [1.8, -1.8, -1.12] as Point3
        : startPosition;
  const initialRotation = productMode ? STRUCTURE_TARGETS[spec.id].rotation : spec.rotation;

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const drift = reducedMotion || productMode || narrativeMode ? 0 : Math.sin(state.clock.elapsedTime * 0.18 + spec.position[0]) * 0.018;
    if (narrativeMode) {
      const recognition = spec.id === 'solicitud'
        ? smoothStep((progress - 0.18) / 0.12)
        : spec.id === 'documento'
          ? smoothStep((progress - 0.21) / 0.14)
          : spec.id === 'responsable' || spec.id === 'fecha'
            ? smoothStep((progress - 0.25) / 0.15)
            : smoothStep((progress - 0.29) / 0.14);
      const narrativeStart = mobile ? NARRATIVE_MOBILE_POSITIONS[spec.id] : spec.position;
      const recognitionTarget = mobile ? PRODUCT_MOBILE_TARGETS[spec.id].position : STRUCTURE_TARGETS[spec.id].position;
      const sourcePosition: Point3 = [
        lerp(narrativeStart[0], recognitionTarget[0], recognition),
        lerp(narrativeStart[1], recognitionTarget[1], recognition),
        lerp(narrativeStart[2], recognitionTarget[2], recognition),
      ];
      const recognitionRotation: Point3 = [
        lerp(spec.rotation[0], STRUCTURE_TARGETS[spec.id].rotation[0], recognition),
        lerp(spec.rotation[1], STRUCTURE_TARGETS[spec.id].rotation[1], recognition),
        lerp(spec.rotation[2], STRUCTURE_TARGETS[spec.id].rotation[2], recognition),
      ];
      const destination = mobile ? PRODUCT_MOBILE_TARGETS[spec.id] : PRODUCT_TARGETS[spec.id];
      const pointerX = reducedMotion || mobile ? 0 : state.pointer.x;
      const pointerY = reducedMotion || mobile ? 0 : state.pointer.y;
      const proximity = (x: number, y: number) => clamp01(1 - Math.hypot(pointerX - x, pointerY - y) / 1.2);
      const requestPointer = proximity(-0.45, 0.2);
      const documentPointer = proximity(0.42, 0.18);
      const actionPointer = proximity(0.05, -0.44);
      const pointerResponse = (spec.id === 'solicitud'
        ? requestPointer
        : spec.id === 'documento'
          ? Math.max(documentPointer, requestPointer * 0.7)
          : spec.id === 'accion'
            ? actionPointer
            : 0) * narrativeConvergence;
      const pointerDepth = spec.id === 'solicitud' ? 0.026 : spec.id === 'documento' ? 0.014 : spec.id === 'accion' ? 0.021 : 0;
      const pointerScale = spec.id === 'solicitud' ? 0.006 : spec.id === 'documento' ? 0.003 : spec.id === 'accion' ? 0.005 : 0;
      const alignedPosition: Point3 = [
        lerp(sourcePosition[0], destination.position[0], narrativeRoleConvergence) + pointerX * pointerResponse * (spec.id === 'documento' ? 0.009 : 0.012),
        lerp(sourcePosition[1], destination.position[1], narrativeRoleConvergence) + pointerY * pointerResponse * (spec.id === 'documento' ? 0.009 : 0.012),
        lerp(sourcePosition[2], destination.position[2], narrativeRoleConvergence) + pointerResponse * pointerDepth,
      ];
      const roleResponse = spec.id === 'solicitud'
        ? livingFocus
        : spec.id === 'documento'
          ? livingEvidence
          : spec.id === 'responsable' || spec.id === 'fecha'
            ? livingMetadata
            : spec.id === 'accion'
              ? livingReady
              : livingState;
      group.position.set(alignedPosition[0], alignedPosition[1], alignedPosition[2]);
      group.position.y += spec.id === 'solicitud' ? roleResponse * 0.022 : spec.id === 'documento' ? roleResponse * 0.016 : spec.id === 'accion' ? roleResponse * 0.012 : 0;
      group.position.z += spec.id === 'solicitud' ? roleResponse * 0.028 : spec.id === 'documento' ? roleResponse * 0.02 : spec.id === 'accion' ? roleResponse * 0.018 : 0;
      group.rotation.x = lerp(recognitionRotation[0], destination.rotation[0], narrativeRoleConvergence);
      group.rotation.y = lerp(recognitionRotation[1], destination.rotation[1], narrativeRoleConvergence);
      group.rotation.z = lerp(recognitionRotation[2], destination.rotation[2], narrativeRoleConvergence);
      const scale = lerp(1, destination.scale, narrativeRoleConvergence);
      group.scale.setScalar(scale * (1 + roleResponse * 0.008 + pointerResponse * pointerScale));
      return;
    }
    if (productMode) {
      const source = STRUCTURE_TARGETS[spec.id];
      const destination = mobile ? PRODUCT_MOBILE_TARGETS[spec.id] : PRODUCT_TARGETS[spec.id];
      const pointerX = reducedMotion || mobile ? 0 : state.pointer.x;
      const pointerY = reducedMotion || mobile ? 0 : state.pointer.y;
      const proximity = (x: number, y: number) => clamp01(1 - Math.hypot(pointerX - x, pointerY - y) / 1.2);
      const requestPointer = proximity(-0.45, 0.2);
      const documentPointer = proximity(0.42, 0.18);
      const actionPointer = proximity(0.05, -0.44);
      const pointerResponse = spec.id === 'solicitud'
        ? requestPointer
        : spec.id === 'documento'
          ? Math.max(documentPointer, requestPointer * 0.7)
          : spec.id === 'accion'
            ? actionPointer
            : 0;
      const pointerDepth = spec.id === 'solicitud'
        ? 0.026
        : spec.id === 'documento'
          ? 0.014
          : spec.id === 'accion'
            ? 0.021
            : 0;
      const pointerScale = spec.id === 'solicitud'
        ? 0.006
        : spec.id === 'documento'
          ? 0.003
          : spec.id === 'accion'
            ? 0.005
            : 0;
      const alignedPosition: Point3 = [
        lerp(source.position[0], destination.position[0], productLanding) + pointerX * pointerResponse * (spec.id === 'documento' ? 0.009 : 0.012),
        lerp(source.position[1], destination.position[1], productLanding) + pointerY * pointerResponse * (spec.id === 'documento' ? 0.009 : 0.012),
        lerp(source.position[2], destination.position[2], productLanding * 0.82 + productAlignment * 0.18) + pointerResponse * pointerDepth,
      ];
      const roleResponse = spec.id === 'solicitud'
        ? livingFocus
        : spec.id === 'documento'
          ? livingEvidence
          : spec.id === 'responsable' || spec.id === 'fecha'
            ? livingMetadata
            : spec.id === 'accion'
              ? livingReady
              : livingState;
      const semanticLift = spec.id === 'solicitud'
        ? roleResponse * 0.022
        : spec.id === 'documento'
          ? roleResponse * 0.016
          : spec.id === 'accion'
            ? roleResponse * 0.012
            : 0;
      group.position.set(alignedPosition[0], alignedPosition[1], alignedPosition[2]);
      group.position.y += semanticLift;
      group.position.z += spec.id === 'solicitud'
        ? roleResponse * 0.028
        : spec.id === 'documento'
          ? roleResponse * 0.02
          : spec.id === 'accion'
            ? roleResponse * 0.018
            : 0;
      group.rotation.x = lerp(source.rotation[0], destination.rotation[0], productLanding);
      group.rotation.y = lerp(source.rotation[1], destination.rotation[1], productLanding);
      group.rotation.z = lerp(source.rotation[2], destination.rotation[2], productLanding);
      const scale = lerp(1, destination.scale, productAlignment);
      group.scale.setScalar(scale * (1 + roleResponse * 0.008 + pointerResponse * pointerScale));
      return;
    }
    const eventPosition = spec.id === 'documento'
      ? [lerp(startPosition[0], spec.position[0], documentCross), lerp(startPosition[1], spec.position[1], documentCross), lerp(startPosition[2], spec.position[2], documentCross)] as Point3
      : spec.position;
    const eventX = spec.id === 'solicitud' ? eventReveal * 0.62 : 0;
    const settleX = spec.id === 'solicitud' ? settling * 0.04 : spec.id === 'accion' ? settling * -0.04 : 0;
    const mobilePosition = mobile && spec.id === 'documento' ? [1.8, -1.8, -1.12] as Point3 : eventPosition;
    const responsibleLift = spec.id === 'responsable' ? understanding * 0.12 : 0;
    const v4aPosition: Point3 = [
      mobilePosition[0] + eventX + settleX + (spec.id === 'responsable' ? understanding * 0.1 : 0),
      mobilePosition[1] + responsibleLift,
      mobilePosition[2] + (spec.id === 'responsable' ? understanding * 0.18 : 0),
    ];
    const target = STRUCTURE_TARGETS[spec.id];
    const amount = mobile && spec.id === 'documento' ? 0 : structureAmount;
    group.position.x = lerp(v4aPosition[0], target.position[0], amount);
    group.position.y = lerp(v4aPosition[1], target.position[1], amount) + drift;
    group.position.z = lerp(v4aPosition[2], target.position[2], amount);
    group.rotation.x = lerp(spec.rotation[0] + (spec.id === 'documento' ? understanding * -0.025 : 0), target.rotation[0], amount);
    group.rotation.y = lerp(spec.rotation[1] + (spec.id === 'documento' ? understanding * -0.08 : 0), target.rotation[1], amount);
    group.rotation.z = lerp(spec.rotation[2] + (spec.id === 'solicitud' ? settling * 0.035 : 0), target.rotation[2], amount);
  });

  const livingStateForActor = productMode || narrativeMode
    ? spec.id === 'solicitud' && livingFocus > 0.02
      ? 'focus'
      : spec.id === 'documento' && livingEvidence > 0.02
        ? 'evidence'
        : (spec.id === 'responsable' || spec.id === 'fecha') && livingMetadata > 0.02
          ? 'metadata'
          : spec.id === 'accion' && livingReady > 0.02
            ? 'ready'
            : spec.id === 'estado' && livingState > 0.02
              ? 'state'
              : null
    : null;
  const livingProgress = productMode || narrativeMode
    ? spec.id === 'solicitud'
      ? livingFocus
      : spec.id === 'documento'
        ? livingEvidence
        : (spec.id === 'responsable' || spec.id === 'fecha')
          ? livingMetadata
          : spec.id === 'accion'
            ? livingReady
            : livingState
    : 0;
  const productAppearance = productMode || (narrativeMode && narrativeProductProgress > 0.55);

  const style = useMemo<CSSProperties>(() => ({
    opacity: renderedOpacity,
    '--v4e-state-progress': livingProgress,
  } as CSSProperties), [livingProgress, renderedOpacity]);

  return (
    <group ref={groupRef} position={initialPosition} rotation={initialRotation}>
      {spec.id === 'documento' ? (
        <mesh position={[0, 0, -0.015]}>
          <planeGeometry args={spec.size} />
          <meshBasicMaterial color="#ece9df" transparent opacity={renderedOpacity * (productAppearance ? 0.64 : 0.86)} depthWrite />
        </mesh>
      ) : null}
      <Html
        center
        transform
        distanceFactor={7.1}
        position={[0, 0, 0.04]}
        style={style}
        zIndexRange={spec.depth === 'near' ? [30, 0] : spec.depth === 'mid' ? [20, 0] : [10, 0]}
      >
        <ActorSurface id={spec.id} referenceReveal={productAppearance ? 1 : referenceReveal} productMode={productAppearance} livingState={livingStateForActor} />
      </Html>
    </group>
  );
}

function StructuralClue({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const reveal = smoothStep((progress - 0.58) / 0.18);
  const structureProgress = smoothStep((progress - 0.76) / 0.2);
  const clueOpacity = reducedMotion ? (progress > 0.64 ? 0.3 : 0.035) : lerp(0.035, 0.34, reveal);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    group.position.x = lerp(0.12, 1.22, structureProgress);
    group.position.y = lerp(0.5, 0.41, structureProgress);
    group.position.z = lerp(-0.02, 0.22, structureProgress);
    group.rotation.y = lerp(Math.PI * 0.49, Math.PI * 0.03, reveal);
    group.rotation.z = lerp(-0.11, -0.025, structureProgress);
    group.scale.x = lerp(0.12, 0.64, reveal) + structureProgress * 0.12;
  });

  return (
    <group ref={groupRef} position={[0.12, 0.5, -0.02]} rotation={[0.08, Math.PI * 0.49, -0.11]}>
      <mesh>
        <boxGeometry args={[1.24, 0.014, 0.02]} />
        <meshBasicMaterial
          color="#05b19b"
          transparent
          opacity={clueOpacity}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.6, -0.04, 0]}>
        <boxGeometry args={[0.022, 0.18, 0.028]} />
        <meshBasicMaterial color="#05b19b" transparent opacity={clueOpacity} depthWrite={false} />
      </mesh>
    </group>
  );
}

function StructureAccent({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const reveal = smoothStep((progress - 0.85) / 0.11);
  const opacity = reducedMotion ? (progress > 0.9 ? 0.25 : 0.02) : lerp(0.02, 0.25, reveal);

  return (
    <group position={[1.62, -1.78, -0.12]} rotation={[0.06, 0.03, -0.025]} scale={[lerp(0.2, 0.68, reveal), 1, 1]}>
      <mesh>
        <boxGeometry args={[0.86, 0.012, 0.018]} />
        <meshBasicMaterial color="#05b19b" transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <mesh position={[0.4, -0.035, 0]}>
        <boxGeometry args={[0.018, 0.13, 0.024]} />
        <meshBasicMaterial color="#05b19b" transparent opacity={opacity} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ProductSurface({ progress, reducedMotion, mobile, narrativeMode = false }: { progress: number; reducedMotion: boolean; mobile: boolean; narrativeMode?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const rootReveal = narrativeMode ? smoothStep((progress - 0.62) / 0.2) : smoothStep((progress - 0.08) / 0.72);
  const edgeReveal = narrativeMode ? smoothStep((progress - 0.42) / 0.2) : rootReveal;
  const evidenceReveal = smoothStep((progress - 0.26) / 0.22);
  const metadataReveal = smoothStep((progress - 0.4) / 0.2);
  const actionReveal = smoothStep((progress - 0.54) / 0.18);
  const rootOpacity = reducedMotion
    ? (narrativeMode ? (progress > 0.68 ? (mobile ? 0.2 : 0.22) : 0.004) : progress > 0.28 ? (mobile ? 0.2 : 0.22) : 0.02)
    : lerp(narrativeMode ? 0.004 : 0.012, mobile ? 0.2 : 0.22, rootReveal);
  const evidenceOpacity = reducedMotion ? (progress > 0.46 ? 0.045 : 0.015) : lerp(0.012, 0.045, evidenceReveal);
  const metadataOpacity = reducedMotion ? (progress > 0.58 ? 0.075 : 0.02) : lerp(0.02, 0.075, metadataReveal);
  const actionOpacity = reducedMotion ? (progress > 0.7 ? 0.12 : 0.02) : lerp(0.02, 0.12, actionReveal);
  const edgeOpacity = reducedMotion
    ? (narrativeMode ? (progress > 0.62 ? 0.46 : 0.035) : progress > 0.28 ? 0.46 : 0.035)
    : lerp(0.035, 0.46, edgeReveal);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const arrival = narrativeMode ? smoothStep((progress - 0.62) / 0.2) : smoothStep((progress - 0.08) / 0.72);
    group.rotation.y = lerp(mobile ? 0.035 : 0.07, mobile ? 0.008 : 0.018, arrival);
    group.rotation.z = lerp(-0.018, 0.002, arrival);
  });

  const rootSize: [number, number] = mobile ? [2.28, 3.02] : [4.72, 2.78];
  const rootPosition: Point3 = mobile ? [0, 0, 0] : [1.05, 0.04, 0];
  const evidencePosition: Point3 = mobile ? [0.78, 0.98, 0.032] : [1.87, 0.78, 0.032];
  const evidenceSize: [number, number] = mobile ? [0.94, 1.55] : [1.6, 1.96];
  const metadataPosition: Point3 = mobile ? [0, -0.08, 0.034] : [1.35, -0.14, 0.034];
  const metadataSize: [number, number] = mobile ? [2.02, 0.56] : [3.86, 0.66];
  const actionPosition: Point3 = mobile ? [0, -0.9, 0.038] : [1.34, -0.78, 0.038];
  const actionSize: [number, number] = mobile ? [2.02, 0.76] : [3.58, 0.84];

  const outline = (key: string, position: Point3, size: [number, number], opacity: number, color = '#55736f') => {
    const [width, height] = size;
    const thickness = 0.012;
    return (
      <group key={key} position={position}>
        <mesh position={[0, height / 2, 0]}>
          <boxGeometry args={[width, thickness, 0.018]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
        </mesh>
        <mesh position={[0, -height / 2, 0]}>
          <boxGeometry args={[width, thickness, 0.018]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.72} depthWrite={false} />
        </mesh>
        <mesh position={[-width / 2, 0, 0]}>
          <boxGeometry args={[thickness, height, 0.018]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.72} depthWrite={false} />
        </mesh>
        <mesh position={[width / 2, 0, 0]}>
          <boxGeometry args={[thickness, height, 0.018]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.72} depthWrite={false} />
        </mesh>
      </group>
    );
  };

  return (
    <group ref={groupRef} position={mobile ? [0, 0.02, -0.34] : [0.15, 0.02, -0.34]} rotation={[0.02, 0.07, -0.018]} scale={narrativeMode ? [1, 1, 1] : [lerp(0.9, 1, rootReveal), lerp(0.9, 1, rootReveal), 1]}>
      <mesh position={rootPosition}>
        <planeGeometry args={rootSize} />
        <meshBasicMaterial color="#5f817b" transparent opacity={rootOpacity} depthWrite />
      </mesh>
      <mesh position={[rootPosition[0], rootPosition[1] + rootSize[1] / 2 - 0.16, 0.02]}>
        <boxGeometry args={[rootSize[0] * 0.84, 0.012, 0.018]} />
        <meshBasicMaterial color="#05b19b" transparent opacity={edgeOpacity * 0.7} depthWrite={false} />
      </mesh>
      <mesh position={[rootPosition[0] - rootSize[0] / 2 + 0.11, rootPosition[1], 0.02]}>
        <boxGeometry args={[0.012, rootSize[1] * 0.78, 0.018]} />
        <meshBasicMaterial color="#05b19b" transparent opacity={edgeOpacity * 0.58} depthWrite={false} />
      </mesh>
      <mesh position={evidencePosition}>
        <planeGeometry args={evidenceSize} />
        <meshBasicMaterial color="#17383b" transparent opacity={evidenceOpacity} depthWrite={false} />
      </mesh>
      {outline('evidence-well', evidencePosition, evidenceSize, edgeOpacity * 0.72, '#7fa9a0')}
      <mesh position={[metadataPosition[0], metadataPosition[1], 0.02]}>
        <planeGeometry args={[metadataSize[0], metadataSize[1] * 0.82]} />
        <meshBasicMaterial color="#21484a" transparent opacity={metadataOpacity} depthWrite={false} />
      </mesh>
      {outline('metadata-region', metadataPosition, metadataSize, edgeOpacity * 0.52)}
      <mesh position={[actionPosition[0], actionPosition[1], 0.022]}>
        <planeGeometry args={[actionSize[0], actionSize[1] * 0.82]} />
        <meshBasicMaterial color="#18484a" transparent opacity={actionOpacity * 0.6} depthWrite={false} />
      </mesh>
      {outline('action-region', actionPosition, actionSize, actionOpacity, '#05b19b')}
    </group>
  );
}

function CameraDirector({ progress, reducedMotion, mobile, reviewAngle, productMode = false, narrativeMode = false }: { progress: number; reducedMotion: boolean; mobile: boolean; reviewAngle: boolean; productMode?: boolean; narrativeMode?: boolean }) {
  const { camera } = useThree();

  useFrame((state) => {
    if (narrativeMode) {
      const productArrival = smoothStep((progress - 0.75) / 0.25);
      const pointerX = reducedMotion ? 0 : state.pointer.x * 0.045;
      const pointerY = reducedMotion ? 0 : state.pointer.y * 0.025;
      const angleOffset = reviewAngle ? 0.28 : 0;
      const cameraX = mobile ? lerp(0, 0.12, productArrival) : lerp(0, 0.48, productArrival) + angleOffset;
      const cameraY = mobile ? lerp(0.05, 0.08, productArrival) : lerp(0.04, 0.07, productArrival);
      const cameraZ = mobile ? lerp(8.6, 8.05, productArrival) : lerp(8.65, 7.72, productArrival);
      camera.position.set(cameraX + pointerX, cameraY + pointerY, cameraZ);

      const targetX = mobile ? lerp(0, 0.05, productArrival) : lerp(0, 0.42, productArrival);
      const targetY = mobile ? 0.05 : lerp(0, 0.02, productArrival);
      camera.lookAt(targetX - pointerX * 0.2, targetY - pointerY * 0.15, -0.22);
      return;
    }

    if (productMode) {
      const planeArrival = smoothStep((progress - 0.1) / 0.7);
      const pointerX = reducedMotion ? 0 : state.pointer.x * 0.045;
      const pointerY = reducedMotion ? 0 : state.pointer.y * 0.025;
      const angleOffset = reviewAngle ? 0.28 : 0;
      const cameraX = mobile ? lerp(0.18, 0.12, planeArrival) : lerp(0.94, 0.48, planeArrival) + angleOffset;
      const cameraY = mobile ? lerp(0.12, 0.08, planeArrival) : lerp(0.16, 0.07, planeArrival);
      const cameraZ = mobile ? lerp(8.2, 8.05, planeArrival) : lerp(8.05, 7.72, planeArrival);
      camera.position.set(cameraX + pointerX, cameraY + pointerY, cameraZ);

      const targetX = mobile ? 0.05 : lerp(0.2, 0.42, planeArrival);
      const targetY = mobile ? 0.05 : lerp(0.08, 0.02, planeArrival);
      camera.lookAt(targetX - pointerX * 0.2, targetY - pointerY * 0.15, -0.22);
      return;
    }

    const eventTravel = smoothStep((progress - 0.08) / 0.22);
    const understanding = smoothStep((progress - 0.46) / 0.3);
    const structureProgress = smoothStep((progress - 0.76) / 0.2);
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.075;
    const pointerY = reducedMotion ? 0 : state.pointer.y * 0.045;
    const angleOffset = reviewAngle ? 0.16 : 0;
    const cameraX = mobile ? lerp(0, 0.18, understanding) : lerp(0, 0.88, understanding) + structureProgress * 0.06 + angleOffset;
    const cameraY = mobile ? lerp(0.05, 0.12, understanding) : lerp(0.04, 0.16, understanding) + structureProgress * 0.025;
    const cameraZ = mobile ? lerp(8.6, 8.2, eventTravel) : lerp(8.65, 8.05, eventTravel) - understanding * 0.78 - structureProgress * 0.08;
    camera.position.set(cameraX + pointerX, cameraY + pointerY, cameraZ);

    const targetX = mobile ? lerp(0, 0.05, understanding) : lerp(0, 0.2, understanding) + structureProgress * 0.06;
    const targetY = mobile ? 0.05 : lerp(0, 0.08, understanding) - structureProgress * 0.015;
    camera.lookAt(targetX - pointerX * 0.25, targetY - pointerY * 0.2, 0.05);
  });

  return null;
}

function SpatialScene({ progress, reducedMotion, mobile, reviewAngle }: { progress: number; reducedMotion: boolean; mobile: boolean; reviewAngle: boolean }) {
  return (
    <>
      <CameraDirector progress={progress} reducedMotion={reducedMotion} mobile={mobile} reviewAngle={reviewAngle} />
      <ambientLight intensity={0.9} />
      <StructuralClue progress={progress} reducedMotion={reducedMotion} />
      <StructureAccent progress={progress} reducedMotion={reducedMotion} />
      {ACTORS.map((spec) => (
        <Actor key={spec.id} spec={spec} progress={progress} reducedMotion={reducedMotion} mobile={mobile} />
      ))}
    </>
  );
}

function ProductScene({ progress, reducedMotion, mobile, reviewAngle }: { progress: number; reducedMotion: boolean; mobile: boolean; reviewAngle: boolean }) {
  return (
    <>
      <CameraDirector progress={progress} reducedMotion={reducedMotion} mobile={mobile} reviewAngle={reviewAngle} productMode />
      <ambientLight intensity={0.9} />
      <ProductSurface progress={progress} reducedMotion={reducedMotion} mobile={mobile} />
      {ACTORS.map((spec) => (
        <Actor key={spec.id} spec={spec} progress={progress} reducedMotion={reducedMotion} mobile={mobile} productMode />
      ))}
    </>
  );
}

function NarrativeScene({ progress, reducedMotion, mobile, reviewAngle }: { progress: number; reducedMotion: boolean; mobile: boolean; reviewAngle: boolean }) {
  const structureProgress = clamp01((progress - 0.18) / 0.5);
  const productProgress = clamp01((progress - 0.35) / 0.47);

  return (
    <>
      <CameraDirector progress={progress} reducedMotion={reducedMotion} mobile={mobile} reviewAngle={reviewAngle} narrativeMode />
      <ambientLight intensity={0.9} />
      <StructuralClue progress={structureProgress} reducedMotion={reducedMotion} />
      <StructureAccent progress={structureProgress} reducedMotion={reducedMotion} />
      <ProductSurface progress={productProgress} reducedMotion={reducedMotion} mobile={mobile} narrativeMode />
      {ACTORS.map((spec) => (
        <Actor key={spec.id} spec={spec} progress={progress} reducedMotion={reducedMotion} mobile={mobile} narrativeMode />
      ))}
    </>
  );
}

export default function SpatialCanvas({ progress, reducedMotion, mobile, reviewAngle, productMode = false, narrativeMode = false }: { progress: number; reducedMotion: boolean; mobile: boolean; reviewAngle: boolean; productMode?: boolean; narrativeMode?: boolean }) {
  return (
    <Canvas
      className={narrativeMode ? 'v4f-canvas' : productMode ? 'v4c-canvas' : 'v4a-canvas'}
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 8.65], fov: mobile ? 44 : 42, near: 0.1, far: 30 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      frameloop="always"
    >
      {narrativeMode ? (
        <NarrativeScene progress={progress} reducedMotion={reducedMotion} mobile={mobile} reviewAngle={reviewAngle} />
      ) : productMode ? (
        <ProductScene progress={progress} reducedMotion={reducedMotion} mobile={mobile} reviewAngle={reviewAngle} />
      ) : (
        <SpatialScene progress={progress} reducedMotion={reducedMotion} mobile={mobile} reviewAngle={reviewAngle} />
      )}
    </Canvas>
  );
}
