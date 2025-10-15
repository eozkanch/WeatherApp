'use client';

import { useState, useEffect } from 'react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // İlk durumu kontrol et
    setIsOnline(navigator.onLine);
    
    // Online/offline event listener'ları
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline banner */}
      {!isOnline && (
        <div className="offline-indicator">
          📡 Offline Mode - Using cached data
        </div>
      )}
      
      {/* Status indicator */}
      <div className={`sw-status ${showStatus ? 'show' : ''} ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </div>
    </>
  );
}
