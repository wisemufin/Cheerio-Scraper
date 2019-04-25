var express = require("express");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;

// Initialize Express
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Public static folder
app.use(express.static("public"));

// Connect to Mongo DB *CHANGE NAME IN LOCAL IF NECESSARY*
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/cheerioScraper";
mongoose.connect(MONGODB_URI);
