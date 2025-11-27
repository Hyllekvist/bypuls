import styles from "./NeighborhoodTable.module.css";

type Row = {
  name: string;
  pulse: number;
  flow: number;
  fairPrice: number;
  velocity: number;
  delta: number;
};

type Props = {
  rows: Row[];
};

export function NeighborhoodTable({ rows }: Props) {
  return (
    <section className={styles.table}>
      <div className={styles.head}>
        <div>Bydel</div>
        <div>Pulse</div>
        <div>Flow</div>
        <div>Fair price</div>
        <div>Velocity</div>
      </div>
      {rows.map((row) => (
        <div key={row.name} className={styles.row}>
          <div className={styles.name}>{row.name}</div>
          <div>
            {row.pulse}{" "}
            <span
              className={
                row.delta >= 0 ? styles.badgeUp : styles.badgeDown
              }
            >
              {row.delta >= 0 ? "+" : "−"}
              {Math.abs(row.delta)}
            </span>
          </div>
          <div>{row.flow}</div>
          <div>{row.fairPrice}%</div>
          <div>{row.velocity}%</div>
        </div>
      ))}
    </section>
  );
}
