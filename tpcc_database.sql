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

SELECT * FROM `customer`;
SELECT DISTINCT c_id FROM `customer`;

-- insert the customer data
INSERT INTO `customer`(c_id, c_d_id, c_w_id, c_first, c_middle, c_last, c_street_1, 
c_street_2, c_city, c_state, c_zip, c_phone, c_since) 
values
(1, 1, 2, "Tom", "LD", "Eroga", "E Street", "N Street", "Chicago", "IL", "123456789","0000000000000000", 
"2020-01-01 15:10:10"),
(2, 1, 2, "Riley", "LO", "Sanderson", "W Street", "E Street", "Chicago", "IL", "123456789", "0000000000000000", 
"2020-01-01 15:10:10");
INSERT INTO `customer`(c_id, c_d_id, c_w_id, c_first, c_middle, c_last, c_street_1, 
c_street_2, c_city, c_state, c_zip, c_phone, c_since) 
values
(3, 4, 4, "Mindy", "LL", "Rior", "W Street", "E Street", "Orlando", "FL", "123456789", "0000000000000000", 
"2020-01-01 15:10:10"),
(4, 4, 4, "Mindy", "LJ", "Rior", "W Street", "E Street", "Orlando", "FL", "123456789", "0000000000000000", 
"2020-01-01 15:10:10"),
(5, 3, 3, "Minne", "WN", "Ryder", "W Street", "E Street", "Boston", "MS", "123456789", "0000000000000000", 
"2020-01-01 15:10:10"),
(6, 2, 4, "Lady", "LK", "Sein", "W Street", "E Street", "Winona", "MN", "123456789", "0000000000000000", 
"2020-01-01 15:10:10");


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
INSERT INTO `stock`(s_i_id, s_w_id, s_quantity, s_dist_01, s_dist_02, s_dist_03, s_dist_04, s_dist_05,
 s_dist_06, s_dist_07, s_dist_08, s_dist_09, s_dist_10, s_ytd, s_order_cnt, s_remote_cnt, s_data)
