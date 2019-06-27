const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
  });
const Article = mongoose.model("Article", articleSchema);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.get("/articles", function (req,res){
    Article.find(function(err, foundArticles){
      if(!err){
       console.log(foundArticles);
       res.send(foundArticles);
      }

    });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
//   const newArticle = new Article ({
//     title: "Jack Bauer",
//     content: "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned."
//   });
//   newArticle.save();
});

