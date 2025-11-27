"use client";

import styles from "./ByPulsMap.module.css";

type Props = {
  selectedMunicipality?: string;
  onSelectMunicipality?: (slug: string) => void;
};

/**
 * ByPulsMap v2
 * - Tegner en DK-silhuet (approx) som SVG
 * - Neon edge + indre glow
 * - Hotspots placeret som større byer
 * - Klar til senere at få rigtige kommune-paths ovenpå
 */

export function ByPulsMap({ selectedMunicipality, onSelectMunicipality }: Props) {
  // Vi bruger slug senere til at farve enkelte områder; lige nu kun nationalt view
  const handleClick = () => {
    if (onSelectMunicipality) onSelectMunicipality("koebenhavn");
  };

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 400 600"
      role="img"
      aria-label="Danmarkskort med aktivitets-heatmap"
      onClick={handleClick}
    >
      <defs>
        {/* indre fill-gradiant i DK */}
        <radialGradient id="dk-fill" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#22c55e" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>

        {/* soft glow udenom kanten */}
        <filter id="dk-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              0 0 0 0 0.15
              0 0 0 0 0.95
              0 0 0 0 0.7
              0 0 0 0.8 0
            "
          />
        </filter>
      </defs>

      {/* baggrunds-glow */}
      <g className={styles.glow}>
        <ellipse cx="210" cy="280" rx="135" ry="190" fill="url(#dk-fill)" />
        <ellipse
          cx="210"
          cy="280"
          rx="135"
          ry="190"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          filter="url(#dk-glow)"
        />
      </g>

      {/* DK-silhuet – approx, men læseligt som Danmark */}
      <path
        className={styles.dkShape}
        d="
          M180 60
          L205 70 225 95 230 125 225 155
          L240 190 255 220 270 250 270 280
          L265 305 255 330 245 350 245 375
          L240 400 230 420 215 440 205 460
          L195 485 180 505 160 520 140 525
          L120 520 110 505 100 480 95 450
          L90 420 80 390 75 360 72 330
          L72 300 75 275 80 250
          L90 230 100 210 110 190
          L120 170 132 150 140 130
          L150 110 160 90 170 75
          Z
        "
      />

      {/* små hotspots – ca. som byer */}
      <g className={styles.hotspots}>
        {/* København-område */}
        <circle cx="235" cy="340" r="8" />
        {/* Aarhus-område */}
        <circle cx="210" cy="240" r="7" />
        {/* Odense-område */}
        <circle cx="190" cy="320" r="6" />
        {/* Aalborg-område */}
        <circle cx="205" cy="170" r="6" />
        {/* Esbjerg-område */}
        <circle cx="145" cy="310" r="5" />
      </g>

      {/* diskret grid ovenpå kortet */}
      <rect className={styles.gridOverlay} x="60" y="90" width="300" height="380" />
    </svg>
  );
}