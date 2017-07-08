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

function parseResponse(response) {
  var tags = [];
    var results = response["outputs"][0]["data"]["concepts"];
    results.forEach(function(result) {
      tags.push(result["name"]);
    });
  var first_five_tags = tags.slice(0, 5);
  console.log(first_five_tags);
}

function run(imgurl) {
  postImage(imgurl);
  document.getElementById("image_given").src=imgurl;
}