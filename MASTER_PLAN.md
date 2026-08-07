# ARSLAN VOLT SERVİS — MASTER PLAN

> Bu belge, ARSLAN VOLT SERVİS web sitesinin ürün hedefini, kullanıcı deneyimini, teknik mimarisini, tasarım/animasyon kurallarını, SEO yaklaşımını ve geliştirme fazlarını tanımlar.
>
> **Ana denge:** Site 40–60 yaş ağırlıklı kullanıcı için çok kolay kullanılacak; buna rağmen görsel kalite, scroll geçişleri ve marka sunumu sıradan teknik servis sitelerinden belirgin şekilde daha premium olacak.

---

## 1. Ürün hedefi

Kullanıcı siteyi açtıktan sonraki ilk 3–5 saniyede şunları anlayabilmeli:

1. Burası **ARSLAN VOLT SERVİS**.
2. Elektrik, sıhhi tesisat, kombi/ısıtma, klima ve ev aletleriyle ilgili hizmet veriliyor.
3. Telefon ve WhatsApp ile kolayca ulaşılabiliyor.
4. İşletme düzenli, güvenilir ve profesyonel görünüyor.

Ana dönüşüm hedefleri:
- **Telefonla Ara**
- **WhatsApp'tan Yaz**
- İkinci fazda: **Servis Talebi Oluştur**

Animasyon dönüşümün önüne geçmeyecek.

---

## 2. Hedef kitle

### Birincil
Yaklaşık 40–60 yaş.

Bu nedenle:
- Navbar mutlaka görünür ve anlaşılır.
- Yazılar küçük olmayacak.
- Telefon ve WhatsApp saklanmayacak.
- Kullanıcı scroll davranışını yeniden öğrenmek zorunda kalmayacak.
- Menü derin olmayacak.
- Butonlar büyük olacak.
- Mobilde sabit iletişim çubuğu değerlendirilecek.

### İkincil
20–40 yaş, teknolojiye alışkın kullanıcılar.

Bu grup için:
- premium görünüm,
- hızlı site,
- iyi fotoğraf,
- modern geçiş,
- güvenilir marka dili

korunacak.

---

## 3. UX formülü

**%75 klasik, sade, erişilebilir kurumsal site + %25 kontrollü premium scroll storytelling.**

Kullanılmayacak:
- scroll-jacking,
- custom cursor,
- ağır smooth-scroll,
- otomatik ses,
- uzun intro bekletmesi,
- gereksiz 3D,
- tam ekran video bombardımanı,
- navigasyonu gizleyen deneysel tasarım.

GTA benzeri referanstan yalnız şu fikirler alınacak:
- yüksek production value,
- güçlü hero,
- scroll ile kontrollü görsel değişimi,
- sinematik ama kısa geçişler.

---

## 4. Teknoloji kararı

### Ana framework: Astro
Bu site content/SEO ağırlıklı olduğu için ana framework Astro.

Neden:
- statik HTML çıktısı,
- düşük client JS,
- SEO dostu,
- içerik sitelerine uygun,
- gerektiğinde React island eklenebilir,
- Vite altyapısını zaten kullanır.

**Ayrı bir Vite React SPA kurulmayacak.**

### TypeScript
- site config,
- hizmet verileri,
- component props,
- form tipleri

için kullanılacak.

### Tailwind CSS 4
Ana styling sistemi.

Kurallar:
- ortak renk/spacing tokenları merkezi,
- utility tekrarları kontrol altında,
- eski Tailwind 3 setup kopyalanmayacak.

### GSAP + ScrollTrigger
Sadece premium motion için.

Kullan:
- hero reveal,
- service storytelling,
- kontrollü mask/crossfade,
- progress animasyonu.

Kullanma:
- basit hover,
- normal accordion,
- basit opacity transition.

### React
**Başlangıçta zorunlu değil ve kurulmayacak.**

Sadece gerçek client-state ihtiyacında:
- çok adımlı form,
- kompleks filtre,
- özel interaktif widget

gibi durumlarda `@astrojs/react` ile island olarak eklenecek.

### Supabase
İkinci faz:
- servis talepleri,
- gelecekte admin/CRM.

İlk MVP telefon + WhatsApp ile yayınlanabilir.

### Hosting
- GitHub
- Vercel
- Supabase

---

## 5. Stack özeti

```text
Astro
├── TypeScript
├── Tailwind CSS 4
├── GSAP
│   └── ScrollTrigger
├── Astro Image
├── React (yalnız gerekirse)
└── Supabase (form/gelecek)

GitHub → Vercel
```

Şimdilik eklenmeyecek:
- Next.js
- FastAPI
- Express
- Docker
- Framer Motion
- Three.js
- Redux
- Zustand
- ağır UI framework.

---

