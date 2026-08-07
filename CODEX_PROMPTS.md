# CODEX PROMPTS — ARSLAN VOLT SERVİS

Bu dosya, VS Code içindeki Codex ile projeyi kontrollü şekilde geliştirmek için hazırlanmıştır.

> Kullanım: `MASTER_PLAN.md`, `AGENTS.md` ve bu dosyayı repository köküne koy. Promptları sırayla kullan. Her fazdan sonra build/check sonucunu görmeden sonraki faza geçme.

---

# PROMPT 0 — İlk analiz

```text
Bu repository ARSLAN VOLT SERVİS web sitesi için kullanılacak.

Önce repository kökündeki:
- MASTER_PLAN.md
- AGENTS.md
- CODEX_PROMPTS.md

dosyalarını tamamen oku.

Bu aşamada tüm siteyi yapma.

Yap:
1. Mevcut repo durumunu incele.
2. MASTER_PLAN'daki teknik kararları 10–15 maddede özetle.
3. Neden Astro ana framework, React neden başlangıçta zorunlu değil ve GSAP hangi sınırlar içinde kullanılacak açıkla.
4. Minimum paketleri öner.
5. Şimdilik kurulmaması gereken paketleri ayrı yaz.
6. İlk faz klasör/dosya planını çıkar.
7. Bilinmeyen işletme verilerini TODO olarak listele.
8. Henüz büyük miktarda kod yazma.
9. Benden onay bekle.

Türkçe cevap ver.
```

---

# PROMPT 1 — Scaffold

```text
MASTER_PLAN.md ve AGENTS.md kurallarını izleyerek PHASE 1 scaffold aşamasını uygula.

Hedef:
- Astro + TypeScript
- Tailwind CSS 4
- GSAP
- Astro check/typecheck
- temiz repo

Kurulum anındaki güncel resmi Astro/Tailwind yaklaşımını kullan.
Eski Tailwind 3 setup kopyalama.

Şimdilik KURMA:
- React
- Supabase
- Framer Motion
- Three.js
- ayrı backend
- ağır UI framework

Oluştur:
- src/layouts/BaseLayout.astro
- src/styles/global.css
- design token yapısı
- src/config/site.ts
- src/data/navigation.ts
- src/data/services.ts başlangıç modeli
- temel route skeleton
- assets klasörleri

site.ts içinde sahte telefon/adres yazma; TODO placeholder.

Henüz final hero veya büyük animasyon yapma.

Sonunda:
- npm run check
- npm run build

çalıştır ve sonucu bildir.
```

---

# PROMPT 2 — Design system ve navbar

```text
PHASE 2'yi uygula.

Ana kullanıcı 40–60 yaş:
- büyük ve net navigation
- görünür iletişim CTA
- mobil öncelik

Oluştur:
- Button.astro
- Container.astro
- SectionHeading.astro
- Navbar.astro
- erişilebilir MobileMenu
- Footer.astro
- MobileContactBar.astro

Desktop navbar:
[Logo] Ana Sayfa | Hizmetlerimiz | Çalışmalarımız | Hakkımızda | İletişim | Hemen Ara

Davranış:
- sticky
- hero üzerinde hafif transparan olabilir
- scroll sonrası daha solid ve okunaklı
- layout zıplamasın

Mobile:
- logo + menü
- alt sabit Ara / WhatsApp alanı
- safe area
- touch targets büyük

Accessibility:
- skip link
- keyboard
- visible focus
- ESC close

Bu aşamada GSAP gerekmiyorsa kullanma.
390px, 768px ve desktop düşün.
Check + build çalıştır.
```

---

# PROMPT 3 — Hero

