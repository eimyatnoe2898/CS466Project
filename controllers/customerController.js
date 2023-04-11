//validate the user inputs of the new order transaction here
const db = require("../models/database.js");

const get_user_inputs = (req, res) => {
  // res.redirect('./customer');
  res.render("home");
};

const form_submit = (req, res) => {
  console.log("Request Body: " + req.body);
  res.render("formSubmit", { title: "Check in", input: req.body});
}

module.exports = {get_user_inputs, form_submit
};
