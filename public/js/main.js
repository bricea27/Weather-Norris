document.addEventListener("DOMContentLoaded", function() {

var username = document.getElementById("username");
var name = username.innerHTML;
var weatherUrl = "/" + name + "/weather";

getWeather(weatherUrl);

var city = document.getElementById("city");
var city = city.innerHTML;

var quote = document.getElementById("quote");
newQuote(name);

var getQuote = document.getElementById("get-quote");
getQuote.addEventListener("click", function(){
  newQuote(name);
});




function getWeather(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener('load', function(e) {
    var data = xhr.responseText;
    var parsed = JSON.parse(data);
    console.log(parsed);

    var daily = parsed["daily"]["data"];
    var fiveday = daily.splice(0, 5);
    var list = document.getElementById("fiveday");
    fiveday.forEach(function(each){
      console.log(each);
      var day = document.createElement("li");
      day.className = "day";
      var icon = document.createElement("h1");
      var weather = each["icon"];

      if (weather === "clear-day") {
        icon_class = "wi wi-day-sunny";
      }
      else if (weather === "clear-night") {
        icon_class = "wi wi-night-clear";
      }
      else if (weather === "rain") {
        icon_class = "wi wi-rain";
      }
      else if (weather === "snow") {
        icon_class = "wi wi-snow";
      }
      else if (weather === "sleet") {
        icon_class = "wi wi-sleet";
      }
      else if (weather === "wind") {
        icon_class = "wi wi-windy";
      }
      else if (weather === "fog") {
        icon_class = "wi wi-fog";
      }
      else if (weather === "cloudy") {
        icon_class = "wi wi-cloudy";
      }
      else if (weather === "partly-cloudy-day") {
        icon_class = "wi wi-day-cloudy";
      }
      else if (weather === "partly-cloudy-night") {
        icon_class = "wi wi-night-cloudy";
      }
      icon.setAttribute("class", icon_class);

      var summary = each["summary"];
      var sum = document.createElement("h3");
      sum.innerHTML = summary;

      var minTemp = Math.round(each["temperatureMin"]) + "&deg;";
      var maxTemp = Math.round(each["temperatureMax"]) + "&deg;";

      var temp = document.createElement("h3");
      temp.innerHTML = minTemp + " - " + maxTemp;

      day.appendChild(icon);
      icon.appendChild(sum);
      sum.appendChild(temp);
      list.appendChild(day);
    });


    var summary = parsed["currently"]["summary"];
    var temperature = Math.round(parsed["currently"]["temperature"]);

    var sum = document.getElementById("summary");
    sum.innerHTML = summary;

    var temp = document.getElementById("temperature");

    temp.innerHTML = temperature + "&deg;";

    if (temperature < 32) {
      document.body.className = "cold";
      console.log("cold");
    }


    var icon = document.getElementById("icon");
    var current_icon = parsed["daily"]["data"][0]["icon"];

    if (current_icon === "clear-day") {
      icon_class = "wi wi-day-sunny";
    }
    else if (current_icon === "clear-night") {
      icon_class = "wi wi-night-clear";
    }
    else if (current_icon === "rain") {
      icon_class = "wi wi-rain";
    }
    else if (current_icon === "snow") {
      icon_class = "wi wi-snow";
    }
    else if (current_icon === "sleet") {
      icon_class = "wi wi-sleet";
    }
    else if (current_icon === "wind") {
      icon_class = "wi wi-windy";
    }
    else if (current_icon === "fog") {
      icon_class = "wi wi-fog";
    }
    else if (current_icon === "cloudy") {
      icon_class = "wi wi-cloudy";
    }
    else if (current_icon === "partly-cloudy-day") {
      icon_class = "wi wi-day-cloudy";
    }
    else if (current_icon === "partly-cloudy-night") {
      icon_class = "wi wi-night-cloudy";
    }
    icon.setAttribute("class", icon_class);
  });


  xhr.send();
};




function newQuote(name){
  var url = "http://api.icndb.com/jokes/random?firstName=" + name + "&lastName=";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener('load', function(e) {
    var data = xhr.responseText;
    var parsed = JSON.parse(data);
    var joke = parsed.value.joke;
    quote.innerHTML = joke;
  });
  xhr.send();
};

});
