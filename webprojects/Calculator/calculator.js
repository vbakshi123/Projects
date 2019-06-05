//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendfile(__dirname + "/index.html");
});

//Addition

app.post("/", function (req, res) {
    var num1 = Number(req.body.number1);
    var num2 = Number(req.body.number2)
    var result = num1 + num2;
    res.send("The Result is " + result);
    

});

app.get("/bmicalculator", function (req, res) {
    res.sendfile(__dirname + "/bmiCalculator.html");
});


// BMI Calculator

app.post("/bmicalculator", function (req, res) {
    
    var num1 = parseFloat(req.body.weight);
    var num2 = parseFloat(req.body.height);    
    var num3 = Math.pow(num2, 2);    
    var result = num1 / num3;
    res.send("Your BMI is " + result);   

});





app.listen(3000, function () {
    console.log("Server is listening on port 3000");
})

