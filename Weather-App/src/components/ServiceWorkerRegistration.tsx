'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          
          console.log('Service Worker registered successfully:', registration);
          
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
              console.log('App is offline');
              // Offline durumunda kullanıcıya bildirim göster
              document.body.classList.add('offline');
            } else {
              console.log('App is online');
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