```text
PHASE 3: Hero geliştir.

Marka:
ARSLAN VOLT SERVİS

Slogan:
Güvenilir Tamir • Bakım • Tadilat

Hero H1:
"Evinizdeki teknik sorunlara güvenilir çözüm."

Kategori satırı:
"Elektrik • Tesisat • Kombi • Klima • Ev Aletleri"

CTA:
- Hemen Ara
- WhatsApp'tan Yaz
- ikincil: Hizmetleri İncele

Gerçek telefon bilinmiyorsa TODO'yu koru.

Görsel:
- marka laciverti
- kontrollü altın
- Arslan logo asset'i varsa aynen kullan
- yoksa TODO placeholder; sahte logo üretme

Motion:
- GSAP ile kısa premium giriş
- logo reveal
- gold line
- H1
- CTA
- interaction bloklanmayacak
- JS olmazsa içerik görünür
- reduced-motion'da motion kaldır

Aşırı gamer/neon/cyberpunk yapma.

Responsive kontrol + check + build.
```

---

# PROMPT 4 — Trust strip

```text
Hero altına sade güven şeridi ekle.

4 başlık:
- Hızlı İletişim
- Geniş Hizmet Yelpazesi
- Temiz İşçilik
- Güvenilir Çözüm

Uydurma:
- müşteri sayısı
- tecrübe yılı
- 7/24
- garanti
- yetkili servis

ekleme.

Micro interaction CSS; GSAP gerekmez.
```

---

# PROMPT 5 — Premium Scroll Service Story

```text
Şimdi projenin premium ServiceStory bölümünü geliştir.

Amaç:
Modern marka/oyun lansman sitelerindeki yüksek production value hissini almak; fakat siteyi oyun sitesi gibi kullandırmamak.

Başlık:
"Evinizin her köşesinde yanınızdayız."

5 sahne:
1. Elektrik Tesisat İşleri
2. Sıhhi Tesisat İşleri
3. Kombi / Isıtma
4. Klima
5. Ev Aletleri

Desktop:
- metin + görsel iki alan
- kontrollü sticky/pinned story
- scroll progress ile aktif sahne
- görsel crossfade/mask/hafif scale
- progress indicator
- native scroll

Mobile:
- pin kullanma veya tamamen kaldır
- normal stacked cards
- içerik anında okunabilir

GSAP:
- ScrollTrigger
- matchMedia/responsive
- cleanup
- resize
- reduced motion

prefers-reduced-motion:
- pin yok
- scrub yok
- normal content flow

Gerçek görsel yoksa internetten telifsizliği belirsiz asset indirme.
Local SVG/CSS placeholder + TODO_REAL_IMAGE.

Bölüm kullanılabilirliği bozarsa daha sade çözümü seç.

Check/build yap.
```

---

# PROMPT 6 — Hizmet verileri ve grid

```text
ServiceStory sonrasına klasik "Hizmetlerimiz" grid'i ekle.

src/data/services.ts tek veri kaynağı olsun.

Ana kategoriler:
- Elektrik Tesisat İşleri
- Sıhhi Tesisat İşleri
- Kombi / Isıtma
- Klima
- Mutfak Cihazları
- Temizlik Cihazları
- Küçük Ev Aletleri

Kart:
- icon
- title
- kısa açıklama
- Detayları Gör

Hover CSS ile.
GSAP gerekmez.

Bilinmeyen hizmet kapsamını uydurma.
```

---

# PROMPT 7 — Hizmet sayfaları

```text
/hizmetler ve /hizmetler/[slug] yapısını oluştur.

Mümkün olduğunca src/data/services.ts üzerinden üret.

Her detail page:
- H1
- kısa intro
- hizmet kapsamı
- ilgili alt işler/cihazlar
- iletişim CTA
- related services

SEO:
- unique title
- unique description
- canonical altyapısı

Yetki/garanti/marka/tecrübe uydurma.
Doorway SEO yapma.
```

---

# PROMPT 8 — Process, WhyUs, Gallery

```text
Ana sayfaya:

1. Nasıl Çalışıyoruz?
   - Bize Ulaşın
   - İhtiyacı Belirleyelim
   - Hizmeti Planlayalım
   - Çözümü Uygulayalım

2. Neden Arslan Volt Servis?
   Kanıtlanamayan sayısal iddia kullanma.

3. Çalışmalarımız
   Gerçek fotoğraf yoksa açıkça placeholder.
   Stock görseli gerçek müşteri işi gibi gösterme.

Animasyon sade.
CSS öncelikli.
```

