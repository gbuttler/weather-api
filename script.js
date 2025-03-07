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

  async function getWeather() {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=LLJRM2WGCRY8YRHE89992BHH8&contentType=json`,
      { mode: "cors" }
    );
    const weatherData = await response.json();

    console.log(weatherData);

    //new array to store the data I want in
    let weatherInfo = [];

    //add to new array containing only data I want
    for (let i = 0; i < weatherData.days.length; i++) {
      const newDayInfo = {
        fulladdress: weatherData.resolvedAddress,
        datetime: weatherData.days[i].datetime,
        tempmax: weatherData.days[i].tempmax,
        tempmin: weatherData.days[i].tempmin,
        conditions: weatherData.days[i].conditions,
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

        //get div container and fill with content
        let resultsDiv = document.getElementById("weatherResults");

        resultsDiv.innerHTML = "";

        let resultsTitle = document.createElement("h3");
        resultsTitle.innerHTML = "Results";

        let introInfo = document.createElement("p");
        introInfo.classList.add("intro");
        introInfo.innerHTML = `Here are the results for ${placeName} on ${weatherInfo[j].datetime}`;

        let maxTempDiv = document.createElement("div");
        maxTempDiv.classList.add("infoDiv");
        let maxTempTitle = document.createElement("p");
        maxTempTitle.classList.add("infoTitle");
        maxTempTitle.innerHTML = "Max temp:";
        let maxTempData = document.createElement("p");
        maxTempData.classList.add("infoData");
        maxTempData.innerHTML = `${weatherInfo[j].tempmax}°C`;

        maxTempDiv.appendChild(maxTempTitle);
        maxTempDiv.appendChild(maxTempData);

        let minTempDiv = document.createElement("div");
        minTempDiv.classList.add("infoDiv");
        let minTempTitle = document.createElement("p");
        minTempTitle.classList.add("infoTitle");
        minTempTitle.innerHTML = "Min temp:";
        let minTempData = document.createElement("p");
        minTempData.classList.add("infoData");
        minTempData.innerHTML = ` ${weatherInfo[j].tempmin}°C`;

        minTempDiv.appendChild(minTempTitle);
        minTempDiv.appendChild(minTempData);

        let conditionsDiv = document.createElement("div");
        conditionsDiv.classList.add("infoDiv");
        let conditionsTitle = document.createElement("p");
        conditionsTitle.classList.add("infoTitle");
        conditionsTitle.innerHTML = "Overall conditions:";
        let conditionsData = document.createElement("p");
        conditionsData.classList.add("infoData");
        conditionsData.innerHTML = `${weatherInfo[j].conditions}`;

        conditionsDiv.appendChild(conditionsTitle);
        conditionsDiv.appendChild(conditionsData);

        //append to container
        resultsDiv.appendChild(resultsTitle);
        resultsDiv.appendChild(introInfo);
        resultsDiv.appendChild(maxTempDiv);
        resultsDiv.appendChild(minTempDiv);
        resultsDiv.appendChild(conditionsDiv);

        let maxTempNum = weatherInfo[j].tempmax;
        console.log(maxTempNum);

        if (maxTempNum < 2) {
          document.body.style.backgroundImage =
            "linear-gradient(#90908E, white)";
        } else if (maxTempNum >= 2 && maxTempNum < 8) {
          document.body.style.backgroundImage =
            "linear-gradient(#003966, white)";
        } else if (maxTempNum >= 8 && maxTempNum < 12) {
          document.body.style.backgroundImage =
            "linear-gradient(#00541c, white)";
        } else if (maxTempNum >= 12 && maxTempNum < 16) {
          document.body.style.backgroundImage =
            "linear-gradient(#F5E900, white)";
        } else if (maxTempNum >= 16 && maxTempNum < 20) {
          document.body.style.backgroundImage =
            "linear-gradient(#DE8302, white)";
        } else if (maxTempNum >= 20 && maxTempNum < 25) {
          document.body.style.backgroundImage =
            "linear-gradient(#71000f, white)";
        } else if (maxTempNum >= 25) {
          document.body.style.backgroundImage =
            "linear-gradient(#3b0057, white)";
        } else {
          document.body.style.backgroundImage =
            "linear-gradient(#1f83c1, white)";
        }
      }
    }
  }
  getWeather().catch((err) => {
    console.log(err);
    console.log("I can't find that place, please try again!");
    alert(
      `I'm sorry I can't find the weather for ${placeName}. Please try again.`
    );
  });
});
