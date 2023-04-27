#generate dummy data and add it to sql
from faker import Faker
import mysql.connector
import random


class generateData: 
    

    def __init__(self):
        self.fake = Faker()  #create faker object for generating fake data
        self.mydb = mysql.connector.connect(   #connect to MySQL database
            host="",
            user="",
            password="",
            database=""
        )
        self.cursor = self.mydb.cursor()

    #insert dummy data into warehouse table
    def insert_warehouse(self):
        for i in range(10):
            w_id = i+1
            w_name = self.fake.word()
            w_street_1 = self.fake.street_name()
            w_street_2 = self.fake.building_number()
            w_city = self.fake.city()
            w_state = self.fake.state_abbr()
            w_zip = self.fake.zipcode()
            w_tax = self.fake.pyfloat(left_digits=2, right_digits=2, positive=True)
            w_ytd = self.fake.pyfloat(left_digits=5, right_digits=2, positive=True)
            #SQL statement for inserting the data
            sql = "INSERT INTO warehouse (w_id, w_name, w_street_1, w_street_2, w_city, w_state, w_zip, w_tax, w_ytd) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (w_id, w_name, w_street_1, w_street_2, w_city, w_state, w_zip, w_tax, w_ytd)
            self.cursor.execute(sql, val)
        self.mydb.commit()

    #insert dummy data into district table     
    def insert_district(self):
        for i in range (10):
            for j in range(100):
                d_id = j+1
                d_w_id = i+1
                d_name = self.fake.word()
                d_street_1 = self.fake.street_name()
                d_street_2 = self.fake.building_number()
                d_city = self.fake.city()
                d_state = self.fake.state_abbr()
                d_zip = self.fake.zipcode()
                d_tax = self.fake.pyfloat(left_digits=2, right_digits=2, positive=True)
                d_ytd = self.fake.pyfloat(left_digits=5, right_digits=2, positive=True)
                d_next_o_id = self.fake.random_int(min=3001, max=4000)

                sql = "INSERT INTO district (d_id, d_w_id, d_name, d_street_1, d_street_2, d_city, d_state, d_zip, d_tax, d_ytd, d_next_o_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                val = (d_id, d_w_id, d_name, d_street_1, d_street_2, d_city, d_state, d_zip, d_tax, d_ytd, d_next_o_id)
                self.cursor.execute(sql, val)
        self.mydb.commit()

    #insert dummy data into customer table
    def insert_customer(self):
        for i in range(10):
            for k in range(3000):
                c_id = k + 1
                c_d_id = i + 1
                c_w_id = self.fake.random_int(min=1, max=5)
                c_first = self.fake.first_name()
                c_middle = self.fake.random_letter().upper()
                c_last = self.fake.last_name()
                c_street_1 = self.fake.street_address()
                c_street_2 = self.fake.secondary_address()
                c_city = self.fake.city()
                c_state = self.fake.state_abbr()
                c_zip = self.fake.zipcode()
                c_phone = self.fake.phone_number()
                c_since = self.fake.date_time_between(start_date='-5y', end_date='now')
                c_credit = self.fake.random_element(elements=('GC', 'BC'))
                c_credit_lim = self.fake.pyfloat(left_digits=4, right_digits=2, positive=True)
                c_discount = self.fake.pyfloat(left_digits=1, right_digits=2, positive=True)
                c_balance = self.fake.pyfloat(left_digits=4, right_digits=2, positive=True)
                c_ytd_payment = self.fake.pyfloat(left_digits=3, right_digits=2, positive=True)
                c_payment_cnt = self.fake.random_int(min=0, max=100)
                c_delivery_cnt = self.fake.random_int(min=0, max=100)
                c_data = self.fake.text(max_nb_chars=500)

                sql = "INSERT INTO customer (c_id, c_d_id, c_w_id, c_first, c_middle, c_last, c_street_1, c_street_2, c_city, c_state, c_zip, c_phone, c_since, c_credit, c_credit_lim, c_discount, c_balance, c_ytd_payment, c_payment_cnt, c_delivery_cnt, c_data) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) "
                val = (c_id, c_d_id, c_w_id, c_first, c_middle, c_last, c_street_1, c_street_2, c_city, c_state, c_zip, c_phone, c_since, c_credit, c_credit_lim, c_discount, c_balance, c_ytd_payment, c_payment_cnt, c_delivery_cnt, c_data)
                self.cursor.execute(sql, val)
        self.mydb.commit()

    #insert dummy data into item table
    def insert_item(self, n):
        for i in range(n):
            i_id = i+1
            i_im_id = self.fake.random_int(min=1, max=10000)
            i_name = self.fake.word()
            i_price = round(self.fake.pyfloat(min_value=1, max_value=1000, right_digits=2), 2)
            i_data = self.fake.text(max_nb_chars=50)

            sql = "INSERT INTO item (i_id, i_im_id, i_name, i_price, i_data) VALUES (%s, %s, %s, %s, %s)"
            val = (i_id, i_im_id, i_name, i_price, i_data)
            self.cursor.execute(sql, val)
        self.mydb.commit()

    #insert dummy data into stock table
    def insert_stock(self, n):
        for i in range(n):
            s_i_id = i+1
            s_w_id = self.fake.random_int(min=1, max=10)
            s_quantity = self.fake.random_int(min=10, max=100)
            s_dist_01 = self.fake.text(max_nb_chars=24)
            s_dist_02 = self.fake.text(max_nb_chars=24)
            s_dist_03 = self.fake.text(max_nb_chars=24)
            s_dist_04 = self.fake.text(max_nb_chars=24)
            s_dist_05 = self.fake.text(max_nb_chars=24)
            s_dist_06 = self.fake.text(max_nb_chars=24)
            s_dist_07 = self.fake.text(max_nb_chars=24)
            s_dist_08 = self.fake.text(max_nb_chars=24)
            s_dist_09 = self.fake.text(max_nb_chars=24)
            s_dist_10 = self.fake.text(max_nb_chars=24)
            s_ytd = self.fake.random_int(min=1000, max=10000)
            s_order_cnt = self.fake.random_int(min=10, max=100)
            s_remote_cnt = self.fake.random_int(min=1, max=10)
            s_data = self.fake.text(max_nb_chars=50)

            sql = "INSERT INTO stock (s_i_id, s_w_id, s_quantity, s_dist_01, s_dist_02, s_dist_03, s_dist_04, s_dist_05, s_dist_06, s_dist_07, s_dist_08, s_dist_09, s_dist_10, s_ytd, s_order_cnt, s_remote_cnt, s_data) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (s_i_id, s_w_id, s_quantity, s_dist_01, s_dist_02, s_dist_03, s_dist_04, s_dist_05, s_dist_06, s_dist_07, s_dist_08, s_dist_09, s_dist_10, s_ytd, s_order_cnt, s_remote_cnt, s_data)
            self.cursor.execute(sql, val)
        self.mydb.commit()

    #insert dummy data into order table
    def insert_order(self, n):
        for i in range(n):
            o_id = i + 1
            o_c_id = self.faker.random_int(min=1, max=3000)
            o_d_id = self.faker.random_int(min=1, max=10)
            o_w_id = self.faker.random_int(min=1, max=5)
            o_entry_d = self.faker.date_time_between(start_date='-1y', end_date='now')
            o_carrier_id = self.faker.random_int(min=1, max=10)
            o_ol_cnt = self.faker.random_int(min=5, max=15)
            o_all_local = 1 if o_w_id == o_d_id else 0

            sql = "INSERT INTO orders (o_id, o_c_id, o_d_id, o_w_id, o_entry_d, o_carrier_id, o_ol_cnt, o_all_local) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            val = (o_id, o_c_id, o_d_id, o_w_id, o_entry_d, o_carrier_id, o_ol_cnt, o_all_local)
            self.cursor.execute(sql, val)

        self.mydb.commit()

    #insert dummy data into order_line table
    def insert_order_line(self, n):
        for i in range(n):
            ol_o_id = self.faker.random_int(min=1, max=n)
            ol_d_id = self.faker.random_int(min=1, max=10)
            ol_w_id = self.faker.random_int(min=1, max=5)
            ol_number = i + 1
            ol_i_id = self.faker.random_int(min=1, max=100000)
            ol_supply_w_id = self.faker.random_int(min=1, max=5)
            ol_delivery_d = self.faker.date_time_between(start_date='-1y', end_date='now')
            ol_quantity = self.faker.random_int(min=1, max=10)
            ol_amount = round(self.faker.pyfloat(min_value=0, max_value=100, right_digits=2), 2)
            ol_dist_info = self.faker.text(max_nb_chars=24)

            sql = "INSERT INTO order_line (ol_o_id, ol_d_id, ol_w_id, ol_number, ol_i_id, ol_supply_w_id, ol_delivery_d, ol_quantity, ol_amount, ol_dist_info) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (ol_o_id, ol_d_id, ol_w_id, ol_number, ol_i_id, ol_supply_w_id, ol_delivery_d, ol_quantity, ol_amount, ol_dist_info)
            self.cursor.execute(sql, val)

        self.mydb.commit()

    #insert dummy data into history table
    def insert_history(self, n):
        for i in range(n):
            h_c_id = random.randint(1, 1000)
            h_c_d_id = random.randint(1, 10)
            h_c_w_id = random.randint(1, 10)
            h_d_id = random.randint(1, 10)
            h_w_id = random.randint(1, 10)
            h_date = self.fake.date_time_between(start_date='-5y', end_date='now')
            h_amount = round(random.uniform(1, 1000), 2)
            h_data = self.fake.text(24)

            sql = "INSERT INTO history (h_c_id, h_c_d_id, h_c_w_id, h_d_id, h_w_id, h_date, h_amount, h_data) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            val = (h_c_id, h_c_d_id, h_c_w_id, h_d_id, h_w_id, h_date, h_amount, h_data)
            self.cursor.execute(sql, val)
        
        self.mydb.commit()

    #insert dummy data into new_order table
    def insert_new_order(self, n):
        for i in range(n):
            no_o_id = random.randint(1, 100000)
            no_d_id = random.randint(1, 10)
            no_w_id = random.randint(1, 10)

            sql = "INSERT INTO new_order (no_o_id, no_d_id, no_w_id) VALUES (%s, %s, %s)"
            val = (no_o_id, no_d_id, no_w_id)
            self.cursor.execute(sql, val)
        
        self.mydb.commit()
        
        # to insert data use methods
        #example "insert_warehouse(10)" to insert 10 rows of dummy data into the warehouse"