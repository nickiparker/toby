var image_url;
var file_base64;

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  CLIENT_ID,
  CLIENT_SECRET
);

function postImage(imgurl) {

  app.models.predict(Clarifai.GENERAL_MODEL, imgurl).then(
    function(response) {
      parseResponse(response);  
    },
    function(err) {
      console.error(err);
    }
  );
}

function postImageBase64(file_base64) {
  app.models.predict(Clarifai.GENERAL_MODEL, {base64: file_base64}).then(
    function(response) {
      parseResponse(response);  
    },
    function(err) {
      console.error(err);
    }
  );
}

function parseResponse(response) {
  var tags = [];
    var results = response["outputs"][0]["data"]["concepts"];
    results.forEach(function(result) {
      tags.push(result["name"]);
    });
  var first_five_tags = tags.slice(0, 5);
  document.getElementById('tags').innerHTML = first_five_tags.toString().replace(/,/g, ', ');
}

function run(imgurl) {
  document.getElementById('tags').innerHTML = "";
  postImage(imgurl);
  document.getElementById("image_given").src=imgurl;
}

function upload(image_url, file_base64) {
  document.getElementById('tags').innerHTML = "";
  postImageBase64(file_base64);
  document.getElementById("image_given").src=image_url;
}

function takeImage(event) {
  var camera = document.getElementById('camera');
  camera.style.display = 'block';
  var player = document.getElementById('player'); 
  var snapshotCanvas = document.getElementById('snapshot');
  var captureButton = document.getElementById('capture');
  var videoTracks;
  var handleSuccess = function(stream) {
  // Attach the video stream to the video element and autoplay.
  player.srcObject = stream;
  videoTracks = stream.getVideoTracks();
};

captureButton.addEventListener('click', function() {
  var context = snapshot.getContext('2d');
  // Draw the video frame to the canvas.
  context.drawImage(player, 0, 0, snapshotCanvas.width, 
      snapshotCanvas.height);

  image_url = snapshot.toDataURL();
  base64 = image_url.substring(22);
  
  console.log(snapshot.toDataURL().substring(22));
  // Stop all video streams.
  videoTracks.forEach(function(track) {track.stop()});
  camera.style.display = 'none';
  upload(image_url, base64);
});

navigator.mediaDevices.getUserMedia({video: true})
    .then(handleSuccess);
}