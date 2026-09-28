export type Clue = { answer: string; clue: Record<string, string> };

export const CLUES: Clue[] = [
  { answer: "چیا", clue: { ckb: "بەرزایییەکی گەورەی بەرد و سەوزایی", en: "A great rise of rock and green", kmr: "Bilindahiyeke mezin", ar: "مرتفع صخري كبير" } },
  { answer: "چای", clue: { ckb: "خواردنەوەی هەموو کۆڕ و میواندارییەک", en: "The drink of every gathering", kmr: "Vexwarina her civînê", ar: "شراب كل مجلس" } },
  { answer: "دەف", clue: { ckb: "ئامێرێکی کوردی لە پێست و دار", en: "A Kurdish frame drum of skin and wood", kmr: "Amûrekî çerm û dar", ar: "دف من جلد وخشب" } },
  { answer: "نەورۆز", clue: { ckb: "سەری ساڵ و ئاگر و دەرەوە", en: "The new year, fire, and the open air", kmr: "Sersala agir", ar: "رأس السنة والنار" } },
  { answer: "گەنم", clue: { ckb: "دانەوێڵەی نان و لەپی نانەوا", en: "The grain of bread and the baker’s tray", kmr: "Genimê nan", ar: "حبّة الخبز" } },
  { answer: "پەرتووک", clue: { ckb: "دەقێکی بەستراو کە دەستی لێ دەدەیت", en: "A bound text you hold in the hand", kmr: "Nivîseke girêdayî", ar: "نص مجلد" } },
  { answer: "هەور", clue: { ckb: "ئەوەی ئاسمان دادەپۆشێت و باران دەهێنێت", en: "What covers the sky and brings rain", kmr: "Ya ku baranê tîne", ar: "ما يغطي السماء" } },
  { answer: "قەڵا", clue: { ckb: "گردێکی نیشتمانی لە ناوەڕاستی هەولێر", en: "The inhabited mound at the heart of Hewlêr", kmr: "Girê Hewlêrê", ar: "تل في قلب أربيل" } },
  { answer: "زمان", clue: { ckb: "ئەوەی پێی دەنووسین و پێی دەژین", en: "What we write with and live in", kmr: "Ya ku em pê dijîn", ar: "ما نكتب به ونحيا فيه" } },
  { answer: "بازاڕ", clue: { ckb: "شوێنی نرخ و قوماش و دەنگ", en: "A place of price, cloth, and noise", kmr: "Cihê biha û qumaşê", ar: "مكان السعر والقماش" } },
];

export function clueText(lang: string, clue: Record<string, string>): string {
  return clue[lang] || clue.en || clue.ckb || "";
}

export function lettersOf(word: string): string[] {
  return Array.from(word);
}

export function shuffle(word: string, salt: number): string[] {
  const chars = lettersOf(word);
  const arr = [...chars];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.abs((salt * (i + 3) * 17 + i * 13) % (i + 1));
    const a = arr[i];
    const b = arr[j];
    if (a !== undefined && b !== undefined) {
      arr[i] = b;
      arr[j] = a;
    }
  }
  if (arr.join("") === word && arr.length > 1) {
    const first = arr[0];
    const second = arr[1];
    if (first !== undefined && second !== undefined) {
      arr[0] = second;
      arr[1] = first;
    }
  }
  return arr;
}
