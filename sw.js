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


  var translatorJson = 
  {
    'interaction': 'event',
    'client': 'customer',
    'os_name': 'operating_system_name', 
    'x1': 'utm_source',
    'x2': 'utm_medium',
    'x3': 'utm_campaign',
    'landing_url': 'campaign_url'
  }
  traslatedparams = '';

  if (/\.jpeg$/.test(event.request.url)) { 
    for (obj in translatorJson)
    {
      value = '';
      if (event.request.url.searchParams.get(obj))
      {
        value = event.request.url.searchParams.get(obj);

      }
      if (value != '')
      {
        traslatedparams += obj + '='+value
      }


    }
  }
    event.respondWith(
    new Response('<p>This is a response that comes from your service worker! '+ event.request.url + traslatedparams + '</p>', {
       headers: { 'Content-Type': 'text/html' }
      })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {

      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        //const url = new URL(event.request.clone().url);
        //var paramValue = url.searchParams.get("filename");
        var translatorJson = 
        {
          'interaction': 'event',
          'client': 'customer',
          'os_name': 'operating_system_name', 
          'x1': 'utm_source',
          'x2': 'utm_medium',
          'x3': 'utm_campaign',
          'landing_url': 'campaign_url'
        }
        traslatedparams = '';

        if (/\.jpeg$/.test(event.request.url)) 
        { 
          for (obj in translatorJson)
          {
            value = '';
            if (event.request.url.searchParams.get(obj))
            {
              value = event.request.url.searchParams.get(obj);
            }
            if (value != '')
            {
              traslatedparams += obj + '='+value
            }
          }
        }
          var newResponse = new Response('<p>This is a response that comes from your service worker! '+ event.request.url + traslatedparams + '</p>', {
         headers: { 'Content-Type': 'text/html' }
        });

        let responseClone = newResponse.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return responseClone;
      }).catch(function () {
        return caches.match('/veenaw.github.io/images/image.jpeg');
      });
    }
  }));
});