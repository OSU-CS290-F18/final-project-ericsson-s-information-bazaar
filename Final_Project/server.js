var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
//I have it preset to skip setting the environmental variables wouldn't do this
//on an actual website.
var mongoHost = process.env.MONGO_HOST || 'classmongo.engr.oregonstate.edu';
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME ||  'cs290_ericssoj';
var mongoPassword = process.env.MONGO_PASSWORD || 'cs290_ericssoj';
var mongoDBName = process.env.MONGO_DB_NAME||  'cs290_ericssoj';
var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;
var mongoDB = null;
var app = express();
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(express.static('public'));




app.get("/", function(req, res, next){
  console.log("Homepage requested");
    res.status(200).render('homePage',{})
});

app.get("/forum/:forum", function(req, res, next){
  var forum = req.params.forum.toLowerCase();
  var forumCollection = mongoDB.collection('forum');
  forumCollection.find({ forumId: forum }).toArray(function (err, forumInfo) {
  if (err) {
    res.status(500).send("Error communicating with the DB.");
  } else if (forumInfo.length > 0) {
    forumInfo[0].posts.reverse();
    res.status(200).render('forumPage', forumInfo[0]);
  } else {
    next();
  }
});
});

app.post('/forum/:forum/makePost', function (req, res, next) {
  var dateAndTime = new Date().toLocaleString();
  var forum = req.params.forum.toLowerCase();
  if (req.body && req.body.content) {
    console.log("Mustve recieved a body and content");
    var forumCollection = mongoDB.collection('forum');
    forumCollection.updateOne(
      { forumId: forum },
      { $push: { posts: { times: dateAndTime, content: req.body.content } } },
      function (err, result) {
        if (err) {
          res.status(500).send("Error saving post to DB");
        } else if (result.matchedCount > 0) {
          res.status(200).send("Success");
        } else {
          next();
        }
      }
    );
  } else {
    res.status(400).send("Request needs a body with a URL and caption");
  }
});



app.get("*", function (req, res, next) {
  res.status(404).render('404', {});
});

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
