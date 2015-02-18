var username = document.getElementById("username");
var name = username.innerHTML;

var city = document.getElementById("city");
var city = city.innerHTML;

var quote = document.getElementById("quote");
newQuote(name);

var getQuote = document.getElementById("get-quote");
getQuote.addEventListener("click", function(){
  newQuote(name);
});



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
