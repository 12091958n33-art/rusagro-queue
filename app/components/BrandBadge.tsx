export default function BrandBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-sm bg-[#2a418d] text-white ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[60%] w-[60%]">
        <path
          d="M12 2c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6ZM12 16c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6ZM2 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0ZM16 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0ZM5.6 5.6c2.2.6 3.6 2 4.2 4.2-2.2-.6-3.6-2-4.2-4.2ZM14.2 14.2c2.2.6 3.6 2 4.2 4.2-2.2-.6-3.6-2-4.2-4.2ZM18.4 5.6c-.6 2.2-2 3.6-4.2 4.2.6-2.2 2-3.6 4.2-4.2ZM9.8 14.2c-.6 2.2-2 3.6-4.2 4.2.6-2.2 2-3.6 4.2-4.2Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
