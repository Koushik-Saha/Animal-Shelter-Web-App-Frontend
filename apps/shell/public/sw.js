// Animal Shelter Management System - Service Worker
// Version: 1.0.0

const CACHE_NAME = 'animal-shelter-v1.0.0';
const RUNTIME_CACHE = 'animal-shelter-runtime-v1.0.0';
const DATA_CACHE = 'animal-shelter-data-v1.0.0';

// Static assets to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/adopt',
  '/medical',
  '/volunteer',
  '/admin',
  '/behavior',
  '/web3',
  '/transport',
  '/reporting',
  '/legal',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// API endpoints that should be cached
const CACHEABLE_API_PATTERNS = [
  /^\/api\/animals/,
  /^\/api\/users/,
  /^\/api\/volunteers/,
  /^\/api\/adoptions/,
  /^\/api\/medical/,
  /^\/api\/inventory/,
  /^\/api\/events/,
];

// API endpoints that should always be fresh (no cache)
const FRESH_API_PATTERNS = [
  /^\/api\/auth/,
  /^\/api\/payments/,
  /^\/api\/donations/,
  /^\/api\/emergency/,
  /^\/api\/notifications/,
];

// Network-first strategy for critical real-time data
const NETWORK_FIRST_PATTERNS = [
  /^\/api\/emergency/,
  /^\/api\/transport\/live/,
  /^\/api\/medical\/critical/,
  /^\/api\/notifications/,
  /^\/api\/alerts/,
];

// Cache-first strategy for static content
const CACHE_FIRST_PATTERNS = [
  /\.(png|jpg|jpeg|svg|gif|webp)$/,
  /\.(css|js|woff|woff2|ttf|eot)$/,
  /^\/icons\//,
  /^\/images\//,
  /^\/static\//,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== RUNTIME_CACHE && 
                cacheName !== DATA_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (url.pathname.startsWith('/_next/')) {
    event.respondWith(handleStaticAsset(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Handle API requests with different strategies
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Always fresh for critical endpoints
    if (FRESH_API_PATTERNS.some(pattern => pattern.test(pathname))) {
      return await fetch(request);
    }
    
    // Network-first for real-time data
    if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(pathname))) {
      return await networkFirstStrategy(request, DATA_CACHE);
    }
    
    // Cache-first for cacheable APIs
    if (CACHEABLE_API_PATTERNS.some(pattern => pattern.test(pathname))) {
      return await cacheFirstStrategy(request, DATA_CACHE);
    }
    
    // Default to network-first for other APIs
    return await networkFirstStrategy(request, DATA_CACHE);
    
  } catch (error) {
    console.error('[SW] API request failed:', error);
    
    // Return cached version if available, otherwise offline message
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline API response
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'This feature requires an internet connection',
        offline: true
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle static assets (CSS, JS, images)
async function handleStaticAsset(request) {
  const url = new URL(request.url);
  
  // Cache-first for static content
  if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    return await cacheFirstStrategy(request, RUNTIME_CACHE);
  }
  
  // Network-first for other static assets
  return await networkFirstStrategy(request, RUNTIME_CACHE);
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first for pages
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Page request failed, trying cache:', request.url);
    
    // Try to serve from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Serve offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    // Return generic offline response
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Animal Shelter</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              text-align: center; 
              padding: 50px;
              background: linear-gradient(135deg, #4CAF50, #FF6B35);
              color: white;
              min-height: 100vh;
              margin: 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .icon { font-size: 4rem; margin-bottom: 1rem; }
            h1 { margin-bottom: 1rem; }
            p { max-width: 400px; line-height: 1.6; }
            .retry-btn {
              background: rgba(255,255,255,0.2);
              border: 2px solid white;
              color: white;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              margin-top: 2rem;
              font-size: 1rem;
            }
            .retry-btn:hover { background: rgba(255,255,255,0.3); }
          </style>
        </head>
        <body>
          <div class="icon">🐾</div>
          <h1>You're Offline</h1>
          <p>The Animal Shelter Management System needs an internet connection to work properly. Please check your connection and try again.</p>
          <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
        </body>
      </html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Network-first strategy
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Cache-first strategy
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        caches.open(cacheName).then(cache => {
          cache.put(request, networkResponse);
        });
      }
    }).catch(error => {
      console.log('[SW] Background update failed:', error);
    });
    
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Handle sync events for background sync
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-offline-actions') {
    event.waitUntil(syncOfflineActions());
  }
});

// Background sync for offline actions
async function syncOfflineActions() {
  try {
    console.log('[SW] Syncing offline actions...');
    
    // Get stored offline actions from IndexedDB or localStorage
    const offlineActions = await getOfflineActions();
    
    for (const action of offlineActions) {
      try {
        await processOfflineAction(action);
        await removeOfflineAction(action.id);
      } catch (error) {
        console.error('[SW] Failed to sync action:', action, error);
      }
    }
    
    // Notify clients that sync is complete
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        timestamp: Date.now()
      });
    });
    
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  const options = {
    body: 'You have new updates in the Animal Shelter Management System',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'view',
        title: 'View Updates',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ],
    requireInteraction: true,
    tag: 'animal-shelter-update'
  };
  
  if (event.data) {
    try {
      const payload = event.data.json();
      options.title = payload.title || 'Animal Shelter Update';
      options.body = payload.body || options.body;
      options.data = { ...options.data, ...payload.data };
    } catch (error) {
      console.error('[SW] Failed to parse push payload:', error);
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('Animal Shelter Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    self.clients.matchAll().then(clients => {
      // Check if the app is already open
      const existingClient = clients.find(client => 
        client.url.includes(self.location.origin)
      );
      
      if (existingClient) {
        // Focus existing window and navigate
        existingClient.focus();
        existingClient.postMessage({
          type: 'NOTIFICATION_CLICK',
          url: urlToOpen
        });
      } else {
        // Open new window
        self.clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle message events from the main app
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      cacheUrls(event.data.urls)
    );
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      clearAllCaches()
    );
  }
});

// Utility functions
async function getOfflineActions() {
  // This would typically integrate with IndexedDB
  // For now, return empty array
  return [];
}

async function processOfflineAction(action) {
  // Process the offline action by making the appropriate API call
  const response = await fetch(action.url, {
    method: action.method,
    headers: action.headers,
    body: action.body
  });
  
  if (!response.ok) {
    throw new Error(`Failed to process action: ${response.status}`);
  }
  
  return response;
}

async function removeOfflineAction(actionId) {
  // Remove the action from IndexedDB
  console.log('[SW] Removing processed offline action:', actionId);
}

async function cacheUrls(urls) {
  const cache = await caches.open(RUNTIME_CACHE);
  return cache.addAll(urls);
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

// Cache size management
async function manageCacheSize() {
  const caches = await self.caches.keys();
  
  for (const cacheName of caches) {
    const cache = await self.caches.open(cacheName);
    const requests = await cache.keys();
    
    if (requests.length > 100) { // Limit cache size
      const oldestRequests = requests.slice(0, requests.length - 100);
      await Promise.all(
        oldestRequests.map(request => cache.delete(request))
      );
    }
  }
}

// Periodic cache cleanup
setInterval(manageCacheSize, 60000 * 60); // Every hour

console.log('[SW] Service Worker loaded successfully');