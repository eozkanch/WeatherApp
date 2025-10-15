// Service Worker - Offline Caching ve Performance Optimization
const CACHE_NAME = 'weather-app-v1.1.0';
const STATIC_CACHE_NAME = 'weather-app-static-v1.1.0';
const DYNAMIC_CACHE_NAME = 'weather-app-dynamic-v1.1.0';

// Kritik statik dosyalar - Above the fold
const CRITICAL_ASSETS = [
  '/',
  // Kritik resimler
  '/bg-images-optimized/general-day.webp',
  '/bg-images-optimized/general-night.webp',
];

// Non-kritik statik dosyalar - Lazy load
const NON_CRITICAL_ASSETS = [
  '/about',
  '/bg-images-optimized/clear-day.webp',
  '/bg-images-optimized/clear-night-sky.webp',
  '/bg-images-optimized/cloudy-day-sky.webp',
  '/bg-images-optimized/cloudy-night-sky.webp',
  '/bg-images-optimized/overcast-day.webp',
  '/bg-images-optimized/overcast-night.webp',
  '/bg-images-optimized/rainy-day.webp',
  '/bg-images-optimized/rainy-night.webp',
  '/bg-images-optimized/snow-day.webp',
  '/bg-images-optimized/snow-night.webp',
  '/bg-images-optimized/storm-day.webp',
  '/bg-images-optimized/storm-night.webp',
  '/bg-images-optimized/sunny.webp',
];

// API cache stratejisi için URL'ler
const API_CACHE_PATTERNS = [
  /^https:\/\/api\.weatherapi\.com\/v1\/forecast\.json/,
];

// Cache stratejileri
const CACHE_STRATEGIES = {
  // Statik dosyalar için Cache First
  STATIC_CACHE_FIRST: 'cache-first',
  // API istekleri için Network First
  API_NETWORK_FIRST: 'network-first',
  // Resimler için Cache First
  IMAGE_CACHE_FIRST: 'cache-first',
  // HTML sayfaları için Stale While Revalidate
  HTML_STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
};

// Service Worker kurulumu
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Sadece kritik cache'i oluştur - hata toleranslı
      caches.open(STATIC_CACHE_NAME).then(async (cache) => {
        console.log('Service Worker: Caching critical assets');
        
        // Her dosyayı tek tek cache'le (hata toleranslı)
        for (const asset of CRITICAL_ASSETS) {
          try {
            const response = await fetch(asset);
            if (response.ok) {
              await cache.put(asset, response);
              console.log('Service Worker: Cached critical asset:', asset);
            } else {
              console.log('Service Worker: Failed to cache critical asset (not found):', asset);
            }
          } catch (error) {
            console.log('Service Worker: Failed to cache critical asset (error):', asset, error);
          }
        }
      }),
      // Service Worker'ı hemen aktif et
      self.skipWaiting()
    ])
  );
});

// Service Worker aktivasyonu
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Eski cache'leri temizle
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Service Worker'ı hemen kontrol et
      self.clients.claim(),
      // Non-kritik dosyaları arka planda cache'le
      cacheNonCriticalAssets()
    ])
  );
});

// Non-kritik dosyaları arka planda cache'le
async function cacheNonCriticalAssets() {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    
    // Non-kritik dosyaları tek tek cache'le (non-blocking)
    NON_CRITICAL_ASSETS.forEach(async (asset) => {
      try {
        const response = await fetch(asset);
        if (response.ok) {
          await cache.put(asset, response);
          console.log('Service Worker: Cached non-critical asset:', asset);
        }
      } catch (error) {
        console.log('Service Worker: Failed to cache non-critical asset:', asset);
      }
    });
  } catch (error) {
    console.error('Service Worker: Failed to cache non-critical assets:', error);
  }
}

// Fetch olayları - Cache stratejileri
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Sadece GET isteklerini işle
  if (request.method !== 'GET') {
    return;
  }

  // Chrome extension isteklerini yoksay
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Cache stratejisini belirle
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request));
  } else {
    event.respondWith(handleOtherRequest(request));
  }
});

// Statik dosya kontrolü
function isStaticAsset(request) {
  return request.url.includes('/_next/static/') || 
         request.url.includes('/favicon') ||
         request.url.includes('/manifest');
}

// API isteği kontrolü
function isAPIRequest(request) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

// Resim isteği kontrolü
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.includes('/bg-images-optimized/');
}

// HTML isteği kontrolü
function isHTMLRequest(request) {
  return request.destination === 'document' || 
         request.headers.get('accept')?.includes('text/html');
}

// Statik dosyalar için Cache First stratejisi
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Static asset fetch failed:', error);
    return new Response('Offline - Static asset not available', { status: 503 });
  }
}

// API istekleri için Network First stratejisi
async function handleAPIRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  
  try {
    // Önce network'ten dene
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Başarılı ise cache'e kaydet
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for API request');
    
    // Network başarısız ise cache'den döndür
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Cache'de de yoksa offline mesajı
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Weather data not available offline'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Resimler için Cache First stratejisi
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Image fetch failed:', error);
    // Offline durumunda varsayılan resim döndür
    return new Response('', { status: 404 });
  }
}

// HTML sayfaları için Stale While Revalidate stratejisi
async function handleHTMLRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Cache'den döndür ve arka planda güncelle
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network hatası durumunda cache'deki eski versiyonu döndür
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Diğer istekler için Network First
async function handleOtherRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Background sync için
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'weather-sync') {
    event.waitUntil(syncWeatherData());
  }
});

// Weather data sync fonksiyonu
async function syncWeatherData() {
  try {
    // Offline durumda biriken istekleri işle
    console.log('Service Worker: Syncing weather data');
    // Burada offline durumda biriken API isteklerini işleyebiliriz
  } catch (error) {
    console.error('Service Worker: Sync failed:', error);
  }
}

// Push notifications için
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Weather update available',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Weather',
        icon: '/favicon.ico'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.ico'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Weather App', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('Service Worker: Loaded successfully');
