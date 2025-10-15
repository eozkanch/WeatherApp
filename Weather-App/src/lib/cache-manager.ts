// Cache Management Utility
export class CacheManager {
  private static instance: CacheManager;
  private cacheNames = {
    static: 'weather-app-static-v1.0.0',
    dynamic: 'weather-app-dynamic-v1.0.0'
  };

  private constructor() {}

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  // Cache boyutunu kontrol et
  async getCacheSize(): Promise<{ static: number; dynamic: number; total: number }> {
    if (!('caches' in window)) {
      return { static: 0, dynamic: 0, total: 0 };
    }

    try {
      const staticCache = await caches.open(this.cacheNames.static);
      const dynamicCache = await caches.open(this.cacheNames.dynamic);
      
      const staticKeys = await staticCache.keys();
      const dynamicKeys = await dynamicCache.keys();
      
      // Cache boyutlarını hesapla (yaklaşık)
      const staticSize = staticKeys.length * 100; // KB cinsinden tahmin
      const dynamicSize = dynamicKeys.length * 50; // KB cinsinden tahmin
      
      return {
        static: staticSize,
        dynamic: dynamicSize,
        total: staticSize + dynamicSize
      };
    } catch (error) {
      console.error('Cache size calculation failed:', error);
      return { static: 0, dynamic: 0, total: 0 };
    }
  }

  // Cache'i temizle
  async clearCache(): Promise<boolean> {
    if (!('caches' in window)) {
      return false;
    }

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      console.log('All caches cleared successfully');
      return true;
    } catch (error) {
      console.error('Cache clearing failed:', error);
      return false;
    }
  }

  // Belirli bir cache'i temizle
  async clearSpecificCache(cacheType: 'static' | 'dynamic'): Promise<boolean> {
    if (!('caches' in window)) {
      return false;
    }

    try {
      const cacheName = this.cacheNames[cacheType];
      const deleted = await caches.delete(cacheName);
      
      if (deleted) {
        console.log(`${cacheType} cache cleared successfully`);
      }
      
      return deleted;
    } catch (error) {
      console.error(`${cacheType} cache clearing failed:`, error);
      return false;
    }
  }

  // Cache durumunu kontrol et
  async getCacheStatus(): Promise<{
    isSupported: boolean;
    hasStaticCache: boolean;
    hasDynamicCache: boolean;
    totalEntries: number;
  }> {
    if (!('caches' in window)) {
      return {
        isSupported: false,
        hasStaticCache: false,
        hasDynamicCache: false,
        totalEntries: 0
      };
    }

    try {
      const staticCache = await caches.open(this.cacheNames.static);
      const dynamicCache = await caches.open(this.cacheNames.dynamic);
      
      const staticKeys = await staticCache.keys();
      const dynamicKeys = await dynamicCache.keys();
      
      return {
        isSupported: true,
        hasStaticCache: staticKeys.length > 0,
        hasDynamicCache: dynamicKeys.length > 0,
        totalEntries: staticKeys.length + dynamicKeys.length
      };
    } catch (error) {
      console.error('Cache status check failed:', error);
      return {
        isSupported: true,
        hasStaticCache: false,
        hasDynamicCache: false,
        totalEntries: 0
      };
    }
  }

  // Service Worker durumunu kontrol et
  async getServiceWorkerStatus(): Promise<{
    isSupported: boolean;
    isRegistered: boolean;
    isActive: boolean;
    registration?: ServiceWorkerRegistration;
  }> {
    if (!('serviceWorker' in navigator)) {
      return {
        isSupported: false,
        isRegistered: false,
        isActive: false
      };
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      
      return {
        isSupported: true,
        isRegistered: !!registration,
        isActive: !!registration?.active,
        registration
      };
    } catch (error) {
      console.error('Service Worker status check failed:', error);
      return {
        isSupported: true,
        isRegistered: false,
        isActive: false
      };
    }
  }

  // Cache'i yeniden oluştur
  async rebuildCache(): Promise<boolean> {
    try {
      // Önce mevcut cache'i temizle
      await this.clearCache();
      
      // Service Worker'ı yeniden kaydet
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      }
      
      console.log('Cache rebuilt successfully');
      return true;
    } catch (error) {
      console.error('Cache rebuild failed:', error);
      return false;
    }
  }

  // Cache istatistiklerini al
  async getCacheStats(): Promise<{
    cacheSize: { static: number; dynamic: number; total: number };
    cacheStatus: { isSupported: boolean; hasStaticCache: boolean; hasDynamicCache: boolean; totalEntries: number };
    swStatus: { isSupported: boolean; isRegistered: boolean; isActive: boolean };
  }> {
    const [cacheSize, cacheStatus, swStatus] = await Promise.all([
      this.getCacheSize(),
      this.getCacheStatus(),
      this.getServiceWorkerStatus()
    ]);

    return {
      cacheSize,
      cacheStatus,
      swStatus
    };
  }
}

// Singleton instance export
export const cacheManager = CacheManager.getInstance();
