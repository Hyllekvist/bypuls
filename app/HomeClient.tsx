"use client";

import { GlobalHeader } from "./components/GlobalHeader";
import { BottomNav } from "./components/BottomNav";
import { PulseGauge } from "./components/PulseGauge";
import { MetricCard } from "./components/MetricCard";
import { DKMapHeat } from "./components/DKMapHeat";
import { MarketStream } from "./components/MarketStream";
import type { NationalSnapshot } from "../lib/data";
import { formatNumber, formatPercent } from "../lib/format";
import styles from "./HomeHero.module.css";

type Props = {
  snapshot: NationalSnapshot;
};

export function HomeClient({ snapshot }: Props) {
  const { pulse, pulseChange, flow, fairPriceIndex, hotspots, coolspots, stream } =
    snapshot;

  return (
    <>
      <GlobalHeader />
      <main className="page-inner">
        {/* HERO GRID */}
        <section className={styles.heroGrid}>
          {/* Venstre tekstpanel */}
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Boligmarkedet.
              <br />
              Live. Lokalt.
            </h1>
            <p className={styles.heroLead}>
              ByPuls måler temperaturen på boligmarkedet i Danmark – baseret på
              real-time data på tværs af kommuner og bydele.
            </p>

            <div className={styles.heroBullets}>
              <div>
                <div className={styles.bulletLabel}>National Pulse</div>
                <div className={styles.bulletValue}>{pulse}</div>
                <div className={styles.bulletSub}>+{pulseChange} i dag</div>
              </div>
              <div>
                <div className={styles.bulletLabel}>Flow</div>
                <div className={styles.bulletValue}>{formatNumber(flow)}</div>
                <div className={styles.bulletSub}>Nye listings denne uge</div>
              </div>
            </div>
          </div>

          {/* Midterkort + overlay gauge */}
          <div className={styles.heroMap}>
            <DKMapHeat
              variant="national"
              overlay={<PulseGauge value={pulse} delta={pulseChange} />}
            />
          </div>

          {/* Højre Market Stream panel */}
          <div className={styles.heroStream}>
            <MarketStream items={stream} />
          </div>
        </section>

        {/* METRICS-RAD */}
        <section className={styles.metricsRow}>
          <MetricCard label="Puls" value={String(pulse)} sub={`+${pulseChange} i dag`} />
          <MetricCard
            label="Flow"
            value={formatNumber(flow)}
            sub="Nye listings denne uge"
          />
          <MetricCard
            label="Fair Price Index"
            value={formatPercent(fairPriceIndex)}
            sub="Afvigelse vs. forventet prisniveau"
          />
        </section>

        {/* TOP MOVERS */}
        <section className={styles.moversRow}>
          <div>
            <h2 className={styles.moversTitle}>Top kommuner i stigning</h2>
            <ul className={styles.moversList}>
              {hotspots.map((h) => (
                <li key={h.name} className={styles.moversItem}>
                  <span>{h.name}</span>
                  <span className={styles.moversUp}>
                    {h.pulse} (+{h.delta})
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.moversTitle}>Top kommuner i fald</h2>
            <ul className={styles.moversList}>
              {coolspots.map((c) => (
                <li key={c.name} className={styles.moversItem}>
                  <span>{c.name}</span>
                  <span className={styles.moversDown}>
                    {c.pulse} ({c.delta})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
