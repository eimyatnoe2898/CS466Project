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
  PRIMARY KEY (s_i_id, s_w_id)
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
  PRIMARY KEY (o_id, o_d_id, o_w_id)
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
  INDEX (h_c_w_id, h_c_d_id, h_c_id)
);

CREATE TABLE new_order (
  no_o_id INT NOT NULL,
  no_d_id INT NOT NULL,
  no_w_id INT NOT NULL,
  PRIMARY KEY (no_d_id, no_w_id, no_o_id)
);