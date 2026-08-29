# Implementation Prompt 01 — Foundation + Shell + Hero + Living System

## Mission

Rebuild only the first experience of the ConSafeDev website:

1. visual foundation;
2. persistent site shell;
3. header/navbar;
4. Hero;
5. Living System scrollytelling;
6. initial Engineering → Clarity transition boundary.

Do not build the rest of the landing page.

## Mandatory pre-read

Read and obey:

- `ai/consafedev-site/SKILL.md`
- `ai/consafedev-site/EXPERIENCE_CONTRACT.md`
- `ai/consafedev-site/DESIGN_TOKENS.md`
- `ai/consafedev-site/MOTION_SPEC.md`
- `ai/consafedev-site/CONTENT_RULES.md`
- `ai/consafedev-site/DEPLOYMENT_GUARDRAILS.md`
- `ai/consafedev-site/QA_ACCEPTANCE.md`

Inspect current repository code before editing.

## Repository context

The current page is legacy and contains patterns intentionally discarded, including:
- current liquid-glass visual language;
- coral accent;
- Bento services;
- ROI calculator;
- conversational scheduling form;
- CEO-centric footer;
- generic dark-agency presentation.

Do not preserve these merely because they exist.
Keep infrastructure/runtime assumptions intact.

## Implementation scope

### A. Foundation

Establish reusable brand tokens and global foundations.
Prefer CSS custom properties/Tailwind theme tokens rather than scattered magic values.
Do not perform broad dependency upgrades.

### B. Persistent Site Shell

Create a reusable shell that will later support `/`, `/agenda` and `/privacidad` with continuous brand feeling.
Build only the shell needed now.

### C. Header

Desktop:
- ConSafeDev brand area left;
- navigation: `Qué resolvemos`, `Trabajo`, `Cómo trabajamos`;
- CTA: `Hablemos`.

For Build 01, future anchors may remain inert/disabled or be handled safely; do not generate fake sections merely to satisfy links.

Mobile:
- accessible compact navigation;
- no giant glass pill;
- clear focus and touch targets.

### D. Hero

Use approved content exactly.

Headline:
`Lo complejo puede funcionar simple.`

Supporting:
`Diseñamos software a medida que conecta procesos, automatiza operaciones y convierte problemas reales de negocio en sistemas que funcionan.`

CTA:
`Hablemos de lo que necesitas resolver`

Exploration cue:
`Explora cómo lo hacemos`

Create the visual System Stage containing a controlled fragmented operation.

### E. Living System

The Hero system must visually become the Living System.

Required narrative states:
1. Fragmentation.
2. Understanding.
3. Architecture.
4. Software.
5. Living system.

Desktop guide:
- sticky narrative;
- approximately 400–450vh;
- ~12–18 meaningful entities;
- restrained connection layer;
- close scroll linkage.

Mobile guide:
- separate composition;
- ~7–9 primary entities;
- approximately 280–330vh;
- no hover dependency.

Tablet:
- explicitly designed intermediate layout.

### F. Initial Clarity boundary

End Build 01 with the beginning/placeholder boundary of the transition into Clarity Space.
Do not implement `Qué podemos construir` yet.

## Architecture preference

Prefer something conceptually similar to:
- `SiteShell`
- `SiteHeader`
- `HeroLivingExperience`
- `SystemStage`
- `ConnectionLayer`
- `SystemNode`
- `StoryCopy`
- `StoryProgress`

Exact naming may differ if repository conventions justify it.
Avoid a giant single component.
Keep animation state derivation understandable and deterministic.

## Visual prohibitions

Do not add:
- neon purple;
- glowing AI gradients;
- orb backgrounds;
- giant glass panels;
- generic Bento layout;
- fake code terminal;
- robot/brain/globe/cube visuals;
- random particles;
- technology-logo marquee;
- invented metrics;
- stock-office image.

## Motion requirements

Main scene:
- scroll-linked;
- no scroll hijacking;
- no catch-up feeling;
- no large spring delay.

Use Motion already present in the project unless a documented blocker exists.
Prioritize transform/opacity/SVG stroke animation.
Do not add Three.js/WebGL in Build 01.

## Branding assets

Do not generate a new ConSafeDev logo.

If final vector assets are not yet in the repository:
- use an existing approved company asset if suitable; or
- create a neutral text/asset placeholder clearly isolated for later replacement.

Do not use AI-generated substitute branding.

## Legacy cleanup for Build 01

The rendered `/` should no longer include the legacy sections after Living System during this prototype gate.
Legacy source files may remain temporarily unused; do not perform unrelated deletion/refactor work unless necessary.

## Deployment safety

Absolutely no changes to:
- `deploy.sh`;
- port 3002 assumptions;
- systemd;
- Cloudflare topology;
- Next.js standalone output.

Do not use stale deployment documentation to alter production.

## Quality gate

Execute the checks from `QA_ACCEPTANCE.md`.
At minimum:
- lint;
- production build;
- responsive inspection;
- reduced-motion inspection.

If browser/device tooling is unavailable, state exactly which visual checks still require human verification.

## Completion response format

### Implemented
Short summary.

### Files changed
File → purpose.

### Validation
- lint:
- build:
- responsive:
- accessibility:
- reduced motion:

### Performance considerations
Short factual notes.

### Deviations
List every deviation. If none, say `None`.

### Deployment impact
Must be `None` unless work is stopped for explicit approval.
