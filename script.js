// get the data to show up using a set variable
let placeName = "Cardiff";

function getWeather(placeName) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=LLJRM2WGCRY8YRHE89992BHH8&contentType=json`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      console.log(
        ` Maximum temperature for ${placeName} on ${response.days[0].datetime} is ${response.days[0].tempmax}, minimum temperature is ${response.days[0].tempmin}, and the overall conditions are ${response.days[0].conditions}.`
      );
    });
}

getWeather("Swansea");
