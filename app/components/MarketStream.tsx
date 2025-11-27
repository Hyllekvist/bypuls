import styles from "./MarketStream.module.css";

type Item = {
  area: string;
  text: string;
};

type Props = {
  items: Item[];
};

export function MarketStream({ items }: Props) {
  return (
    <aside className={styles.panel}>
      <div className={styles.titleRow}>
        <div className={styles.title}>Market Stream</div>
      </div>
      {items.map((item, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.itemArea}>{item.area}</div>
          <div className={styles.itemText}>{item.text}</div>
        </div>
      ))}
    </aside>
  );
}
