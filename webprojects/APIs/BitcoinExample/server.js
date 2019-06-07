const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
    console.log("Server is running on port 3000");
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    /*The below code is used to get the last price of BITCOIN in respective currency */
    /*
    var cryptocurrency = req.body.crypto;
    var currency = req.body.fiat;
    var urllink = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + cryptocurrency + currency;
    // console.log(urllink);
    request(urllink, function (error, response, body) {
        // console.log(response.statusCode);
        var output = JSON.parse(body);
        var result = output.last;
        var time = output.display_timestamp;
        // console.log(result);
        
        res.write("<p>The current date is " + time);
        res.write("<h1>The last price is " + result + " " + currency + "</h1>"); 
        res.send();
        
    })
    */

    /* This is to calculate the value in the respective currency of how much is the value of the amount of Bitcoins user has filled in*/


    var cryptocurrency = req.body.crypto;
    var currency = req.body.fiat; 
    var amount = req.body.amount;
    
    var options = {
        url :"https://apiv2.bitcoinaverage.com/convert/global?",
        method : "GET",
        qs:{
            from:cryptocurrency ,
            to :currency,
            amount:amount
        }
    };
    
    
    request(options, function (error, response, body) {
        // console.log(response.statusCode);
        var output = JSON.parse(body);
        var result = output.price;
        var time = output.time;
        // console.log(result);
        
        res.write("<p>The current date is " + time);
        res.write("<h1>The value of " + amount  + " " + cryptocurrency + " is " + result + " " + currency + "</h1>"); 
        res.send();
        
    })
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
    
});