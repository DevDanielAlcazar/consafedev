export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      {/* Left side of shield (Teal) */}
      <path d="M50 15 L20 25 L20 45 C20 65 35 80 50 90" stroke="#005F6B" />
      
      {/* Right side of shield (Teal) */}
      <path d="M50 15 L80 25 L80 45 C80 65 65 80 50 90" stroke="#005F6B" />
      
      {/* Left Bracket connecting to shield (Teal) */}
      <path d="M20 45 L40 45 L30 55" stroke="#005F6B" />
      
      {/* Right Bracket connecting to shield (White/Light for contrast on dark bg) */}
      <path d="M80 45 L60 45 L70 55" stroke="#FFFFFF" />
      
      {/* Slash (Teal) */}
      <path d="M55 35 L45 65" stroke="#005F6B" />

      {/* Dots */}
      <circle cx="50" cy="25" r="3" fill="#005F6B" stroke="none" />
      <circle cx="25" cy="40" r="3" fill="#FFFFFF" stroke="none" />
      <circle cx="75" cy="40" r="3" fill="#005F6B" stroke="none" />
    </svg>
  );
}
