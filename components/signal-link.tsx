type SignalLinkProps = {
  className: string;
  showLabel?: boolean;
};

export function SignalLink({ className, showLabel = false }: SignalLinkProps) {
  return (
    <a
      className={className}
      href="https://signal.org/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Signal's website"
    >
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M32 8C18.75 8 8 17.4 8 29c0 6.1 3.04 11.59 7.92 15.43L14 56l12.06-4.1c1.9.48 3.9.73 5.94.73 13.25 0 24-9.4 24-21S45.25 8 32 8Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M21 31c2.5-5 5-5 7.5 0s5 5 7.5 0 5-5 7.5 0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
      {showLabel && <span>Signal</span>}
    </a>
  );
}
