# ConSafeDev — Motion Specification V2

## Motion principle
Motion changes meaning. It exists for discovery, context, structure, transformation and operation.

## Vocabulary
- Drift — subtle spatial life before meaning.
- Focus — meaningful fragment gains clarity while noise recedes.
- Associate — separate fragments reveal relationship.
- Consolidate — scattered information becomes coherent.
- Assemble — fragments become structured product behavior.
- Transform — operational fragment visibly becomes software element.
- Flow — information/action moves through a working system.
- Resolve — complexity exits and Clarity Space emerges.

## Character
Exact, elegant, continuous, calm and deliberate. Never bouncy, random, overloaded or laggy relative to scroll.

## Implementation
Prefer DOM, SVG, CSS transforms and Motion. Three.js/WebGL is not allowed in Build 01 V2 unless separately approved.

Do not build around a generic graph engine. Do not start from nodes+edges. Start from semantic fragments in `SCENE_DIRECTION_V2.md`. Connections are supporting behavior, not the product.

Prefer transform, opacity, restrained clip-path/masks and SVG paths. Avoid continuous width/height/top/left, large blur/filter animation and paint-heavy full-screen effects.

## Scroll
No scroll hijacking. Main scene tracks real scroll closely. No spring catch-up. When scrolling stops, story should settle immediately.

Approximate desktop sticky narrative: 380–460vh. Do not make hard jumps between beats.

## Key transformation requirement
At least three fragment→product transformations must be visually traceable and reuse the same visual entities. Do not replace the scene with unrelated UI.

## Hero
Initial motion is nearly subconscious: slow drift, tiny depth, restrained live trace, subtle focus. Never compete with headline readability.

## Understanding
Prefer subtractive animation: noise recedes, meaningful fragments sharpen, relationships become visible. Do not add decorative objects.

## Architecture
Use alignment and relationship, not topology. Teal activates progressively as meaning becomes clear.

## Product emergence
Strongest transformation. Use shared transforms, clipping, resizing/reframing and consolidation so the user can track an operational fragment becoming software.

## Living product
Activity demonstrates input → process → result with few simultaneous events. No fake real-time telemetry.

## Engineering → Clarity
Transform existing elements through line continuation, spatial flattening and dark→light resolution. No hard flash.

## Mobile
Separate choreography; ~260–330vh guide; larger fragments; fewer concurrent objects; vertical composition; no hover dependencies.

## Timing
Micro: 140–220ms. Discrete state: 220–360ms. Major reveal: 450–700ms. Preferred easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

## Reduced motion
Preserve every story beat and semantic ordering. Replace continuous depth/parallax with discrete reveals, opacity and simple transforms. Reduced motion remains premium.
