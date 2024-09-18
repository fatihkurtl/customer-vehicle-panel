// https://fatihkurt.web.tr/blog/nextjs-ve-slugify-kullanm-urlleri-seo-dostu-hale-getirin/

export function slugify(text) {
  const turkishChars = {
    ı: "i",
    ğ: "g",
    ü: "u",
    ş: "s",
    ö: "o",
    ç: "c",
    İ: "I",
    Ğ: "G",
    Ü: "U",
    Ş: "S",
    Ö: "O",
    Ç: "C",
  };

  return text
    .toLowerCase() // Tüm karakterleri küçük harfe çevirir
    .replace(/[^a-z0-9\s]/g, (char) => turkishChars[char] || "") // Türkçe karakterleri dönüştürür
    .trim() // İlk ve son boslukları kaldırır
    .replace(/\s+/g, "-") // Boşlukları "-" ile değiştir
    .replace(/-+/g, "-") // Birden fazla "-" işaretini tek "-" yapar
    .replace(/^-+|-+$/g, ""); // Baş veya sondaki "-" işaretlerini temizler
}
