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
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M17 2.8 29.2 8v9.2c0 7.2-4.6 11.2-12.2 14-7.6-2.8-12.2-6.8-12.2-14V8L17 2.8Z" opacity=".72" />
        <path d="m10.2 16.8 5.1-5.1 3.2 3.2 5.3-5.3" />
        <path d="M10.2 22.2h13.6" opacity=".55" />
        <path d="M20.7 19.1h3.1v3.1" />
      </g>
      {!compact && (
        <g aria-hidden="true">
          <text x="44" y="22.2" className="brand-mark__word brand-mark__word--main">ConSafe</text>
          <text x="112" y="22.2" className="brand-mark__word brand-mark__word--accent">Dev</text>
        </g>
      )}
    </svg>
  );
}