## 6. Marka

**ARSLAN VOLT SERVİS**

Ana slogan:
**Güvenilir Tamir • Bakım • Tadilat**

Hero mesajı:
**Evinizdeki teknik sorunlara güvenilir çözüm.**

Renkler:
```css
--brand-navy: #0B1D3A;
--brand-navy-2: #132A4A;
--brand-gold: #D4AF37;
--brand-gold-soft: #E2C66A;
--bg-warm: #F7F7F2;
--white: #FFFFFF;
--charcoal: #171A1F;
--slate: #657080;
--border: #DCE1E7;
```

Altın uzun metinde değil; vurgu, ikon, border ve ince çizgide.

---

## 7. Tipografi

Öneri:
- Başlık: Manrope Variable
- Gövde: Inter veya kaliteli system sans

Hedef:
- body desktop 17–18px,
- body mobile 16–17px,
- button en az 16px,
- rahat line-height,
- başlıklar responsive `clamp()`.

Runtime Google Fonts yerine mümkünse bundle/self-host.

---

## 8. Logo asset yapısı

```text
src/assets/brand/
├── arslan-emblem.svg
├── arslan-volt-servis-horizontal.svg
├── arslan-volt-servis-light.svg
└── arslan-volt-servis-dark.svg
```

Kurallar:
- SVG tercih.
- oran bozulmaz.
- sahte/yeniden çizilmiş logo üretilmez.
- gerçek asset yoksa `TODO_LOGO_ASSET`.

---

## 9. Site haritası

```text
/
├── /hizmetler
│   ├── /hizmetler/elektrik-tesisat
│   ├── /hizmetler/sihhi-tesisat
│   ├── /hizmetler/kombi-temizligi
│   ├── /hizmetler/klima
│   ├── /hizmetler/mutfak-cihazlari
│   ├── /hizmetler/temizlik-cihazlari
│   └── /hizmetler/kucuk-ev-aletleri
├── /hakkimizda
├── /calismalarimiz
└── /iletisim
```

İlk MVP'de hepsi aynı gün bitmek zorunda değil; mimari hazır olmalı.

---

## 10. Navbar

### Desktop
```text
[LOGO]  Ana Sayfa  Hizmetlerimiz  Çalışmalarımız  Hakkımızda  İletişim  [☎ Hemen Ara]
```

- sticky,
- hero üzerinde transparan/blur olabilir,
- scroll sonrası solid ve daha okunaklı,
- layout zıplaması yok.

### Mobil
```text
[LOGO]                         [Menü]
```

Alt sabit bar:
```text
[ ☎ Ara ]        [ WhatsApp ]
```

Safe-area ve içerik overlap kontrol edilecek.

---

## 11. Ana sayfa akışı

### 11.1 Hero
İçerik:
- `Elektrik • Tesisat • Kombi • Klima • Ev Aletleri`
- H1: `Evinizdeki teknik sorunlara güvenilir çözüm.`
- kısa açıklama
- `Hemen Ara`
- `WhatsApp'tan Yaz`
- `Hizmetleri İncele`

Görsel:
- lacivert,
- altın vurgu,
- aslan amblemi,
- hafif teknik/enerji katmanları.

Motion:
1. logo reveal,
2. gold line,
3. H1,
4. CTA.

Kullanıcı animasyon bitmesini beklemez.

### 11.2 Trust Strip
Örnek:
- Hızlı İletişim
- Geniş Hizmet Yelpazesi
- Temiz İşçilik
- Güvenilir Çözüm

Uydurulmayacak:
- 7/24,
- 20 yıllık deneyim,
- binlerce müşteri,
- garantili,
- yetkili servis,
- sertifika.

### 11.3 Interactive Service Story
Başlık:
**Evinizin her köşesinde yanınızdayız.**

5 sahne:
1. Elektrik Tesisat İşleri
2. Sıhhi Tesisat İşleri
3. Kombi / Isıtma
4. Klima
5. Ev Aletleri

Desktop:
- iki kolon,
- kısa pinned/sticky bölüm,
- solda metin/progress,
- sağda değişen görsel,
- crossfade/mask/scale.

Mobil:
- pin yok,
- normal stacked cards,
- hafif reveal.

### 11.4 Hizmetler Grid
Story kaçırılsa bile bütün kategoriler görünür.

### 11.5 Nasıl Çalışıyoruz
1. Bize Ulaşın
2. İhtiyacı Belirleyelim
3. Hizmeti Planlayalım
4. Çözümü Uygulayalım

### 11.6 Çalışmalarımız
Gerçek fotoğraflar.
Stock fotoğraf gerçek iş gibi gösterilmez.

### 11.7 Neden Arslan Volt
Kanıtlanabilir, genel güven mesajları.

