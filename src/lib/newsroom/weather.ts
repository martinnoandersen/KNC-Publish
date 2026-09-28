export type Condition = "sun" | "cloud" | "rain" | "wind" | "mist";

export const CITIES: { id: string; base: number; name: Record<string, string> }[] = [
  { id: "hewler", base: 24, name: { ckb: "هەولێر", en: "Hewlêr", kmr: "Hewlêr", ar: "أربيل" } },
  { id: "slemani", base: 22, name: { ckb: "سلێمانی", en: "Silêmanî", kmr: "Silêmanî", ar: "السليمانية" } },
  { id: "duhok", base: 20, name: { ckb: "دهۆک", en: "Dihok", kmr: "Dihok", ar: "دهوك" } },
  { id: "kerkuk", base: 27, name: { ckb: "کەرکوک", en: "Kerkûk", kmr: "Kerkûk", ar: "كركوك" } },
  { id: "helebce", base: 23, name: { ckb: "هەڵەبجە", en: "Helebce", kmr: "Helebce", ar: "حلبجة" } },
  { id: "amedi", base: 18, name: { ckb: "ئامێدی", en: "Amedî", kmr: "Amedî", ar: "العمادية" } },
];

function unit(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const ORDER: Condition[] = ["sun", "cloud", "mist", "wind", "rain", "cloud", "sun"];

export type DayCast = { offset: number; high: number; low: number; cond: Condition };
export type HourCast = { hour: number; temp: number; cond: Condition };

export function cityOf(id: string) {
  return CITIES.find((city) => city.id === id) ?? CITIES[0];
}

export function forecast(cityId: string, now = new Date()) {
  const city = cityOf(cityId);
  const today = Math.floor(now.getTime() / 86400000);
  const days: DayCast[] = Array.from({ length: 7 }, (_, offset) => {
    const u = unit(today + offset * 13 + city.base * 3);
    const high = Math.round(city.base + (u - 0.45) * 10 - offset * 0.15);
    const low = high - 7 - Math.round(u * 3);
    const cond = ORDER[Math.floor(u * ORDER.length) % ORDER.length] ?? "cloud";
    return { offset, high, low, cond };
  });
  const todayCast = days[0] ?? { offset: 0, high: city.base, low: city.base - 8, cond: "sun" as Condition };
  const hour = now.getHours();
  const hours: HourCast[] = Array.from({ length: 12 }, (_, index) => {
    const h = (hour + index) % 24;
    const swing = Math.sin(((h - 4) / 24) * Math.PI * 2);
    const temp = Math.round(todayCast.low + (todayCast.high - todayCast.low) * (0.5 + swing * 0.5));
    const u = unit(today * 20 + h + city.base);
    const cond = ORDER[Math.floor(u * ORDER.length) % ORDER.length] ?? todayCast.cond;
    return { hour: h, temp, cond };
  });
  return { city, days, hours, nowTemp: hours[0]?.temp ?? todayCast.high, cond: todayCast.cond };
}
