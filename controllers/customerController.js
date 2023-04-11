//validate the user inputs of the new order transaction here
const db = require("../models/database.js");

const get_user_inputs = (req, res) => {
  // res.redirect('./customer');

  //here generate the drop down values for warehouse_id
  db.query(
    "SELECT DISTINCT `w_id` FROM `warehouse` group by `w_id`",
    function (error, data) {
      //here generate the drop down values for district_id

      //here generate the drop down values for customer_id

      //render the drop down values
      res.render("home", { title: "Order Page", warehouse_data: data });
    }
  );
};

//load district data (dynamic dropdown)
const get_dynamic_data = (req, res) => {
  var type = request.query.type;
  var search_query = request.query.parent_value;

  if (type == "load_state") {
    var query = `
      SELECT DISTINCT state AS Data FROM country_state_city 
      WHERE country = '${search_query}' 
      ORDER BY state ASC
      `;
  }

  if (type == "load_city") {
    var query = `
      SELECT city AS Data FROM country_state_city 
      WHERE state = '${search_query}' 
      ORDER BY city ASC
      `;
  }

  database.query(query, function (error, data) {
    var data_arr = [];

    data.forEach(function (row) {
      data_arr.push(row.Data);
    });

    response.json(data_arr);
  });
};

const form_submit = (req, res) => {
  console.log("Request Body: " + req.body);
  res.render("formSubmit", { title: "Check in", input: req.body });
};

module.exports = { get_user_inputs, form_submit };
