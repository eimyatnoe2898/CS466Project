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
let order = null;
let new_order = null;
let orders = [];

const generate_random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//load form with auto-generated inputs
const load_form = (req, res) => {
  //create empty random inputs array
  let randomInputsArr = {
    w_id: null,
    d_id: null,
    c_id: null,
    order_count: null,
    orders: [],
    entry_d: null,
  };
  //1. generate random warehouse id => [1 ... 10 ] where D_W_ID = W_ID
  const random_w_id = 1;
  randomInputsArr["w_id"] = random_w_id;

  //2. generate random d_id => [1023, 1, 3000] where C_D_ID = D_ID
  const random_d_id = generate_random(1, 10);
  randomInputsArr["d_id"] = random_d_id;

  //3. generate random c_id =>
  const random_c_id =
    (((Math.floor(Math.random() * 255) | (random_d_id << 8) | (1 << 16)) ^
      1023) %
      3000) +
    1;
  randomInputsArr["c_id"] = random_c_id;

  //4. generate random order inputs [5 ... 15]
  const random_orderCnt = generate_random(5, 15);
  randomInputsArr["order_count"] = random_orderCnt;

  //5. generate the input data for each item in the order
  for (let i = 0; i <= random_orderCnt; i++) {
    //5.1 generate ol_i_id
    // Generate random values for parameters
    let rbk = Math.floor(Math.random() * 2); // either 0 or 1
    let is_last_item = Math.floor(Math.random() * 2); // either 0 or 1

    // Create JSON array with input data
    let input_item = {
      ol_i_id: null,
      ol_supply_w_id: null,
      ol_quantity: null,
      home: null,
    };
    // Generate non-uniform random item number
    if (is_last_item && rbk) {
      // Generate unused value for item number
      input_item["ol_i_id"] = -1; // set to a value not found in the database
    } else {
      // Use NURand function to generate non-uniform random item number
      input_item["ol_i_id"] =
        (Math.floor(Math.random() * 100000) | (8191 << 17)) ^ 8191;
    }

    //5.2 generate random values for ol_supply_id
    const x = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100

    //based on x, set the remote or home warehouse for the order line
    if (x > 1) {
      input_item["ol_supply_w_id"] = random_w_id;
      input_item["home"] = 1;
    } else {
      while (true) {
        input_item["ol_supply_w_id"] = generate_random(1, 10);
        if (input_item["ol_supply_w_id"] != random_w_id) {
          break;
        }
      }
      input_item["home"] = 0;
    }

    //5.3 generate ol_quantity
    input_item["ol_quantity"] = generate_random(1, 10);
    randomInputsArr["orders"].push(input_item);
  }

  //6. generate entry date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  randomInputsArr["entry_d"] = formattedDate;

  console.log(randomInputsArr);
  res.render("index", {
    title: "New Order Page",
    randomInputs: randomInputsArr,
  });
};

//method to render manual testing form page
//load form with auto-generated inputs
const load_manualTest_form = (req, res) => {
  // console.log(randomInputsArr);
  res.render("manualTest", { title: "New Order Page" });
};

