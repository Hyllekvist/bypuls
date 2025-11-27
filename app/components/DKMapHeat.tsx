import styles from "./DKMapHeat.module.css";

type Props = {
  variant?: "national" | "municipality";
};

export function DKMapHeat({ variant = "national" }: Props) {
  const label =
    variant === "national"
      ? "Her kommer DK-kortet med heatmap."
      : "Her kommer zoomet kort for kommunen.";

  return (
    <div className={styles.mapShell} aria-hidden="true">
      <div className={styles.placeholder}>{label}</div>
    </div>
  );
}
