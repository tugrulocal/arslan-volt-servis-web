import type { ImageMetadata } from "astro";
import storyCleaningImage from "../assets/services/story-workshop-cleaning-v2.png";
import storyClimateImage from "../assets/services/story-workshop-climate-v2.png";
import storyElectricImage from "../assets/services/story-workshop-electric-v2.png";
import storyHeatingImage from "../assets/services/story-workshop-heating-v2.png";
import storyKitchenImage from "../assets/services/story-workshop-kitchen-v2.png";
import storyPlumbingImage from "../assets/services/story-workshop-plumbing-v2.png";
import storySmallAppliancesImage from "../assets/services/story-workshop-small-appliances-v2.png";

export type ServiceIconKind =
  | "electric"
  | "plumbing"
  | "heating"
  | "climate"
  | "kitchen"
  | "cleaning"
  | "small-appliances";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIconKind;
  image: ImageMetadata;
  scopeItems: readonly string[];
};

export type ServiceStoryScene = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
};

export const services = [
  {
    title: "Elektrik Tesisat İşleri",
    description:
      "Elektrik tesisatıyla ilgili ihtiyacınızı paylaşın; hizmet kapsamını birlikte netleştirelim.",
    icon: "electric",
    image: storyElectricImage,
    scopeItems: [
      "Priz ve Anahtar",
      "Aydınlatma",
      "Sigorta ve Pano",
      "Kablo ve Hat İşleri",
      "Elektrik Arızaları",
      "Tesisat Kontrolü",
    ],
  },
  {
    title: "Sıhhi Tesisat İşleri",
    description:
      "Sıhhi tesisatla ilgili ihtiyacınızı paylaşın; gerekli hizmet adımını birlikte belirleyelim.",
    icon: "plumbing",
    image: storyPlumbingImage,
    scopeItems: [
      "Musluk ve Batarya",
      "Lavabo ve Gider",
      "Sifon ve Rezervuar",
      "Boru ve Bağlantılar",
      "Su Kaçağı Kontrolü",
      "Tesisat Arızaları",
    ],
  },
  {
    title: "Isıtma-Soğutma Sistemleri",
    description:
      "Isıtma ve soğutma sistemlerinizle ilgili ihtiyacınızı paylaşın; uygun hizmet kapsamını birlikte netleştirelim.",
    icon: "heating",
    image: storyHeatingImage,
    scopeItems: [
      "Kombi Temizliği",
      "Şofben",
      "Termosifon",
      "Elektrikli Isıtıcı",
      "Klima",
      "Vantilatör",
    ],
  },
  {
    title: "Mutfak Cihazları",
    description:
      "Fırın, ankastre, mikrodalga, aspiratör, davlumbaz veya ocak ihtiyacınızı paylaşın.",
    icon: "kitchen",
    image: storyKitchenImage,
    scopeItems: [
      "Fırın",
      "Ankastre",
      "Mikrodalga",
      "Aspiratör",
      "Davlumbaz",
      "Ocak",
    ],
  },
  {
    title: "Temizlik Cihazları",
    description:
      "Elektrikli süpürge, robot süpürge veya buharlı temizleyici ihtiyacınızı paylaşın.",
    icon: "cleaning",
    image: storyCleaningImage,
    scopeItems: [
      "Elektrikli Süpürge",
      "Robot Süpürge",
      "Buharlı Temizleyici",
    ],
  },
  {
    title: "Küçük Ev Aletleri",
    description:
      "Blender, mikser, tost makinesi, ütü, su sebili, çay makinesi veya kettle ihtiyacınızı paylaşın.",
    icon: "small-appliances",
    image: storySmallAppliancesImage,
    scopeItems: [
      "Küçük Ev Aletleri",
      "Blender / Mikser",
      "Tost Makinesi",
      "Ütü",
      "Su Sebili",
      "Çay Makinesi",
      "Kettle",
    ],
  },
] satisfies Service[];

export const serviceStoryScenes = [
  {
    id: "electric",
    eyebrow: "Elektrik Tesisat İşleri",
    title: "Elektrik Tesisatı",
    description:
      "Elektrik tesisatıyla ilgili ihtiyacınızı paylaşın; hizmet kapsamını birlikte netleştirelim.",
    image: storyElectricImage,
    imageAlt:
      "Düzenli bir teknik servis tezgâhında elektrik panosu ve tesisat ekipmanları",
  },
  {
    id: "plumbing",
    eyebrow: "Sıhhi Tesisat İşleri",
    title: "Sıhhi Tesisat",
    description:
      "Sıhhi tesisatla ilgili ihtiyacınızı paylaşın; gerekli hizmet adımını birlikte belirleyelim.",
    image: storyPlumbingImage,
    imageAlt:
      "Düzenli bir teknik servis tezgâhında musluk, boru ve sıhhi tesisat ekipmanları",
  },
  {
    id: "heating",
    eyebrow: "Kombi ve Isıtma",
    title: "Kombi Temizliği · Şofben · Termosifon · Elektrikli Isıtıcı",
    description:
      "Isıtma ve sıcak su cihazınızla ilgili ihtiyacınızı paylaşın; hizmet ayrıntılarını birlikte değerlendirelim.",
    image: storyHeatingImage,
    imageAlt:
      "Düzenli bir servis alanında kombi, şofben, termosifon ve elektrikli ısıtıcı",
  },
  {
    id: "climate",
    eyebrow: "İklimlendirme",
    title: "Klima · Vantilatör",
    description:
      "Klima veya vantilatör ihtiyacınızı paylaşın; uygun hizmet kapsamını birlikte netleştirelim.",
    image: storyClimateImage,
    imageAlt: "Teknik servis alanında split klima ve ayaklı vantilatör",
  },
  {
    id: "kitchen",
    eyebrow: "Mutfak Cihazları",
    title: "Fırın · Ankastre · Mikrodalga · Aspiratör · Davlumbaz · Ocak",
    description:
      "Pişirme ve mutfak havalandırma cihazınızla ilgili ihtiyacınızı paylaşın; ayrıntıları birlikte değerlendirelim.",
    image: storyKitchenImage,
    imageAlt:
      "Servis alanında fırın, ankastre cihaz, mikrodalga, aspiratör, davlumbaz ve ocak",
  },
  {
    id: "cleaning",
    eyebrow: "Temizlik Cihazları",
    title: "Elektrikli Süpürge · Robot Süpürge · Buharlı Temizleyici",
    description:
      "Temizlik cihazınızla ilgili ihtiyacınızı paylaşın; hizmet adımını birlikte belirleyelim.",
    image: storyCleaningImage,
    imageAlt:
      "Teknik servis alanında elektrikli süpürge, robot süpürge ve buharlı temizleyici",
  },
  {
    id: "small-appliances",
    eyebrow: "Küçük Ev Aletleri",
    title:
      "Blender · Mikser · Tost Makinesi · Ütü · Su Sebili · Çay Makinesi · Kettle",
    description:
      "Küçük ev aletinizle ilgili ihtiyacınızı paylaşın; uygun hizmet kapsamını birlikte netleştirelim.",
    image: storySmallAppliancesImage,
    imageAlt:
      "Servis tezgâhında blender, mikser, tost makinesi, ütü, su sebili, çay makinesi ve kettle",
  },
] satisfies ServiceStoryScene[];
