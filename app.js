const express = require("express");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
//const session = require('express-session');

//const passport = require('passport');
//const passportLocalMongoose = require('passport-local-mongoose');
//const findOrCreate = require('mongoose-findorcreate');

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

const userSchema = {
    email: String,
    password: String,
    secrets: String

};

const User = mongoose.model("User", userSchema);

//let xuser=[];

let xUser;

mongoose.connect("mongodb://localhost:27017/mydb");


app.get('/', function (req, res) {
    res.render('home');
});

app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/reg', function (req, res) {
    res.render('reg');

});
app.post('/reg', function (req, res) {

    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });


    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            User.findOne({
                email: req.body.username
            }, function (err, foundUser) {
                if (err) {
                    console.log(err);
                } else {
                    if (foundUser) {
                        xUser = foundUser;
                    }
                }
            });
            res.redirect('C:/Users/sreen/pro/adventure/book.html');
        }

    });
});


app.post('/login', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        email: username
    }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.redirect('C:/Users/sreen/pro/adventure/book.html');
                    xUser = foundUser;
                    console.log(xUser);

                }
            }
        }
    });
});


app.get('/logout', function (req, res) {
    res.redirect('/');
});


// app.post('/submit', function (req, res) {
//     const secret = req.body.secret;
//
//     User.findById(user.id, function (err, found) {
//         if (!err) {
//             if (found) {
//                 found.secret = secret;
//                 found.save(function () {
//                     res.redirect('/secret');
//                 });
//             }
//         } else {
//             console.log(err);
//         }
//     });
// });




app.listen(3000, function () {
    console.log("server started on port");
});
