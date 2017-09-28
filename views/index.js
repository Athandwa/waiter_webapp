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

app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.get('/waiters/:username', function(){

})

app.post('/waiters/:username', function(){

})

app.get('/days', function(){

})
