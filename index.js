const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
// const flash = require('express-flash');
// const session = require('express-session');
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

// app.use(session({
//     secret: 'keyboard cat',
//     cookie: {
//         maxAge: 60000 * 30
//     }
// }));
// app.use(flash());

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
    var Days = req.body.days
    message = "Please select your working days " + username;
    models.waitersModel.find({name: username, days: Days },
    function (err, results) {
      if (err) {
        console.log(err);
      }else {
        res.render("home", {
          name: username,
          days: Days,
          message: message
        })
        console.log(results);

      }
    })


});

app.post("/waiters/:username", function(req, res) {
    var username = req.params.username;
    var workDays = req.body.days;
    var workingDays = {};
    //var updateMessage = "Thank you, your shifts has been updated";
    var messageShifts = username + " thank you, your shifts has been successfully added";

  models.waitersModel.findOneAndUpdate({
    name: username
  }, {
    days: workDays
  },function (err, results) {
    if (err) {
      console.log(err);
    }
    else {
      if (!results) {
        models.waitersModel.create({
          name: username,
          days: workDays

        }, function(err, results) {
          if (err) {
            console.log(err);
          } else {
            res.render("home", {
              messageForShifts: messageShifts
            })
            console.log(results);
          }
        });

      }else {
        res.render("waiters")
      }
    }

  })



});

function colorForDays(daysColor) {
    if (daysColor === 3) {
        return "color1";
    } if (daysColor > 3) {
        return "color2";
    } if (daysColor < 3) {
        return "color3";
    }
}

app.get('/days', function(req, res) {
    models.waitersModel.find({}, function(err, waitersResults) {
        if (err) {
            console.log(err);
        }
        var Sunday = [];
        var Monday = [];
        var Tuesday = [];
        var Wednesday = [];
        var Thursday = [];
        var Friday = [];
        var Saturday = [];

        waitersResults.forEach(function(dayResults) {
            var Days = dayResults.days
            var Names = dayResults.name

            for (var i = 0; i < Days.length; i++) {
                var savedWaiterDays = Days[i]

                if (savedWaiterDays === "sunday") {
                    Sunday.push(Names);
                }
                if (savedWaiterDays === "monday") {
                    Monday.push(Names);
                }
                if (savedWaiterDays === "tuesday") {
                    Tuesday.push(Names)
                }
                if (savedWaiterDays === "wednesday") {
                    Wednesday.push(Names)
                }
                if (savedWaiterDays === "thursday") {
                    Thursday.push(Names)
                }
                if (savedWaiterDays === "friday") {
                    Friday.push(Names)
                    //console.log("********Friday*******"+Friday);

                }
                if (savedWaiterDays === "saturday") {
                    Saturday.push(Names)
                    //console.log("********Saturday*********");
                    //console.log(Saturday);
                }
            }
        })

        res.render("waiters", {
            day1: Sunday,
            color1: colorForDays(Sunday.length),

            day2: Monday,
            color2: colorForDays(Monday.length),

            day3: Tuesday,
            color3: colorForDays(Tuesday.length),

            day4: Wednesday,
            color4: colorForDays(Wednesday.length),

            day5: Thursday,
            color5: colorForDays(Thursday.length),

            day6: Friday,
            color6: colorForDays(Friday.length),

            day7: Saturday,
            color7: colorForDays(Saturday.length)
        })
    });
});

app.post("/reset", function (req, res) {
  models.waitersModel.remove({}, function (err, results) {
    if (err) {
        console.log(err);
    }
    else {
      console.log("data");
    }
    res.render("waiters")
  })
})

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server running at http://localhost:" + port + "/");
});
