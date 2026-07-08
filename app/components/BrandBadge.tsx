export default function BrandBadge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#8a8a8a" strokeWidth="3.2" strokeLinecap="square">
        <line x1="4" y1="36" x2="4" y2="26" />
        <line x1="12" y1="36" x2="12" y2="18" />
        <line x1="20" y1="36" x2="20" y2="10" />
        <line x1="28" y1="36" x2="28" y2="4" />
      </g>
    </svg>
  );
}
