import styles from "./MetricCard.module.css";

type Props = {
  label: string;
  value: string;
  sub?: string;
};

export function MetricCard({ label, value, sub }: Props) {
  return (
    <section className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.valueRow}>
        <div className={styles.value}>{value}</div>
      </div>
      {sub ? <div className={styles.sub}>{sub}</div> : null}
    </section>
  );
}
