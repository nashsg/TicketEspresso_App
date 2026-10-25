interface CoffeeCupLogoProps {
  className?: string;
  size?: number;
}

export function CoffeeCupLogo({ className = "", size = 64 }: CoffeeCupLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Saucer - Hand-drawn style */}
      <ellipse cx="50" cy="75" rx="32" ry="6" fill="#8B7355" opacity="0.3" />
      <ellipse cx="50" cy="74" rx="32" ry="5" fill="none" stroke="#5D4E37" strokeWidth="1.5" />
      <path d="M18 74 Q20 72 22 74" stroke="#5D4E37" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M78 74 Q80 72 82 74" stroke="#5D4E37" strokeWidth="0.8" fill="none" opacity="0.5" />
      
      {/* Cross-hatching on saucer for texture */}
      <g opacity="0.2">
        <line x1="25" y1="73" x2="30" y2="76" stroke="#5D4E37" strokeWidth="0.5" />
        <line x1="28" y1="73" x2="33" y2="76" stroke="#5D4E37" strokeWidth="0.5" />
        <line x1="31" y1="73" x2="36" y2="76" stroke="#5D4E37" strokeWidth="0.5" />
        <line x1="67" y1="73" x2="72" y2="76" stroke="#5D4E37" strokeWidth="0.5" />
        <line x1="70" y1="73" x2="75" y2="76" stroke="#5D4E37" strokeWidth="0.5" />
      </g>

      {/* Cup Body - Sketch style */}
      <path
        d="M30 70 L28 45 Q28 42 30 40 L70 40 Q72 42 72 45 L70 70 Q70 72 68 73 L32 73 Q30 72 30 70 Z"
        fill="#FFF8E7"
        stroke="#5D4E37"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      
      {/* Cross-hatching on cup for shading */}
      <g opacity="0.15">
        <line x1="30" y1="45" x2="32" y2="70" stroke="#8B7355" strokeWidth="0.6" />
        <line x1="32" y1="45" x2="34" y2="70" stroke="#8B7355" strokeWidth="0.6" />
        <line x1="34" y1="45" x2="36" y2="70" stroke="#8B7355" strokeWidth="0.6" />
        <line x1="66" y1="45" x2="68" y2="70" stroke="#8B7355" strokeWidth="0.6" />
        <line x1="68" y1="45" x2="70" y2="70" stroke="#8B7355" strokeWidth="0.6" />
      </g>

      {/* Cup Handle - Hand-drawn wiggly style */}
      <path
        d="M72 48 Q78 48 80 52 Q82 56 80 60 Q78 64 72 64"
        fill="none"
        stroke="#5D4E37"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M72 49 Q77 49 79 52 Q80.5 55 79 59 Q77 62 72 62"
        fill="none"
        stroke="#8B7355"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Handle cross-hatching */}
      <g opacity="0.2">
        <line x1="75" y1="52" x2="77" y2="54" stroke="#5D4E37" strokeWidth="0.5" />
        <line x1="76" y1="56" x2="78" y2="58" stroke="#5D4E37" strokeWidth="0.5" />
        <line x1="75" y1="60" x2="77" y2="62" stroke="#5D4E37" strokeWidth="0.5" />
      </g>

      {/* Coffee/Latte - Golden sparkly foam surface */}
      <ellipse cx="50" cy="40" rx="20" ry="4" fill="#8B7355" opacity="0.3" />
      
      {/* Latte Art Foam - Golden sparkly */}
      <ellipse cx="50" cy="39" rx="19" ry="3.5" fill="#D4AF37" opacity="0.8" />
      <ellipse cx="50" cy="39" rx="19" ry="3.5" fill="url(#goldShimmer)" opacity="0.6" />
      
      {/* Latte art foam texture - hand-drawn swirls */}
      <path
        d="M40 39 Q45 37 50 39 Q55 41 60 39"
        fill="none"
        stroke="#FFF8E7"
        strokeWidth="1"
        opacity="0.4"
        strokeLinecap="round"
      />

      {/* White Checkmark in foam - Hand-drawn style */}
      <path
        d="M45 39 L48 42 L56 36"
        fill="none"
        stroke="#FFF8E7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 39 L48 42 L56 36"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sparkles on foam */}
      <circle cx="38" cy="38" r="0.8" fill="#FFF8E7" opacity="0.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="62" cy="39" r="0.6" fill="#FFF8E7" opacity="0.8">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="37" r="0.5" fill="#FFFFFF" opacity="0.9">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
      </circle>

      {/* Steam wisps with gold sparkles - Hand-drawn wavy style */}
      <g opacity="0.6">
        {/* Left steam wisp */}
        <path
          d="M38 35 Q36 30 38 25 Q40 20 38 15"
          stroke="#8B7355"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            values="M38 35 Q36 30 38 25 Q40 20 38 15;M38 35 Q40 30 38 25 Q36 20 38 15;M38 35 Q36 30 38 25 Q40 20 38 15"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Middle steam wisp */}
        <path
          d="M50 35 Q48 28 50 22 Q52 16 50 10"
          stroke="#8B7355"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            values="M50 35 Q48 28 50 22 Q52 16 50 10;M50 35 Q52 28 50 22 Q48 16 50 10;M50 35 Q48 28 50 22 Q52 16 50 10"
            dur="4s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Right steam wisp */}
        <path
          d="M62 35 Q64 30 62 25 Q60 20 62 15"
          stroke="#8B7355"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            values="M62 35 Q64 30 62 25 Q60 20 62 15;M62 35 Q60 30 62 25 Q64 20 62 15;M62 35 Q64 30 62 25 Q60 20 62 15"
            dur="4s"
            begin="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Gold sparkles in steam */}
      <circle cx="40" cy="25" r="1" fill="#D4AF37" opacity="0.7">
        <animate attributeName="cy" values="25;20;15" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="51" cy="22" r="0.8" fill="#D4AF37" opacity="0.7">
        <animate attributeName="cy" values="22;17;12" dur="3s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0" dur="3s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="61" cy="27" r="1" fill="#D4AF37" opacity="0.7">
        <animate attributeName="cy" values="27;22;17" dur="3s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="45" cy="18" r="0.6" fill="#FFF8E7" opacity="0.8">
        <animate attributeName="cy" values="18;13;8" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="56" cy="20" r="0.7" fill="#FFF8E7" opacity="0.8">
        <animate attributeName="cy" values="20;15;10" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
      </circle>

      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="goldShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#FFF8E7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
