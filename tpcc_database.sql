DROP Database if exists tpcc_database;
CREATE database tpcc_database;
USE tpcc_database;
-- Create the warehouse table

CREATE TABLE warehouse (
  w_id INT NOT NULL PRIMARY KEY,
  w_name VARCHAR(10) NOT NULL,
  w_street_1 VARCHAR(20) NOT NULL,
  w_street_2 VARCHAR(20),
  w_city VARCHAR(20) NOT NULL,
  w_state CHAR(2) NOT NULL,
  w_zip CHAR(9) NOT NULL,
  w_tax FLOAT NOT NULL,
  w_ytd FLOAT NOT NULL
);

-- insert the warehouse data
INSERT INTO `warehouse`(w_id, w_name, w_street_1, w_street_2, w_city, w_state, w_zip, w_tax, w_ytd) 
values
(1, "WH1", "Glen Street", "Haven Street", "Chicago", "IL", "123456789", 1.2, 3.0),
(2, "WH2", "Halten Street", "Main Street", "Winona", "MN", "123456789", 2.5, 4.5),
(3, "WH3", "Lilac Street", "Meteo Street", "Boston", "MS", "123456789", 2.5, 2.0),
(4, "WH4", "Minne Street", "Lander Street", "Orlando", "FL", "123456789", 3.5, 6.0);

SELECT DISTINCT `w_id` FROM `warehouse` group by `w_id`;
-- SELECT DISTINCT w_id FROM `warehouse`;


-- Create the district table
CREATE TABLE district (
  d_id INT NOT NULL,
  d_w_id INT NOT NULL,
  d_name VARCHAR(10) NOT NULL,
  d_street_1 VARCHAR(20) NOT NULL,
  d_street_2 VARCHAR(20),
  d_city VARCHAR(20) NOT NULL,
  d_state CHAR(2) NOT NULL,
  d_zip CHAR(9) NOT NULL,
  d_tax FLOAT NOT NULL,
  d_ytd FLOAT NOT NULL,
  d_next_o_id INT NOT NULL,
  PRIMARY KEY (d_id, d_w_id),
  CONSTRAINT fk_district_warehouse FOREIGN KEY (d_w_id) REFERENCES warehouse (w_id)
);

DELETE FROM `district`;
-- insert the district data
INSERT INTO `district`(d_id, d_w_id, d_name, d_street_1, d_street_2, d_city, d_state, d_zip, d_tax, d_ytd, d_next_o_id) 
values
(1, 2, "DT1", "Glen Street", "Haven Street", "Chicago", "IL", "123456789", 1.2, 3.0, 2),
(2, 4, "DT2", "Halten Street", "Main Street", "Winona", "MN", "123456789", 2.5, 4.5, 3),
(3, 3, "DT3", "Lilac Street", "Meteo Street", "Boston", "MS", "123456789", 2.5, 2.0, 5),
(4, 4, "DT4", "Minne Street", "Lander Street", "Orlando", "FL", "123456789", 3.5, 6.0, 1);

SELECT * FROM `district`;
SELECT DISTINCT d_id FROM `district`;

-- Create the customer table
CREATE TABLE customer (
  c_id INT NOT NULL,
  c_d_id INT NOT NULL,
  c_w_id INT NOT NULL,
  c_first VARCHAR(20) NOT NULL,
  c_middle CHAR(2),
  c_last VARCHAR(20) NOT NULL,
  c_street_1 VARCHAR(20) NOT NULL,
  c_street_2 VARCHAR(20),
  c_city VARCHAR(20) NOT NULL,
  c_state CHAR(2) NOT NULL,
  c_zip CHAR(9) NOT NULL,
  c_phone CHAR(16) NOT NULL,
  c_since TIMESTAMP NOT NULL,
  c_credit CHAR(2),
  c_credit_lim FLOAT,
  c_discount FLOAT,
  c_balance FLOAT,
  c_ytd_payment FLOAT,
  c_payment_cnt INT,
  c_delivery_cnt INT,
  c_data VARCHAR(500),
  PRIMARY KEY (c_id, c_d_id, c_w_id),
  CONSTRAINT fk_customer_district FOREIGN KEY (c_d_id, c_w_id) REFERENCES district (d_id, d_w_id)
);

-- insert the customer data
INSERT INTO `customer`(c_id, c_d_id, c_w_id, c_first, c_middle, c_last, c_street_1, 
c_street_2, c_city, c_state, c_zip, c_phone, c_since) 
values
(1, 1, 2, "Tom", "LD", "Eroga", "E Street", "N Street", "Chicago", "IL", "123456789","0000000000000000", 
"2020-01-01 15:10:10"),
(2, 1, 2, "Riley", "LO", "Sanderson", "W Street", "E Street", "Chicago", "IL", "123456789", "0000000000000000", 
"2020-01-01 15:10:10");

