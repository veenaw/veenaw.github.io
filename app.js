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


// function for loading each image via XHR
function addImage()
{
  this.maximages = this.maximages + 1;
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
  var path = 'images/'
  var url  = 'images/image.jpeg?interaction=UserClick&client=ad_media&os_name=macos&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1'
    // load each set of image, alt text, name and caption
  for(var i = 0; i< this.maximages; i++) {
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
   this.maximages = 5;
  loadAllImages()

};

