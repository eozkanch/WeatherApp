'use client';

import { useState, useEffect } from 'react';
import { cacheManager } from '@/lib/cache-manager';

interface CacheStats {
  cacheSize: { static: number; dynamic: number; total: number };
  cacheStatus: { isSupported: boolean; hasStaticCache: boolean; hasDynamicCache: boolean; totalEntries: number };
  swStatus: { isSupported: boolean; isRegistered: boolean; isActive: boolean };
}

export default function CacheDebugPanel() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const cacheStats = await cacheManager.getCacheStats();
      setStats(cacheStats);
    } catch (error) {
      console.error('Failed to load cache stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = async () => {
    if (confirm('Are you sure you want to clear all cache?')) {
      setIsLoading(true);
      try {
        const success = await cacheManager.clearCache();
        if (success) {
          alert('Cache cleared successfully!');
          await loadStats();
        } else {
          alert('Failed to clear cache');
        }
      } catch (error) {
        console.error('Cache clearing failed:', error);
        alert('Cache clearing failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const rebuildCache = async () => {
    if (confirm('Are you sure you want to rebuild cache?')) {
      setIsLoading(true);
      try {
        const success = await cacheManager.rebuildCache();
        if (success) {
          alert('Cache rebuilt successfully!');
          await loadStats();
        } else {
          alert('Failed to rebuild cache');
        }
      } catch (error) {
        console.error('Cache rebuild failed:', error);
        alert('Cache rebuild failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (showPanel) {
      loadStats();
    }
  }, [showPanel]);

  // Sadece development modunda göster
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50 hover:bg-gray-700 transition-colors"
        title="Cache Debug Panel"
      >
        🛠️
      </button>

      {/* Debug Panel */}
      {showPanel && (
        <div className="fixed bottom-16 left-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50 max-w-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Cache Debug</h3>
            <button
              onClick={() => setShowPanel(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
              <p className="text-xs mt-2">Loading...</p>
            </div>
          ) : stats ? (
            <div className="space-y-3 text-xs">
              {/* Service Worker Status */}
              <div>
                <h4 className="font-semibold text-green-400 mb-1">Service Worker</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Supported:</span>
                    <span className={stats.swStatus.isSupported ? 'text-green-400' : 'text-red-400'}>
                      {stats.swStatus.isSupported ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registered:</span>
                    <span className={stats.swStatus.isRegistered ? 'text-green-400' : 'text-red-400'}>
                      {stats.swStatus.isRegistered ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active:</span>
                    <span className={stats.swStatus.isActive ? 'text-green-400' : 'text-red-400'}>
                      {stats.swStatus.isActive ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cache Status */}
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">Cache Status</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Static Cache:</span>
                    <span className={stats.cacheStatus.hasStaticCache ? 'text-green-400' : 'text-red-400'}>
                      {stats.cacheStatus.hasStaticCache ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dynamic Cache:</span>
                    <span className={stats.cacheStatus.hasDynamicCache ? 'text-green-400' : 'text-red-400'}>
                      {stats.cacheStatus.hasDynamicCache ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Entries:</span>
                    <span className="text-yellow-400">{stats.cacheStatus.totalEntries}</span>
                  </div>
                </div>
              </div>

              {/* Cache Size */}
              <div>
                <h4 className="font-semibold text-purple-400 mb-1">Cache Size</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Static:</span>
                    <span className="text-yellow-400">{stats.cacheSize.static} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dynamic:</span>
                    <span className="text-yellow-400">{stats.cacheSize.dynamic} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="text-yellow-400">{stats.cacheSize.total} KB</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-gray-700">
                <div className="flex space-x-2">
                  <button
                    onClick={loadStats}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs transition-colors"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={clearCache}
                    className="flex-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={rebuildCache}
                    className="flex-1 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs transition-colors"
                  >
                    Rebuild
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-gray-400">Failed to load stats</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
