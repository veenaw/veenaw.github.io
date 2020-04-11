self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/veenaw.github.io/',
        '/veenaw.github.io/index.html',
        '/veenaw.github.io/style.css',
        '/veenaw.github.io/app.js',
        '/veenaw.github.io/images/image.jpeg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
          console.log(event);
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
            console.log(event.request);

    if (response !== undefined) {
      return response;
    } else {

      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        //const url = new URL(event.request.clone().url);
        //var paramValue = url.searchParams.get("filename");

        console.log(event.request);
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