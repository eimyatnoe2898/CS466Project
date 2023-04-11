const express = require("express");
const app = express()
const server = require("http").createServer(app);
const mysql = require("mysql2");
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });


//set engines
app.set("view engine", "ejs")


//middleware and static files
const customerRoutes = require('./routes/customerRoutes');


//routes
app.get("/", (req, res) => {
  res.render("home");
});

//index routes
app.use('/customer', customerRoutes);

app.get
//start server
server.listen(3001, () => {
    console.log("Server running");
  });
  