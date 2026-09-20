import React from 'react';

interface Icon3DProps {
  type: 'fade' | 'scissors' | 'beard' | 'sparkles' | 'eyebrows' | 'razor' | 'calendar' | 'check' | 'clock' | 'lock' | 'user' | 'phone';
  className?: string;
  size?: number;
}

export const Icon3D: React.FC<Icon3DProps> = ({ type, className = '', size = 32 }) => {
  // Common 3D bevel pill container styling with specular highlight and deep drop-shadow
  const containerStyle = {
    width: size + 22,
    height: size + 22,
  };

  switch (type) {
    case 'fade':
      return (
        <div
          style={containerStyle}
          className={`relative group/icon flex items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
          {/* Base 3D Clay/Metallic Extrusion Background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#1c2e4a] via-[#0d1b2e] to-[#050b14] border-t border-cyan-400/60 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9),0_0_20px_rgba(0,180,255,0.35)]" />
          
          {/* Top gloss specular highlight */}
          <div className="absolute top-1 left-2 right-2 h-[38%] rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          {/* 3D High-Relief Emblem: Precision Degradê / Fade Layers */}
          <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
          >
            <defs>
              <linearGradient id="fade3d-metal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cffafe" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <filter id="fade-emboss">
                <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#00f0ff" floodOpacity="0.6" />
              </filter>
            </defs>
            {/* Step 1 base layer (thick bevel) */}
            <path
              d="M6 26L14 18L6 10"
              stroke="#0369a1"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 25L14 17L6 9"
              stroke="url(#fade3d-metal)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#fade-emboss)"
            />
            {/* Step 2 mid layer */}
            <path
              d="M14 26L22 18L14 10"
              stroke="#0369a1"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 25L22 17L14 9"
              stroke="url(#fade3d-metal)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Step 3 top layer */}
            <path
              d="M22 26L30 18L22 10"
              stroke="#0284c7"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 25L30 17L22 9"
              stroke="#e0f2fe"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );

    case 'scissors':
      return (
        <div
          style={containerStyle}
          className={`relative group/icon flex items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
          {/* Base 3D Clay/Metallic Extrusion */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#182944] via-[#0b1626] to-[#040810] border-t border-sky-400/60 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9),0_0_20px_rgba(14,165,233,0.35)]" />
          <div className="absolute top-1 left-2 right-2 h-[38%] rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          {/* 3D High-Relief Scissors */}
          <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]"
          >
            <defs>
              <linearGradient id="blade-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Shadow beneath blades for bevel depth */}
            <circle cx="10" cy="10" r="4.5" stroke="#0369a1" strokeWidth="3.5" />
            <circle cx="10" cy="26" r="4.5" stroke="#0369a1" strokeWidth="3.5" />
            <line x1="28" y1="8" x2="13" y2="23" stroke="#0369a1" strokeWidth="3.8" strokeLinecap="round" />
            <line x1="21" y1="21" x2="28" y2="28" stroke="#0369a1" strokeWidth="3.8" strokeLinecap="round" />
            
            {/* Metallic embossed surface */}
            <circle cx="10" cy="9.5" r="4.5" stroke="url(#blade-gradient)" strokeWidth="2.8" />
            <circle cx="10" cy="25.5" r="4.5" stroke="url(#blade-gradient)" strokeWidth="2.8" />
            <line x1="28" y1="7.5" x2="13" y2="22.5" stroke="url(#blade-gradient)" strokeWidth="3" strokeLinecap="round" />
            <line x1="20.5" y1="20.5" x2="28" y2="27.5" stroke="url(#blade-gradient)" strokeWidth="3" strokeLinecap="round" />
            <line x1="13" y1="13" x2="18" y2="18" stroke="url(#blade-gradient)" strokeWidth="3" strokeLinecap="round" />

            {/* Pivot screw with gold/bright chrome point */}
            <circle cx="18" cy="18" r="2.2" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
          </svg>
        </div>
      );

    case 'beard':
      return (
        <div
          style={containerStyle}
          className={`relative group/icon flex items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
          {/* Base 3D Container */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#1b2b48] via-[#0e172a] to-[#050812] border-t border-blue-400/60 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9),0_0_20px_rgba(59,130,246,0.35)]" />
          <div className="absolute top-1 left-2 right-2 h-[38%] rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          {/* 3D High-Relief Beard Contour & Mustache */}
          <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]"
          >
            <defs>
              <linearGradient id="beard-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            {/* Mustache relief */}
            <path
              d="M10 11C13 11 15 14 18 14C21 14 23 11 26 11C26 13 23 15 18 15C13 15 10 13 10 11Z"
              fill="#1e3a8a"
            />
            <path
              d="M10 10.5C13 10.5 15 13.5 18 13.5C21 13.5 23 10.5 26 10.5C26 12.5 23 14.5 18 14.5C13 14.5 10 12.5 10 10.5Z"
              fill="url(#beard-gradient)"
            />

            {/* Jaw and Beard Contour Bevel */}
            <path
              d="M8 15C8 23 12 28 18 28C24 28 28 23 28 15C28 12.5 26.5 11 25 11C25 14 22 17 18 17C14 17 11 14 11 11C9.5 11 8 12.5 8 15Z"
              fill="#1e3a8a"
              stroke="#172554"
              strokeWidth="2.5"
            />
            <path
              d="M8 14.5C8 22.5 12 27.5 18 27.5C24 27.5 28 22.5 28 14.5C28 12 26.5 10.5 25 10.5C25 13.5 22 16.5 18 16.5C14 16.5 11 13.5 11 10.5C9.5 10.5 8 12 8 14.5Z"
              fill="url(#beard-gradient)"
            />
            {/* Soul patch / center chin highlight */}
            <path d="M16 19H20L18 23L16 19Z" fill="#dbeafe" />
          </svg>
        </div>
      );

    case 'sparkles':
      return (
        <div
          style={containerStyle}
          className={`relative group/icon flex items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
          {/* Base 3D Container */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#1b344a] via-[#0d1e2e] to-[#040912] border-t border-cyan-400/60 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.4)]" />
          <div className="absolute top-1 left-2 right-2 h-[38%] rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          {/* 3D High-Relief Pigmentation Sparkle / Star Diamond */}
          <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]"
          >
            <defs>
              <linearGradient id="sparkle-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
            {/* Dark bevel under-stroke */}
            <path
              d="M18 4L21 13.5L30 18L21 22.5L18 32L15 22.5L6 18L15 13.5L18 4Z"
              fill="#0e7490"
              stroke="#083344"
              strokeWidth="2"
            />
            {/* Elevated 3D Star */}
            <path
              d="M18 3.5L21 13L30 17.5L21 22L18 31.5L15 22L6 17.5L15 13L18 3.5Z"
              fill="url(#sparkle-grad)"
            />
            {/* Center light core */}
            <circle cx="18" cy="17.5" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #00f0ff)" />
            {/* Mini secondary sparkle */}
            <path
              d="M27 6L28 9.5L31 11L28 12.5L27 16L26 12.5L23 11L26 9.5L27 6Z"
              fill="#67e8f9"
            />
          </svg>
        </div>
      );

    case 'eyebrows':
      return (
        <div
          style={containerStyle}
          className={`relative group/icon flex items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
          {/* Base 3D Container */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#19273c] via-[#0c1624] to-[#040810] border-t border-blue-400/50 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9),0_0_20px_rgba(59,130,246,0.3)]" />
          <div className="absolute top-1 left-2 right-2 h-[38%] rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          {/* 3D High-Relief Eyebrow Arches & Razor Detail */}
          <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]"
          >
            <defs>
              <linearGradient id="brow-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            {/* Left Brow Arch */}
            <path
              d="M5 16C8 11 13 11 16 14"
              stroke="#1e3a8a"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M5 15C8 10 13 10 16 13"
              stroke="url(#brow-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Right Brow Arch */}
            <path
              d="M20 14C23 11 28 11 31 16"
              stroke="#1e3a8a"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M20 13C23 10 28 10 31 15"
              stroke="url(#brow-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Sculpted design dots beneath */}
            <circle cx="11" cy="22" r="2" fill="#38bdf8" />
            <circle cx="25" cy="22" r="2" fill="#38bdf8" />
          </svg>
        </div>
      );

    case 'razor':
      return (
        <div
          style={containerStyle}
          className={`relative group/icon flex items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
          {/* Base 3D Container */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#182b45] via-[#0c1828] to-[#040912] border-t border-sky-400/60 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9),0_0_20px_rgba(56,189,248,0.35)]" />
          <div className="absolute top-1 left-2 right-2 h-[38%] rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          {/* 3D High-Relief Traditional Straight Razor / Pezinho Finishing Blade */}
          <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]"
          >
            <defs>
              <linearGradient id="razor-steel" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Razor Head / Guard */}
            <rect x="5" y="14" width="26" height="6" rx="3" fill="#0369a1" />
            <rect x="5" y="13" width="26" height="5.5" rx="2.5" fill="url(#razor-steel)" />
            
            {/* Top Blade Clamp */}
            <path
              d="M10 13V9C10 7.5 11.5 6 13 6H23C24.5 6 26 7.5 26 9V13"
              stroke="#0369a1"
              strokeWidth="3.5"
            />
            <path
              d="M10 12.5V8.5C10 7 11.5 5.5 13 5.5H23C24.5 5.5 26 7 26 8.5V12.5"
              stroke="url(#razor-steel)"
              strokeWidth="2.5"
            />

            {/* Razor Handle in High Relief */}
            <line x1="18" y1="20" x2="18" y2="30" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="18" y1="19.5" x2="18" y2="29.5" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'calendar':
      return (
        <div
          style={containerStyle}
          className={`relative group/icon flex items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#1b344a] via-[#0d1e2e] to-[#040912] border-t border-cyan-400/60 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.4)]" />
          <div className="absolute top-1 left-2 right-2 h-[38%] rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className="relative z-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]"
          >
            <rect x="5" y="7" width="26" height="24" rx="4" fill="#0369a1" />
            <rect x="5" y="6" width="26" height="24" rx="4" fill="#0c2340" stroke="#38bdf8" strokeWidth="2" />
            <path d="M5 13H31" stroke="#38bdf8" strokeWidth="2" />
            <line x1="12" y1="3" x2="12" y2="7" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="24" y1="3" x2="24" y2="7" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="12" cy="19" r="1.8" fill="#38bdf8" />
            <circle cx="18" cy="19" r="1.8" fill="#38bdf8" />
            <circle cx="24" cy="19" r="1.8" fill="#38bdf8" />
            <circle cx="12" cy="25" r="1.8" fill="#38bdf8" />
            <circle cx="18" cy="25" r="1.8" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'check':
      return (
        <div
          style={{ width: size + 26, height: size + 26 }}
          className={`relative flex items-center justify-center rounded-full p-2.5 shadow-[0_12px_30px_rgba(0,210,255,0.6),inset_0_2px_6px_rgba(255,255,255,0.7),inset_0_-4px_8px_rgba(0,0,0,0.8)] border-t-2 border-cyan-200 bg-gradient-to-b from-cyan-300 via-blue-500 to-blue-700 ${className}`}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      );

    case 'clock':
      return (
        <div
          style={containerStyle}
          className={`relative flex items-center justify-center rounded-2xl p-2.5 ${className}`}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#182944] via-[#0b1626] to-[#040810] border-t border-sky-400/60 border-b-2 border-b-[#02050a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.9)]" />
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-300 relative z-10"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      );

    case 'lock':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );

    default:
      return null;
  }
};
