const localhosturlsToCache = [
  '/static/css/lato.css',
  '/static/css/global.css',
  '/static/img/logo.png',
  '/static/img/logo_360x640.png',
  '/static/img/login_page/top_ice.png',
  '/static/img/list.png',
  '/static/img/empty_list.png',
  '/static/img/coming_soon.png',
  '/static/icons/programms/GV_White.png',
  '/static/icons/programms/GT_White.png',
  '/public/sticker2.png',
  '/static/img/eps.png',
  '/static/img/people.png',
  '/static/img/posts.png',
  '/static/img/events.png',
  '/static/img/help.png',
  '/static/icons/LinkedIn-30.svg',
  '/static/icons/LinkedIn-37.svg',
  '/static/icons/LinkedIn-32.svg ',
  '/static/icons/LinkedIn-33.svg ',
  '/static/img/login_vote.png',
  '/static/img/welcome.png',
  '/static/img/aiesec_human.png',
  '/static/icons/menu_icon.svg',
  '/static/icons/search_icon.svg',
  '/static/icons/filter_icon.svg',
  '/static/icons/signup.png',
  '/static/fonts/lato-bold.ttf',
  '/static/fonts/lato-bold.woff',
  '/static/fonts/lato-bold.woff2',
  '/static/fonts/lato-regular.woff2',
  '/static/fonts/lato-regular.woff',
  '/static/js/main.chunk.js.map',
  '/static/js/1.chunk.js.map',
  '/static/js/bundle.js ',
  '/static/js/0.chunk.js ',
  '/static/js/main.chunk.js',
  '/static/js/1.chunk.js',
  'index.html',
  '/login',
  '/check-role',
  '/eps',
  '/icx-eps',
  '/ogx-eps',
  '/posts',
  '/settings',
  '/help',
  '/about',
  '/notifications',
  '/settings/profile',
  '/people',
  '/vote-rooms',
  '/vote-login',
  '/',
];

const netlifyurlsToCache = [
  'index.html',
  '/static/css/lato.css',
  '/static/css/global.css',
  '/static/img/logo.png',
  '/static/img/logo_360x640.png',
  '/static/img/login_page/top_ice.png',
  '/static/img/list.png',
  '/static/img/login_vote.png',
  '/static/img/welcome.png',
  '/static/img/aiesec_human.png',
  '/static/img/empty_list.png',
  '/static/img/coming_soon.png',
  '/static/icons/programms/GV_White.png',
  '/static/icons/programms/GT_White.png',
  '/public/sticker2.png',
  '/static/img/eps.png',
  '/static/img/people.png',
  '/static/img/posts.png',
  '/static/img/events.png',
  '/static/img/help.png',
  '/static/icons/LinkedIn-30.svg',
  '/static/icons/LinkedIn-37.svg',
  '/static/icons/LinkedIn-32.svg ',
  '/static/icons/LinkedIn-33.svg ',
  '/static/icons/signup.png',
  '/static/icons/menu_icon.svg',
  '/static/icons/search_icon.svg',
  '/static/icons/filter_icon.svg',
  '/static/fonts/lato-bold.ttf',
  '/static/fonts/lato-bold.woff',
  '/static/fonts/lato-bold.woff2',
  '/static/fonts/lato-regular.woff2',
  '/static/fonts/lato-regular.woff',
  '/static/js/2.0a46acd5.chunk.js',
  '/static/js/main.50a09901.chunk.js',
  '/static/css/main.ca15b75c.chunk.css',
  '/static/js/main.4596856b.chunk.js',
  '/static/js/main.6ecb84ea.chunk.js',
  '/static/js/2.62c4e658.chunk.js',
  '/static/js/main.bbbdf650.chunk.js',
  '/static/js/main.13ce958b.chunk.js ',
  '/static/js/main.826f6f48.chunk.js',
  '/static/js/2.ce512e1f.chunk.js',
  '/people',
  '/vote-rooms',
  '/vote-login',
  '/eps',
  '/icx-eps',
  '/ogx-eps',
  '/posts',
  '/settings',
  '/help',
  '/about',
  '/notifications',
  '/settings/profile',
  '/login',
  '/check-role',
  '/',
];

const CACHE_NAME = 'medina_up';

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  const { origin } = event.target.location;
  if (origin.includes('localhost')) {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.addAll(localhosturlsToCache)),
    );
  } else {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(netlifyurlsToCache)),
    );
  }
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
      }),
    );
  }
});

self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    if (event.request.url === 'http://localhost:3000/static/js/main.chunk.js') {
      event.waitUntil(
        this.registration.showNotification('Internet', {
          body: 'internet not working',
        }),
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        const requestUrl = event.request.clone();
        fetch(requestUrl);
      }),
    );
  }
});

self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: './static/img/logo.png',
  });
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      }),
    )),
  );
});
