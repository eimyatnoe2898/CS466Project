//import required libraries and modules
const express = require("express");
const app = express();
const morgan = require('morgan');
const mysql = require("mysql2");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//set engines
app.set("view engine", "ejs")

//middleware and static files
const indexRoutes = require('./routes/indexRoutes');

//routes
app.use('/', indexRoutes );

//start server
app.listen(3001, () => {
    console.log("Server running");
  });
  