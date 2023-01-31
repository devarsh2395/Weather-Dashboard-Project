
// Api Key - f08cfff6f9e3b54dc33c263ed9deec10 
//  API_KEY ---- 6f50c83a9c293a67c1efbbd19b59b09e

$(document).ready(function() {

    // click event for search button

    $("#search-btn").on("click", function(event) {
      event.preventDefault();
      var city = $("#city-input").val();

    //   Api Key
      var APIKey = "6f50c83a9c293a67c1efbbd19b59b09e";

    //   URL for current weather data
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    //   Ajax call for weather data
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

    // Weather icon
        var iconCode = response.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";


    // update Page with current weather data
        $("#city-name").text(response.name);
        $("#date").text(new Date().toLocaleDateString());
        $("#icon").html("<img src='" + iconURL + "'>");
        $("#temperature").text((response.main.temp - 273.15).toFixed(2) + "°C");
        $("#humidity").text(response.main.humidity + "%");
        $("#wind-speed").text(response.wind.speed + "m/s");
      });


    //   API call for forecast data
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#forecast").empty();

    // Display forecast data
        for (var i = 7; i < 40; i+=8) {
          var date = new Date(response.list[i].dt * 1000).toLocaleDateString();
          var iconCode = response.list[i].weather[0].icon;
          var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
          var temperature = (response.list[i].main.temp - 273.15).toFixed(2) + "°C";
          var humidity = response.list[i].main.humidity + "%";
          var windSpeed = response.list[i].wind.speed + "m/s";
          var forecastItem = $("<div class='forecast-item'>");
          forecastItem.append("<p><strong>Date:</strong> " + date + "</p>");
          forecastItem.append("<p><strong>Weather:</strong> <img src='" + iconURL + "'></p>");
          forecastItem.append("<p><strong>Temperature:</strong> " + temperature + "</p>");
          forecastItem.append("<p><strong>Humidity:</strong> " + humidity + "</p>");
          forecastItem.append("<p><strong>Wind Speed:</strong> " + windSpeed + "</p>");
          $("#forecast").append(forecastItem);
        }
      });


    //   Search History
      var searchHistory = $("#search-history");
      var searchHistoryItem = $("<li class='list-group-item'>").text(city);
      searchHistory.append(searchHistoryItem);
      searchHistoryItem.on("click", function() {
        var city = $(this).text();
        var APIKey = "6f50c83a9c293a67c1efbbd19b59b09e";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          var iconCode = response.weather[0].icon;
          var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
          $("#city-name").text(response.name);
          $("#date").text(new Date().toLocaleDateString());
          $("#icon").html("<img src='" + iconURL + "'>");
          $("#temperature").text((response.main.temp - 273.15).toFixed(2) + "°C");
          $("#humidity").text(response.main.humidity + "%");
          $("#wind-speed").text(response.wind.speed + "m/s");
        });

      });
    });
});