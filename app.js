// register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/veenaw.github.io/sw.js');
        
        //navigator.serviceWorker.ready always resolve
        navigator.serviceWorker.ready.then(function (registration) {
            console.log('Service worker successfully registered on scope', registration.scope);
        });
    });
}

var maximages = 5;
var path = 'images/'
var url  = 'images/image.jpeg?interaction=UserClick&client=ad_media&os_name=macos&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1'
  


// function for loading each image via XHR
function addImage()
{
  maximages = maximages + 1;
  loadAllImages();

};

function imgLoad(imgurl) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    //var request = new XMLHttpRequest();
    //request.open('GET', imgurl);
    //request.responseType = 'blob';
    var outside;
    fetch(imgurl).then((response) => {
      return response.blob();
      }).then((images) => {
        outside = URL.createObjectURL(images)
        console.log(outside);
      });
  });
}

function loadAllImages()
{
  var imgSection = document.querySelector('section');
    // load each set of image, alt text, name and caption
  for(var i = 0; i< maximages; i++) {
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
}

window.onload = function() {
  loadAllImages()

};