VALUES
(1, 1, 100, 'District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9', 'District 10', 1000, 50, 10, 'Random data 1'),
(2, 1, 200, 'District A', 'District B', 'District C', 'District D', 'District E', 'District F', 'District G', 'District H', 'District I', 'District J', 2000, 100, 20, 'Random data 2'),
(3, 2, 300, 'District X', 'District Y', 'District Z', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9', 'District 10', 3000, 150, 30, 'Random data 3'),
(4, 2, 400, 'District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9', 'District 10', 4000, 200, 40, 'Random data 4'),
(5, 3, 500, 'District A', 'District B', 'District C', 'District D', 'District E', 'District F', 'District G', 'District H', 'District I', 'District J', 5000, 250, 50, 'Random data 5'),
(6, 3, 600, 'District X', 'District Y', 'District Z', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9', 'District 10', 6000, 300, 60, 'Random data 6'),
(7, 4, 700, 'District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9', 'District 10', 7000, 350, 70, 'Random data 7'),
(8, 4, 800, 'District A', 'District B', 'District C', 'District D', 'District E', 'District F', 'District G', 'District H', 'District I', 'District J', 8000, 400, 80, 'Random data 8'),
(9, 5, 900, 'District X', 'District Y', 'District Z', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9', 'District 10', 9000, 450, 90, 'Random data 9');


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
INSERT INTO `orders`(o_id, o_c_id, o_d_id, o_w_id, o_entry_d, o_carrier_id,
 o_ol_cnt, o_all_local) 
VALUES
(1001, 101, 1, 1, '2023-04-23 10:15:30', NULL, 3, 1),
(1002, 102, 2, 1, '2023-04-23 11:30:45', 1, 2, 0),
(1003, 103, 1, 2, '2023-04-22 09:45:00', NULL, 4, 1),
(1004, 104, 2, 2, '2023-04-21 14:20:10', 2, 5, 1),
(1005, 105, 3, 1, '2023-04-21 18:10:25', 3, 2, 0),
(1006, 106, 3, 2, '2023-04-20 17:30:40', NULL, 6, 1),
(1007, 107, 4, 1, '2023-04-19 12:50:55', 1, 3, 0),
(1008, 108, 4, 2, '2023-04-18 16:40:20', 2, 4, 1),
(1009, 109, 5, 1, '2023-04-17 20:30:35', NULL, 2, 0),
(1010, 110, 5, 2, '2023-04-16 08:15:50', 3, 5, 1);

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
INSERT INTO `order_line`(ol_o_id, ol_d_id, ol_w_id, ol_number, ol_i_id, ol_supply_w_id, 
ol_delivery_d, ol_quantity, ol_amount, ol_dist_info)
VALUES
(1001, 1, 1, 1, 2001, 1, '2023-04-24 09:00:00', 2, 20.00, 'District 1'),
(1001, 1, 1, 2, 2002, 2, '2023-04-24 09:05:00', 1, 10.00, 'District 2'),
(1001, 1, 1, 3, 2003, 3, '2023-04-24 09:10:00', 3, 30.00, 'District 3'),
(1002, 2, 1, 1, 2004, 4, '2023-04-24 09:15:00', 4, 40.00, 'District 4'),
(1002, 2, 1, 2, 2005, 5, '2023-04-24 09:20:00', 2, 20.00, 'District 5'),
(1002, 2, 1, 3, 2006, 1, '2023-04-24 09:25:00', 1, 10.00, 'District 1'),
(1003, 1, 2, 1, 2007, 2, '2023-04-24 09:30:00', 3, 30.00, 'District 2'),
(1003, 1, 2, 2, 2008, 3, '2023-04-24 09:35:00', 2, 20.00, 'District 3'),
(1003, 1, 2, 3, 2009, 4, '2023-04-24 09:40:00', 1, 10.00, 'District 4'),
(1004, 2, 2, 1, 2010, 5, '2023-04-24 09:45:00', 4, 40.00, 'District 5');


CREATE TABLE item (
  i_id INT NOT NULL,
  i_im_id INT,
  i_name VARCHAR(24) NOT NULL,
  i_price FLOAT NOT NULL,
  i_data VARCHAR(50) NOT NULL,
  PRIMARY KEY (i_id)
);
INSERT INTO `item`(i_id, i_im_id, i_name, i_price, i_data)
VALUES
(1001, 1, 1, 1, 2001, 1, '2023-04-24 09:00:00', 2, 20.00, 'District 1'),
(1001, 1, 1, 2, 2002, 2, '2023-04-24 09:05:00', 1, 10.00, 'District 2'),
(1001, 1, 1, 3, 2003, 3, '2023-04-24 09:10:00', 3, 30.00, 'District 3'),
(1002, 2, 1, 1, 2004, 4, '2023-04-24 09:15:00', 4, 40.00, 'District 4'),
(1002, 2, 1, 2, 2005, 5, '2023-04-24 09:20:00', 2, 20.00, 'District 5'),
(1002, 2, 1, 3, 2006, 1, '2023-04-24 09:25:00', 1, 10.00, 'District 1'),
(1003, 1, 2, 1, 2007, 2, '2023-04-24 09:30:00', 3, 30.00, 'District 2'),
(1003, 1, 2, 2, 2008, 3, '2023-04-24 09:35:00', 2, 20.00, 'District 3'),
(1003, 1, 2, 3, 2009, 4, '2023-04-24 09:40:00', 1, 10.00, 'District 4'),
(1004, 2, 2, 1, 2010, 5, '2023-04-24 09:45:00', 4, 40.00, 'District 5');

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
INSERT INTO `history`(h_c_id, h_c_d_id, h_c_w_id, h_d_id, h_w_id, 
h_date, h_amount, h_data)
VALUES
(42, 1, 1, 1, 1, '2023-04-23 13:20:00', 150.99, 'Some data'),
(231, 3, 2, 3, 2, '2023-04-22 10:15:00', 75.50, 'More data'),
(19, 2, 1, 2, 1, '2023-04-21 18:30:00', 200.25, 'Random text'),
(54, 4, 3, 4, 3, '2023-04-20 08:45:00', 50.75, 'Data point'),
(167, 1, 2, 1, 2, '2023-04-19 12:00:00', 100.00, 'Some more data'),
(322, 2, 3, 2, 3, '2023-04-18 15:20:00', 80.25, 'Additional data'),
(77, 3, 1, 3, 1, '2023-04-17 09:10:00', 300.50, 'Extra information'),
(431, 4, 2, 4, 2, '2023-04-16 20:00:00', 125.75, 'More text'),
(221, 1, 3, 1, 3, '2023-04-15 14:45:00', 175.25, 'Different data'),
(91, 2, 1, 2, 1, '2023-04-14 11:30:00', 90.00, 'New data entry');

CREATE TABLE new_order (
  no_o_id INT NOT NULL,
  no_d_id INT NOT NULL,
  no_w_id INT NOT NULL,
  PRIMARY KEY (no_d_id, no_w_id, no_o_id),
  CONSTRAINT fk_new_order_orders FOREIGN KEY (no_o_id, no_d_id, no_w_id) REFERENCES orders (o_id, o_d_id, o_w_id)

);
INSERT INTO `new_order`(no_o_id, no_d_id, no_w_id)
VALUES
(1, 2, 3),
(2, 3, 1),
(3, 1, 2),
(4, 2, 1),
(5, 3, 2),
(6, 1, 3),
(7, 2, 3),
(8, 3, 1),
(9, 1, 2),
(10, 2, 1);