---

# PROMPT 9 — İletişim

```text
İletişim sayfasını oluştur.

Göster:
- telefon
- WhatsApp
- adres
- çalışma saatleri
- hizmet bölgesi
- harita
- yol tarifi

Hepsi siteConfig'ten.

TODO olanları sahte değerle doldurma.
Geliştirmede "Bilgi eklenecek" gösterilebilir.

Telefon tel:
WhatsApp helper
Map gerçek embed gelene kadar placeholder.
```

---

# PROMPT 10 — Supabase formu için önce karar

```text
Henüz database kodu yazma.

Servis talep formu mimarisi için karar raporu hazırla.

Alanlar:
- Ad Soyad
- Telefon
- Hizmet
- Açıklama

Public frontend'in service_requests tablosuna kontrolsüz doğrudan insert yapmasını istemiyorum.

Kıyasla:
A. Supabase Edge Function
B. Astro/Vercel server endpoint
C. Direct Supabase insert + RLS

Spam/bot korumasını düşün.
Ücretsiz/düşük maliyet hedefini koru.

Önce karar raporu; kod yazma.
```

---

# PROMPT 11 — Supabase uygulaması

```text
Onaylanan Supabase form mimarisini uygula.

Kurallar:
- service role browser'a ASLA gitmez
- secret commit edilmez
- .env.example
- RLS
- public select yok
- public update/delete yok
- input validation
- bot/spam stratejisi
- success/error feedback
- Supabase fail olursa telefon + WhatsApp alternatifi

Migration/SQL repo içinde anlaşılır konumda.

README'ye environment variable isimlerini yaz; gerçek secret yazma.
```

---

# PROMPT 12 — SEO pass

```text
Tüm site SEO pass:

- lang=tr
- title
- meta description
- canonical
- OpenGraph
- robots
- sitemap
- favicon
- semantic heading hierarchy
- internal linking

LocalBusiness structured data oluştururken gerçek olmayan:
- telefon
- adres
- çalışma saati
- koordinat

uydurma.

Hizmet sayfaları unique metadata alsın.
```

---

# PROMPT 13 — Accessibility audit

```text
Accessibility audit yap ve sorunları düzelt:

- heading hierarchy
- landmarks
- skip link
- tab order
- visible focus
- mobile menu keyboard
- ESC close
- form label
- icon-only button
- alt text
- contrast
- reduced-motion
- JS olmadan içerik
- sticky bottom bar overlap
- touch targets

Sonunda düzeltmeleri listele.
```

---

# PROMPT 14 — Performance audit

```text
Performance pass yap:

- gereksiz client JS
- GSAP bundle
- hydration
- images
- hero LCP
- width/height
- lazy load
- fonts
- duplicate CSS
- CLS
- mobile ScrollTrigger
- unused packages

React kullanılmıyorsa ekleme.

Build çıktısını incele.
En önemli 5 performans kararını Türkçe açıkla.
```

---

# PROMPT 15 — Production hardening

```text
Production öncesi kontrol:

- TODO list
- broken links
- placeholder prod'a çıkıyor mu?
- console errors
- 404
- favicon
- metadata
- env
- build
- check
- responsive
- reduced motion
- contact links

Kritik TODO'ları ayrıca yaz.
```

---

# PROMPT 16 — Vercel deploy

```text
Projeyi Vercel deploy'a hazırla.

Önce statik Astro olarak deploy edilip edilemeyeceğini doğrula.

Gereksiz server adapter ekleme.
Eğer server endpoint gerçekten kullanıldıysa uygun Vercel adapter'ı değerlendir.

README:
- local run
- build
- check
- env vars
- GitHub -> Vercel
- production checklist

Zero-config mümkünse onu tercih et.
```

---

# PROMPT 17 — Karmaşıklık kontrolü

