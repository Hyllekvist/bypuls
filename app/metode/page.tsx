import type { Metadata } from "next";
import { GlobalHeader } from "../components/GlobalHeader";
import { BottomNav } from "../components/BottomNav";

export const metadata: Metadata = {
  title: "ByPuls – Metode",
};

export default function Page() {
  return (
    <>
      <GlobalHeader />
      <main className="page-inner">
        <h1 style={{ fontSize: 26, marginBottom: 8 }}>Metode</h1>
        <p className="text-muted" style={{ fontSize: 14, maxWidth: 640 }}>
          ByPuls er bygget til at give et enkelt, samlet billede af et komplekst
          boligmarked. Her beskriver du senere, hvordan Pulse, Flow, Fair Price
          Index og Velocity bliver beregnet – så både medier, investorer og
          boligsøgende kan stole på tallene.
        </p>
      </main>
      <BottomNav />
    </>
  );
}