//load form with auto-generated inputs
const load_autoTest_form = (req, res) => {
  //create empty random inputs array
  let randomInputsArr = {
    w_id: null,
    d_id: null,
    c_id: null,
    order_count: null,
    orders: [],
    entry_d: null,
  };
  //1. generate random warehouse id => [1 ... 10 ] where D_W_ID = W_ID
  const random_w_id = 1;
  randomInputsArr["w_id"] = random_w_id;

  //2. generate random d_id => [1023, 1, 3000] where C_D_ID = D_ID
  const random_d_id = generate_random(1, 10);
  randomInputsArr["d_id"] = random_d_id;

  //3. generate random c_id =>
  const random_c_id =
    (((Math.floor(Math.random() * 255) | (random_d_id << 8) | (1 << 16)) ^
      1023) %
      3000) +
    1;
  randomInputsArr["c_id"] = random_c_id;

  //4. generate random order inputs [5 ... 15]
  const random_orderCnt = generate_random(5, 15);
  randomInputsArr["order_count"] = random_orderCnt;

  //5. generate the input data for each item in the order
  for (let i = 0; i <= random_orderCnt; i++) {
    //5.1 generate ol_i_id
    // Generate random values for parameters
    let rbk = Math.floor(Math.random() * 2); // either 0 or 1
    let is_last_item = Math.floor(Math.random() * 2); // either 0 or 1

    // Create JSON array with input data
    let input_item = {
      ol_i_id: null,
      ol_supply_w_id: null,
      ol_quantity: null,
      home: null,
    };
    // Generate non-uniform random item number
    if (is_last_item && rbk) {
      // Generate unused value for item number
      input_item["ol_i_id"] = -1; // set to a value not found in the database
    } else {
      // Use NURand function to generate non-uniform random item number
      input_item["ol_i_id"] =
        (Math.floor(Math.random() * 100000) | (8191 << 17)) ^ 8191;
    }

    //5.2 generate random values for ol_supply_id
    const x = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100

    //based on x, set the remote or home warehouse for the order line
    if (x > 1) {
      input_item["ol_supply_w_id"] = random_w_id;
      input_item["home"] = 1;
    } else {
      while (true) {
        input_item["ol_supply_w_id"] = generate_random(1, 10);
        if (input_item["ol_supply_w_id"] != random_w_id) {
          break;
        }
      }
      input_item["home"] = 0;
    }

    //5.3 generate ol_quantity
    input_item["ol_quantity"] = generate_random(1, 10);
    randomInputsArr["orders"].push(input_item);
  }

  //6. generate entry date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  randomInputsArr["entry_d"] = formattedDate;

  console.log(randomInputsArr);
  res.render("autoTest", {
    title: "New Order Page",
    randomInputs: randomInputsArr,
  });
};
//method to process the new order transaction
const submit_order = (req, res) => {
  console.log(req.body);

  // //assign the form inputs
  const w_id = req.body.w_id;
  const d_id = req.body.d_id;
  const c_id = req.body.c_id;
  const olid_arr = req.body.ol_id;
  const olwid_arr = req.body.ol_wid;
  const olquantity_arr = req.body.ol_quantity;
  console.log(w_id);
  console.log(d_id);
  console.log(c_id);
  console.log(olid_arr);
  console.log(olwid_arr);
  console.log(olquantity_arr);

  //1. retrieve the warehouse details
  let searchWarehouse = "SELECT * FROM `warehouse` WHERE `w_id` = ?";
  db.query(searchWarehouse, [w_id], (err, result) => {
    if (err) {
      console.log("Warehouse data cannot be retrieved");
    } else {
      console.log("Warehouse data has been successfully retrieved");
      // console.log(result[0]);
      //create warehouse object
      warehouse = new Warehouse(result[0]);
      //store the warehouse data in the warehouse object

      //2. retrieve district details
      let searchDistrict =
        "SELECT * FROM `district` WHERE `d_id` = ? AND `d_w_id` = ?";
      db.query(searchDistrict, [d_id, w_id], (err, result) => {
        if (err) {
          console.log("District data cannot be retrieved");
        } else {
          console.log("District data has been successfully retrieved");
          // console.log(result[0]);
          //create warehouse object
          //store the warehouse data in the warehouse object
          district = new District(result[0]);

          //retrieve customer details
          let searchCustomer =
            "SELECT * FROM `customer` WHERE `c_id` = ? AND `c_d_id` = ? AND `c_w_id` = ?";
          db.query(searchCustomer, [c_id, d_id, w_id], (err, result) => {
            if (err) {
              console.log("Customer data cannot be retrieved");
            } else {
              console.log("Customer data has been successfully retrieved");

              //create warehouse object
              console.log(result[0]);
              customer = new Customer(result[0]);

              //4. insert new record to orders table
              //get the entry date
              let o_entry_d = "2023-04-27 00:00:00 ";

              //get the order lines count
              let o_ol_cnt = olid_arr.length;

              //perform sql queries
              let insertoOrders =
                "INSERT INTO `orders` (`o_id`, `o_c_id`, `o_d_id`,`o_w_id`, o_entry_d, o_carrier_id, o_ol_cnt, o_all_local) values (?,?,?,?,?,?,?,?)";
              let o_id = generate_random(1, 10000000);
              let orderValues = [
                o_id,
                customer.c_id,
                d_id,
                w_id,
                o_entry_d,
                0,
                o_ol_cnt,
                1,
              ];
              db.query(insertoOrders, orderValues, (err, result) => {
                if (err) {
                  console.log("Order Data Addition to Orders table failed.");
                  console.log(err);
                } else {
                  console.log(
                    "Order Data is successfully added to Orders table"
                  );
                  console.log(result);

                  //create order object
                  order = new Order(orderValues);

                  // 5. insert new record to new order table
                  let insertoNewOrder =
                    "INSERT INTO `new_order` (`no_o_id`, `no_d_id`, `no_w_id`) values (?,?,?)";
                  let no_o_id = generate_random(1, 10000000);
                  let newOrderValues = [o_id, d_id, w_id];
                  db.query(insertoNewOrder, newOrderValues, (err, result) => {
                    if (err) {
                      console.log(
                        "New Order Data Addition to New Order table failed."
                      );
                      console.log(err);
                    } else {
                      console.log(
                        "New Order Data is successfully added to New Orders table"
                      );
                      console.log(result);
                      //create new order object
                      new_order = new NewOrder(newOrderValues);

                      //6. insert each items to order line table (step by step)
                      //loop over every order item
                      for (let i = 0; i < olid_arr.length; i++) {
                        //6a. check if the order item is unused value
                        //retrieve the item details
                        //check if the item is unused value
                        if (olid_arr[i] == -1) {
                          //skip this array
                          continue;
                        } else {
                          let searchItem =
                            "SELECT * FROM `item` WHERE `i_id` = ?";
                          db.query(searchItem, [olid_arr[i]], (err, result) => {
                            if (err) {
                              console.log("Item data cannot be retrieved");
                              //perform rollback
                            } else {
                              console.log(
                                "Item data has been successfully retrieved"
                              );
                              console.log(result[0]);
                               let item = new Item(result[0]);

                              // 6b. retrieve the quantity available and stock for the selected item
                              // //retrieve stock details for the selected item
                              let searchStock =
                                "SELECT * FROM `stock` WHERE `s_i_id` = ? AND `s_w_id` = ?";
                              db.query(searchStock, [olid_arr[i], olwid_arr[i]], (err, result) => {
                                if (err) {
                                  console.log("Stock data cannot be retrieved");
                                  console.log(err);
                                } else {
                                  console.log(
                                    "Stock data has been successfully retrieved"
                                  );

                                  console.log(result[0]);
                                  // let stock_details = result[0];
                                  // let s_quantity = stock_details['s_quantity'];
                                  // let s_data = stock_details['s_data  '];
                                  
                                  //update the stock details
                                  // if((s_quantity - olquantity_arr[i]) >= 10)
                                  // {
                                      
                                  // }

                                  //update the ol_quantity
                                  // let ol_amount = olquantity_arr[i] * item.i_price;
                                  // let ol_details = [ol_i_id[i], d_id, olwid_arr[i], ]
                                  //create order line object
                                  orders.push(item);

                                }
                              });
                              //print all the objects
                              console.log("District", district);
                              console.log("Warehouse", warehouse);
                              console.log("Customer", customer);
                              console.log("Order Record", order);
                              console.log("New Order", new_order);
                              console.log("Order", orders);
                              
                              res.render("resultPage", {
                                title: "Result Page",
                                district: district, 
                                warehouse: warehouse,
                                customer: customer,
                                order_record:order,
                                new_order: new_order
                              });
                            }
                          });
                        }

                        //           // //retrieve stock details for the selected item
                        //           // let searchStock =
                        //           // "SELECT * FROM `stock` WHERE `s_i_id` = ? AND `s_w-id` = ?";
                        //           // db.query(searchStock, [], (err, result) => {
                        //           //   if(err)
                        //           //   {
                        //           //     console.log("Stock data cannot be retrieved");
                        //           //   }
                        //           //   else
                        //           //   {
                        //           //     console.log("Stock data has been successfully retrieved");

                        //           //     //create warehouse object

                        //           //     //store the warehouse data in the warehouse object

                        //           //   }
                        //           // });

                        //         //update the squantity based on item quantity

                        //         //6c. calculate the ol amount
                        //           //

                        //         //6d. create the item object

                        //         //6e. add the item into the order line table
                        //   create Item Object
                        //  let item = new Item(result[0]);
                        //  items.push(item);

                        //     //   }
                        //     // });
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  load_form,
  submit_order,
  load_autoTest_form,
  load_manualTest_form,
};
