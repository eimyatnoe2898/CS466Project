#generate dummy data and add it to sql
from faker import Faker
import mysql.connector
import random
import datetime;

class generateData: 
    
    def __init__(self):
        self.fake = Faker()  #create faker object for generating fake data
        self.mydb = mysql.connector.connect(   #connect to MySQL database
            # host="et8132so211",
            # user="user",
            # password="Tiger3210!",
            # database="TPCC_data"
            host="localhost",
            user="root",
            password="Sql783knui1-1l;/klaa-9",
            database="tpcc_database"
        )
        self.cursor = self.mydb.cursor()

    #2 warehouses - 1 remote 1 local
    #insert dummy data into warehouse table
    def insert_warehouse(self):
        for i in range(2):
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

    #10 districts for each warehouse - 20 districts
    #insert dummy data into district table     
    def insert_district(self):
        for i in range (2):
            for j in range(10):
                d_id = j+1
                d_w_id = i+1
                while True:
                    d_name = self.fake.word()
                    if len(d_name) <= 10:
                        print(d_name)
                        break
                while True:
                    d_street_1 = self.fake.street_name()
                    if len(d_street_1) <= 20:
                        print(d_street_1)
                        break
                while True:
                    d_street_2 = self.fake.building_number()
                    if len(d_street_2) <= 20:
                        print(d_street_2)
                        break
                while True:
                    d_city = self.fake.city()
                    if len(d_city) <= 20:
                        print(d_city)
                        break
                d_state = self.fake.state_abbr()
                d_zip = self.fake.zipcode()
                d_tax = self.fake.pyfloat(left_digits=2, right_digits=2, positive=True)
                d_ytd = self.fake.pyfloat(left_digits=5, right_digits=2, positive=True)
                d_next_o_id = self.fake.random_int(min=3001, max=4000)

                sql = "INSERT INTO district (d_id, d_w_id, d_name, d_street_1, d_street_2, d_city, d_state, d_zip, d_tax, d_ytd, d_next_o_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                val = (d_id, d_w_id, d_name, d_street_1, d_street_2, d_city, d_state, d_zip, d_tax, d_ytd, d_next_o_id)
                self.cursor.execute(sql, val)
        self.mydb.commit()

    #3000 customers for each district - 20*1000 = 60000 customers
    #insert dummy data into customer table
    def insert_customer(self, n):
        #for each district in the district
        sql = "SELECT * FROM `district`"
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        for row in result:
            print("Warehouse Id: " , row[1] )
            print("District Id: " , row[0] )
            print("----")
            for k in range(n):
                c_id = k + 1
                c_d_id = row[0]
                # c_w_id = self.fake.random_int(min=1, max=5)
                c_w_id = row[1]
                while True:
                    c_first = self.fake.first_name()
                    if len(c_first) <= 20:
                        print(c_first)
                        break
                c_middle = self.fake.random_letter().upper()
                print(c_middle)
                while True:
                    c_last = self.fake.last_name()
                    if len(c_last) <= 20:
                        print(c_last)
                        break
                while True:
                    c_street_1 = self.fake.street_address()
                    if len(c_street_1) <= 20:
                        print(c_street_1)
                        break
                while True:
                    c_street_2 = self.fake.secondary_address()
                    if len(c_street_2) <= 20:
                        print(c_street_2)
                        break
                while True:
                    c_city = self.fake.city()
                    if len(c_city) <= 20:
                        print(c_city)
                        break
                while True:
                    c_state = self.fake.state_abbr()
                    if len(c_state) == 2:
                        print(c_state)
                        break
                c_zip = self.fake.zipcode()
                while True:
                    c_phone = self.fake.phone_number()
                    if len(c_phone) == 16:
                        print(c_phone)
                        break
                # c_since = self.fake.date_time_between(start_date='-5y', end_date='now')
                # c_since = self.fake.date_time_between(start_date='-5y', end_date='now').strftime('%Y-%m-%d %H:%M:%S')
                # print(c_since)
                c_since = "2020-01-01 15:10:10";
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

    #insert dummy data into item table - 100000 items
    def insert_item(self, n):
        for i in range(n):
            i_id = i+1
            i_im_id = self.fake.random_int(min=1, max=10000)
            while True:
                i_name = self.fake.word()
                if len(i_name) <= 24:
                    print(i_name)
                    break            
            i_price = round(self.fake.pyfloat(min_value=1, max_value=1000, right_digits=2), 2)
            i_data = self.fake.text(max_nb_chars=50)
            sql = "INSERT INTO item (i_id, i_im_id, i_name, i_price, i_data) VALUES (%s, %s, %s, %s, %s)"
            val = (i_id, i_im_id, i_name, i_price, i_data)
            self.cursor.execute(sql, val)
        self.mydb.commit()

    #insert dummy data into stock table
    def insert_stock(self):
        #for each item
        sql = "SELECT COUNT(DISTINCT i_id) FROM item"
        self.cursor.execute(sql)
        itemCount = self.cursor.fetchone()[0]
        print("Total Number of Items: " , itemCount)

        #for each warehouse
        sql = "SELECT * FROM `warehouse`"
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        for row in result:
            s_w_id = row[0]
            for i in range(itemCount):
                s_i_id = i+1
                s_quantity = self.fake.random_int(min=1, max=100)
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


dataGenerator = generateData()
# dataGenerator.insert_warehouse() #DONE
# dataGenerator.insert_district() #DONE
# dataGenerator.insert_customer(3000)
# dataGenerator.insert_item(100000)
dataGenerator.insert_stock()

