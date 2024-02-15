// add event listener to the button in the input container form, takes in city name and assigns API key
document.querySelector('.input-container button').addEventListener('click', function(event) {
    event.preventDefault();
    var city = document.getElementById('locationInput').value;
    var apiKey = '1fe91da811ec8e9c17abf5fd0ba0391f';
    getCoords(city, apiKey);
});
//uses Geocode to provide lat & lon via city inputted
function getCoords(city, apiKey) {
    var geocodeUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(geocodeUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        getWeather(lat, lon, apiKey);
    });
}
//fetches forecast json in imperial units and updates weather data or returns an error in the console log
function getWeather(lat, lon, apiKey) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';

    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            updateWeatherData(data);
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}
// populates forecast cards via for loop 
function updateWeatherData(data) {
    for (var i = 0; i < 5; i++) {
        var forecast = data.list[i * 7];
        document.getElementById('date' + (i + 1)).innerText = new Date(forecast.dt_txt).toDateString();
        document.getElementById('tempDay' + (i + 1)).innerText = 'Temp: ' + forecast.main.temp + ' °F';
        document.getElementById('windDay' + (i + 1)).innerText = 'Wind: ' + forecast.wind.speed + ' mph';
        document.getElementById('humidityDay' + (i + 1)).innerText = 'Humidity: ' + forecast.main.humidity + '%';
    }
}