```text
MASTER_PLAN.md ve AGENTS.md'yi yeniden oku.

Mevcut diff'i incele:
1. Gereksiz package var mı?
2. React gerçekten gerekiyor mu?
3. Animasyon kullanılabilirliğe zarar veriyor mu?
4. Business data uydurulmuş mu?
5. Fake testimonial/statistic var mı?
6. Data component'lere dağılmış mı?
7. Mobile CTA/navbar hâlâ basit mi?
8. JS olmadan ana içerik erişilebilir mi?

Gereksiz karmaşıklığı sadeleştir.
Yeni özellik ekleme.
```

---

# PROMPT 18 — Bana öğret

```text
Bu değişiklikten önce kısa teknik açıklama yap:

- Bu component neden Astro?
- Client JS gerçekten gerekiyor mu?
- GSAP burada CSS'e göre ne kazandırıyor?
- Mobile fallback nasıl?
- Reduced motion nasıl?
- SEO/performance etkisi ne?

Sonra implement et.

Kodun kritik bölümlerini syntax ezberi olarak değil mimari mantığıyla Türkçe açıkla.
```

---

# PROMPT 19 — Gerçek görseller geldiğinde

```text
Gerçek marka ve işletme görsellerini projeye ekledim.

Layout'u baştan yazma.

Önce asset'leri incele:
- logo
- dükkan
- çalışma fotoğrafları
- hizmet görselleri

Sonra:
- anlamlı filename
- doğru src/assets
- Astro image optimization
- aspect ratio
- alt text
- hero crop
- mobile crop

uygula.

Logoyu veya marka renklerini kendi kafana göre değiştirme.
```

---

# PROMPT 20 — Hedef kitle UX testi

```text
Siteyi 40–60 yaş kullanıcının gözünden review et.

Senaryo:
1. Telefondan siteyi açıyor.
2. Klima hizmeti var mı bakıyor.
3. Telefonla aramak istiyor.
4. Adresi görmek istiyor.
5. Kombi hizmetine dönüyor.

Her adım:
- kaç etkileşim?
- CTA görünür mü?
- yazı rahat mı?
- animasyon yol kesiyor mu?
- menü anlaşılır mı?

Minimum değişiklikle düzelt.

Sonra 25–35 yaş teknolojiye alışkın kullanıcı açısından görsel kaliteyi kontrol et; birincil kitlenin kullanımını bozma.
```

---

# TEK KOPYALA-YAPIŞTIR BAŞLANGIÇ PROMPTU

```text
Bu repository ARSLAN VOLT SERVİS isimli gerçek bir işletmenin web sitesi olacaktır.

Repository kökündeki AGENTS.md, MASTER_PLAN.md ve CODEX_PROMPTS.md dosyalarını eksiksiz oku ve ana teknik şartname kabul et.

Hedef kitle ağırlıklı 40–60 yaş. Site çok kolay kullanılmalı; telefon ve WhatsApp sürekli erişilebilir olmalı. Görsel kalite ise sıradan teknik servis sitelerinden belirgin şekilde yüksek olmalı. Modern oyun/marka lansman sitelerindeki scroll storytelling hissini yalnızca kontrollü bir premium bölümde kullanacağız; navigation ve genel UX klasik, sade ve güvenilir kalacak.

Ana teknoloji:
- Astro
- TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
- React yalnız gerçek client-state ihtiyacı oluşursa
- Supabase sonraki servis talep formu fazında
- Vercel deployment

Şimdilik React, Supabase, Framer Motion, Three.js, FastAPI, Express ve Docker ekleme.

İlk görev:
1. Repo durumunu incele.
2. MASTER_PLAN ve AGENTS kurallarını özetle.
3. Minimum scaffold planını çıkar.
4. Kullanacağın paketleri ve nedenlerini yaz.
5. Bilinmeyen işletme bilgilerini TODO olarak listele.
6. Henüz tüm siteyi implement etme.
7. Benden onay bekle.

Kod yazarken öğrenmek istiyorum. Her büyük mimari kararda "neden" kısmını Türkçe ve kısa biçimde açıkla.
```
