'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function subscribe(listener: () => void) {
  window.addEventListener('online', listener);
  window.addEventListener('offline', listener);
  return () => {
    window.removeEventListener('online', listener);
    window.removeEventListener('offline', listener);
  };
}

const getOnline = () => navigator.onLine;
const getServerOnline = () => true;

export default function OfflineIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getOnline, getServerOnline);
  const [showStatus, setShowStatus] = useState(false);
  const previous = useRef(isOnline);

  // Bağlantı durumu değişince rozet göster; online'a dönüşte 3 sn sonra gizle
  useEffect(() => {
    if (previous.current === isOnline) return;
    previous.current = isOnline;

    const show = setTimeout(() => setShowStatus(true), 0);
    const hide = isOnline ? setTimeout(() => setShowStatus(false), 3000) : undefined;
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [isOnline]);

  return (
    <>
      {!isOnline && (
        <div className="offline-indicator" role="status">
          📡 Offline Mode - Using cached data
        </div>
      )}

      <div className={`sw-status ${showStatus ? 'show' : ''} ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </div>
    </>
  );
}
