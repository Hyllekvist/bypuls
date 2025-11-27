import styles from "./DKMapHeat.module.css";

type Props = {
  variant?: "national" | "municipality";
  overlay?: React.ReactNode;
};

export function DKMapHeat({ variant = "national", overlay }: Props) {
  const label =
    variant === "national" ? "Danmark – nationalt heatmap" : "Kommunekort";

  return (
    <div className={styles.mapShell} aria-label={label}>
      {/* baggrunds-glow og “kort” */}
      <div className={styles.gradientLayer} />
      <div className={styles.gridLayer} />
      <div className={styles.hotspotsLayer} />

      {/* overlay (PulseGauge) */}
      {overlay && <div className={styles.overlay}>{overlay}</div>}
    </div>
  );
}
