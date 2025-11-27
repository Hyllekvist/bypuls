import type { Metadata } from "next";
import { GlobalHeader } from "../components/GlobalHeader";
import { BottomNav } from "../components/BottomNav";

export const metadata: Metadata = {
  title: "ByPuls – Trends",
};

export default async function Page() {
  return (
    <>
      <GlobalHeader />
      <main className="page-inner">
        <h1 style={{ fontSize: 26, marginBottom: 8 }}>Trends</h1>
        <p className="text-muted" style={{ fontSize: 14 }}>
          Her kan du senere se dybere analyser af udviklingen på tværs af Danmark.
        </p>
      </main>
      <BottomNav />
    </>
  );
}
