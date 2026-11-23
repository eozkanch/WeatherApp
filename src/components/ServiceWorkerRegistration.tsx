'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Geliştirmede SW kullanma: /_next/static dosyalarını cache-first sunduğu için
    // eski CSS/JS'te takılı kalıp değişiklikleri gizliyor. Kayıtlı SW ve cache'leri temizle.
    if (process.env.NODE_ENV !== 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
      }
      if ('caches' in window) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
      return;
    }

    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          
          // Service Worker güncellemelerini kontrol et
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Yeni Service Worker kuruldu, kullanıcıya bildir
                  if (confirm('Yeni güncelleme mevcut! Sayfayı yenilemek ister misiniz?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
          
          // Offline durumu kontrol et
          const checkOnlineStatus = () => {
            if (!navigator.onLine) {
              // Offline durumunda kullanıcıya bildirim göster
              document.body.classList.add('offline');
            } else {
              document.body.classList.remove('offline');
            }
          };
          
          // Online/offline event listener'ları
          window.addEventListener('online', checkOnlineStatus);
          window.addEventListener('offline', checkOnlineStatus);
          
          // İlk kontrol
          checkOnlineStatus();
          
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };
      
      registerSW();
    }
  }, []);

  return null;
}
