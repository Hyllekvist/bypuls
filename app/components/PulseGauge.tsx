import styles from "./PulseGauge.module.css";

type Props = {
  value: number;
  delta: number;
};

export function PulseGauge({ value, delta }: Props) {
  const sign = delta > 0 ? "+" : delta < 0 ? "−" : "±";
  const deltaAbs = Math.abs(delta);

  return (
    <div className={styles.wrapper} aria-label={`Pulse ${value}`}>
      <div className={styles.ring} />
      <div className={styles.inner}>
        <div className={styles.label}>Pulse</div>
        <div className={styles.value}>{value}</div>
        <div className={styles.delta}>
          <span>{sign}</span>
          <span>{deltaAbs}</span>
          <span>i dag</span>
        </div>
      </div>
    </div>
  );
}
