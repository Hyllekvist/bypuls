import type { Metadata } from "next";
import {
  MUNICIPALITIES,
  getDistrictSnapshot,
} from "../../../lib/data";
import { DistrictClient } from "./DistrictClient";

type Props = {
  params: { municipality: string; district: string };
};

export async function generateStaticParams() {
  const params: { municipality: string; district: string }[] = [];

  for (const muni of MUNICIPALITIES) {
    for (const district of muni.districts) {
      params.push({ municipality: muni.slug, district });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const snapshot = await getDistrictSnapshot(
    params.municipality,
    params.district,
  );

  if (!snapshot) {
    return {
      title: "ByPuls – Ukendt bydel",
    };
  }

  return {
    title: `ByPuls – ${snapshot.name}`,
    description: `Live-overblik over boligmarkedet i ${snapshot.name}.`,
  };
}

export default async function Page({ params }: Props) {
  const snapshot = await getDistrictSnapshot(
    params.municipality,
    params.district,
  );

  if (!snapshot) {
    return <div className="page-inner">Ukendt bydel.</div>;
  }

  return <DistrictClient snapshot={snapshot} />;
}