### 11.8 Final CTA
`Bir teknik sorun mu var?`
- Telefonla Ara
- WhatsApp'tan Yaz

### 11.9 İletişim
- telefon,
- WhatsApp,
- adres,
- saatler,
- harita,
- yol tarifi.

---

## 12. Hizmet veri modeli

Tüm hizmetler component içine dağılmayacak.

```text
src/data/services.ts
```

Örnek:
```ts
export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  featured: boolean;
  order: number;
  icon?: string;
};
```

Ana kategoriler:
- Elektrik Tesisat İşleri
- Sıhhi Tesisat İşleri
- Kombi / Isıtma
- Klima
- Mutfak Cihazları
- Temizlik Cihazları
- Küçük Ev Aletleri

Alt hizmetler işletmenin gerçek kapsamına göre finalleştirilecek.

---

## 13. Site config — tek gerçek kaynak

```text
src/config/site.ts
```

```ts
export const siteConfig = {
  name: "Arslan Volt Servis",
  slogan: "Güvenilir Tamir • Bakım • Tadilat",
  phone: "TODO_BUSINESS_PHONE",
  whatsapp: "TODO_WHATSAPP_PHONE",
  address: "TODO_BUSINESS_ADDRESS",
  serviceArea: "TODO_SERVICE_AREA",
  hours: "TODO_BUSINESS_HOURS",
};
```

Aynı telefon 10 dosyaya hard-code edilmeyecek.

---

## 14. Bilinmeyen veri kuralı

ASLA uydurma:
- telefon,
- WhatsApp,
- adres,
- çalışma saati,
- hizmet bölgesi,
- müşteri yorumu,
- tecrübe yılı,
- garanti,
- yetkili servis,
- marka anlaşması.

Kullan:
```text
TODO_BUSINESS_PHONE
TODO_WHATSAPP_PHONE
TODO_BUSINESS_ADDRESS
TODO_SERVICE_AREA
TODO_BUSINESS_HOURS
TODO_MAP_EMBED
TODO_REAL_WORK_PHOTOS
TODO_FINAL_HERO_IMAGE
```

---

## 15. Önerilen klasör yapısı

```text
arslan-volt-servis/
├── AGENTS.md
├── MASTER_PLAN.md
├── CODEX_PROMPTS.md
├── README.md
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── assets/
    │   ├── brand/
    │   ├── hero/
    │   ├── services/
    │   └── works/
    ├── components/
    │   ├── common/
    │   ├── layout/
    │   ├── home/
    │   ├── contact/
    │   └── seo/
    ├── config/
    │   └── site.ts
    ├── data/
    │   ├── services.ts
    │   └── navigation.ts
    ├── layouts/
    │   └── BaseLayout.astro
    ├── lib/
    │   ├── animation/
    │   ├── validation/
    │   └── supabase/
    ├── pages/
    │   ├── index.astro
    │   ├── hakkimizda.astro
    │   ├── calismalarimiz.astro
    │   ├── iletisim.astro
    │   └── hizmetler/
    │       ├── index.astro
    │       └── [slug].astro
    └── styles/
        ├── global.css
        └── tokens.css
```

Klasörler ihtiyaç oldukça oluşturulacak; sırf ağaç dolsun diye boş klasör üretme.

---

## 16. Animasyon sistemi

Motion karakteri:
- güçlü,
- sakin,
- teknik,
- premium.

GSAP sadece anlamlı yerde.

### Reduced Motion
Mutlaka:
```css
@media (prefers-reduced-motion: reduce) {
  /* ağır motion kapalı */
}
```

JS tarafında da kontrol.

Reduced motion:
- pin yok,
- scrub yok,
- içerik normal akışta.

### Progressive enhancement
JS çalışmazsa:
- hero görünür,
- hizmetler görünür,
- navbar çalışır,
- tel/WhatsApp linkleri erişilir.

---

## 17. Performans

Hedefler:
- gereksiz hydration yok,
- responsive images,
- below-fold lazy,
- SVG ikon,
- hero LCP görseli kontrollü,
- layout shift minimum.

Hedef kalite:
- Lighthouse Performance 90+
- Accessibility 95+
- SEO 95+
- gerçek mobil cihazda akıcı.

Skor uğruna UX bozulmayacak.

---

## 18. Mobil test

Minimum kontrol:
- 360
- 390
- 430
- 768
- 1024
- 1440 px

Mobil:
- buton hedefleri yaklaşık 44px+,
- `tel:` link,
- WhatsApp kolay,
- pinned story kaldırılmış,
- text rahat,
- bottom bar içeriği kapatmıyor.

---

## 19. SEO

Her sayfada:
- unique title,
- unique description,
- canonical,
- OpenGraph,
- semantic headings,
- sitemap,
- robots,
- `lang="tr"`.

