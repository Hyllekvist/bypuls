import type { Metadata } from "next";
import {
  MUNICIPALITIES,
  getMunicipalitySnapshot,
} from "../../lib/data";
import { MunicipalityClient } from "./MunicipalityClient";

type Props = {
  params: { municipality: string };
};

export async function generateStaticParams() {
  return MUNICIPALITIES.map((m) => ({ municipality: m.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const snapshot = await getMunicipalitySnapshot(params.municipality);

  if (!snapshot) {
    return {
      title: "ByPuls – Ukendt kommune",
    };
  }

  return {
    title: `ByPuls – ${snapshot.name}`,
    description: `Live-overblik over boligmarkedet i ${snapshot.name}.`,
  };
}

export default async function Page({ params }: Props) {
  const snapshot = await getMunicipalitySnapshot(params.municipality);

  if (!snapshot) {
    return <div className="page-inner">Ukendt kommune.</div>;
  }

  return <MunicipalityClient snapshot={snapshot} />;
}
