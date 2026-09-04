"use client";

import {
  motion,
  type MotionValue,
  useTransform,
} from "motion/react";

type SpatialOperatingSystemProps = {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
};

export function SpatialOperatingSystem({
  progress,
  reducedMotion = false,
}: SpatialOperatingSystemProps) {
  const cameraRotateX = useTransform(progress, [0, 0.28, 0.58, 0.78, 1], [7, 5.5, 2.4, 0.4, 0]);
  const cameraRotateY = useTransform(progress, [0, 0.25, 0.55, 0.78, 1], [-13, -10, -5.5, -0.8, 0]);
  const cameraRotateZ = useTransform(progress, [0, 0.36, 0.7, 1], [-2.2, -1.5, -0.4, 0]);
  const cameraScale = useTransform(progress, [0, 0.2, 0.58, 0.82, 1], [0.88, 0.92, 0.985, 1.015, 1.02]);
  const cameraX = useTransform(progress, [0, 0.35, 0.7, 1], [72, 46, 18, 0]);
  const cameraY = useTransform(progress, [0, 0.42, 0.76, 1], [24, 12, 2, 0]);

  const requestRotateY = useTransform(progress, [0, 0.25, 0.56, 0.78, 1], [-26, -22, -12, -2.5, 0]);
  const requestZ = useTransform(progress, [0, 0.4, 0.78, 1], [54, 42, 12, 0]);

  const evidenceRotateY = useTransform(progress, [0, 0.24, 0.55, 0.78, 1], [52, 46, 29, 7, 0]);
  const evidenceZ = useTransform(progress, [0, 0.35, 0.78, 1], [92, 76, 18, 0]);

  const contextRotateX = useTransform(progress, [0, 0.26, 0.56, 0.78, 1], [-58, -49, -29, -7, 0]);
  const contextZ = useTransform(progress, [0, 0.35, 0.78, 1], [72, 60, 16, 0]);

  const actionRotateX = useTransform(progress, [0, 0.28, 0.56, 0.78, 1], [61, 53, 31, 8, 0]);
  const actionZ = useTransform(progress, [0, 0.35, 0.78, 1], [108, 88, 22, 0]);

  const railOpacity = useTransform(progress, [0, 0.18, 0.46, 0.72, 1], [0.14, 0.28, 0.7, 0.88, 0.4]);
  const rootOpacity = useTransform(progress, [0, 0.42, 0.66, 0.82, 1], [0.06, 0.1, 0.24, 0.72, 1]);
  const rootScale = useTransform(progress, [0, 0.7, 0.86, 1], [0.98, 0.99, 1, 1]);
  const seamOpacity = useTransform(progress, [0, 0.35, 0.7, 0.9, 1], [0.25, 0.46, 0.68, 0.42, 0.18]);
  const accentProgress = useTransform(progress, [0.18, 0.48, 0.74, 0.88], [0.06, 0.36, 0.82, 1]);
  const accentOpacity = useTransform(progress, [0, 0.16, 0.42, 0.76, 1], [0.16, 0.22, 0.78, 0.95, 0.72]);

  const requestFocus = useTransform(progress, [0.2, 0.34, 0.56], [0.6, 1, 0.82]);
  const evidenceFocus = useTransform(progress, [0.28, 0.43, 0.66], [0.45, 1, 0.78]);
  const metadataFocus = useTransform(progress, [0.38, 0.56, 0.77], [0.42, 0.88, 0.72]);
  const revisionFocus = useTransform(progress, [0.55, 0.73, 0.92, 1], [0.42, 0.78, 1, 1]);
  const pendingFocus = useTransform(progress, [0.55, 0.78, 1], [0.32, 0.52, 0.5]);

  const clarityOpacity = useTransform(progress, [0.84, 0.91, 0.97, 1], [0, 0.08, 0.56, 1]);
  const clarityScale = useTransform(progress, [0.84, 0.91, 0.97, 1], [0.7, 0.82, 1.7, 4.5]);
  const productLift = useTransform(progress, [0.74, 0.9, 1], [0, 4, 7]);

  const staticStyle = reducedMotion
    ? {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        x: 0,
        y: 0,
      }
    : {
        rotateX: cameraRotateX,
        rotateY: cameraRotateY,
        rotateZ: cameraRotateZ,
        scale: cameraScale,
        x: cameraX,
        y: cameraY,
      };

  return (
    <div className={`sos-viewport${reducedMotion ? " sos-viewport--reduced" : ""}`} aria-hidden="true">
      <motion.div className="sos-camera" style={staticStyle}>
        <motion.div
          className="sos-clarity-field"
          style={reducedMotion ? { opacity: 0 } : { opacity: clarityOpacity, scale: clarityScale }}
        />

        <motion.div
          className="sos-root-shadow"
          style={reducedMotion ? { opacity: 0.84, scale: 1 } : { opacity: rootOpacity, scale: rootScale, y: productLift }}
        />

        <div className="sos-manifold">
          <motion.div
            className="sos-facet sos-facet--request"
            style={reducedMotion ? undefined : { rotateY: requestRotateY, z: requestZ }}
          >
            <div className="sos-facet__grain" />
            <div className="sos-actor sos-actor--request sos-interactive">
              <div className="sos-actor__topline">
                <span className="sos-dot" />
                <span>Solicitud</span>
                <strong>2481</strong>
              </div>
              <p>Necesito revisar…</p>
              <div className="sos-actor__trace"><i /><i /><i /></div>
            </div>
          </motion.div>

          <motion.div
            className="sos-facet sos-facet--evidence"
            style={reducedMotion ? undefined : { rotateY: evidenceRotateY, z: evidenceZ }}
          >
            <div className="sos-facet__grain" />
            <motion.div className="sos-evidence sos-interactive" style={reducedMotion ? { opacity: 1 } : { opacity: evidenceFocus }}>
              <div className="sos-evidence__label">Documento</div>
              <div className="sos-document">
                <div className="sos-document__fold" />
                <span className="sos-document__line sos-document__line--1" />
                <span className="sos-document__line sos-document__line--2" />
                <span className="sos-document__body" />
                <strong>2481</strong>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="sos-facet sos-facet--context"
            style={reducedMotion ? undefined : { rotateX: contextRotateX, z: contextZ }}
          >
            <div className="sos-facet__grain" />
            <motion.div className="sos-context" style={reducedMotion ? { opacity: 1 } : { opacity: metadataFocus }}>
              <div className="sos-context__owner">
                <span className="sos-owner-icon"><i /></span>
                <div><small>Contexto</small><strong>Responsable</strong></div>
              </div>
              <div className="sos-context__date">
                <small>Fecha</small>
                <strong>18 SEP</strong>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="sos-facet sos-facet--action"
            style={reducedMotion ? undefined : { rotateX: actionRotateX, z: actionZ }}
          >
            <div className="sos-facet__grain" />
            <div className="sos-actions">
              <motion.div className="sos-action sos-action--review sos-interactive" style={reducedMotion ? { opacity: 1 } : { opacity: revisionFocus }}>
                <span className="sos-action__mark"><i /></span>
                <div><small>Acción</small><strong>Revisión</strong></div>
                <span className="sos-action__arrow">↗</span>
              </motion.div>
              <motion.div className="sos-action sos-action--pending" style={reducedMotion ? { opacity: 0.56 } : { opacity: pendingFocus }}>
                <span className="sos-status-dot" />
                <div><small>Estado</small><strong>Pendiente</strong></div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="sos-seam sos-seam--vertical" style={reducedMotion ? { opacity: 0.18 } : { opacity: seamOpacity }} />
          <motion.div className="sos-seam sos-seam--horizontal" style={reducedMotion ? { opacity: 0.18 } : { opacity: seamOpacity }} />

          <motion.div className="sos-rail sos-rail--one" style={reducedMotion ? { opacity: 0.28 } : { opacity: railOpacity }} />
          <motion.div className="sos-rail sos-rail--two" style={reducedMotion ? { opacity: 0.22 } : { opacity: railOpacity }} />
          <motion.div
            className="sos-accent-path"
            style={reducedMotion ? { opacity: 0.62, scaleX: 1 } : { opacity: accentOpacity, scaleX: accentProgress }}
          />

          <motion.div className="sos-focus-ring sos-focus-ring--request" style={reducedMotion ? { opacity: 0.3 } : { opacity: requestFocus }} />
        </div>

        <div className="sos-depth-label sos-depth-label--a">OPERACIÓN</div>
        <div className="sos-depth-label sos-depth-label--b">ESTRUCTURA</div>
        <div className="sos-depth-label sos-depth-label--c">SOFTWARE</div>
      </motion.div>
    </div>
  );
}
