//validate the user inputs of the new order transaction here
const db = require("../models/database.js");
//import the model classes
const { Warehouse } = require("../models/warehouse");
const { District } = require("../models/district");
const { Customer } = require("../models/customer");
const { NewOrder } = require("../models/newOrder");
const { Order } = require("../models/order");
const { Item } = require("../models/Item");

  //initialize class instances
  let warehouse = null;
  let district = null;
  let customer = null;
  let orders = null; 
  let new_order = null;
  let item = null;

const load_form = (req, res) => {
  //populate input data
  //1. generate random warehouse id => [1 ... 10 ] where D_W_ID = W_ID


  //2. generate random d_id => [1023, 1, 3000] where C_D_ID = D_ID


  //3. generate random 


  //pass the generated random input to the ejs machine
  res.render("index", { title: "New Order Page"});

}

const submit_order = (req, res) => {
  console.log(req.body);
  
  //assign the form inputs
  const w_id = req.body.w_id;
  const d_id = req.body.d_id;
  const c_id = req.body.c_id;
  const olid_arr = req.body.ol_id;
  const olwid_arr = req.body.ol_wid;
  const olquantity_arr = req.body.ol_quantity;

  //perform form data validation and sanitizing and database search
  //1. retrieve warehouse id
  let searchWarehouse =
  "SELECT * FROM `warehouse` WHERE `w_id` = ?";
  db.query(searchWarehouse, [w_id], (err, result) => {
    if(err)
    {
      console.log("Warehouse data cannot be retrieved");
    }
    else
    {
      console.log("Warehouse data has been successfully retrieved");
      console.log(result[0]);
      //create warehouse object
      warehouse = new Warehouse(result[0]);
      //store the warehouse data in the warehouse object
      console.log("Warehouse", warehouse);
      
      // 2. check district number [1 ... 10 ] where D_W_ID = W_ID
      let searchDistrict = 
      "SELECT * FROM `district` WHERE `d_id` = ? AND `d_w_id` = ?";
      db.query(searchDistrict, [d_id, w_id], (err, result) => {
        if(err)
        {
          console.log("District data cannot be retrieved");
        }
        else
        {
          console.log("District data has been successfully retrieved");
          console.log(result[0]);
          //create warehouse object
          //store the warehouse data in the warehouse object
          district = new District(result[0]);
          console.log("District", district);

          //3. check customer number [1023, 1, 3000] where C_D_ID = D_ID
          // let searchCustomer =
          // "SELECT * FROM `customer` WHERE `c_id` = ? AND `c_d_id` = ? AND `c_w_id` = ?";
          // db.query(searchCustomer, [c_id, d_id, w_id], (err, result) => {
          //   if(err)
          //   {
          //     console.log("Customer data cannot be retrieved");
          //   }
          //   else
          //   {
          //     console.log("Customer data has been successfully retrieved");

          //     //create warehouse object
          //     customer = new Customer(result[0]);
          //     console.log(result[0]);

          //     //store the warehouse data in the warehouse object
                //4. insert record into new order table
                // let insertoOrder =
                // "INSERT INTO `new_order` (`no_o_id`, `no_d_id`, `no_w_id`) values (?,?,?)";
                // db.query(insertoOrder, [c_id, d_id, w_id], (err, result) => {
                //   if(err)
                //   {
                //     console.log("New Order Data Addition to Orders table failed.");
                //   }
                //   else
                //   {
                //     console.log("New Order Data is successfully added to Orders table");
                          //5. insert record into new order table
                          // let inserttoNewOrder = "";
                          // db.query(inserttoNewOrder, [c_id, d_id, w_id], (err, result) => {
                          //   if(err)
                          //   {
                          //     console.log("New Order Data Addition to New Orders table failed.");
                          //   }
                          //   else
                          //   {
                          //     console.log("New Order Data is successfully added to New Orders table");
                
                          //   }
                          // });

  //6. insert each items to order line table (step by step)
  //loop over every order items
  // for(let i = 0; i < olid_arr.length; i++)
  // {
  //   //6a. check if the order item is unused value 
  //     //retrieve the item details
  //     let searchItem =
  //     "SELECT * FROM `item` WHERE `i_id` = ?";
  //     db.query(searchItem, [olid_arr[i]], (err, result) => {
  //       //if not valid (unused value), 
  //       if(err)
  //       {
  //         console.log("Item data cannot be retrieved");
  //         //perform rollback

  //       }
  //       //if valid continue the rest of the steps,
  //       else
  //       {
  //         console.log("Item data has been successfully retrieved");
  //         console.log(result[0]);

          //6b. retrieve the quantity available and stock for the selected item
            //create Item Object
            // item = new Item(result[0]);
          
            // //retrieve stock details for the selected item
            // let searchStock =
            // "SELECT * FROM `stock` WHERE `s_i_id` = ? AND `s_w-id` = ?";
            // db.query(searchStock, [], (err, result) => {
            //   if(err)
            //   {
            //     console.log("Stock data cannot be retrieved");
            //   }
            //   else
            //   {
            //     console.log("Stock data has been successfully retrieved");
                
            //     //create warehouse object
                
            //     //store the warehouse data in the warehouse object
                
            //   }
            // });

          //update the squantity based on item quantity

            
          //6c. calculate the ol amount
            //

          //6d. create the item object


          //6e. add the item into the order line table

      //   }
      // });

  // }
  //render the results to resultPage
  // res.render("resultPage", {title: "New Order Result Page", inputs: req.body})
          //   }
          // });


                //   }
                // });




        }
      });
    }
  });
}



module.exports = {load_form, submit_order};
