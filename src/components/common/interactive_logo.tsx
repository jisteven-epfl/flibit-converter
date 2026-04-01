import { useState } from 'react';

export function FlipBitInteractive() {
    const [val, setVal] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    const handleClick = () => {
        if (isFlipping) return;

        setIsFlipping(true);
        setTimeout(() => {
            setVal(v => (v === 0 ? 1 : 0));
            setIsFlipping(false);
        }, 450); // Finish animation
    };

    const nextVal = val === 0 ? 1 : 0;

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer inline-flex flex-col items-center group relative"
            style={{ perspective: '1200px' }}
            title="Click me!"
        >
            <style>{`
        @keyframes flip-up-anim {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-170deg); }
        }
        .animate-flip-page {
          animation: flip-up-anim 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .page-origin {
          transform-origin: 50% 24px;
          transform-style: preserve-3d;
        }
      `}</style>

            <svg
                viewBox="0 0 120 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-auto drop-shadow-sm group-hover:scale-[1.05] group-active:scale-95 transition-transform duration-300 select-none"
            >
                {/* Ombre portée */}
                <rect x="6" y="10" width="108" height="148" rx="12" fill="#0f172a" opacity="0.2" />

                {/* Panneau principal (Corps du calepin) */}
                <rect x="2" y="2" width="116" height="156" rx="14" fill="#ffffff" stroke="#8ec5ff" strokeWidth="4" />

                {/* UNDER-PAGE (Shows the next value that will be revealed) */}
                <g>
                    <rect x="12" y="24" width="96" height="124" rx="8" fill="#8ec5ff" fillOpacity="0.1" />
                    <text x="60" y="118" textAnchor="middle" fill="#8ec5ff" fontSize="88" fontWeight="900" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">
                        {nextVal}
                    </text>
                    <rect x="12" y="24" width="96" height="62" rx="8" fill="url(#shine-int)" opacity="0.3" />
                </g>

                {/* TOP PAGE (The page that flips up. Must have solid white background to hide under-page) */}
                <g className={`page-origin ${isFlipping ? 'animate-flip-page' : ''}`}>
                    <rect x="12" y="24" width="96" height="124" rx="8" fill="#ffffff" />
                    <rect x="12" y="24" width="96" height="124" rx="8" fill="#8ec5ff" fillOpacity="0.1" />
                    <text x="60" y="118" textAnchor="middle" fill="#8ec5ff" fontSize="88" fontWeight="900" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">
                        {val}
                    </text>
                    <rect x="12" y="24" width="96" height="62" rx="8" fill="url(#shine-int)" opacity="0.3" />
                </g>

                {/* Anneaux (spirale) en blue-300 - Drawn on top so the page flips UNDER them */}
                <g fill="#8ec5ff">
                    <rect x="25" y="-2" width="10" height="28" rx="5" />
                    <rect x="45" y="-2" width="10" height="28" rx="5" />
                    <rect x="65" y="-2" width="10" height="28" rx="5" />
                    <rect x="85" y="-2" width="10" height="28" rx="5" />
                </g>

                <defs>
                    <linearGradient id="shine-int" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            <p className="absolute top-[110%] left-1/2 -translate-x-1/2 text-center text-[10px] text-white/90 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-blue-400/90 px-2 py-0.5 rounded-full drop-shadow-sm pointer-events-none">
                Click to flip!
            </p>
        </div>
    );
}