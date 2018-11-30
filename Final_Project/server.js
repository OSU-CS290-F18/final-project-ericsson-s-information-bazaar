var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./forumData');

var app = express();

var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get("/", function(req, res, next){
  console.log("Homepage requested");
    res.status(200).render('homePage',{})
});

app.get("*", function (req, res, next) {
  res.status(404).render('404', {});
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port 3000");
});
