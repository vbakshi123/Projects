const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//Opening up the index.html home page
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function (req, res) {
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var eaddress = req.body.emailaddress;
    //   console.log(fname, lname, eaddress);

    var data = {
        members: [
            {
                email_address: eaddress,
                status: "subscribed",
                merge_fields: {

                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    var jsondata = JSON.stringify(data);
    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/b49ee10029",
        method: "POST",
        headers: {
            Authorization: "Vishal1 89030ccda6e7b891d1197908628f51d5-us20",
        },
        //body:jsondata

    }

    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode == 200) {
                res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    }
});

});

app.post("/failure", function(req, res){
     res.redirect("/");

});




app.listen(3000, function () {

    console.log("Server is running on port 3000");
});

// 89030ccda6e7b891d1197908628f51d5-us20
// b49ee10029


