// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/veenaw.github.io/sw.js', { scope: '/veenaw.github.io' }).then(function(reg) {

  if(reg.installing) {
    console.log('Service worker installing');
  } else if(reg.waiting) {
    console.log('Service worker installed');
  } else if(reg.active) {
    console.log('Service worker active');
  }

  // Do a one-off check to see if a service worker's in control.
  if (navigator.serviceWorker.controller) {
    console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
  } else {
    console.log('This page is not currently controlled by a service worker.');
  }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });

  navigator.serviceWorker.ready
  .then(function(registration) {
    console.log('A service worker is active:', registration.active);

    // At this point, you can call methods that require an active
    // service worker, like registration.pushManager.subscribe()
  });
}

var maximages = 5;
var prevmaximamges = maximages;
var path = 'images/'
var url  = 'images/image.jpeg?interaction=UserClick&client=ad_media&os_name=macos&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1'
  

function loadAllImages(isfirstload)
{
  var imgSection = document.querySelector('section');
    // load each set of image, alt text, name and caption
  var toadd = maximages;
  if (!isfirstload) 
  {
    toadd = maximages -prevmaximamges;
  }

  for(var i = 0; i< toadd; i++) {
    fetchImage(url);
    /*
    imgLoad(url).then(function(arrayResponse) {

      var myImage = document.createElement('img');
      var myCaption = document.createElement('caption');
      var imageURL = window.URL.createObjectURL(arrayResponse[0]);


      myImage.src = imageURL;
      myImage.setAttribute('alt', 'alt');
      //myCaption.innerHTML = '<strong>' + i + '</strong>: Taken by abc ' ;
      myCaption.innerHTML = '<strong>' + arrayResponse[1] + '</strong>: Taken by abc';


      imgSection.appendChild(myImage);
      imgSection.appendChild(myCaption);

    }, function(Error) {
      console.log(Error);
    });*/
  }
}

// function for loading each image via XHR
function addImage()
{
  prevmaximamges = maximages;
  maximages = maximages + 1;
  loadAllImages(false);

};


function readResponseAsBlob(response) {
  return response.blob();
}

function showImage(responseAsBlob) {
  // Assuming the DOM has a div with id 'container'
  var container = document.getElementById('section');
  var imgElem = document.createElement('img');
  container.appendChild(imgElem);
  var imgUrl = URL.createObjectURL(responseAsBlob);
  imgElem.src = imgUrl;
}

function fetchImage(pathToResource) {
  fetch(pathToResource)
  .then(validateResponse)
  .then(readResponseAsBlob)
  .then(showImage)
  .catch(logError);
}

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem: \n', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}



/*

function imgLoad(imgurl) {
  // return a promise for an image loading
// download as Blob object
  return new Promise(function(resolve, reject) {
    fetch(imgurl).then((response) => {
      if(response.status == 200)
      {
        var arrayResponse = [];
        arrayResponse[0] = response.blob();
        arrayResponse[1] = imgurl;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + response.statusText));
      }
      })
  });
}*/

// function for loading each image via XHR

function imgLoad(imgurl) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', imgurl);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = imgurl;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}



window.onload = function() {
  loadAllImages(true);

};

