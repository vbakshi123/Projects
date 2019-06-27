const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const mongoose = require("mongoose");
// const request = require("request");
const app = express();

// var items = ["Buy Food", "Cook Food", "Eat Food"];
// var workitems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.connect('mongodb://localhost:27017/toDoList', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin-vishal:Test123@cluster0-mdbzy.mongodb.net/toDoList', { useNewUrlParser: true });

const toDoListSchema = new mongoose.Schema({
    name: String
});

const listSchema = new mongoose.Schema({
    name: String,
    items: [toDoListSchema]
});

const Item = mongoose.model("Item", toDoListSchema)

const List = mongoose.model("List", listSchema)

const item1 = new Item({
    name: "Welcome to your todoList."

});

const item2 = new Item({
    name: "Hit the + button to add an item."

});

const item3 = new Item({
    name: "<-- Hit this to delete an item"

});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {

    // It is checked if the array length is  zero, then only to update the defaultItems array on the list.ejs page
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added items");

                }

            });
            res.redirect("/");
        } else {
            let dateformat = date.getDay();
            res.render("list", { dayname: dateformat, useraddedfood: foundItems });
        }


    });

});



app.post("/", function (req, res) {

    const itemName = req.body.foodadded;
    const listName = req.body.list;
    console.log(listName);
    let dateformat = date.getDay();

    const item4 = new Item({
        name: itemName
    });

    if (listName == dateformat) {
        item4.save();
        res.redirect("/");
    } else {
        List.findOne({name:listName}, function(err, foundList){
            foundList.items.push(item4);
            foundList.save();
            res.redirect("/" + listName);

        });
        
        
    }
});

app.post("/delete", function (req, res) {
    const itemId = req.body.checkbox;
    const listItem = req.body.hiddeninput;
    let dateformat = date.getDay();
    // Item.findById({_id: itemName}, function(err){
    //   if (!err){
    //       console.log("Successfully deleted checked item.");
    //       res.redirect("/");
          
    //   }
    // });
    if (listItem == dateformat){
        Item.deleteOne({ _id: itemId }, function (err) {   //Or you can use findByID&Remove method as above
            if (err) {
                console.log(err);
    
            } else { 
    
            }
            res.redirect("/");
        });
    
    }else{
        List.findOneAndUpdate({name:listItem}, {$pull: {items :{_id:itemId}}}, function(err){
        if(!err){
            res.redirect("/" + listItem );
        }
        }, {useFindAndModify:false});
    }
    

});


app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({ name: customListName }, function (err, foundlist) {
        //console.log(foundlist); // This logs the array document
        if (!err) {
            if (!foundlist) {
                //Create a new List               
                console.log("Doesn't exist, hence added " + customListName + " successfully");
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                // Show List
                console.log("Data Already exists in collection")
                res.render("list", { dayname: foundlist.name, useraddedfood: foundlist.items });

            }


        }

    });

});

app.get("/Work", function (req, res) {

    res.render("list", { dayname: "Work", useraddedfood: workitems });

});

app.get("/about", function (req, res) {

    res.render("about");

});

/* app.post("/Work", function(req, res){

    console.log(res.body);
   
}); */

let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}


app.listen(port, function () {

    console.log("Server is running on port 3000");
});




