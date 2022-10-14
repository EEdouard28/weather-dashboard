//authorization to grab weather
var apiKey = "d235a5db7da2633ff6e09047c8261443";

// targeting search button
$(".searchBtn").on("click", function () {
    var inputValue = $(".search-bar").val() // takes information from search bar when search button is click
    console.log(inputValue)
    geoCode(inputValue) // 
})

//call request from API, define data w/ queryURL, fetch info and 
function geoCode(inputValue) {
    var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            searchWeather(data[0].lat, data[0].lon)
            // forecastWeather(data[0].lat, data[0].lon)
        })
}

// current weather
function searchWeather(lat, lon) {
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            var temp = $("<h2>").text("temperature: " + data.main.temp)
            var humid = $("<h2>").text("humidity: " + data.main.humidity)
            var wind = $("<h2>").text("wind: " + data.wind.speed)

            $("#currentWeather").append(temp, humid, wind)
            forecastWeather(lat, lon)
        })

}

async function forecastWeather(lat, lon) {
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    const response = await fetch(queryURL);
    var data = await response.json();
    var forecastData = [data.list[0].main.temp, data.list[1].main.humidity, data.list[2].speed.wind]
    document.getElementById('weatherCard').innerHTML =
        `
    <p>Temperature: ${forecastData[0]}</p>
    <p>Humidity: ${forecastData[1]}</p>
    <p>Wind: ${forecastData[3]}</p>
    `;
}
// function forecastWeather(lat, lon) {
//     var queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
//     fetch(queryURL)
//         .then(response => response.json())
//         .then(data => {

//             for (var i = 4; i < data.list.length; i = i + 8) {
//                 var card = $("<div>").addClass(".card").addClass(".list-group")
//                 var ul = $("<ul>");
//                 var li = $("<li>");
//                 var date = $("<h3>").text("date: " + new Date(data.list[i].dt_txt))
//                 var temp = $("<h3>").text("temp: " + data.list[i].main.temp)
//                 var humid = $("<h3>").text("humidity: " + data.list[i].main.humidity)
//                 var wind = $("<h3>").text("wind: " + data.list[i].wind.speed)

//                 $("#forecastWeather").append(card)
//                 card.append(date, temp, humid, wind)
//                 console.log(data.list)
//                 // console.log(data.list.length)
//                 // card.append(ul)
//                 // li.text("temp")
//                 // $(".temp-item").append(temp)
//             }
//         })

// }



searchWeather();
forecastWeather();