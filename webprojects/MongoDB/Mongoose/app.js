const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You need to type a name in string format']  //Setting in a validator
        
    },
    rating: Number,
    review: String

});

//Validators
const Fruit = mongoose.model("Fruit", fruitSchema);

// const peach = new Fruit({    
//     rating: 7,
//     review: "Peaches are great"
// });


const banana = new Fruit({
    name: "Banana",
    rating: 7,
    review: "Bananans are great"

});

banana.save();

//fruit.save() ; //This saves a single element into the collection Fruit. Using the Fruit.insertMany function, you won't need to
//use this for saving. This is only for single row/element savig

// const orange = new Fruit({
//     name: "Oranges",
//     rating: 7,
//     review: "Oranges are sour"

// });

// const guava = new Fruit({
//     name: "Guava",
//     rating: 7,
//     review: "Guavas give strength"

// });


// Insert a single row/fruit without the name field to check for validation
// Fruit.insertMany([peach], function(err){
//     if (err) {
//         console.log(err);
//     } else{
//         console.log("Successfully added new items")
//     }
// });

//Updating a single row within a document with the name field
// Fruit.updateOne({_id:"5d04a3e7fb4188101095bcbd"},{name: "Peaches"}, function(err){
//     if (err) {
//         console.log(err);
//     } else{
//         console.log("Successfully updated one item")
//     }
// });

//Deleting a row from a collection(also called table)
// Fruit.deleteOne({_id:"5d04a41460e1ef0848460e35"}, function(err){
//         if (err) {
//             console.log(err);
//         } else{
//             console.log("Successfully Deleted one item")
//         }
//     });


Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);

    } else {
        fruits.forEach(function (singlefruit) {
        console.log(singlefruit.name);

        //  console.log(fruits);
    });    
}
mongoose.connection.close();
});



const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema

});

const Person = mongoose.model("Person", peopleSchema);
const person = new Person({
    name: "John",
    age: 37,
    favouriteFruit: banana

});

// person.save();

