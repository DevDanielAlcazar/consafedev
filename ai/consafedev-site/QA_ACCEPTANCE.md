# ConSafeDev — Build 01 V2 Acceptance Criteria

## Gate
Do not continue to later homepage sections until Build 01 V2 is explicitly approved.

## A. Static Frame Gate
Pause at Hero, Fragmentation, Understanding, Product Emergence and Living Product. Every frame must look art-directed.

FAIL if any resembles generic SaaS, DevOps/ITSM, network topology, admin dashboard template or random card cluster.

## B. Hero
- [ ] Approved copy exact.
- [ ] Custom software is clear.
- [ ] Visual environment is spatial, not a right-side panel.
- [ ] Operational fragments exist before complete UI.
- [ ] Teal restrained.
- [ ] No fake KPI/telemetry.
- [ ] No stock hero image.
- [ ] No completed dashboard centerpiece.

## C. Narrative
- [ ] Fragmentation perceptible.
- [ ] Understanding shown mainly by reduction/clarification.
- [ ] Architecture shown as business/product structure, not infrastructure topology.
- [ ] Product emerges from existing fragments.
- [ ] Living Product shows input→process→result.
- [ ] Engineering→Clarity begins without hard cut.
- [ ] No explicit phase stepper required.

## D. Transformation Test
At least three transformations change semantic meaning.

FAIL if most transformation is boxes moving, lines connecting, colors/badges changing.

## E. Forbidden patterns
- [ ] No BUS.
- [ ] No PORT labels.
- [ ] No topology map.
- [ ] No observability language.
- [ ] No phase badges.
- [ ] No numbered story stepper.
- [ ] No fake telemetry.
- [ ] No invented metrics.
- [ ] No giant glass panels.
- [ ] No generic Bento replacement.
- [ ] No cyberpunk/neon purple.
- [ ] No AI brain/robot/globe/cube.
- [ ] No random particle field.

## F. Motion
- [ ] Closely linked to user scroll.
- [ ] No scroll hijacking.
- [ ] No catch-up lag.
- [ ] Hero motion restrained.
- [ ] Meaningful fragments visually traceable.
- [ ] No hard timeline snaps.
- [ ] No sticky entry/exit jump.
- [ ] Reduced motion complete.

## G. Responsive
Inspect 375×812, 390×844, 768×1024, 1024×768, 1366×768, 1440×900, 1920×1080 and one viewport below 360px.

Mobile must be recomposed, not compressed desktop.

## H. Accessibility
Semantic headings, visible focus, keyboard CTA, decorative graphics hidden appropriately, meaning not trapped in graphics, strong contrast, motion not gating content, reduced motion honored.

## I. Performance
No obvious ordinary-scroll frame drops, long stalls, layout thrashing, huge blur layers or unnecessary video/WebGL payload.

Production targets remain LCP≤2.5s, INP≤200ms, CLS≤0.1 but must not be claimed until measured.

## J. Engineering
Run `npm run lint` and `npm run build`. Use `npm ci` if clean-environment validation is required. Do not suppress TypeScript errors or upgrade dependencies without authorization.

## K. Human review packet
Provide screenshots of Hero, Fragmentation, Understanding, Product Emergence and Living Product on desktop, plus Hero and Product Emergence on mobile. Provide a short scroll recording if supported.

## L. Completion report
State files changed, test results, deviations, unresolved issues and deployment impact. Expected deployment impact: **None**.
