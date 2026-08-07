export type SiteConfig = {
  name: string;
  slogan: string;
  description: string;
  locale: "tr-TR";
  language: "tr";
  phone: string;
  whatsapp: string;
  address: string;
  mapEmbedUrl: string;
  serviceArea: string;
  hours: string;
};

export const siteConfig = {
  name: "ARSLAN VOLT SERVİS",
  slogan: "IĞDIR'IN TEKNİK SERVİSİ",
  description:
    "Iğdır genelinde elektrik, tesisat, ısıtma-soğutma ve ev aletleri için teknik servis hizmetleri.",
  locale: "tr-TR",
  language: "tr",
  phone: "0542 783 2518",
  whatsapp: "0542 783 2518",
  address:
    "Bağlar Mahallesi, Mehmet Akif Ersoy Caddesi 66A, Merkez/Iğdır",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d736.2907117910913!2d44.036961694457155!3d39.92776695422322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406b20e97f0b1629%3A0xb782b64cfab68613!2zQmHEn2xhciwgTWVobWV0IEFraWYgQ2QuIE5vOjgxLCA3NjAwMCBJxJ9kxLFyIE1lcmtlei9JxJ9kxLFy!5e0!3m2!1str!2str!4v1786116147140!5m2!1str!2str",
  serviceArea: "Tüm Iğdır",
  hours: "Her gün 08:00 - 20:00",
} satisfies SiteConfig;

export function hasBusinessValue(value: string): boolean {
  return !value.startsWith("TODO_");
}

export function displayBusinessValue(
  value: string,
  fallback = "Bilgi eklenecek",
): string {
  return hasBusinessValue(value) ? value : fallback;
}

export function getPhoneHref(phone = siteConfig.phone): string | undefined {
  if (!hasBusinessValue(phone)) return undefined;

  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getWhatsAppHref(
  phone = siteConfig.whatsapp,
): string | undefined {
  if (!hasBusinessValue(phone)) return undefined;

  const digits = phone.replace(/\D/g, "");
  const internationalNumber = digits.startsWith("90")
    ? digits
    : digits.startsWith("0")
      ? `90${digits.slice(1)}`
      : digits;

  return `https://wa.me/${internationalNumber}`;
}
