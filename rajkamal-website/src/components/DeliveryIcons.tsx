interface IconProps {
  size?: number
  color?: string
}

/** Delivery truck — 3 speed lines, cargo box with door stripe, slanted cab, hubcap wheels */
export function DeliveryTruckIcon({ size = 48, color = '#C41E3A' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 52" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Three speed lines */}
      <line x1="2" y1="16" x2="13" y2="16" strokeWidth="2.2" />
      <line x1="4" y1="22" x2="13" y2="22" strokeWidth="2.2" />
      <line x1="3" y1="28" x2="11" y2="28" strokeWidth="1.6" />
      {/* Cargo box */}
      <rect x="14" y="8" width="28" height="26" rx="3" />
      {/* Cargo door seam — horizontal stripe */}
      <line x1="14" y1="21" x2="42" y2="21" />
      {/* Cab with slanted front */}
      <path d="M42 12 L42 34 L65 34 L65 24 L57 12 Z" />
      {/* Windshield (trapezoid) */}
      <path d="M44 13.5 L44 22.5 L63 22.5 L57 13.5 Z" />
      {/* Undercarriage */}
      <line x1="14" y1="34" x2="65" y2="34" />
      {/* Left wheel — outer tyre + hubcap ring */}
      <circle cx="24" cy="41" r="7" />
      <circle cx="24" cy="41" r="3" />
      {/* Right wheel */}
      <circle cx="56" cy="41" r="7" />
      <circle cx="56" cy="41" r="3" />
    </svg>
  )
}

/** Serrated stamp seal — 32-point gear polygon, inner circle, bold checkmark */
export function OriginalSealIcon({ size = 48, color = '#C41E3A' }: IconProps) {
  // 32-point starburst: alternating outer r=21 / inner r=16, center (24,24)
  const pts = '24,3 27.3,7.3 32,4.6 33.4,9.9 38.9,9.2 38.1,14.6 43.4,16 40.7,20.7 45,24 40.7,27.3 43.4,32 38.1,33.4 38.9,38.9 33.4,38.1 32,43.4 27.3,40.7 24,45 20.7,40.7 16,43.4 14.6,38.1 9.2,38.9 9.9,33.4 4.6,32 7.3,27.3 3,24 7.3,20.7 4.6,16 9.9,14.6 9.2,9.2 14.6,9.9 16,4.6 20.7,7.3'
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points={pts} />
      <circle cx="24" cy="24" r="11" />
      {/* Horizontal lines representing stamp text */}
      <line x1="17" y1="20" x2="31" y2="20" />
      <line x1="15" y1="24" x2="33" y2="24" />
      <line x1="17" y1="28" x2="31" y2="28" />
    </svg>
  )
}

/** Simple U-turn return arrow */
export function EasyReturnsIcon({ size = 48, color = '#C41E3A' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 10 L34 10 Q44 10 44 20 Q44 38 24 38 Q10 38 10 26 L10 22" />
      <polyline points="4,26 10,22 16,26" />
    </svg>
  )
}

/** Wallet — card peeking out, divider, coin pocket with double-circle coin */
export function PayOnDeliveryIcon({ size = 48, color = '#C41E3A' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Credit card peeking out from top */}
      <rect x="13" y="9" width="22" height="7" rx="2" />
      {/* Chip on card */}
      <rect x="17" y="11" width="5" height="3" rx="1" />
      {/* Wallet body */}
      <rect x="4" y="14" width="40" height="28" rx="4" />
      {/* Card slot divider */}
      <line x1="4" y1="24" x2="44" y2="24" />
      {/* Card detail lines in left section */}
      <line x1="10" y1="29" x2="22" y2="29" />
      <line x1="10" y1="34" x2="17" y2="34" />
      {/* Coin pocket */}
      <rect x="28" y="27" width="16" height="12" rx="3" />
      {/* Coin — outer ring + inner ring */}
      <circle cx="36" cy="33" r="4" />
      <circle cx="36" cy="33" r="1.8" />
    </svg>
  )
}

/** Gift box with symmetric bow loops — "free delivery" */
export function FreeTagIcon({ size = 48, color = '#C41E3A' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Box body */}
      <rect x="6" y="24" width="36" height="18" rx="2" />
      {/* Lid */}
      <rect x="4" y="18" width="40" height="8" rx="2" />
      {/* Vertical ribbon down box */}
      <line x1="24" y1="18" x2="24" y2="42" />
      {/* Horizontal ribbon stripe on lid */}
      <line x1="4" y1="22" x2="44" y2="22" />
      {/* Left bow loop — cubic bezier closed teardrop */}
      <path d="M24 18 C16,20 8,12 14,6 C20,0 28,10 24,18" />
      {/* Right bow loop — mirror */}
      <path d="M24 18 C32,20 40,12 34,6 C28,0 20,10 24,18" />
      {/* Bow knot dot at center */}
      <circle cx="24" cy="18" r="2" />
    </svg>
  )
}
