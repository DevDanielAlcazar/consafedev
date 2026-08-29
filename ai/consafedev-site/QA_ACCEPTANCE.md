# ConSafeDev — Build 01 Acceptance Criteria

## Gate

Do not continue to later homepage sections until Build 01 is explicitly approved.

## Functional

- [ ] Home route loads without runtime error.
- [ ] Header navigation is usable.
- [ ] Primary CTA is usable.
- [ ] Hero copy matches approved copy.
- [ ] Living System contains all five narrative states.
- [ ] Hero visual becomes the Living System continuously.
- [ ] No fictional metrics or legacy claims are present.
- [ ] No old ROI/form/CEO components appear in the rendered Build 01 prototype.

## Visual

- [ ] Clearly reads as ConSafeDev rather than generic AI/SaaS.
- [ ] Teal is used semantically and sparingly.
- [ ] Hero does not rely on stock imagery.
- [ ] No generic Bento/card wall replaces storytelling.
- [ ] Dark environment maintains strong text contrast.
- [ ] Composition has intentional whitespace.
- [ ] No obvious layout jump at sticky entry/exit.
- [ ] No hard visual cut between Hero and Living System.

## Motion

- [ ] Scroll-linked motion follows user input closely.
- [ ] No scroll hijacking.
- [ ] No visible catch-up lag on the main scene.
- [ ] No random infinite motion competing with reading.
- [ ] No jarring snaps between story states.
- [ ] Pointer enhancement is optional, never required.
- [ ] Reduced-motion mode remains complete and polished.

## Responsive test matrix

- [ ] 375×812 or similar phone.
- [ ] 390×844 or similar modern phone.
- [ ] 768×1024 tablet portrait.
- [ ] 1024×768 tablet/compact landscape.
- [ ] 1366×768 laptop.
- [ ] 1440×900 desktop.
- [ ] 1920×1080 desktop.
- [ ] one viewport below 360px for overflow failure.

## Input methods

- [ ] Mouse wheel.
- [ ] Trackpad.
- [ ] Touch.
- [ ] Keyboard.
- [ ] Reduced-motion preference.

## Accessibility

- [ ] Semantic heading hierarchy.
- [ ] Visible keyboard focus.
- [ ] CTA reachable by keyboard.
- [ ] Decorative SVG hidden appropriately from assistive technology.
- [ ] Meaningful system text is not trapped only inside inaccessible graphics.
- [ ] Contrast remains readable.
- [ ] Motion does not gate content.

## Performance

Prototype target:
- no obvious frame drops during ordinary scrolling on a current mid-range device;
- no long visual stalls;
- no repeated layout thrashing;
- no huge blur layers;
- no unnecessary video/WebGL payload.

Production targets to protect:
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

Do not claim these values until measured.

## Engineering

Run and report:
- [ ] `npm run lint`
- [ ] `npm run build`

Use `npm ci` for clean validation when appropriate.
Do not suppress new TypeScript errors.
Do not upgrade dependencies without authorization.

## Completion report

Must state:
- files changed;
- test results;
- known deviations;
- unresolved issues;
- deployment impact.