Local SEO:
- NAP tutarlı,
- hizmet alanı gerçek,
- LocalBusiness schema gerçek veriyle.

Yapma:
- aynı içeriği ilçe isimleriyle çoğaltan doorway pages.

---

## 20. Supabase güvenli yaklaşım

İlk MVP form olmadan çıkabilir.

Form eklendiğinde:
```text
Browser
  ↓
validation / bot protection
  ↓
Supabase Edge Function veya güvenli server endpoint
  ↓
service_requests
```

Önerilen tablo:
```text
service_requests
- id uuid
- name text
- phone text
- service_type text
- message text
- status text
- source text
- created_at timestamptz
```

Güvenlik:
- RLS açık,
- public select yok,
- public update/delete yok,
- service role browser'da yok,
- secret commit yok.

---

## 21. Form UX

Minimum:
- Ad Soyad
- Telefon
- Hizmet
- Kısa Açıklama

İlk sürümde photo upload yok.

Durumlar:
- Gönderiliyor
- Başarılı
- Hata
- Alternatif olarak telefon/WhatsApp

---

## 22. Görseller

Codex telif durumu bilinmeyen internet görseli indirmeyecek.

Gerçek görsel yoksa:
- local SVG/CSS placeholder,
- `TODO_REAL_IMAGE`.

Gerçek görseller geldiğinde:
- Astro image optimization,
- width/height,
- responsive crop,
- alt text.

---

## 23. Accessibility

Minimum:
- semantic HTML,
- skip link,
- keyboard nav,
- visible focus,
- alt text,
- form labels,
- contrast,
- reduced motion,
- mobile menu ESC,
- doğru button/anchor.

---

## 24. Geliştirme fazları

### Phase 0 — Analiz
- repo incele,
- belgeleri oku,
- plan sun.

### Phase 1 — Scaffold
- Astro
- TS
- Tailwind 4
- GSAP
- base layout
- tokens
- site config
- data model
- route skeleton

### Phase 2 — Design system
- Button
- Container
- Navbar
- Mobile menu
- Footer
- Mobile CTA

### Phase 3 — Hero
- static-first
- premium GSAP intro
- reduced motion

### Phase 4 — Service Story
- ScrollTrigger desktop
- normal flow mobile

### Phase 5 — Services
- grid
- data model
- `/hizmetler`
- detail routes

### Phase 6 — Process / Gallery / Trust

### Phase 7 — Contact
- tel
- WhatsApp
- address
- map

### Phase 8 — Supabase form
Yalnız ihtiyaç kesinleşirse.

### Phase 9 — SEO

### Phase 10 — Accessibility + performance audit

### Phase 11 — Vercel deploy

---

## 25. MVP kabul kriterleri

### Navigation
- [ ] desktop sticky nav
- [ ] mobile menu
- [ ] keyboard
- [ ] Hemen Ara
- [ ] WhatsApp

### Hero
- [ ] marka ilk ekranda açık
- [ ] hizmet türü açık
- [ ] CTA görünür
- [ ] reduced motion

### Services
- [ ] ana kategoriler
- [ ] mobile story bozulmuyor
- [ ] service routes

### Contact
- [ ] config üzerinden
- [ ] sahte bilgi yok

### SEO
- [ ] title
- [ ] description
- [ ] canonical
- [ ] sitemap
- [ ] robots

### Quality
- [ ] `npm run check`
- [ ] `npm run build`
- [ ] console error yok
- [ ] 390px düzgün
- [ ] 1440px düzgün

---

## 26. İlk geliştirme oturumu hedefi

İlk oturumda tüm site yapılmayacak.

Yeterli:
- repo hazır,
- Astro çalışıyor,
- Tailwind çalışıyor,
- GSAP kurulu,
- design tokenları,
- BaseLayout,
- siteConfig,
- route skeleton,
- build başarılı.

Sonra navbar + hero.

---

## 27. Nihai ürün hissi

Kullanıcı:
> “Bu sıradan bir tamirci sitesi değil; düzenli, güvenilir ve işini ciddiye alan bir işletme.”

demeli.

Ama hiçbir zaman:
> “Bu siteyi nasıl kullanacağım?”

diye düşünmemeli.

---

## 28. Resmi doküman referansları

Kurulum sırasında güncel sürümü resmi dokümantasyondan doğrula:

- Astro: https://docs.astro.build/
- Astro + React: https://docs.astro.build/en/guides/integrations-guide/react/
- Astro + Tailwind: https://docs.astro.build/en/guides/styling/
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Supabase: https://supabase.com/docs/
- Vercel Astro: https://vercel.com/docs/frameworks/frontend/astro

Paket sürümlerini bu belgeye sabitleme; kurulum anındaki güncel ve uyumlu sürümü kullan.
