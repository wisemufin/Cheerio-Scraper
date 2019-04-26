var express = require("express");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Public static folder
app.use(express.static("public"));

// Connect to Mongo DB *CHANGE NAME IN LOCAL IF NECESSARY*
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/cheerioScraper";
mongoose.connect(MONGODB_URI);

// Main route
app.get("/", function(req, res) {
  res.send("Hello World");
});



// A GET route for scraping hackerNews website
app.get("/scrape", function(req, res) {
  // Grab the body of the html
  axios.get("https://www.nytimes.com/section/technology").then(function(response) {
    // Load the body into cheerio
    var $ = cheerio.load(response.data);

    // Grab each article with a class of css-ye6x8s
    $("div.css-4jyr1y").each(function(i, element) {
      // Empty object for the results to be stored in
      var result = {};

      // Grab all articles with title class
      result.headline = $(element).children("a").children("h2").text();
      result.summary = $(element).children("a").children("p").text();
      result.link = $(element).children("a").attr("href");

      console.log(result);

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
