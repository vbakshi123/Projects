//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// const encrypt = require("mongoose-encryption");// Use this if using mongoose encryption
// const md5 = require('md5');  // Use this if using MD5 encryption
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });// Use this if you want to encrypt using mongoose-encryption package which uses a user provided access key
//and uses that key to encrypt and decrypt the password or any other element. The access key can be stored in the .env file which 
// added to the .gitignore file, so that it doesn't get uploaded in during git push

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

//For local authentication
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        //console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get("/", function (req, res) {
    res.render("home");

});



app.get("/auth/google",
    passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });


app.get("/login", function (req, res) {
    res.render("login");

});

app.get("/register", function (req, res) {
    res.render("register");

});


//*****Without Session Management */
/*app.post("/register", function (req, res) {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        if (!err) {
            const newUser = new User({
                email: req.body.username,
                // password: md5(req.body.password)  //Use this when using md5 hashing
                password: hash
            });
            newUser.save(function (err) {

                if (err) {
                    console.log(err);
                } else {
                    res.render("secrets");
                }
            });
        }

    });


});*/


//*****WITH Session Management */
app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }



    });
});


/*Earlier version of app.get("/secrets") when authentication was checked on the serets page. Now since the authentication
 is checked on the app.get("/submit") section, hence this section is no more required */
// app.get("/secrets", function (req, res) {
//     if (req.isAuthenticated()) {
//         res.render("secrets");
//     } else {
//         res.redirect("/login");
//     }
// });

app.get("/secrets", function (req, res) {
    User.find({"secret": { $ne: null }}, function(err, foundSecrets){
        if(err){
            console.log(err);
        } else{
            if (foundSecrets){
            console.log(foundSecrets);
            res.render("secrets", {userSecrets:foundSecrets});
            }
            
        }
        
    });

});

app.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }

});

app.post("/submit", function (req, res) {
    const submittedPost = req.body.secret;
    User.findById(req.user.id, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                foundUser.secret = submittedPost;
                foundUser.save(function () {
                    res.redirect("/secrets");
                });
            }
        }

    });
});


//*****Without Session Management */
/*app.post("/login", function (req, res) {
    const username = req.body.username;
    // const password = md5(req.body.password);//Use this when using md5 hashing
    const password = req.body.password;
    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);

        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result == true) {
                        res.render("secrets");
                    }
                    // res == false
                });
                // Use the below while using md5 hash encryption
                //   if(foundUser.password === password){
                //       res.render("secrets");
                //   }
            }
        }

    });

});*/

//*****WITH Session Management */

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }

    })
});

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect("/secrets");
//   });

// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/secrets',
//         failureRedirect: '/login'
//     }));



app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");

});

app.listen(3000, function () {

    console.log("Server is running on port 3000");
});


