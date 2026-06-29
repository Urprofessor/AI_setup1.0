const CACHE = 'v1';

const PRECACHE = [
  '/',
  'fonts/Denton-Regular.otf',
  'images/welcome-hero.png',
  'images/complete-hero.png',
  'images/pump-left.png',
  'images/pump-right.png',
  'images/rectangleBg.png',
  'images/pause hero.png',
  'images/seekbar hero.png',
  'images/steps/01-unbox-inspect/tips1.png',
  'images/steps/02-measure-flange/step2tips1.png',
  'images/steps/02-measure-flange/step2tips2.png',
  'images/steps/02-measure-flange/step2tips3.png',
  'images/steps/03-disassemble/step3tips1.png',
  'images/steps/03-disassemble/step3tips2.png',
  'images/steps/03-disassemble/step3tips3.png',
  'images/steps/03-disassemble/step3tips4.png',
  'images/steps/03-disassemble/step3tips5.png',
  'images/steps/03-disassemble/step3tips6.png',
  'images/steps/04-clean-sanitize/step4tips1.png',
  'images/steps/04-clean-sanitize/step4tips2.png',
  'images/steps/05-assemble/step5tips1.png',
  'images/steps/05-assemble/step5tips2.png',
  'images/steps/05-assemble/step5tips3.png',
  'images/steps/05-assemble/step5tips4.png',
  'images/steps/05-assemble/step5tips5.png',
  'images/steps/06-wear/step6tips1-1.png',
  'images/steps/06-wear/step6tips1-2.png',
  'images/steps/06-wear/step6tips2.png',
  'images/steps/07-first-session/step7tips1.png',
  'images/steps/07-first-session/step7tips2.png',
  'images/steps/07-first-session/step7tips3.png',
  'icon/Property 1=01-meet-your-parts 1.png',
  'icon/Property 1=02-know-what-to-wash 1.png',
  'icon/Property 1=03-clean-before-first-use 1.png',
  'icon/Property 1=04-find-your-flange-size 1.png',
  'icon/Property 1=05-assemble-your-pump 1.png',
  'icon/Property 1=06-check-the-seal 1.png',
  'icon/Property 1=07-charge-your-pump 1.png',
  'icon/Property 1=08-connect-to-the-app 1.png',
  'icon/Property 1=09-wear-it-right 1.png',
  'icon/Property 1=10-start-your-first-session 1.png',
  'icon/Welcome-1.png',
  'icon/Welcome-2.png',
  'icon/Welcome-3.png',
  'icon/感叹号icon.png',
  'icon/问号icon.png',
];

const VIDEOS = [
  'videos/step1.mp4',
  'videos/step2.mp4',
  'videos/step3.mp4',
  'videos/step4.mp4',
  'videos/step5.mp4',
  'videos/step6.mp4',
  'videos/step7.mp4',
];

// Install: pre-cache all non-video assets immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isVideo = VIDEOS.some(v => url.pathname.endsWith(v.replace(/^.*\//, '/')));

  if (isVideo) {
    // Videos: cache-first, but support range requests for streaming
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(e.request, { ignoreVary: true });
        if (cached) return cached;
        // Fetch without range header first to cache the full file
        const fullReq = new Request(url.href, { headers: {}, mode: 'cors' });
        try {
          const res = await fetch(fullReq);
          if (res.ok) cache.put(fullReq, res.clone());
          return res;
        } catch {
          return fetch(e.request);
        }
      })
    );
    return;
  }

  // Everything else: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
