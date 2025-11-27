import type { Metadata } from "next";
import { getNationalSnapshot } from "../lib/data";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "ByPuls – Boligmarkedet. Live. Lokalt.",
};

export default async function Page() {
  const snapshot = await getNationalSnapshot();

  return <HomeClient snapshot={snapshot} />;
}
