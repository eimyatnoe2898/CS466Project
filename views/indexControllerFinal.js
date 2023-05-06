//validate the user inputs of the new order transaction here
const Database = require("../models/database.js");
//import the model classes
const { Warehouse } = require("../models/warehouse");
const { District } = require("../models/district");
const { Customer } = require("../models/customer");
const { NewOrder } = require("../models/newOrder");
const { Order } = require("../models/order");
const { Item } = require("../models/Item");
const { Stock } = require("../models/Stock");
const { OrderLine } = require("../models/OrderLine");
const { format } = require("mysql2");

//initialize class instances
let warehouse = null;
let district = null;
let customer = null;
let order = null;
let new_order = null;
let orderItems = [];
let orderLines = [];
let orderLocality = [];
let total_amount = 0.0;
let total_taxes = 0.0;
let executionStatus = null;
let curTimestamp = null;

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
  randomInputsArr["w_id"] = generate_random(1, 2);

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
  res.render("index", { title: "New Order Page" });
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
  //print out all the user inputs
  total_amount = 0.0;
  total_taxes = 0.0;
  console.log(req.body);
  //assign the user inputs
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

  const db = new Database();
  (async () => {
    await db.connect();
    warehouseResult = await db.getWarehouseById(w_id); //1. get warehouse details
    warehouse = new Warehouse(warehouseResult);
    districtResult = await db.getDistrictById(d_id, w_id); //2. get district details
    district = new District(districtResult);
    d_next_o_id = district["d_next_o_id"] + 1;
    await db.updateNextoid(d_next_o_id, d_id, w_id); //3. update next order id
    customerResult = await db.getCustomerById(c_id, d_id, w_id);
    customer = new Customer(customerResult);
    const now = new Date(); //4. get the entry date server side
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    let o_entry_d = formattedDate;
    curTimestamp = formattedDate;
    let o_ol_cnt = olid_arr.length;
    let o_id = d_next_o_id;
    o_all_local = 1;
    for (let i = 0; i < olwid_arr.length; i++) {
      //5. Check the warehouse locality of each item.
      if (olid_arr[i] != w_id) {
        o_all_local = 0;
        orderLocality[i] = "remote";
      } else {
        o_all_local = 1;
        orderLocality[i] = "local";
      }
    }
    let orderValues = [
      o_id,
      customer.c_id,
      d_id,
      w_id,
      o_entry_d,
      null,
      o_ol_cnt,
      o_all_local,
    ];
    await db.addOrder(orderValues); //6. Add the order to orders table
    order = new Order(orderValues);
    let newOrderValues = [o_id, d_id, w_id];
    await db.insertNewOrder(newOrderValues);
    new_order = new NewOrder(newOrderValues);
    for (let i = 0; i < olid_arr.length; i++) {
      //check each item in the orders
      let item = null;
      let orderLine = null;
      itemResult = await db.getItemById(olid_arr[i]);
      if (itemResult == null) {
        console.log("Item is not found. It is an unused item.");
        let itemValues = {
          i_id: olid_arr[i],
          i_im_id: null,
          i_name: null,
          i_price: null,
          i_data: null,
        };
        item = new Item(itemValues);
        item.used = false;
        console.log("Unused Item: ", item);
        orderItems.push(item);
      } else {
        console.log("Item is found. It is a used item.");
        let item = new Item(itemResult);
        item.used = true;
        console.log("Used Item: ", item);
        const stockValues = [olid_arr[i], olwid_arr[i]];
        const stockResult = await db.getStockbyItem(stockValues);
        console.log("Stock data has been successfully retrieved");
        if (w_id == 1) {
          stockDist = "s_dist_01";
        } else {
          stockDist = "s_dist_02";
        }
        let stockDetails = new Stock(stockResult, stockDist);
        item.i_stock = stockDetails;
        if (item.i_stock["s_quantity"] - olquantity_arr[i] >= 10) {
          console.log("Order Stock is valid");
          //decrease stock quantity
          item.i_stock["s_quantity"] =
            item.i_stock["s_quantity"] - olquantity_arr[i];
        } else {
          console.log("Order Stock is invalid");
          //update stock quantity
          item.i_stock["s_quantity"] =
            item.i_stock["s_quantity"] - olquantity_arr[i] + 91;
          //update s_ytd
          item.i_stock["s_ytd"] += olquantity_arr[i];
          item.i_stock["s_order_cnt"] += 1;
          //check locality of order line
          if (olwid_arr[i] != w_id) {
            item.i_stock["s_remote_cnt"] += 1;
          }
          //update stock for this item
          let newStockData = [
            item.i_stock["s_quantity"],
            item.i_stock["s_ytd"],
            item.i_stock["s_order_cnt"],
            item.i_stock["s_remote_cnt"],
            item.i_id,
            olwid_arr[i],
          ];
          await db.updateItemStock(newStockData);
        }
        // update the ol_quantity
        let ol_amount = olquantity_arr[i] * item.i_price;
        let ol_o_id = o_id;
        let ol_number = i;
        let ol_i_id = item.i_stock["s_i_id"];
        let ol_d_id = d_id;
        let ol_w_id = olwid_arr[i];
        let ol_supply_w_id = item.i_stock["s_w_id"];
        let ol_delivery_d = null;
        let ol_dist_info = item.i_stock["stockDist"];
        let ol_quantity = olquantity_arr[i];
        let olValues = [
          ol_o_id,
          ol_d_id,
          ol_w_id,
          ol_number,
          ol_i_id,
          ol_supply_w_id,
          ol_delivery_d,
          ol_quantity,
          ol_amount,
          ol_dist_info,
        ];

        await db.insertOrderLine(olValues);
        orderLine = new OrderLine(olValues, item);
        total_amount += ol_amount;
        console.log("Item: ", item);
        console.log("Order Line: ", orderLine);
        orderLines.push(orderLine);
        orderItems.push(item);
      }
    }

    total_taxes =
      total_amount *
      (1 - customer.c_discount) *
      (1 + warehouse.tax + district.d_tax);
    console.log("Printing the objects..."); //print the class instances
    console.log("Transaction made at ", curTimestamp);
    console.log("Warehouse: ", warehouse);
    console.log("District: ", district);
    console.log("Customer: ", customer);
    console.log("Order: ", order);
    console.log("New Order: ", new_order);
    console.log("Order Items: ", orderItems);
    console.log("There are " + orderItems.length + " order items");
    console.log("Order Line Items", orderLines);
    console.log("There are " + orderLines.length + " order items");
    console.log("Total Order Amount: ", total_amount);
    console.log("Total Taxes: " + total_taxes);
    console.log("Execution status: ");
    executionStatus = null;
    for (let i = 0; i < olid_arr; i++) {
      if (orderItems[i].used == false) {
        
        // console.log(orderItems[i]);
        executionStatus += "Item number " + orderItems[i].i_id + ", ";
      }

    }
    // console.log("Order Items: ", orderItems);


    executionStatus += "are not valid";
  })();

  res.render("resultPage", { title: "Result Page", transactionTimestamp: curTimestamp, warehouseData: warehouse, districtData: district, customerData: customer, orderData: order, newOrderData: new_order, orderItemsData: orderItems, orderLinesData: orderLines, totalAmountData: total_amount, totalTaxesData: total_taxes, executionStatusData: executionStatus});

};

module.exports = {
  load_form,
  submit_order,
  load_autoTest_form,
  load_manualTest_form,
};
