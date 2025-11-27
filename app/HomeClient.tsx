"use client";

import { GlobalHeader } from "./components/GlobalHeader";
import { BottomNav } from "./components/BottomNav";
import { PulseGauge } from "./components/PulseGauge";
import { MetricCard } from "./components/MetricCard";
import { DKMapHeat } from "./components/DKMapHeat";
import { MarketStream } from "./components/MarketStream";
import type { NationalSnapshot } from "../lib/data";
import { formatNumber, formatPercent } from "../lib/format";

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
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "32px",
                lineHeight: 1.1,
                margin: "4px 0 12px",
              }}
            >
              Boligmarkedet.
              <br />
              Live. Lokalt.
            </h1>
            <p className="text-muted" style={{ maxWidth: 360, fontSize: 14 }}>
              ByPuls måler temperaturen på boligmarkedet i Danmark – baseret på
              real-time data på tværs af kommuner og bydele.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr)",
              gap: 16,
            }}
          >
            <DKMapHeat variant="national" />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              <PulseGauge value={pulse} delta={pulseChange} />
            </div>
            <MarketStream items={stream} />
          </div>
        </section>

        <section
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 12,
          }}
        >
          <MetricCard
            label="Puls"
            value={String(pulse)}
            sub={`+${pulseChange} i dag`}
          />
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

        <section
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          <div>
            <h2 style={{ fontSize: 16, marginBottom: 8 }}>
              Top kommuner i stigning
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 14,
              }}
            >
              {hotspots.map((h) => (
                <li
                  key={h.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                  }}
                >
                  <span>{h.name}</span>
                  <span style={{ color: "#bbf7d0" }}>
                    {h.pulse} (+{h.delta})
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ fontSize: 16, marginBottom: 8 }}>
              Top kommuner i fald
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 14,
              }}
            >
              {coolspots.map((c) => (
                <li
                  key={c.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                  }}
                >
                  <span>{c.name}</span>
                  <span style={{ color: "#fecaca" }}>
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
