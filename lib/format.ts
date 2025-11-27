export function formatNumber(n: number): string {
  return n.toLocaleString("da-DK");
}

export function formatPercent(p: number): string {
  const sign = p > 0 ? "+" : "";
  return `${sign}${p.toFixed(0)}%`;
}
