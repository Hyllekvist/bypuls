"use client";

import { GlobalHeader } from "../../components/GlobalHeader";
import { BottomNav } from "../../components/BottomNav";
import { PulseGauge } from "../../components/PulseGauge";
import { DKMapHeat } from "../../components/DKMapHeat";
import type { DistrictSnapshot } from "../../../lib/data";

type Props = {
  snapshot: DistrictSnapshot;
};

export function DistrictClient({ snapshot }: Props) {
  const { name, pulse, details, municipalitySlug } = snapshot;

  return (
    <>
      <GlobalHeader />
      <main className="page-inner">
        <p className="text-muted" style={{ fontSize: 13 }}>
          {municipalitySlug} · Bydel
        </p>
        <h1 style={{ fontSize: 26, margin: "0 0 6px" }}>{name}</h1>
        <p className="text-muted" style={{ fontSize: 14, marginBottom: 18 }}>
          Live-indsigt i boligpulsen for {name}.
        </p>

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
            <PulseGauge value={pulse} delta={0} />
          </div>
        </section>

        <section style={{ marginTop: 24, fontSize: 14 }}>
          {details}
        </section>
      </main>
      <BottomNav />
    </>
  );
}
