import styles from "./DKMapHeat.module.css";

type Props = {
  variant?: "national" | "municipality";
  overlay?: React.ReactNode;
};

export function DKMapHeat({ variant = "national", overlay }: Props) {
  const label =
    variant === "national" ? "Danmark – nationalt heatmap" : "Kommunekort";

  return (
    <section className={styles.card} aria-label={label}>
      <div className={styles.canvas}>
        <div className={styles.gradientLayer} />
        <div className={styles.gridLayer} />
        <div className={styles.dkShape} />
        <div className={styles.hotspotsLayer} />
        <div className={styles.ekgLayer} />
      </div>

      {overlay && <div className={styles.overlay}>{overlay}</div>}
    </section>
  );
}