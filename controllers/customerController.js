//validate the user inputs of the new order transaction here
const db = require("../models/database.js");

const load_form = (req, res) => {
  res.render("test", { title: "New Order Page"});
}

const check_in = (req, res) => {
  console.log("Data submitted to the form");
  console.log(req.body);
};

const load_dropdown = (req, res) => {
  let sql = "SELECT DISTINCT `w_id` FROM `warehouse` group by `w_id`";
  // get the warehouse data list
  db.query(sql, (err, result) => {
    const warehouseResult = null;

    if (err) {
      console.log("warehouse data cannot be retrieved");
    } else {
      warehouseResult = result;
      console.log(warehouseResult);
      console.log("warehouse data have been retrieved");
      // res.render('home', {title: 'Main Page', warehouseData: result});
    }
  });

  //get the districts list
  let sql1 = "SELECT DISTINCT d_id FROM `district`;";
  db.query(sql1, (err, result) => {
    const districtResult = null;
    if (err) {
      console.log("district data cannot be retrieved");
    } else {
      districtResult = result;
      console.log(districtResult);
      console.log("district data have been retrieved");
      // res.render("home", { title: "Main Page", warehouseData: warehouseResult, districtData: districtResult});
    }
  });

  // //get the customer list
  let sql2 = "SELECT DISTINCT c_id FROM `customer`";
  db.query(sql2, (err, result) => {
    const customerResult = null;
    if (err) {
      console.log("customer data cannot be retrieved");
    } else {
      customerResult = result;
      console.log(customerResult);
      console.log("customer data have been retrieved");
    }
  });

  res.render("home", { title: "Main Page", warehouseData: warehouseResult, districtData: districtResult, customerData: customerResult});

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
  res.send(req.body);
  // res.render("resultPage", { title: "Check in", input: req.body });
};

module.exports = {load_form, check_in, load_dropdown, form_submit, get_dynamic_data};
