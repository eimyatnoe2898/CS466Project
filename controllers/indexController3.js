
if (err) {
    console.log("Warehouse data cannot be retrieved");
  } else {
    console.log("Warehouse data has been successfully retrieved");
    // console.log(result[0]);
    //create warehouse object
    //store the warehouse data in the warehouse object
    warehouse = new Warehouse(result[0]);

    //2. retrieve district details
    let searchDistrict =
      "SELECT * FROM `district` WHERE `d_id` = ? AND `d_w_id` = ?";
    db.query(searchDistrict, [d_id, w_id], (err, result) => {
      if (err) {
        console.log("District data cannot be retrieved");
      } else {
        console.log("District data has been successfully retrieved");
        //create district object
        //store the sql district data in the  distrit object
        district = new District(result[0]);
        d_next_o_id = result[0]["d_next_o_id"] + 1;

        //increment the d_next_o_id
        let updateNextoid =
          "UPDATE `district` SET `d_next_o_id` = ? WHERE `d_id` =? AND `d_w_id` = ?";
        db.query(updateNextoid, [d_next_o_id, d_id, w_id], (err, result) => {
          if (err) {
            console.log("District next order id data cannot be updated");
            console.log(err);
          } else {
            console.log("District next order id data is updated");
            let searchCustomer =
              "SELECT * FROM `customer` WHERE `c_id` = ? AND `c_d_id` = ? AND `c_w_id` = ?";
            db.query(searchCustomer, [c_id, d_id, w_id], (err, result) => {
              if (err) {
                console.log("Customer data cannot be retrieved");
              } else {
                console.log("Customer data has been successfully retrieved");

                //create warehouse object
                // console.log(result[0]);
                customer = new Customer(result[0]);

                //4. insert new record to orders table
                //get the entry date
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, "0");
                const day = String(now.getDate()).padStart(2, "0");
                const hours = String(now.getHours()).padStart(2, "0");
                const minutes = String(now.getMinutes()).padStart(2, "0");
                const seconds = String(now.getSeconds()).padStart(2, "0");
                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                // let o_entry_d = "2023-04-27 00:00:00 ";
                let o_entry_d = formattedDate;

                //get the order lines count
                let o_ol_cnt = olid_arr.length;

                //assign update o_id to  d_next_o_id
                let o_id = d_next_o_id;

                //loop over all order lines to check if they all can be ordered from local warehouse
                o_all_local = 1;
                for (let i = 0; i < olwid_arr.length; i++) {
                  if (olid_arr[i] != w_id) {
                    o_all_local = 0;
                    orderLocality[i] = "remote";
                  } else {
                    o_all_local = 1;
                    orderLocality[i] = "local";
                  }
                }

                //create insert values for orders
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

                //perform sql queries
                let insertoOrders =
                  "INSERT INTO `orders` (`o_id`, `o_c_id`, `o_d_id`,`o_w_id`, o_entry_d, o_carrier_id, o_ol_cnt, o_all_local) values (?,?,?,?,?,?,?,?)";
                db.query(insertoOrders, orderValues, (err, result) => {
                  if (err) {
                    console.log(
                      "Order Data Addition to Orders table failed."
                    );
                    console.log(err);
                  } else {
                    console.log(
                      "Order Data is successfully added to Orders table"
                    );
                    // console.log(result);

                    //create order object
                    order = new Order(orderValues);

                    // 5. insert new record to new order table
                    //assign new order values
                    let newOrderValues = [o_id, d_id, w_id];

                    //perform sql queries
                    let insertoNewOrder =
                      "INSERT INTO `new_order` (`no_o_id`, `no_d_id`, `no_w_id`) values (?,?,?)";
                    db.query(
                      insertoNewOrder,
                      newOrderValues,
                      (err, result) => {
                        if (err) {
                          console.log(
                            "New Order Data Addition to New Order table failed."
                          );
                          console.log(err);
                        } else {
                          console.log(
                            "New Order Data is successfully added to New Orders table"
                          );
                          //create new order object
                          new_order = new NewOrder(newOrderValues);

                          //6. check each item in the order lines
                          for (let i = 0; i < o_ol_cnt; i++) {
                            let item = null;
                            //search item
                            let searchItem =
                              "SELECT * FROM `item` WHERE `i_id` = ?";
                            console.log(olid_arr[i]);
                            db.query(
                              searchItem,
                              [olid_arr[i]],
                              (err, result) => {
                                if (err) {
                                  console.log("Item cannot be retrieved.");
                                  console.log(err);
                                } else {
                                  if (result.length == 0) {
                                    console.log(
                                      "Item is not found. It is unused Item"
                                    );
                                    let unusedItemValues = {
                                      i_id: null,
                                      i_im_id: null,
                                      i_name: null,
                                      i_price: null,
                                      i_data: null,
                                    };
                                    let unusedItem = new Item(
                                      unusedItemValues
                                    );
                                    unusedItem.used = false;
                                    console.log("Unused Item: ", unusedItem);
                                    orders.push(unusedItem);
                                  } else {
                                    console.log(
                                      "Item is found. It is a used item."
                                    );
                                    let item = new Item(result[0]);
                                    item.used = true;

                                    // 6b. retrieve the quantity available and stock for the selected item
                                    //retrieve stock details for the selected item
                                    let searchStock =
                                      "SELECT * FROM `stock` WHERE `s_i_id` = ? AND `s_w_id` = ?";
                                    let stockValues = [
                                      olid_arr[i],
                                      olwid_arr[i],
                                    ];
                                    db.query(
                                      searchStock,
                                      stockValues,
                                      (err, result) => {
                                        if (err) {
                                          console.log(
                                            "Stock data cannot be retrieved"
                                          );
                                          console.log(err);
                                        } else {
                                          console.log(
                                            "Stock data has been successfully retrieved"
                                          );
                                          console.log("Used Item: ", item);
                                        }
                                      }
                                    );
                                  }
                                }
                              }
                            );

                            //         // 6b. retrieve the quantity available and stock for the selected item
                            //         //retrieve stock details for the selected item
                            //         let searchStock =
                            //           "SELECT * FROM `stock` WHERE `s_i_id` = ? AND `s_w_id` = ?";
                            //         let stockValues = [
                            //           olid_arr[i],
                            //           olwid_arr[i],
                            //         ];
                            //         db.query(
                            //           searchStock,
                            //           stockValues,
                            //           (err, result) => {
                            //             if (err) {
                            //               console.log(
                            //                 "Stock data cannot be retrieved"
                            //               );
                            //               console.log(err);
                            //             } else {
                            //               console.log(
                            //                 "Stock data has been successfully retrieved"
                            //               );

                            //               if (w_id == 1) {
                            //                 stockDist = "s_dist_01";
                            //               } else {
                            //                 stockDist = "s_dist_02";
                            //               }
                            //               let stockDetails = new Stock(
                            //                 result[0],
                            //                 stockDist
                            //               );
                            //               item.i_stock = stockDetails;
                            //               console.log("Item: ", item);
                            //               console.log(
                            //                 "Item's stock quantity: ",
                            //                 item.i_stock["s_quantity"]
                            //               );
                            //               console.log(
                            //                 "Item order quantity: ",
                            //                 olquantity_arr[i]
                            //               );
                            //               if (
                            //                 item.i_stock["s_quantity"] -
                            //                   olquantity_arr[i] >=
                            //                 10
                            //               ) {
                            //                 console.log("Order valid");
                            //                 //decrease stock quantity
                            //                 item.i_stock["s_quantity"] =
                            //                   item.i_stock["s_quantity"] -
                            //                   olquantity_arr[i];
                            //               } else {
                            //                 console.log("Order is invalid");
                            //                 //update stock quantity
                            //                 item.i_stock["s_quantity"] =
                            //                   item.i_stock["s_quantity"] -
                            //                   olquantity_arr[i] +
                            //                   91;

                            //                 //update s_ytd
                            //                 item.i_stock["s_ytd"] +=
                            //                   olquantity_arr[i];
                            //                 item.i_stock["s_order_cnt"] += 1;

                            //                 //check locality of order line
                            //                 if (olwid_arr[i] != w_id) {
                            //                   item.i_stock[
                            //                     "s_remote_cnt"
                            //                   ] += 1;
                            //                 }
                            //                 // update the ol_quantity
                            //                 let ol_amount =
                            //                   olquantity_arr[i] *
                            //                   item.i_price;
                            //                 let ol_o_id = o_id;
                            //                 let ol_number = i;
                            //                 let ol_i_id =
                            //                   item.i_stock["s_i_id"];
                            //                 let ol_d_id = d_id;
                            //                 let ol_w_id = olwid_arr[i];
                            //                 let ol_supply_w_id =
                            //                   item.i_stock["s_w_id"];
                            //                 let ol_delivery_d = null;
                            //                 let ol_dist_info =
                            //                   item.i_stock["stockDist"];
                            //                 let ol_quantity =
                            //                   olquantity_arr[i];

                            //                 let olValues = [
                            //                   ol_o_id,
                            //                   ol_d_id,
                            //                   ol_w_id,
                            //                   ol_number,
                            //                   ol_i_id,
                            //                   ol_supply_w_id,
                            //                   ol_delivery_d,
                            //                   ol_quantity,
                            //                   ol_amount,
                            //                   ol_dist_info,
                            //                 ];
                            //                 //insert the order line into order line table
                            //                 let insertToOrderline =
                            //                   "INSERT INTO `order_line` (ol_o_id, ol_d_id, ol_w_id, ol_number, ol_i_id, ol_supply_w_id, ol_delivery_d, ol_quantity, ol_amount, ol_dist_info) values (?,?,?,?,?,?,?,?,?,?)";
                            //                 db.query(
                            //                   insertToOrderline,
                            //                   olValues,
                            //                   (err, result) =>
                            //                     // create order line object
                            //                     {
                            //                       if(err)
                            //                       {
                            //                         console.log("New order line is not inserted successfully.");
                            //                         console.log(err);
                            //                       }

                            //                       else
                            //                       {
                            //                         console.log("New order line has been added to order line table successfully");
                            //                       }
                            //                     }
                            //                 );
                            //               }
                            //             }
                            //           }
                            //         );
                            //       }
                            //     }
                            //   }
                            // );
                            console.log("Warehouse: ", warehouse);
                            console.log("District: ", district);
                            console.log("Customer: ", customer);
                            console.log("New Order: ", new_order);
                            console.log("Orders: ", orders);


                          }

                        }
                      }
                    );
                  }
                });
              }
            });
          }
        });
      }
    });
  }


  //                           }
//                         });
//                         //print all the objects
//                         console.log("District", district);
//                         console.log("Warehouse", warehouse);
//                         console.log("Customer", customer);
//                         console.log("Order Record", order);
//                         console.log("New Order", new_order);
//                         console.log("Order", orders);

//                         res.render("resultPage", {
//                           title: "Result Page",
//                           district: district,
//                           warehouse: warehouse,
//                           customer: customer,
//                           order_record:order,
//                           new_order: new_order
//                         });
//                       }
//                     });
