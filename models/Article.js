var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  // Headline - tile of the article
  headline: {
    type: String,
    required: true
  },
  // This is for the summary of the articles
  summary: {
    type: String,
    required: true
  },
  // This is the link for the articles
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
