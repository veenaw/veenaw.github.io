// A list of local resources we always want to be cached
const PRECACHE = 'v1';
const RUNTIME = 'runtime';


const PRECACHE_URLS = [
'/veenaw.github.io',
'/veenaw.github.io/',
'/veenaw.github.io/index.html',
'/veenaw.github.io/style.css',
'/veenaw.github.io/scripts/app.js',
'/veenaw.github.io/images/image.jpeg'
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(PRECACHE).then(function(cache) {
      return cache.addAll(PRECACHE_URLS).then(self.skipWaiting());
    })
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  console.info('Event: Activate');
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', function(event) {
  console.info(event.request);
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
        
        var translatorJson = 
        {
          'interaction': 'event',
          'client': 'customer',
          'os_name': 'operating_system_name', 
          'x1': 'utm_source',
          'x2': 'utm_medium',
          'x3': 'utm_campaign',
          'landing_url': 'campaign_url'
        };
        translatedparams = '';

        if (/image\.jpeg/.test(event.request.url)) 
        { 
          var querystring =  event.request.url.split("?");
          var urlParams = new URLSearchParams(querystring[1]);
          for (obj in translatorJson)
          {
            value = '';

            if (urlParams.has(obj))
            {
              value = urlParams.get(obj);
            }
            if (value != '')
            {
              if (translatedparams != '')
              {
                translatedparams = translatedparams +'&';
              }
              translatedparams = translatedparams + translatorJson[obj] + '='+value;
            }
          }
          console.log('new params',translatedparams);
          var newUrl = querystring[0] + '?' +translatedparams;
          console.log('translated url', newUrl);
          event.request.url = newUrl;
        }
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();     
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/veenaw.github.io/images/image.jpeg');
      });
    }
  }));
});