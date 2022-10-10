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
            console.log(data)
            searchWeather(data[0].lat, data[0].lon)
            forecastWeather(data[0].lat, data[0].lon)
        })
}

// current weather
function searchWeather(lat, lon) {
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var temp = $("<h2>").addClass("current").text("temperature; " + data.main.temp)
            var humid = $("<h2>").text("humidity; " + data.main.humidity)
            var wind = $("<h2>").text("wind; " + data.wind.speed)







            $("#currentWeather").append(temp, humid, wind)

        })

}



function forecastWeather(lat, lon) {
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (var i = 4; i < data.list.length; i = i + 8) {
                console.log(data.list[i].main.temp)
            }
        })

}
