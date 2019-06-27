const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// const request = require("request");
const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workitems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    
    // You get the numerical value of the day, starting from 0-Sunday to 6-Saturday
   /*  var today = new Date();
    var currentDay = today.getDay();    
    console.log(currentDay); */
   /*  if (currentDay === 6 || currentDay === 0) {
        day = "Weekend";
    } else {
        day = "Weekday";

    } */

    // The Below code is to get the day NAME
    /* var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date();
    var currentDay = days[today.getDay()];   

    res.render("list", { dayname: currentDay }); */


    // The Below code is to get the month, day and date using to toLocaleDateString
    
    let dateformat = date.getDate();
    res.render("list", { dayname: dateformat, useraddedfood: items });

});

app.post("/", function(req, res){
    var item = req.body.foodadded;
    if (req.body.list === "Work"){
        workitems.push(item) 
        res.redirect("/Work");    
    } else {
        items.push(item);
        console.log(req.body);
        res.redirect("/");
    }
    
    
});

app.get("/Work", function(req, res){

    res.render("list", { dayname: "Work", useraddedfood: workitems });
   
});

app.get("/about", function(req, res){

    res.render("about");
   
});

/* app.post("/Work", function(req, res){

    console.log(res.body);
   
}); */


app.listen(3000, function () {

    console.log("Server is running on port 3000");
});




