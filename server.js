//import modul express
var express = require('express');

//import modul ejs
var ejs = require('ejs');
// require body parser
var bodyParser = require('body-parser');
// import modul mongoose alias mongodb dong
var mongoose = require('mongoose');
//import route kita
var mainRoutes = require('./route/main');
//import path
const path = require('path');

//require dotenv
require('dotenv').config();

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
mongoose
     .connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
     })
     .then(() => console.log('mongoDB Connected'))
     .catch((err) => console.log(err));

//kita buat main route untuk backendnya.
app.use('/', mainRoutes);

//kita tetapkan view engine kita ke ejs
app.set('view engine', 'ejs');

app.listen(3000, function () {
     console.log('Server listening on port' + 3000);
});
