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
    models.findOne({username: username}, function (err, selectedDays) {
    if (err) {
      return err;
    }else {
      if (selectedDays) {
        message = "Please update the days you are willing to work" + username;
        res.render("home", {
          username: message,
          sunday: selectedDays.workDays.Sunday,
          monday: selectedDays.workDays.Monday,
          tueday: selectedDays.workDays.Tuesday.
          wednesday: selectedDays.workDays.Wednesday,
          thursday: selectedDays.workDays.Thursday,
          friday: selectedDays.workDays.Friday,
          saturday: selectedDays.workDays.Saturday
        });
      } else {
        message = "Please select your working days" + username;
        res.render("home", {
          username: message
        })
      }
    }
  })
});

app.post("/waiters/:username", function (req, res) {
  var username = req.params.username;
  var workDays = req.body.workDays;
  var workingDays = {};
  var updateMessage = "Thank you, your shifts has been updated";
  var messageForShifts = "Thank you, your shift has been added";
  var model = new models  ({username: username});
  model.save({},function (err, results){
      if (err) {
        console.log(err);

      }
          // models.waitersModel.save({}, function (err,results) {
          //   if (err) {
          //     console.log(err);
          //
          //   }else {
          //     res.render("home", {
          //           name: results
          //
          //     })
          //   }
          // })


      // if (err) {
      //   if (err.code === 11000) {
      //
      //     models.waitersModel.findOne({
      //       name: waiterName,
      //       daysName: waitersDays
      //     }, function (error) {
      //       if (error) {
      //           console.log(error);
      //       }
      //       else {
      //         models.waitersModel.find({}, function (err, results) {
      //             if (err) {
      //               console.log(err);
      //               // console.log(results);
                  //}
              //  var waiterData = {
              //    name: waiterName,
              //    daysName: waitersDays
              //  }


                    // res.render("home", {
                    //       waiterName: results
                    //
                    // })
               });
            // }
          // })

        // }
      //}
    // })
});

app.get('/days', function(req, res) {

});

// // This saves the data to the database
//   waitersModel.save(function(err, results) {
//     if (error) {
//       console.error(error);
//     }
//     else {
//       return results;
//     }
//   });
// }



var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server running at http://localhost:" + port + "/");
});
