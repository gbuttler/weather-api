//only allow the user to select a date as far as 2 weeks in advance
const todayDate = new Date();
const twoWeeksAway = new Date();

twoWeeksAway.setDate(todayDate.getDate() + 14);

const dateSelector = document.getElementById("weatherDate");

dateSelector.setAttribute("min", todayDate.toISOString().slice(0, 10));
dateSelector.setAttribute("max", twoWeeksAway.toISOString().slice(0, 10));

//add a function to the form submit
let weatherForm = document.getElementById("weatherForm");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let chosenDate = document.getElementById("weatherDate").value;
  let placeName = document.getElementById("placeName").value;

  console.log(chosenDate);
  console.log(placeName);

  function getWeather() {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=LLJRM2WGCRY8YRHE89992BHH8&contentType=json`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);

        //new array to store the data I want in
        let weatherInfo = [];

        //add to new array containing only data I want
        for (let i = 0; i < response.days.length; i++) {
          const newDayInfo = {
            fulladdress: response.resolvedAddress,
            datetime: response.days[i].datetime,
            tempmax: response.days[i].tempmax,
            tempmin: response.days[i].tempmin,
            conditions: response.days[i].conditions,
          };
          weatherInfo.push(newDayInfo);
        }

        // loop through response
        for (let j = 0; j < weatherInfo.length; j++) {
          if (chosenDate === weatherInfo[j].datetime) {
            console.log(weatherInfo[j].datetime, chosenDate);
            console.log(
              ` Maximum temperature for ${placeName} on ${weatherInfo[j].datetime} is ${weatherInfo[j].tempmax}, minimum temperature is ${weatherInfo[j].tempmin}, and the overall conditions are ${weatherInfo[j].conditions}.`
            );
          }
        }
      });
  }

  getWeather(placeName);
});
