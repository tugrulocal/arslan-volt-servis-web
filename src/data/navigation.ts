export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Yorumlar", href: "/yorumlar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
] satisfies NavigationItem[];
