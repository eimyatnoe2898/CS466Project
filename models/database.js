const mysql = require("mysql2/promise");

class Db {
  constructor() {
    this.pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "Sql783knui1-1l;/klaa-9",
      database: "tpcc_database",
      //   waitForConnections: true,
      //   connectionLimit: 10,
      //   queueLimit: 0
    });
  }

  async connect() {
    try {
      await this.pool.getConnection();
      console.log("Mysql Connected");
    } catch (err) {
      console.log("Error connecting to db");
      console.error(err);
    }
  }

  //retrieve warehouse information
  async getWarehouseById(w_id) {
    const searchWarehouse = "SELECT * FROM `warehouse` WHERE `w_id` = ?";

    try {
      const [rows, fields] = await this.pool.query(searchWarehouse, [w_id]);
      console.log("Warehouse data has been successfully retrieved.");
      return rows[0];
    } catch (err) {
      console.error("Warehouse data cannot be retrieved.");
      return null;
    }
  }

  //retrieve district information
  async getDistrictById(d_id, w_id) {
    const searchDistrict =
      "SELECT * FROM `district` WHERE `d_id` = ? AND `d_w_id` = ?";

    try {
      const [rows, fields] = await this.pool.query(searchDistrict, [
        d_id,
        w_id,
      ]);
      console.log("District data has been successfully retrieved.");
      return rows[0];
    } catch (err) {
      console.error("District data cannot be retrieved.");
      return null;
    }
  }

  async updateNextoid(d_next_o_id, d_id, w_id) {
    const updateDistrictOid =
      "UPDATE `district` SET `d_next_o_id` = ? WHERE `d_id` =? AND `d_w_id` = ?";

    try {
      const [result] = await this.pool.query(updateDistrictOid, [
        d_next_o_id,
        d_id,
        w_id,
      ]);
      console.log("District next order id data is updated");
      return result;
    } catch (err) {
      console.log("District next order id data cannot be updated");
      console.error(err);
      return null;
    }
  }

  async getCustomerById(c_id, c_d_id, c_w_id) {
    const searchCustomer = 'SELECT * FROM `customer` WHERE `c_id` = ? AND `c_d_id` = ? AND `c_w_id` = ?';
    try {
      const [rows, fields] = await this.pool.query(searchCustomer, [c_id, c_d_id, c_w_id]);
      console.log('Customer data has been successfully retrieved');
      return rows[0];
    } catch (err) {
      console.error('Customer data cannot be retrieved');
      return null;
    }
  }

  async addOrder(orderValues) {
    const insertoOrders =
      "INSERT INTO `orders` (`o_id`, `o_c_id`, `o_d_id`,`o_w_id`, o_entry_d, o_carrier_id, o_ol_cnt, o_all_local) values (?,?,?,?,?,?,?,?)";
    try {
      await this.pool.query(insertoOrders, orderValues);
      console.log("Order Data is successfully added to Orders table");
    } catch (err) {
      console.log("Order Data Addition to Orders table failed.");
      console.log(err);
    }
  }

  async insertNewOrder(newOrderValues) {
    const insertoNewOrder = "INSERT INTO `new_order` (`no_o_id`, `no_d_id`, `no_w_id`) values (?,?,?)";
    
    try {
      await this.pool.query(insertoNewOrder, newOrderValues);
      console.log("New Order Data is successfully added to New Orders table");
    } catch (err) {
      console.error("New Order Data Addition to New Order table failed.", err);
    }
  }

  async getItemById(i_id) {
    const searchItem = 'SELECT * FROM `item` WHERE `i_id` = ?';
    try {
      const [rows, fields] = await this.pool.query(searchItem, [i_id]);
      console.log('Item data has been successfully retrieved');
      return rows[0];
    } catch (err) {
      console.error('Item data cannot be retrieved');
      return null;
    }
  }

  async getStockbyItem(stockValues) {
    const searchStock = 'SELECT * FROM `stock` WHERE `s_i_id` = ? AND `s_w_id` = ?';
    try {
      const [rows, fields] = await this.pool.query(searchStock, stockValues);
      console.log('Stock data for this item has been successfully retrieved');
      return rows[0];
    } catch (err) {
      console.error('Stock data for this item cannot be retrieved');
      return null;
    }
  }
  
  async insertOrderLine(orderlineValues) {
    const insertoOrderline = "INSERT INTO `order_line` (ol_o_id, ol_d_id, ol_w_id, ol_number, ol_i_id, ol_supply_w_id, ol_delivery_d, ol_quantity, ol_amount, ol_dist_info) values (?,?,?,?,?,?,?,?,?,?)";
    try {
      await this.pool.query(insertoOrderline, orderlineValues);
      console.log("New Order Line is successfully added to Order Lines table");
    } catch (err) {
      console.error("New Order Line Data Addition to Order Line failed.", err);
    }
  }

  async updateItemStock(newStockValues) {
    const updateStock =
      "UPDATE `stock` SET `s_quantity` = ? AND `s_ytd` = ? AND `s_order_cnt` = ? And `s_remote_cnt` = ? WHERE `s_i_id` = ? AND `s_w_id` = ?";
    try {
      const [result] = await this.pool.query(updateStock, newStockValues);
      console.log("Stock for this item is updated");
      return result;
    } catch (err) {
      console.log("Stock for this time cannot be updated");
      console.error(err);
      return null;
    }
  }
  
  
}

module.exports = Db;
