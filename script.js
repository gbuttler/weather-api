// get the data to show up

fetch(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Cardiff?unitGroup=us&key=LLJRM2WGCRY8YRHE89992BHH8&contentType=json",
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    console.log(response.description);
  });
