import { useState, useEffect, useCallback } from 'react';

interface PWAState {
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  isUpdateAvailable: boolean;
  swRegistration: ServiceWorkerRegistration | null;
  installPrompt: BeforeInstallPromptEvent | null;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const usePWA = () => {
  const [state, setState] = useState<PWAState>({
    isOnline: true,
    isInstallable: false,
    isInstalled: false,
    isUpdateAvailable: false,
    swRegistration: null,
    installPrompt: null,
  });

  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed' | 'failed'>('idle');
  const [cacheInfo, setCacheInfo] = useState({
    size: 0,
    lastUpdate: null as Date | null,
    itemCount: 0,
  });

  // Check if app is running in standalone mode (installed)
  const checkIfInstalled = useCallback(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = 'standalone' in window.navigator && (window.navigator as any).standalone;
    
    setState(prev => ({ 
      ...prev, 
      isInstalled: isStandalone || isIOSStandalone 
    }));
  }, []);

  // Register service worker
  const registerServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        });

        setState(prev => ({ ...prev, swRegistration: registration }));

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setState(prev => ({ ...prev, isUpdateAvailable: true }));
              }
            });
          }
        });

        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', handleSWMessage);

        console.log('Service Worker registered successfully');
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
      }
    }
    return null;
  }, []);

  // Handle service worker messages
  const handleSWMessage = useCallback((event: MessageEvent) => {
    const { data } = event;

    switch (data.type) {
      case 'SYNC_COMPLETE':
        setSyncStatus('completed');
        updateCacheInfo();
        // Store last sync time
        localStorage.setItem('lastSyncTime', new Date().toISOString());
        break;
      
      case 'SYNC_FAILED':
        setSyncStatus('failed');
        break;
      
      case 'CACHE_UPDATED':
        updateCacheInfo();
        break;
      
      case 'NOTIFICATION_CLICK':
        // Handle notification click navigation
        if (data.url) {
          window.location.href = data.url;
        }
        break;
    }
  }, []);

  // Update cache information
  const updateCacheInfo = useCallback(async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        let totalSize = 0;
        let itemCount = 0;

        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          itemCount += requests.length;

          // Sample cache size calculation
          for (const request of requests.slice(0, 5)) {
            try {
              const response = await cache.match(request);
              if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
              }
            } catch (error) {
              // Skip failed entries
            }
          }
        }

        setCacheInfo({
          size: totalSize,
          itemCount,
          lastUpdate: new Date(),
        });
      } catch (error) {
        console.error('Error updating cache info:', error);
      }
    }
  }, []);

  // Install PWA
  const installPWA = useCallback(async () => {
    if (state.installPrompt) {
      try {
        await state.installPrompt.prompt();
        const result = await state.installPrompt.userChoice;
        
        if (result.outcome === 'accepted') {
          setState(prev => ({ 
            ...prev, 
            isInstallable: false, 
            installPrompt: null,
            isInstalled: true 
          }));
        }
      } catch (error) {
        console.error('Installation failed:', error);
      }
    }
  }, [state.installPrompt]);

  // Update service worker
  const updateServiceWorker = useCallback(() => {
    if (state.swRegistration?.waiting) {
      state.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }, [state.swRegistration]);

  // Clear all caches
  const clearCache = useCallback(async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        setCacheInfo({ size: 0, itemCount: 0, lastUpdate: new Date() });
        
        // Also clear service worker cache
        if (state.swRegistration) {
          state.swRegistration.active?.postMessage({ type: 'CLEAR_CACHE' });
        }
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    }
  }, [state.swRegistration]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.error('Notification permission request failed:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Subscribe to push notifications
  const subscribeToPush = useCallback(async () => {
    if (state.swRegistration && 'PushManager' in window) {
      try {
        const subscription = await state.swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        });
        
        // Send subscription to server
        await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });
        
        return subscription;
      } catch (error) {
        console.error('Push subscription failed:', error);
        return null;
      }
    }
    return null;
  }, [state.swRegistration]);

  // Background sync for offline actions
  const requestBackgroundSync = useCallback(async (tag: string) => {
    if (state.swRegistration && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await state.swRegistration.sync.register(tag);
        setSyncStatus('syncing');
        return true;
      } catch (error) {
        console.error('Background sync registration failed:', error);
        return false;
      }
    }
    return false;
  }, [state.swRegistration]);

  // Cache specific URLs
  const cacheUrls = useCallback(async (urls: string[]) => {
    if (state.swRegistration) {
      state.swRegistration.active?.postMessage({
        type: 'CACHE_URLS',
        urls
      });
    }
  }, [state.swRegistration]);

  // Get offline data status
  const getOfflineDataStatus = useCallback(async () => {
    const status = {
      hasAnimals: false,
      hasVolunteers: false,
      hasEvents: false,
      lastSync: null as Date | null,
    };

    if ('caches' in window) {
      try {
        const cache = await caches.open('animal-shelter-data-v1.0.0');
        const requests = await cache.keys();
        
        for (const request of requests) {
          const url = request.url;
          if (url.includes('/api/animals')) status.hasAnimals = true;
          if (url.includes('/api/volunteers')) status.hasVolunteers = true;
          if (url.includes('/api/events')) status.hasEvents = true;
        }

        const lastSyncTime = localStorage.getItem('lastSyncTime');
        if (lastSyncTime) {
          status.lastSync = new Date(lastSyncTime);
        }
      } catch (error) {
        console.error('Error checking offline data:', error);
      }
    }

    return status;
  }, []);

  // Store offline action
  const storeOfflineAction = useCallback(async (action: {
    id: string;
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
    timestamp: number;
  }) => {
    try {
      const actions = JSON.parse(localStorage.getItem('offlineActions') || '[]');
      actions.push(action);
      localStorage.setItem('offlineActions', JSON.stringify(actions));
      
      // Request background sync
      await requestBackgroundSync('sync-offline-actions');
    } catch (error) {
      console.error('Error storing offline action:', error);
    }
  }, [requestBackgroundSync]);

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setState(prev => ({ ...prev, isOnline: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    // Check if app is installed
    checkIfInstalled();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(prev => ({ 
        ...prev, 
        isInstallable: true, 
        installPrompt: e 
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);

    // Listen for app installation
    window.addEventListener('appinstalled', () => {
      setState(prev => ({ 
        ...prev, 
        isInstalled: true, 
        isInstallable: false,
        installPrompt: null 
      }));
    });

    // Register service worker
    registerServiceWorker();

    // Update cache info
    updateCacheInfo();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
    };
  }, [registerServiceWorker, updateCacheInfo, checkIfInstalled, handleSWMessage]);

  return {
    // State
    ...state,
    syncStatus,
    cacheInfo,

    // Actions
    installPWA,
    updateServiceWorker,
    clearCache,
    requestNotificationPermission,
    subscribeToPush,
    requestBackgroundSync,
    cacheUrls,
    getOfflineDataStatus,
    storeOfflineAction,

    // Utilities
    formatCacheSize: (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
  };
};