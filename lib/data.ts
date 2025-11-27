export type NationalSnapshot = {
  pulse: number;
  pulseChange: number;
  flow: number;
  fairPriceIndex: number;
  hotspots: { name: string; pulse: number; delta: number }[];
  coolspots: { name: string; pulse: number; delta: number }[];
  stream: { area: string; text: string }[];
};

export type MunicipalitySnapshot = {
  slug: string;
  name: string;
  pulse: number;
  pulseChange: number;
  mode: "HEATING" | "COOLING" | "STABLE";
  velocityPercent: number;
  velocityDeltaHours: number;
  flowNewWeek: number;
  flowRemovedWeek: number;
  fairPriceIndex: number;
  neighborhoods: {
    name: string;
    pulse: number;
    flow: number;
    fairPrice: number;
    velocity: number;
    delta: number;
  }[];
  events: { title: string; text: string }[];
};

export type DistrictSnapshot = {
  municipalitySlug: string;
  slug: string;
  name: string;
  pulse: number;
  details: string;
};

// Gør MUNICIPALITIES til et “almindeligt” typed array, så includes() ikke fejler
export const MUNICIPALITIES: {
  slug: string;
  name: string;
  districts: string[];
}[] = [
  {
    slug: "koebenhavn",
    name: "København",
    districts: [
      "norrebro",
      "vesterbro",
      "osterbro",
      "amager-oest",
      "amager-vest",
    ],
  },
  {
    slug: "aarhus",
    name: "Aarhus",
    districts: ["indre-by", "trige"],
  },
];

export async function getNationalSnapshot(): Promise<NationalSnapshot> {
  // TODO: replace with real data / Supabase
  return {
    pulse: 68,
    pulseChange: 12,
    flow: 1842,
    fairPriceIndex: -3,
    hotspots: [
      { name: "Kalundborg", pulse: 74, delta: 6 },
      { name: "Aarhus", pulse: 71, delta: 5 },
      { name: "Glostrup", pulse: 69, delta: 4 },
    ],
    coolspots: [
      { name: "Kolding", pulse: 44, delta: -5 },
      { name: "Herning", pulse: 47, delta: -4 },
      { name: "Vejen", pulse: 49, delta: -3 },
    ],
    stream: [
      { area: "Aarhus C", text: "4 nye lejeboliger de sidste 2 timer" },
      { area: "Frederiksberg", text: "2 boliger fjernet igen" },
      { area: "Horsens", text: "Medianpris -2% denne uge" },
    ],
  };
}

export async function getMunicipalitySnapshot(
  slug: string,
): Promise<MunicipalitySnapshot | null> {
  const muni = MUNICIPALITIES.find((m) => m.slug === slug);
  if (!muni) return null;

  // Simple mock; in real life base on slug
  return {
    slug,
    name: muni.name,
    pulse: 74,
    pulseChange: 6,
    mode: "HEATING",
    velocityPercent: 41,
    velocityDeltaHours: 45,
    flowNewWeek: 312,
    flowRemovedWeek: 296,
    fairPriceIndex: 4,
    neighborhoods: [
      {
        name: "Nørrebro",
        pulse: 83,
        flow: 25,
        fairPrice: 4,
        velocity: 52,
        delta: 5,
      },
      {
        name: "Vesterbro",
        pulse: 76,
        flow: 12,
        fairPrice: 6,
        velocity: 48,
        delta: 3,
      },
      {
        name: "Østerbro",
        pulse: 65,
        flow: 4,
        fairPrice: -2,
        velocity: 32,
        delta: 1,
      },
    ],
    events: [
      { title: "Vesterbro", text: "14 nye listings de sidste 24 timer" },
      { title: "Amager Ø", text: "5 boliger fjernet igen" },
      { title: "Nørrebro", text: "Fair price spike: +8% denne uge" },
    ],
  };
}

export async function getDistrictSnapshot(
  municipalitySlug: string,
  districtSlug: string,
): Promise<DistrictSnapshot | null> {
  const muni = MUNICIPALITIES.find((m) => m.slug === municipalitySlug);
  if (!muni || !muni.districts.includes(districtSlug)) return null;

  return {
    municipalitySlug,
    slug: districtSlug,
    name:
      districtSlug === "norrebro"
        ? "Nørrebro"
        : districtSlug === "vesterbro"
        ? "Vesterbro"
        : districtSlug === "osterbro"
        ? "Østerbro"
        : districtSlug === "amager-oest"
        ? "Amager Øst"
        : districtSlug === "amager-vest"
        ? "Amager Vest"
        : districtSlug,
    pulse: 83,
    details:
      "Nørrebro er blandt de mest aktive områder i København lige nu – hurtig omsætning og høj efterspørgsel.",
  };
}
