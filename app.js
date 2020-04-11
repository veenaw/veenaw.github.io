// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/veenaw.github.io/sw.js', { scope: '/veenaw.github.io/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}


// function for loading each image via XHR

function imgLoad(imgurl) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', imgurl);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var response = request.response;
        resolve(response);
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

var imgSection = document.querySelector('section');
var path = 'images/'
var url  = 'images/image.jpeg?interaction=UserClick&client=ad_media&os_name=macos&x1=go ogle&x2=email&x3=pdfconvert&landing_url=abcd1'

window.onload = function() {

  // load each set of image, alt text, name and caption
  for(var i = 0; i<=4; i++) {
    imgLoad(url).then(function(response) {

      var myImage = document.createElement('img');
      var myCaption = document.createElement('caption');

      myImage.src = url;
      myImage.setAttribute('alt', 'alt');
      myCaption.innerHTML = '<strong>' + i + '</strong>: Taken by abc ' ;

      imgSection.appendChild(myImage);
      imgSection.appendChild(myCaption);

    }, function(Error) {
      console.log(Error);
    });
  }
};

