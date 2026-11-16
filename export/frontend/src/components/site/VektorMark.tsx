const VektorMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
    <polygon points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5" stroke="currentColor" strokeWidth="2.5" />
    <path d="M18 20 L32 46 L46 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18" cy="20" r="3.5" fill="currentColor" />
    <circle cx="46" cy="20" r="3.5" fill="currentColor" />
    <circle cx="32" cy="46" r="3.5" fill="currentColor" />
  </svg>
);
export default VektorMark;
