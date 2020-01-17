var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models")

var PORT = process.env.PORT || 9000;
var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
  
 

// Initialize Express
var app = express();


app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.




console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
app.get('/', function (req, res) {
    res.render('index')
})
        


app.get("/scrape", function(req, res) {

    axios.get("https://www.nytimes.com/").then(function(response) {

        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);
        console.log(response)
      
        // An empty array to save the data that we'll scrape
        var results = [];
      
        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("p.title").each(function(i, element) {
      
          // Save the text of the element in a "title" variable
          var title = $(element).text();
      
          // In the currently selected element, look at its child elements (i.e., its a-tags),
          // then save the values for any "href" attributes that the child elements may have
          var link = $(element).children().attr("href");
      
          // Save these results in an object that we'll push into the results array we defined earlier
          results.push({
            title: title,
            link: link
          });
        });
      
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
      });
    })
  

    app.listen(PORT, function() {
        console.log("App now listening at localhost:" + PORT);
      });
      