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
  postImage(imgurl);
  document.getElementById("image_given").src=imgurl;
}

function upload(image_url, file_base64) {
  postImageBase64(file_base64);
  document.getElementById("image_given").src=image_url;
}