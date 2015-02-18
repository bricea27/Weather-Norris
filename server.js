var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("users.db");
var app = express();
var secret = require('./secret.json');

app.use(session({
  secret: "penguin",
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res){
  res.render("index.ejs", {});
});

app.post('/user', function(req, res){

  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var city = req.body.city;

  if (password != confirmPassword) {
    res.redirect("/")
  } else
  var hash = bcrypt.hashSync(password, 10);

  db.run("INSERT INTO users (username, password, city) VALUES (?, ?, ?)", username, hash, city, function(err){
    if (err) { throw err; }
      req.session.valid_user = true;
      res.redirect("/" + username);
  });
});

app.post('/session', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  db.get("SELECT * FROM users WHERE username = ?", username, function(err, row){
      if (err) { throw err; }
      if (row) {
        var passwordMatches = bcrypt.compareSync(password, row.password);
        if (passwordMatches) {
          req.session.valid_user = true;
          res.redirect("/" + username);
        }
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/:username", function(req, res){
  var username = req.params.username;
  db.get("SELECT * FROM users WHERE username = ?", username, function(err, row){
    if (err) { throw err; }
    if (row) {
      var city = row.city;
      res.render("user.ejs", {username: username, city: city})
    }else {
      res.redirect("/");
    }
  });
});

app.delete('/session', function(req, res){
  req.session.valid_user = false;
  res.redirect("/");
});

var server = app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
