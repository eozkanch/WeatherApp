# Weather App - Performans Optimizasyonları

Bu proje Google Lighthouse performans skorunu maksimuma çıkarmak için optimize edilmiştir.

## 🚀 Uygulanan Optimizasyonlar

### 1. Arka Plan: Şehir Fotoğrafı
- **Yerel görsel yok**: Fotoğraf Unsplash API'den (`/api/city-image`) gelir, anahtar yalnızca sunucuda tutulur
- **Sunucu cache'i**: Aynı şehir 24 saat boyunca Unsplash'a tekrar sorulmaz
- **Paralel yükleme**: Hava durumu ve fotoğraf istekleri aynı anda başlar; ilk istekler HTML'de `preload` edilir
- **Yedek gradient**: Fotoğraf yüklenene kadar (veya bulunamazsa) gündüz/gece gradient'i görünür
- **Cross-fade**: Yeni fotoğraf yüklenince yumuşak geçişle değişir, `prefers-reduced-motion` desteklenir

### 2. Servis İsteği Optimizasyonu
- **Route Handler cache**: `/api/weather` 10 dk, `/api/city-image` 24 saat önbellekte
- **Zaman aşımı + yeniden deneme**: Geçici ağ hatalarına karşı dayanıklılık
- **Tek istek/şehir**: Koordinatlar yuvarlanır, şehir adları normalize edilir (cache isabeti için)

### 3. Kritik CSS Optimizasyonu
- **Inline kritik CSS**: Render blocking CSS'i azaltır
- **Font optimizasyonu**: `display: swap` ile font yükleme optimizasyonu
- **Preload kritik kaynaklar**: Önemli resimler ve fontlar önceden yüklenir

### 4. JavaScript Optimizasyonu
- **React.memo ve useMemo**: Gereksiz re-render'ları önler
- **useCallback**: Event handler'ları optimize eder
- **Code splitting**: Vendor ve app kodları ayrılır
- **Tree shaking**: Kullanılmayan kodlar kaldırılır

### 5. Next.js Konfigürasyonu
- **Inline CSS**: Tailwind CSS HTML'e gömülür (render-blocking yok)
- **Compression**: Gzip sıkıştırma aktif
- **Cache headers**: Statik dosyalar için uzun süreli cache
- **Bundle optimization**: Vendor chunk'ları optimize edildi

## 📊 Performans Metrikleri

Lighthouse (mobil, production build): Performance 95+, Accessibility 100, Best Practices 100, SEO 100.

## 🛠️ Kullanım

### Geliştirme
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```

## 🔧 Teknik Detaylar

### CSS Optimizasyonu
- **Critical CSS**: Above-the-fold CSS inline
- **Font display**: `swap` ile font yükleme
- **Preload**: Kritik kaynaklar önceden yüklenir

### JavaScript Optimizasyonu
- **Memoization**: React.memo, useMemo, useCallback
- **Code splitting**: Vendor ve app kodları ayrıldı
- **Tree shaking**: Kullanılmayan kodlar kaldırıldı

## 📈 Lighthouse Skorları

Bu optimizasyonlar ile beklenen Lighthouse skorları:
- **Performance**: 90-100
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 90-100

## 🚀 Service Worker ile Offline Caching

### ✅ Tamamlanan Özellikler:
- **Service Worker**: Offline caching ve background sync
- **Cache Stratejileri**: 
  - Static assets: Cache First
  - API requests: Network First
  - Images: Cache First
  - HTML: Stale While Revalidate
- **PWA Desteği**: Manifest.json ve installable app
- **Offline Fallback**: Özel offline sayfası
- **Cache Management**: Debug panel ve cache yönetimi
- **Background Sync**: Offline durumda biriken istekler

### 📊 Cache Performansı:
- **Static Cache**: Kritik dosyalar ve resimler
- **Dynamic Cache**: API yanıtları ve dinamik içerik
- **Cache Size**: Otomatik temizleme ve boyut kontrolü
- **Cache Strategies**: Akıllı cache stratejileri

## 🚀 Gelecek Optimizasyonlar

- [x] Service Worker ile offline caching
- [ ] CDN entegrasyonu
- [ ] Daha fazla resim formatı desteği
- [ ] Bundle analyzer ile detaylı analiz
- [ ] Push notifications
- [ ] Background sync geliştirmeleri
