// Custom brand icons — soft gradient, navy/blue palette. Built to match the
// Pro-Tection logo style: friendly, rounded, modern, premium.
import * as React from "react";

type IconProps = { className?: string; size?: number };

const wrap = (children: React.ReactNode, size = 64) => (
  <svg viewBox="0 0 64 64" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <defs>
      <linearGradient id="bi-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.62 0.20 255)" />
        <stop offset="100%" stopColor="oklch(0.48 0.21 263)" />
      </linearGradient>
      <linearGradient id="bi-grad-soft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.93 0.05 255)" />
        <stop offset="100%" stopColor="oklch(0.88 0.08 255)" />
      </linearGradient>
    </defs>
    {children}
  </svg>
);

export const ShieldHeartIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M32 14l16 6v12c0 10-7 17-16 20-9-3-16-10-16-20V20l16-6z" fill="url(#bi-grad)" />
        <path d="M32 40s-7-4-7-10a4 4 0 017-2.6A4 4 0 0139 30c0 6-7 10-7 10z" fill="#fff" />
      </>,
      size
    )}
  </span>
);

export const HomeShieldIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M16 30l16-12 16 12v16a4 4 0 01-4 4H20a4 4 0 01-4-4V30z" fill="url(#bi-grad)" />
        <rect x="28" y="36" width="8" height="14" rx="2" fill="#fff" />
      </>,
      size
    )}
  </span>
);

export const FamilyIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <circle cx="22" cy="22" r="6" fill="url(#bi-grad)" />
        <circle cx="42" cy="22" r="6" fill="url(#bi-grad)" />
        <path d="M12 50c0-7 5-12 10-12s10 5 10 12v2H12v-2z" fill="url(#bi-grad)" />
        <path d="M32 50c0-7 5-12 10-12s10 5 10 12v2H32v-2z" fill="url(#bi-grad)" />
        <circle cx="32" cy="34" r="4" fill="#fff" stroke="url(#bi-grad)" strokeWidth="2" />
      </>,
      size
    )}
  </span>
);

export const StethoscopeIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M20 16v14a10 10 0 0020 0V16" stroke="url(#bi-grad)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="20" cy="14" r="3" fill="url(#bi-grad)" />
        <circle cx="40" cy="14" r="3" fill="url(#bi-grad)" />
        <path d="M30 40v6a6 6 0 0012 0v-2" stroke="url(#bi-grad)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="46" cy="44" r="5" fill="url(#bi-grad)" />
      </>,
      size
    )}
  </span>
);

export const HandshakeIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M10 36l10-10 8 6 8-6 10 10-8 8a4 4 0 01-6 0l-2-2-2 2a4 4 0 01-6 0l-12-8z" fill="url(#bi-grad)" />
        <path d="M14 34l8-8M50 34l-8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </>,
      size
    )}
  </span>
);

export const ClockIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <circle cx="32" cy="32" r="16" fill="url(#bi-grad)" />
        <path d="M32 22v10l7 5" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </>,
      size
    )}
  </span>
);

export const SparkleIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M32 14l4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12z" fill="url(#bi-grad)" />
      </>,
      size
    )}
  </span>
);

export const EuroIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <circle cx="32" cy="32" r="16" fill="url(#bi-grad)" />
        <path d="M40 24a10 10 0 100 16M22 30h14M22 35h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </>,
      size
    )}
  </span>
);

export const BadgeCheckIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M32 8l5 5 7-1 1 7 5 5-5 5-1 7-7-1-5 5-5-5-7 1-1-7-5-5 5-5 1-7 7 1 5-5z" fill="url(#bi-grad)" />
        <path d="M24 32l6 6 12-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </>,
      size
    )}
  </span>
);

export const PhoneIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M22 14h4l4 10-4 4a20 20 0 0010 10l4-4 10 4v4a6 6 0 01-6 6c-16 0-28-12-28-28a6 6 0 016-6z" fill="url(#bi-grad)" />
      </>,
      size
    )}
  </span>
);

export const HeadsetIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <path d="M16 34v-2a16 16 0 0132 0v2" stroke="url(#bi-grad)" strokeWidth="4" strokeLinecap="round" />
        <rect x="12" y="32" width="10" height="14" rx="3" fill="url(#bi-grad)" />
        <rect x="42" y="32" width="10" height="14" rx="3" fill="url(#bi-grad)" />
        <path d="M42 46v2a6 6 0 01-6 6h-4" stroke="url(#bi-grad)" strokeWidth="3" strokeLinecap="round" />
      </>,
      size
    )}
  </span>
);

export const SeniorIcon = ({ className, size }: IconProps) => (
  <span className={className}>
    {wrap(
      <>
        <rect x="4" y="6" width="56" height="52" rx="14" fill="url(#bi-grad-soft)" />
        <circle cx="32" cy="20" r="7" fill="url(#bi-grad)" />
        <path d="M22 32h20a2 2 0 012 2v18H20V34a2 2 0 012-2z" fill="url(#bi-grad)" />
        <path d="M46 30v22M42 38h8" stroke="url(#bi-grad)" strokeWidth="3" strokeLinecap="round" />
      </>,
      size
    )}
  </span>
);
