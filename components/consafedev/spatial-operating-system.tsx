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
  /*
   * Build 02.3 — Structural Reveal
   *
   * Build 02.2 established a causal operational spine. Build 02.3 keeps that
   * logic intact but shifts the signature moment from "drawn relationships"
   * to a physical structural lock: facets compress, material catches light,
   * seams align and the product resolves as one precision object.
   */
  const cameraRotateX = useTransform(progress, [0, 0.28, 0.56, 0.72, 0.84, 1], [5.8, 4.4, 1.9, 0.55, 0, 0]);
  const cameraRotateY = useTransform(progress, [0, 0.25, 0.54, 0.72, 0.84, 1], [-10.5, -8.2, -4.2, -1.2, 0, 0]);
  const cameraRotateZ = useTransform(progress, [0, 0.36, 0.66, 0.82, 1], [-1.4, -1.0, -0.28, 0, 0]);
  const cameraScale = useTransform(progress, [0, 0.2, 0.56, 0.76, 0.86, 1], [0.91, 0.94, 0.992, 1.008, 1.012, 1.012]);
  const cameraX = useTransform(progress, [0, 0.35, 0.66, 0.82, 1], [50, 34, 14, 0, 0]);
  const cameraY = useTransform(progress, [0, 0.42, 0.7, 0.84, 1], [17, 9, 2, 0, 0]);

  /* Keep the folds legible, but never so open that they look detached. */
  const requestRotateY = useTransform(progress, [0, 0.26, 0.56, 0.72, 0.84, 1], [-18, -15, -8.5, -2.4, 0, 0]);
  const requestZ = useTransform(progress, [0, 0.4, 0.7, 0.84, 1], [27, 22, 7, 0, 0]);

  const evidenceRotateY = useTransform(progress, [0, 0.24, 0.55, 0.72, 0.84, 1], [31, 27, 16, 5.5, 0, 0]);
  const evidenceZ = useTransform(progress, [0, 0.35, 0.7, 0.84, 1], [35, 29, 9, 0, 0]);

  const contextRotateX = useTransform(progress, [0, 0.26, 0.56, 0.72, 0.84, 1], [-34, -29, -17, -5.5, 0, 0]);
  const contextZ = useTransform(progress, [0, 0.35, 0.7, 0.84, 1], [30, 25, 8, 0, 0]);

  const actionRotateX = useTransform(progress, [0, 0.28, 0.56, 0.72, 0.84, 1], [36, 31, 18, 5.8, 0, 0]);
  const actionZ = useTransform(progress, [0, 0.35, 0.7, 0.84, 1], [37, 31, 10, 0, 0]);

  const facetBorderColor = useTransform(
    progress,
    [0, 0.56, 0.78, 0.88, 1],
    ["rgba(169, 208, 218, 0.15)", "rgba(169, 208, 218, 0.12)", "rgba(188, 220, 227, 0.17)", "rgba(169, 208, 218, 0.085)", "rgba(169, 208, 218, 0.055)"],
  );

  /* Shared structure is present from frame one and resolves with the facets. */
  const chassisOpacity = useTransform(progress, [0, 0.18, 0.46, 0.74, 0.86, 1], [0.34, 0.5, 0.76, 0.94, 0.82, 0.68]);
  const hingeOpacity = useTransform(progress, [0, 0.22, 0.56, 0.74, 0.88, 1], [0.52, 0.7, 0.86, 0.92, 0.52, 0.28]);
  const jointScale = useTransform(progress, [0, 0.34, 0.72, 0.84, 1], [0.86, 0.96, 1, 0.96, 0.96]);
  const jointOpacity = useTransform(progress, [0, 0.56, 0.74, 0.88, 1], [0.54, 0.5, 0.38, 0.22, 0.16]);

  const rootOpacity = useTransform(progress, [0, 0.42, 0.66, 0.8, 0.9, 1], [0.08, 0.14, 0.3, 0.82, 0.96, 1]);
  const rootScale = useTransform(progress, [0, 0.68, 0.82, 1], [0.982, 0.992, 1, 1]);
  const seamOpacity = useTransform(progress, [0, 0.35, 0.66, 0.78, 0.9, 1], [0.26, 0.48, 0.68, 0.92, 0.46, 0.18]);

  /* Signature moment: a structural lock, not another graphic effect. */
  const materialRevealOpacity = useTransform(progress, [0.56, 0.66, 0.78, 0.88, 0.96, 1], [0, 0.12, 0.68, 0.32, 0.08, 0]);
  const lockFrameOpacity = useTransform(progress, [0.62, 0.72, 0.82, 0.9, 1], [0, 0.16, 0.74, 0.38, 0.1]);
  const lockFrameScale = useTransform(progress, [0.62, 0.82, 1], [0.987, 1, 1]);

  /* Causal relationships. They reveal in sequence instead of orbiting. */
  const requestToEvidence = useTransform(progress, [0.14, 0.31, 0.48], [0.08, 0.58, 1]);
  const requestToContext = useTransform(progress, [0.24, 0.42, 0.58], [0.04, 0.56, 1]);
  const contextToReview = useTransform(progress, [0.45, 0.63, 0.8], [0.04, 0.62, 1]);
  const evidenceToReview = useTransform(progress, [0.5, 0.68, 0.84], [0.03, 0.58, 1]);
  const relationOpacity = useTransform(progress, [0, 0.13, 0.42, 0.72, 0.94, 1], [0.18, 0.3, 0.7, 0.92, 0.66, 0.42]);
  const activeRelationOpacity = useTransform(progress, [0.08, 0.28, 0.52, 0.76, 0.88, 1], [0.26, 0.62, 0.94, 0.86, 0.62, 0.4]);

  const requestFocus = useTransform(progress, [0.18, 0.32, 0.54], [0.58, 1, 0.82]);
  const evidenceFocus = useTransform(progress, [0.27, 0.43, 0.66], [0.5, 1, 0.82]);
  const metadataFocus = useTransform(progress, [0.38, 0.56, 0.77], [0.46, 0.9, 0.74]);
  const revisionFocus = useTransform(progress, [0.54, 0.72, 0.91, 1], [0.46, 0.8, 1, 1]);
  const pendingFocus = useTransform(progress, [0.55, 0.78, 1], [0.32, 0.5, 0.48]);

  const clarityOpacity = useTransform(progress, [0.84, 0.91, 0.97, 1], [0, 0.08, 0.56, 1]);
  const clarityScale = useTransform(progress, [0.84, 0.91, 0.97, 1], [0.7, 0.82, 1.7, 4.5]);
  const productLift = useTransform(progress, [0.72, 0.84, 1], [0, 1.5, 1]);

  const cameraStyle = reducedMotion
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

  const staticPathStyle = { opacity: 0.44, pathLength: 1 };

  return (
    <div className={`sos-viewport${reducedMotion ? " sos-viewport--reduced" : ""}`} aria-hidden="true">
      <motion.div className="sos-camera" style={cameraStyle}>
        <motion.div
          className="sos-clarity-field"
          style={reducedMotion ? { opacity: 0 } : { opacity: clarityOpacity, scale: clarityScale }}
        />

        <motion.div
          className="sos-root-shadow"
          style={reducedMotion ? { opacity: 0.88, scale: 1 } : { opacity: rootOpacity, scale: rootScale, y: productLift }}
        />

        <div className="sos-manifold">
          <motion.div
            className="sos-chassis"
            style={reducedMotion ? { opacity: 0.66 } : { opacity: chassisOpacity }}
          >
            <div className="sos-chassis__perimeter" />
            <div className="sos-chassis__rib sos-chassis__rib--vertical" />
            <div className="sos-chassis__rib sos-chassis__rib--horizontal" />
            <motion.div
              className="sos-joint"
              style={reducedMotion ? { scale: 1, opacity: 0.18 } : { scale: jointScale, opacity: jointOpacity }}
            >
              <i /><i /><i /><i />
            </motion.div>
          </motion.div>

          <motion.div
            className="sos-facet sos-facet--request"
            style={reducedMotion ? { borderColor: "rgba(169, 208, 218, 0.07)" } : { rotateY: requestRotateY, z: requestZ, borderColor: facetBorderColor }}
          >
            <div className="sos-facet__grain" />
            <div className="sos-facet__dock sos-facet__dock--request" />
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
            style={reducedMotion ? { borderColor: "rgba(169, 208, 218, 0.07)" } : { rotateY: evidenceRotateY, z: evidenceZ, borderColor: facetBorderColor }}
          >
            <div className="sos-facet__grain" />
            <div className="sos-facet__dock sos-facet__dock--evidence" />
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
            style={reducedMotion ? { borderColor: "rgba(169, 208, 218, 0.07)" } : { rotateX: contextRotateX, z: contextZ, borderColor: facetBorderColor }}
          >
            <div className="sos-facet__grain" />
            <div className="sos-facet__dock sos-facet__dock--context" />
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
            style={reducedMotion ? { borderColor: "rgba(169, 208, 218, 0.07)" } : { rotateX: actionRotateX, z: actionZ, borderColor: facetBorderColor }}
          >
            <div className="sos-facet__grain" />
            <div className="sos-facet__dock sos-facet__dock--action" />
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

          {/*
            A single SVG relationship layer explains why the surfaces belong
            together. No arrows, no decorative circuitry, no autonomous pulse.
            Each path is revealed by the same narrative scroll progress.
          */}
          <svg className="sos-relations" viewBox="0 0 1000 553" preserveAspectRatio="none">
            <g className="sos-relations__groove">
              <path d="M260 154 C360 133 680 133 805 159" />
              <path d="M260 154 C196 210 196 363 275 425" />
              <path d="M275 425 C398 480 632 478 785 410" />
              <path d="M805 159 C918 221 916 349 785 410" />
            </g>
            <g className="sos-relations__active">
              <motion.path
                d="M260 154 C360 133 680 133 805 159"
                style={reducedMotion ? staticPathStyle : { opacity: activeRelationOpacity, pathLength: requestToEvidence }}
              />
              <motion.path
                d="M260 154 C196 210 196 363 275 425"
                style={reducedMotion ? staticPathStyle : { opacity: relationOpacity, pathLength: requestToContext }}
              />
              <motion.path
                d="M275 425 C398 480 632 478 785 410"
                style={reducedMotion ? staticPathStyle : { opacity: activeRelationOpacity, pathLength: contextToReview }}
              />
              <motion.path
                d="M805 159 C918 221 916 349 785 410"
                style={reducedMotion ? staticPathStyle : { opacity: relationOpacity, pathLength: evidenceToReview }}
              />
            </g>
          </svg>

          <motion.div
            className="sos-material-reveal"
            style={reducedMotion ? { opacity: 0.08 } : { opacity: materialRevealOpacity }}
          />
          <motion.div
            className="sos-lock-frame"
            style={reducedMotion ? { opacity: 0.16, scale: 1 } : { opacity: lockFrameOpacity, scale: lockFrameScale }}
          >
            <i /><i /><i /><i />
          </motion.div>

          <motion.div className="sos-seam sos-seam--vertical" style={reducedMotion ? { opacity: 0.26 } : { opacity: seamOpacity }} />
          <motion.div className="sos-seam sos-seam--horizontal" style={reducedMotion ? { opacity: 0.26 } : { opacity: seamOpacity }} />

          <motion.div className="sos-hinge sos-hinge--vt" style={reducedMotion ? { opacity: 0.5 } : { opacity: hingeOpacity }} />
          <motion.div className="sos-hinge sos-hinge--vb" style={reducedMotion ? { opacity: 0.5 } : { opacity: hingeOpacity }} />
          <motion.div className="sos-hinge sos-hinge--hl" style={reducedMotion ? { opacity: 0.5 } : { opacity: hingeOpacity }} />
          <motion.div className="sos-hinge sos-hinge--hr" style={reducedMotion ? { opacity: 0.5 } : { opacity: hingeOpacity }} />

          <motion.div className="sos-focus-ring sos-focus-ring--request" style={reducedMotion ? { opacity: 0.3 } : { opacity: requestFocus }} />
        </div>

        <div className="sos-depth-label sos-depth-label--a">OPERACIÓN</div>
        <div className="sos-depth-label sos-depth-label--b">ESTRUCTURA</div>
        <div className="sos-depth-label sos-depth-label--c">SOFTWARE</div>
      </motion.div>
    </div>
  );
}
