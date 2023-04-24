//validate the user inputs of the new order transaction here
const db = require("../models/database.js");

const load_form = (req, res) => {
  //populate input data
  //1. generate random warehouse id => [1 ... 10 ] where D_W_ID = W_ID


  //2. generate random d_id => [1023, 1, 3000] where C_D_ID = D_ID


  //3. generate random 


  // res.render("index", { title: "New Order Page"});
  res.render("test", { title: "New Order Page"});

}

const submit_order = (req, res) => {
  console.log(req.body);
  
  //assign the form inputs
  const w_id = req.body.w_id;
  const d_id = req.body.d_id;
  const c_id = req.body.c_id;
  const olid_arr = ol_id;
  const olwid_arr = ol_wid;
  const olquantity_arr = ol_quantity;


  //perform form data validation and sanitizing
  //1. check ware house id



  //2. check district number [1 ... 10 ] where D_W_ID = W_ID


  //3. check customer number [1023, 1, 3000] where C_D_ID = D_ID


  //4. check each order to see if the orders are
    //a) are in stock in the selected district


    //




  //render the results to resultPage
  res.render("resultPage", {title: "New Order Result Page", inputs: req.body})
}

module.exports = {load_form, submit_order};
