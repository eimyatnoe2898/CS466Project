//validate the user inputs of the new order transaction here
const db = require("../models/database.js");
const { Customer } = require("../models/customer.js");
const { NewOrder } = require("../models/newOrder.js");

const render_form = (req, res) => {
  // res.redirect('./customer');
  // console.log(req.body);
  res.render("customer", { title: "Check in", sessionVar: req.session });
};


module.exports = {

};
