// app/components/DKMapHeat.tsx
import styles from "./DKMapHeat.module.css";
import { ByPulsMap } from "./ByPulsMap";

type Props = {
  variant?: "national" | "municipality";
  overlay?: React.ReactNode;
  selectedMunicipality?: string;
  onSelectMunicipality?: (slug: string) => void;
};

export function DKMapHeat({
  variant = "national",
  overlay,
  selectedMunicipality,
  onSelectMunicipality,
}: Props) {
  const label =
    variant === "national" ? "Danmark – nationalt heatmap" : "Kommunekort";

  return (
    <section className={styles.card} aria-label={label}>
      <div className={styles.canvas}>
        <div className={styles.gridLayer} />
        <ByPulsMap
          selectedMunicipality={selectedMunicipality}
          onSelectMunicipality={onSelectMunicipality}
        />
      </div>

      {/* PulseGauge overlay håndteres stadig her */}
      {overlay && <div className={styles.overlay}>{overlay}</div>}
    </section>
  );
}