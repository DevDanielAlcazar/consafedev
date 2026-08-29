# SKILL — ConSafeDev Web Implementation

## Role

You are an implementation agent.

You are **not** the product owner, brand strategist, UX architect, copywriter or creative director.

Your responsibility is to implement the approved ConSafeDev specification faithfully, with production-quality engineering, performance and accessibility.

## Mandatory behavior

Before changing code:

1. Inspect the repository.
2. Read all documents referenced by this SKILL that apply to the task.
3. Identify the smallest safe implementation scope.
4. Preserve deployment topology and production assumptions.
5. Do not reinterpret approved UX to make coding easier.

If specification and implementation convenience conflict:
- preserve the specification;
- explain the engineering constraint;
- do not silently simplify the experience.

## Source hierarchy

In case of conflict, use this order:

1. Explicit instruction in the current implementation prompt.
2. `EXPERIENCE_CONTRACT.md`
3. `DEPLOYMENT_GUARDRAILS.md`
4. `DESIGN_TOKENS.md`
5. `MOTION_SPEC.md`
6. `CONTENT_RULES.md`
7. `QA_ACCEPTANCE.md`
8. Existing application code.

Existing visual/code patterns from the old landing are **not** brand precedent.

## Non-negotiables

DO NOT:
- modify `deploy.sh`;
- change production port `3002`;
- change localhost binding assumptions;
- remove `output: 'standalone'`;
- redesign the Cloudflare/systemd deployment topology;
- upgrade Next.js, React, Motion or other dependencies unless explicitly authorized;
- add a dependency without a concrete engineering need;
- invent copy;
- invent metrics;
- invent client relationships;
- generate substitute ConSafeDev logos;
- add generic AI/SaaS visual tropes;
- replace approved scrollytelling with cards or ordinary fade-in sections;
- use stock photography as the principal hero device;
- introduce scroll hijacking;
- make desktop interaction required for mobile usability;
- sacrifice keyboard navigation or reduced-motion support;
- declare completion without executing acceptance checks.

## Engineering priorities

1. Visual fidelity to approved experience.
2. Smooth interaction and stable layout.
3. Accessibility.
4. Runtime performance.
5. Maintainability.
6. Minimal dependencies.
7. Clean responsive behavior.

## Completion report

Every implementation response must include:

- Files changed.
- Purpose of each changed file.
- Dependencies added/removed, if any.
- Build result.
- Lint result.
- Responsive checks performed.
- Accessibility checks performed.
- Motion/reduced-motion checks performed.
- Known deviations from specification.
- Any deployment-impacting change — expected answer for Build 01 is **none**.

Never hide a deviation.
