"use client";

import styles from "./ByPulsMap.module.css";

type Props = {
  selectedMunicipality?: string;
  onSelectMunicipality?: (slug: string) => void;
};

/**
 * ByPulsMap – stylized Danmarkskort
 * - Jylland, Fyn, Sjælland, Bornholm som separate shapes
 * - Neon edge + hotspots
 * - Klar til senere at få kommune-lag lagt ovenpå
 */

export function ByPulsMap({ onSelectMunicipality }: Props) {
  const handleClick = () => {
    if (onSelectMunicipality) onSelectMunicipality("koebenhavn");
  };

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 400 420"
      role="img"
      aria-label="Danmarkskort med aktivitets-heatmap"
      onClick={handleClick}
    >
      <defs>
        {/* indre glow under landmasser */}
        <radialGradient id="dk-inner" cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>

        <filter id="dk-outer-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              0 0 0 0 0.15
              0 0 0 0 0.95
              0 0 0 0 0.7
              0 0 0 0.85 0
            "
          />
        </filter>
      </defs>

      {/* samlet glow-baggrund */}
      <g className={styles.glow}>
        <ellipse cx="190" cy="230" rx="150" ry="190" fill="url(#dk-inner)" />
        <ellipse
          cx="190"
          cy="230"
          rx="150"
          ry="190"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          filter="url(#dk-outer-glow)"
        />
      </g>

      {/* LANDMASSER */}
      <g className={styles.dkLand}>
        {/* Jylland */}
        <path
          d="
            M140 40
            L165 55 180 80 190 110 195 145
            L195 175 190 205 180 235 165 260
            L155 285 150 310 146 335 140 360
            L130 380 115 390 100 385
            L88 370 82 345 80 320
            L80 295 82 270 88 245
            L95 225 102 205 110 185
            L118 165 125 145 132 125
            L140 105 145 85 145 65
            Z
          "
        />

        {/* Fyn */}
        <path
          d="
            M165 255
            L180 262 192 275 198 292
            L198 310 192 325 182 337
            L170 343 158 340 148 330
            L142 315 142 298 148 282
            Z
          "
        />

        {/* Sjælland */}
        <path
          d="
            M205 255
            L230 262 252 275 270 295
            L278 315 280 335 275 355
            L265 372 248 385 228 390
            L210 388 196 380 186 365
            L180 345 180 325 185 305
            Z
          "
        />

        {/* Bornholm */}
        <path
          d="
            M310 255
            L323 260 333 272 336 288
            L332 302 320 310 308 308
            L300 298 298 285 302 270
            Z
          "
        />
      </g>

      {/* HOTSPOTS – Kbh, Aarhus, Odense, Aalborg, Esbjerg */}
      <g className={styles.hotspots}>
        {/* København */}
        <circle cx="250" cy="330" r="8" />
        {/* Aarhus */}
        <circle cx="175" cy="210" r="7" />
        {/* Odense */}
        <circle cx="175" cy="295" r="6" />
        {/* Aalborg */}
        <circle cx="170" cy="125" r="6" />
        {/* Esbjerg */}
        <circle cx="125" cy="290" r="5" />
      </g>
    </svg>
  );
}