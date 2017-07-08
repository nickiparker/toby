// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  CLIENT_ID,
  CLIENT_SECRET
);

function run(imgurl) {
  document.getElementById("image_given").src=imgurl;
}