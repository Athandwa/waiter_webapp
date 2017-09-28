// const express = require('express');
// const exphbs = require("express-handlebars");
// const form = require('body-parser');
// const flash = require('express-flash');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
// const Models = require("./model");
// const models = Models(mongoURL);
//
//
// var app = express();
//
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
//
// // parse application/json
// app.use(bodyParser.json());
//
// app.use(session({
//     secret: 'keyboard cat',
//     cookie: {
//         maxAge: 60000 * 30
//     }
// }));
// app.use(flash());
//
// app.use(express.static('public'));
//
// app.engine('hbs', exphbs({
//     defaultLayout: 'main',
//     extname: 'hbs'
// }));
// app.set('view engine', 'hbs');
//
// app.get('/waiters/:username', function(req, res){
//   var waiters = req.params.username
//
//   res.render("home", {
//       name: waiters
//   })
// })
//
// app.get('/', function (req, res) {
//     res.send("home")
// })
//
// app.post('/waiters/:username', function(req, res, next){
//
// })
//
// // app.get('/days', function(req, res, next){
// //
// // })
//
//
// // app.listen(3007);
// var port = process.env.PORT || 3000;
// app.listen(port, function() {
//     console.log("Server running at http://localhost:" + port);
// });
const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
// const mongoUrl = "mongodb://localhost/test";
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

app.get("/", function(req, res) {
    res.render("home");
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server running at http://localhost:" + port + "/");
});
