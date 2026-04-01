export function FlipBitStatic() {
    return (
        <svg
            width="120"
            height="160"
            viewBox="0 0 120 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Ombre portée */}
            <rect
                x="6"
                y="10"
                width="108"
                height="148"
                rx="12"
                fill="#0f172a"
                opacity="0.2"
            />

            {/* Panneau principal (Corps du calepin) */}
            <rect
                x="6"
                y="6"
                width="108"
                height="148"
                rx="12"
                fill="white"
                stroke="#8ec5ff"
                strokeWidth="12"
            />

            {/* Fond du chiffre (Utilisation de blue-300) */}
            <rect
                x="12"
                y="24"
                width="96"
                height="124"
                rx="8"
                fill="#8ec5ff"
                fillOpacity="0.1"
            />

            {/* Anneaux (spirale) en blue-300 */}
            <g fill="#8ec5ff">
                <rect x="25" y="-2" width="10" height="40" rx="5" />
                <rect x="45" y="-2" width="10" height="40" rx="5" />
                <rect x="65" y="-2" width="10" height="40" rx="5" />
                <rect x="85" y="-2" width="10" height="40" rx="5" />
            </g>

            {/* Le chiffre 0 en blue-300 */}
            <text
                x="60"
                y="118"
                textAnchor="middle"
                fill="#8ec5ff"
                fontSize="88"
                fontWeight="900"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            >
                0
            </text>

            {/* Reflet discret */}
            <rect
                x="12"
                y="24"
                width="96"
                height="62"
                rx="8"
                fill="url(#shine)"
                opacity="0.3"
            />

            <defs>
                <linearGradient
                    id="shine"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop
                        offset="100%"
                        stopColor="white"
                        stopOpacity="0"
                    />
                </linearGradient>
            </defs>
        </svg>
    );
}