// app/components/ByPulsMap.tsx
"use client";

import styles from "./ByPulsMap.module.css";
import { MUNICIPALITIES } from "../../lib/data";

type Props = {
  selectedMunicipality?: string;
  onSelectMunicipality?: (slug: string) => void;
};

/**
 * ByPulsMap
 *
 * Interaktivt DK-kort baseret på SVG.
 * - Klar til 98 kommuner (én <path> pr. kommune)
 * - selectedMunicipality highlightes
 * - onSelectMunicipality kaldes ved klik
 *
 * LIGE NU bruger vi kun få dummy-paths som placeholders.
 * Du kan senere indsætte rigtigt kommune-SVG ved at udskifte
 * MUNICIPALITY_PATHS-arrayet.
 */

type MunicipalityPath = {
  slug: string;
  name: string;
  d: string;
};

const MUNICIPALITY_PATHS: MunicipalityPath[] = [
  // !!! PLACEHOLDER-GEOMETRI !!!
  // Disse er kun illustrative. Senere skal de erstattes med
  // rigtige kommune-paths (fx genereret fra GeoJSON).
  {
    slug: "koebenhavn",
    name: "København",
    d: "M210 260 C 210 220, 250 210, 270 230 C 290 250, 290 290, 270 310 C 250 330, 220 330, 205 310 C 190 290, 190 280, 210 260 Z",
  },
  {
    slug: "aarhus",
    name: "Aarhus",
    d: "M190 190 C 200 170, 225 165, 240 175 C 255 185, 260 210, 250 225 C 240 240, 215 245, 200 235 C 185 225, 180 210, 190 190 Z",
  },
  {
    slug: "odense",
    name: "Odense",
    d: "M150 300 C 160 285, 180 280, 195 288 C 210 296, 215 315, 208 328 C 200 342, 180 348, 166 342 C 152 335, 140 320, 150 300 Z",
  },
  {
    slug: "aalborg",
    name: "Aalborg",
    d: "M200 130 C 215 120, 235 120, 248 130 C 260 140, 262 160, 252 172 C 242 184, 220 188, 206 180 C 192 172, 185 150, 200 130 Z",
  },
  {
    slug: "esbjerg",
    name: "Esbjerg",
    d: "M110 260 C 120 245, 140 240, 155 248 C 170 255, 176 272, 170 286 C 163 300, 144 308, 130 305 C 116 300, 100 280, 110 260 Z",
  },
];

export function ByPulsMap({ selectedMunicipality, onSelectMunicipality }: Props) {
  const handleClick = (slug: string) => {
    if (onSelectMunicipality) onSelectMunicipality(slug);
  };

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 400 600"
      role="img"
      aria-label="Danmarkskort opdelt i kommuner"
    >
      {/* Baggrunds-glow for hele DK */}
      <defs>
        <radialGradient id="bypuls-glow" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#22c55e" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>

        <filter id="bypuls-softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.15  0 0 0 0 0.95  0 0 0 0 0.7  0 0 0 0.9 0"
          />
        </filter>
      </defs>

      {/* DK-"silhuet" baggrund */}
      <g className={styles.dkBase}>
        <ellipse
          cx="220"
          cy="260"
          rx="120"
          ry="170"
          fill="url(#bypuls-glow)"
          filter="url(#bypuls-softGlow)"
        />
      </g>

      {/* Kommuner */}
      <g className={styles.municipalities}>
        {MUNICIPALITY_PATHS.map((m) => {
          const isSelected = selectedMunicipality === m.slug;
          const isKnown = MUNICIPALITIES.some((x) => x.slug === m.slug);

          return (
            <path
              key={m.slug}
              d={m.d}
              className={[
                styles.muni,
                isSelected ? styles.muniSelected : "",
                !isKnown ? styles.muniUnknown : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleClick(m.slug)}
              data-slug={m.slug}
            />
          );
        })}
      </g>

      {/* små hotspots-prikker for stemning */}
      <g className={styles.hotspots}>
        <circle cx="230" cy="270" r="10" />
        <circle cx="210" cy="220" r="6" />
        <circle cx="255" cy="230" r="5" />
        <circle cx="190" cy="300" r="5" />
        <circle cx="170" cy="260" r="4" />
      </g>
    </svg>
  );
}