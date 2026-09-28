export type Instrument = {
  id: string;
  seed: number;
  start: number;
  vol: number;
  digits: number;
  unit: string;
  name: Record<string, string>;
};

export const INSTRUMENTS: Instrument[] = [
  { id: "brent", seed: 11, start: 79, vol: 0.012, digits: 2, unit: "$", name: { ckb: "نەوتی برێنت", en: "Brent crude", kmr: "Nefta Brent", ar: "خام برنت" } },
  { id: "gold", seed: 23, start: 2330, vol: 0.008, digits: 0, unit: "$", name: { ckb: "زێڕ", en: "Gold", kmr: "Zêr", ar: "الذهب" } },
  { id: "usd", seed: 41, start: 1310, vol: 0.002, digits: 0, unit: "IQD", name: { ckb: "دۆلار / دینار", en: "Dollar / dinar", kmr: "Dolar / dînar", ar: "دولار / دينار" } },
  { id: "eur", seed: 57, start: 1425, vol: 0.003, digits: 0, unit: "IQD", name: { ckb: "یۆرۆ / دینار", en: "Euro / dinar", kmr: "Euro / dînar", ar: "يورو / دينار" } },
  { id: "wheat", seed: 73, start: 248, vol: 0.01, digits: 1, unit: "$", name: { ckb: "گەنم", en: "Wheat", kmr: "Genim", ar: "القمح" } },
];

export type RangeId = "1w" | "1m" | "3m";

export const RANGES: { id: RangeId; days: number }[] = [
  { id: "1w", days: 7 },
  { id: "1m", days: 30 },
  { id: "3m", days: 90 },
];

export function instrument(id: string): Instrument {
  return INSTRUMENTS.find((item) => item.id === id) ?? INSTRUMENTS[0];
}

export function label(lang: string, name: Record<string, string>): string {
  return name[lang] || name.en || name.ckb || "";
}

export type Point = { day: string; value: number };

export function series(id: string, range: RangeId): { item: Instrument; points: Point[] } {
  const item = instrument(id);
  const days = RANGES.find((itemRange) => itemRange.id === range)?.days ?? 30;
  const today = Math.floor(Date.now() / 86400000);
  let value = item.start;
  const points: Point[] = [];
  const origin = today - 420;
  for (let day = origin; day <= today; day += 1) {
    const n = ((item.seed * (day + 17) * 9301 + 49297) % 233280) / 233280;
    value = Math.max(0.5, value * (1 + (n - 0.49) * item.vol));
    if (day >= today - (days - 1)) {
      points.push({
        day: new Date(day * 86400000).toISOString().slice(0, 10),
        value: Number(value.toFixed(item.digits)),
      });
    }
  }
  return { item, points };
}

export function summarize(points: Point[]) {
  const last = points.at(-1)?.value ?? 0;
  const first = points[0]?.value ?? last;
  const high = points.reduce((max, point) => Math.max(max, point.value), last);
  const low = points.reduce((min, point) => Math.min(min, point.value), last);
  const change = last - first;
  const pct = first ? (change / first) * 100 : 0;
  return { last, first, high, low, change, pct };
}

export function formatNum(value: number, digits: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
