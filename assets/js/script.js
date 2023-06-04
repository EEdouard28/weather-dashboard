// DEPENDENCIES

// Weather API Key
var APIKey = "d235a5db7da2633ff6e09047c8261443";

// VARIABLES for search bar
var searchEl = document.getElementById("searchBtn");
var locationEl = document.getElementById("enter-location");
var cityEl = document.getElementById("city-name");

// VARIABLES to retrieve current weather & forecast
var todaysTempEl = document.getElementById("temperature");
var todaysHumidityEl = document.getElementById("humidity");
var todaysWindEl = document.getElementById("wind-speed");
var todaysweatherEl = document.getElementById("current-weather");
var forecastEl = document.getElementById("fiveday-forecast");

// Function to retrieve current weather
function getWeather(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;
  axios
    .get(queryURL)
    .then(function (response) {
      todaysweatherEl.classList.remove("d-none");

      // Current weather date
      var currentDate = new Date(response.data.dt * 1000);
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      cityEl.innerHTML =
        response.data.name + " (" + month + "/" + day + "/" + year + ") ";

      // Current weather data in HTML
      var temperatureInKelvin = response.data.main.temp;
      var temperatureInFahrenheit = ((temperatureInKelvin - 273.15) * 9) / 5 + 32;
      todaysTempEl.innerHTML =
        "Temperature: " + temperatureInFahrenheit.toFixed(2) + " &#176F";
      todaysHumidityEl.innerHTML =
        "Humidity: " + response.data.main.humidity + "%";
      todaysWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

      // Function to retrieve Weather Forecast in the area
      var cityID = response.data.id;
      var forecastWeather =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityID +
        "&appid=" +
        APIKey;
      axios
        .get(forecastWeather)
        .then(function (response) {
          forecastEl.classList.remove("d-none");

          var forecastEls = document.querySelectorAll(".fiveday");
          for (var i = 0; i < forecastEls.length; i++) {
            forecastEls[i].innerHTML = "";
            var forecastIndex = i * 8 + 4;
            var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
            var forecastDay = forecastDate.getDate();
            var forecastMonth = forecastDate.getMonth() + 1;
            var forecastYear = forecastDate.getFullYear();
            var forecastDateEl = document.createElement("p");

            forecastDateEl.innerHTML =
              forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEls[i].append(forecastDateEl);

            // Providing 5-day forecast information in containers
            var forecastWeatherEl = document.createElement("img");
            forecastEls[i].append(forecastWeatherEl);

            var forecastTempEl = document.createElement("p");
            var forecastTempInKelvin = response.data.list[forecastIndex].main.temp;
            var forecastTempInFahrenheit = ((forecastTempInKelvin - 273.15) * 9) / 5 + 32;
            forecastTempEl.innerHTML =
              "Temp: " + forecastTempInFahrenheit.toFixed(2) + " &#176F";
            forecastEls[i].append(forecastTempEl);

            var forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML =
              "Humidity: " +
              response.data.list[forecastIndex].main.humidity +
              "%";
            forecastEls[i].append(forecastHumidityEl);
          }
        });
    });
}

// Search button listener
searchEl.addEventListener("click", function () {
  var searchTerm = locationEl.value;
  getWeather(searchTerm);
  searchHistory.push(searchTerm);
});