(3, 4, 4, "Mindy", "Lilac", "Rior", "W Street", "E Street", "Orlando", "FL", "123456789", "0000000000000000", 
"2020-01-01 15:10:10", "NA", 1500.00, 20.0, 245.67, 120.00, 5, "NULL"),
(4, 4, 4, "Mindy", "Lilac", "Rior", "W Street", "E Street", "Orlando", "FL", "123456789", "0000000000000000", 
"2020-01-01 15:10:10", "NA", 1500.00, 20.0, 245.67, 120.00, 5, "NULL"),
(5, 3, 3, "Minne", "Winona", "Ryder", "W Street", "E Street", "Boston", "MS", "123456789", "0000000000000000", 
"2020-01-01 15:10:10", "NA", 1500.00, 20.0, 245.67, 120.00, 5, "NULL"),
(6, 2, 4, "Lady", "Like", "Sein", "W Street", "E Street", "Winona", "MN", "123456789", "0000000000000000", 
"2020-01-01 15:10:10", "NA", 1500.00, 20.0, 245.67, 120.00, 5, "NULL");


-- Create the stock table
CREATE TABLE stock (
  s_i_id INT NOT NULL,
  s_w_id INT NOT NULL,
  s_quantity INT NOT NULL,
  s_dist_01 CHAR(24) NOT NULL,
  s_dist_02 CHAR(24) NOT NULL,
  s_dist_03 CHAR(24) NOT NULL,
  s_dist_04 CHAR(24) NOT NULL,
  s_dist_05 CHAR(24) NOT NULL,
  s_dist_06 CHAR(24) NOT NULL,
  s_dist_07 CHAR(24) NOT NULL,
  s_dist_08 CHAR(24) NOT NULL,
  s_dist_09 CHAR(24) NOT NULL,
  s_dist_10 CHAR(24) NOT NULL,
  s_ytd INT NOT NULL,
  s_order_cnt INT NOT NULL,
  s_remote_cnt INT NOT NULL,
  s_data VARCHAR(50),
  PRIMARY KEY (s_i_id, s_w_id),
  CONSTRAINT fk_stock_item FOREIGN KEY (s_i_id) REFERENCES item (i_id),
  CONSTRAINT fk_stock_warehouse FOREIGN KEY (s_w_id) REFERENCES warehouse (w_id)

);

-- Create the orders table
CREATE TABLE orders (
  o_id INT NOT NULL,
  o_c_id INT NOT NULL,
  o_d_id INT NOT NULL,
  o_w_id INT NOT NULL,
  o_entry_d TIMESTAMP NOT NULL,
  o_carrier_id INT,
  o_ol_cnt INT NOT NULL,
  o_all_local INT NOT NULL,
  PRIMARY KEY (o_id, o_d_id, o_w_id),
  CONSTRAINT fk_orders_customer FOREIGN KEY (o_c_id, o_d_id, o_w_id) REFERENCES customer (c_id, c_d_id, c_w_id)

);


CREATE TABLE order_line (
  ol_o_id INT NOT NULL,
  ol_d_id INT NOT NULL,
  ol_w_id INT NOT NULL,
  ol_number INT NOT NULL,
  ol_i_id INT NOT NULL,
  ol_supply_w_id INT NOT NULL,
  ol_delivery_d TIMESTAMP,
  ol_quantity INT NOT NULL,
  ol_amount FLOAT NOT NULL,
  ol_dist_info CHAR(24) NOT NULL,
  PRIMARY KEY (ol_o_id, ol_d_id, ol_w_id, ol_number),
  CONSTRAINT fk_order_line_order FOREIGN KEY (ol_o_id, ol_d_id, ol_w_id) REFERENCES orders (o_id, o_d_id, o_w_id),
  CONSTRAINT fk_order_line_stock FOREIGN KEY (ol_i_id, ol_supply_w_id) REFERENCES stock (s_i_id, s_w_id),
  INDEX (ol_supply_w_id)
);

CREATE TABLE item (
  i_id INT NOT NULL,
  i_im_id INT,
  i_name VARCHAR(24) NOT NULL,
  i_price FLOAT NOT NULL,
  i_data VARCHAR(50) NOT NULL,
  PRIMARY KEY (i_id)
);

CREATE TABLE history (
  h_c_id INT NOT NULL,
  h_c_d_id INT NOT NULL,
  h_c_w_id INT NOT NULL,
  h_d_id INT NOT NULL,
  h_w_id INT NOT NULL,
  h_date TIMESTAMP NOT NULL,
  h_amount FLOAT NOT NULL,
  h_data VARCHAR(24),
  INDEX (h_c_w_id, h_c_d_id, h_c_id),
  CONSTRAINT fk_history_customer FOREIGN KEY (h_c_id, h_c_d_id, h_c_w_id) REFERENCES customer (c_id, c_d_id, c_w_id),
  CONSTRAINT fk_history_district FOREIGN KEY (h_d_id, h_w_id) REFERENCES district (d_id, d_w_id)

);

CREATE TABLE new_order (
  no_o_id INT NOT NULL,
  no_d_id INT NOT NULL,
  no_w_id INT NOT NULL,
  PRIMARY KEY (no_d_id, no_w_id, no_o_id),
  CONSTRAINT fk_new_order_orders FOREIGN KEY (no_o_id, no_d_id, no_w_id) REFERENCES orders (o_id, o_d_id, o_w_id)

);