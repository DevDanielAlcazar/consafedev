import type { SVGProps } from "react";

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  compact?: boolean;
};

export function BrandMark({ compact = false, ...props }: BrandMarkProps) {
  return (
    <svg
      viewBox={compact ? "0 0 34 34" : "0 0 182 34"}
      role="img"
      aria-label="ConSafeDev"
      {...props}
    >
      <image
        href="/brand/consafedev-shield.png"
        x="2.1"
        y="0.6"
        width="29.8"
        height="32.8"
        preserveAspectRatio="xMidYMid meet"
      />
      {!compact && (
        <g aria-hidden="true">
          <text x="44" y="22.2" className="brand-mark__word brand-mark__word--main">ConSafe</text>
          <text x="112" y="22.2" className="brand-mark__word brand-mark__word--accent">Dev</text>
        </g>
      )}
    </svg>
  );
}
