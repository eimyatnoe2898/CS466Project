//import required libraries and modules
const express = require("express");
const app = express()
const server = require("http").createServer(app);
const mysql = require("mysql2");

//set engines

app.set("view engine", "ejs")

//middleware and static files
const customerRoutes = require('./routes/customerRoutes');

//routes
app.use('/', customerRoutes );

//start server
server.listen(3001, () => {
    console.log("Server running");
  });
  