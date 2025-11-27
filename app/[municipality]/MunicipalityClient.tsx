"use client";

import { GlobalHeader } from "../components/GlobalHeader";
import { BottomNav } from "../components/BottomNav";
import { PulseGauge } from "../components/PulseGauge";
import { DKMapHeat } from "../components/DKMapHeat";
import { MarketStream } from "../components/MarketStream";
import { NeighborhoodTable } from "../components/NeighborhoodTable";
import type { MunicipalitySnapshot } from "../../lib/data";
import { MetricCard } from "../components/MetricCard";
import { formatNumber, formatPercent } from "../../lib/format";

type Props = {
  snapshot: MunicipalitySnapshot;
};

export function MunicipalityClient({ snapshot }: Props) {
  const {
    name,
    pulse,
    pulseChange,
    flowNewWeek,
    flowRemovedWeek,
    fairPriceIndex,
    mode,
    velocityPercent,
    velocityDeltaHours,
    neighborhoods,
    events,
  } = snapshot;

  const net = flowNewWeek - flowRemovedWeek;

  return (
    <>
      <GlobalHeader />
      <main className="page-inner">
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <p className="text-muted" style={{ fontSize: 13 }}>
              Kommune
            </p>
            <h1 style={{ fontSize: 28, margin: "0 0 4px" }}>{name}</h1>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Live-overblik over boligpulsen i {name}.
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          <DKMapHeat variant="municipality" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            <PulseGauge value={pulse} delta={pulseChange} />
          </div>
          <MarketStream
            items={events.map((e) => ({ area: e.title, text: e.text }))}
          />
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
            label="Market mode"
            value={mode === "HEATING" ? "Heating" : mode === "COOLING" ? "Cooling" : "Stable"}
            sub={`Velocity: ${velocityPercent}% boliger forsvinder hurtigere end landsgennemsnittet (~${velocityDeltaHours} timer)`}
          />
          <MetricCard
            label="Flow (7 dage)"
            value={formatNumber(flowNewWeek)}
            sub={`Fjernet: ${formatNumber(flowRemovedWeek)} · Netto: ${
              net >= 0 ? "+" : ""
            }${formatNumber(net)}`}
          />
          <MetricCard
            label="Fair Price Index"
            value={formatPercent(fairPriceIndex)}
            sub="Afvigelse vs. forventet prisniveau i kommunen"
          />
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 16, marginBottom: 10 }}>
            Bydels-overblik
          </h2>
          <NeighborhoodTable rows={neighborhoods} />
        </section>
      </main>
      <BottomNav />
    </>
  );
}
