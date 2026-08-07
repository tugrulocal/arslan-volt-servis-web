# AGENTS.md — ARSLAN VOLT SERVİS

Bu dosya repository kökünden itibaren tüm proje için geçerlidir.

## 1. Önce okunacaklar

Her görevden önce:
1. `MASTER_PLAN.md` dosyasını oku.
2. İlgili mevcut source dosyalarını incele.
3. Kullanıcının yeni talebi MASTER_PLAN ile çelişirse kullanıcı talebi önceliklidir.
4. Büyük kapsamlı değişikliği tek seferde yapma.

## 2. Projenin öncelik sırası

1. Kullanılabilirlik
2. Güven
3. Mobil deneyim
4. Telefon / WhatsApp dönüşümü
5. SEO
6. Performans
7. Görsel kalite
8. Animasyon

Animasyon hiçbir zaman 1–6'nın önüne geçemez.

## 3. Hedef kitle

Ana hedef yaklaşık 40–60 yaş.

Bu nedenle:
- büyük ve net tipografi,
- görünür telefon,
- görünür WhatsApp,
- anlaşılır navbar,
- yüksek kontrast,
- tahmin edilebilir native scroll

korunmalıdır.

## 4. Framework kararı

Ana:
- Astro
- TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger

React:
- başlangıçta kurma,
- yalnız gerçek client-state ihtiyacında ekle,
- eklemeden önce gerekçeyi açıkla.

Kullanıcı özel olarak istemedikçe ekleme:
- Next.js
- Framer Motion
- Three.js
- React Three Fiber
- Redux
- Zustand
- Express
- FastAPI
- Docker

## 5. Paket kuralı

Yeni npm paketi eklemeden önce:
1. Native Astro/CSS/JS ile çözülüyor mu?
2. Mevcut paket aynı işi yapıyor mu?
3. Client bundle'ı gereksiz büyütüyor mu?

Sadece gerekli paketi ekle.

## 6. Bilinmeyen işletme bilgisi

ASLA uydurma:
- telefon
- WhatsApp
- adres
- çalışma saatleri
- hizmet bölgesi
- garanti
- tecrübe yılı
- müşteri yorumları
- sertifikalar
- "yetkili servis"
- anlaşmalı marka
- müşteri sayısı

Kullan:
- `TODO_BUSINESS_PHONE`
- `TODO_WHATSAPP_PHONE`
- `TODO_BUSINESS_ADDRESS`
- `TODO_SERVICE_AREA`
- `TODO_BUSINESS_HOURS`

## 7. İçerik güvenilirliği

- Fake testimonial üretme.
- Stock fotoğrafı gerçek müşteri işi gibi sunma.
- Hizmet kapsamını kullanıcı onaylamadan genişletme.
- SEO için spam/doorway location page üretme.

## 8. Kod stili

- TypeScript tercih et.
- Açıklayıcı isimler kullan.
- Gereksiz abstraction yapma.
- Aynı business verisini birden fazla dosyada hard-code etme.
- `src/config/site.ts` tek kaynak olsun.
- Hizmet verileri merkezi data dosyasından gelsin.
- Yorumlar kodu tekrar etmek yerine "neden"i açıklasın.

## 9. Astro prensibi

İçerik mümkün olduğunca `.astro` component'lerde statik/server render edilsin.

Client JavaScript sadece gerektiğinde.

React island eklenirse hydration bilinçli seç:
- `client:visible`
- `client:idle`
- vb.

`client:load` refleks olarak kullanılmasın.

## 10. Animasyon

GSAP yalnız premium motion gereken alanlarda.

Basit hover/fade için CSS.

ScrollTrigger kullanırken:
- cleanup,
- resize,
- responsive setup,
- mobile fallback,
- `prefers-reduced-motion`

zorunlu.

Yapma:
- scroll-jacking
- custom scrollbar
- ağır smooth scroll
- autoplay sound
- uzun intro lock
- içeriği JS'ye bağımlı hale getirme

## 11. Progressive enhancement

JavaScript çalışmasa bile:
- navbar linkleri,
- hizmet içerikleri,
- telefon,
- WhatsApp,
- temel hero

kullanılabilir olmalı.

## 12. Accessibility

Her değişiklikte:
- semantic HTML
- focus state
- keyboard
- label
- alt text
- contrast
- reduced motion
- skip link

kontrol et.

## 13. Görseller

- Rastgele lisanssız web görseli indirme.
- Gerçek görsel yoksa placeholder + `TODO_REAL_IMAGE`.
- SVG logo oranını bozma.
- Görsellere width/height ver.
- Uygun yerde Astro image optimization kullan.

## 14. Supabase

- service role / secret key browser'a yazma.
- RLS açık.
- least privilege.
- public form spam riskini düşün.
- gerçek secret commit etme.

## 15. Environment

`.env.example` yalnız değişken isimleri içersin.

Örnek:
```env
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## 16. Test / validation

Mümkün olduğunda:
```bash
npm run check
npm run build
```

Komutlar yoksa önce `package.json` kontrol et; rastgele script uydurma.

UI değişikliğinde en az:
- 390px
- 768px
- 1440px

düşün.

## 17. Codex cevap biçimi

Kullanıcıya Türkçe cevap ver.

Her görev sonunda kısa biçimde:
- ne değişti,
- hangi dosyalar,
- hangi testler,
- TODO,
- sonraki önerilen adım

özetle.

## 18. Büyük görev kuralı

Kullanıcı "siteyi yap" dese bile tüm siteyi tek seferde bitirmeye çalışma.

MASTER_PLAN fazlarını takip et.

## 19. Tasarım karakteri

Marka:
- premium
- güvenilir
- teknik
- sade
- güçlü

Olmamalı:
- aşırı gamer
- cyberpunk
- neon
- sci-fi dashboard
- agresif motion

GTA benzeri referanstan yalnız yüksek production value ve scroll storytelling fikrini al.

## 20. Definition of Done

Feature bitmiş sayılmaz eğer:
- mobile bozuk,
- build başarısız,
- animasyon feature'ında reduced-motion yok,
- keyboard bozuk,
- unknown business data uydurulmuş,
- ana içerik yalnız JS ile görünüyorsa.
