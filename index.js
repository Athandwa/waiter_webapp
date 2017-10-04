const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
const Models = require("./model");
const models = Models(mongoURL);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());

// setting rendering engine
app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: "hbs"
}));
app.use(express.static("public"));
app.use(express.static("views"))
app.use(form.urlencoded({
    extended: true
}));
app.set("view engine", "hbs")

app.get("/waiters/:username", function(req, res) {
    var username = req.params.username;
    message = "Please select your working days " + username;
    res.render("home", {
        message: message
    })
});

app.post("/waiters/:username", function(req, res) {
    var username = req.params.username;
    var workDays = req.body.days;
    var workingDays = {};
    var updateMessage = "Thank you, your shifts has been updated";
    var messageForShifts = "Thank you, your shift has been added";

    models.waitersModel.create({
        name: username,
        days: workDays

    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.render("home", {
                messageForShifts: results.days
                // updateMessage: updateMessage
            })
            console.log(results);
        }


    });
    // This saves the data to the database
    waitersModel.save(function(err, results) {
        if (error) {
            console.error(error);
        } else {
            return results;
        }
    });
});

app.get('/days', function(req, res) {

});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server running at http://localhost:" + port + "/");
});
