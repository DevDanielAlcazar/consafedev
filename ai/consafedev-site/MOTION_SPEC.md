# ConSafeDev — Motion Specification V1

## Motion principle

Movement communicates system behavior.

Vocabulary:
- **Assemble** — separated elements find structure.
- **Connect** — relationships become active.
- **Resolve** — unnecessary complexity disappears.
- **Flow** — information/process moves through the system.
- **Reveal** — information appears as a consequence.
- **Respond** — UI acknowledges user presence or action.

## Character

Motion must feel controlled, precise, continuous and intentional.

Never bouncy, gelatinous, random or decorative for its own sake.

## Primary implementation approach

Prefer:
- DOM;
- SVG;
- CSS transforms;
- Motion;
- scroll-linked transforms.

Use a single principal SVG connection layer when practical.

Use WebGL/Three.js only if explicitly approved after prototype evidence shows a material experiential gain.

## Performance-friendly properties

Prefer:
- `transform`;
- `opacity`;
- SVG stroke progression;
- restrained clip-path / masks.

Avoid continuous animation of layout dimensions, `top/left` when transform can be used, large blur/filter areas and paint-heavy effects.

## Scroll behavior

No scroll hijacking.

The narrative must remain tied closely to actual scroll position.
Avoid large spring lag on the main story progress.
When the user stops scrolling, the primary scene should feel stopped.

## Desktop Living System

Guide:
- scene wrapper: 400–450vh;
- sticky stage: approximately 100svh;
- 0–18% Fragmentation;
- 18–38% Understanding;
- 38–62% Architecture;
- 62–82% Software;
- 82–100% Living System.

These are storyboard guides; transitions must interpolate continuously.

## Mobile Living System

- Separate choreography.
- Approximate narrative height: 280–330vh.
- 7–9 primary entities.
- No hover-dependent behavior.
- Preserve story, simplify geometry.
- Avoid aggressive parallax.

## Tablet

Must have a deliberate intermediate scene layout.

## Timing guidelines

Microinteraction: 140–220ms  
State response: 220–360ms  
Major reveal: 450–700ms

Preferred easing for discrete transitions:
`cubic-bezier(0.22, 1, 0.36, 1)`

## Hero → Living System continuity

The visual system shown in Hero must become the Living System.
Do not mount a visually unrelated replacement after the Hero.

## Engineering → Clarity transition

Build 01 should establish the beginning of this transition:
- active teal relationships may become structural editorial lines;
- deep background progressively resolves toward clarity;
- no hard white cut.

## Reduced motion

Respect `prefers-reduced-motion: reduce`.

Reduced motion must preserve:
- copy;
- hierarchy;
- progression;
- a polished premium result.

Remove unnecessary parallax/movement and favor discrete state changes/opacity.

## Interaction

Desktop nodes may respond subtly to pointer proximity/hover.
No custom global cursor.
No interaction is required to understand the story.
Keyboard and touch users receive the complete narrative.
