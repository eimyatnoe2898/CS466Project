//import the sql, database

class OrderLine
{
    // constructor(orderData)
    // {
    //     this.o_id = orderData['o_id'];
    //     this.o_c_id = orderData['o_c_id'];
    //     this.o_d_id = orderData['o_d_id'];
    //     this.o_w_id = orderData['o_w_id'];
    //     this.o_entry_d = orderData['o_entry_d'];
    //     this.o_carrier_id = orderData['o_carrier_id'];
    //     this.o_ol_cnt = orderData['o_ol_cnt'];
    //     this.o_all_local = orderData['o_all_local'];

    // }

    constructor(orderLineData, ol_item_data)
    {
        this.ol_o_id = orderLineData[0];
        this.ol_d_id = orderLineData[1];
        this.ol_w_id = orderLineData[2];
        this.ol_number = orderLineData[3];
        this.ol_i_id = orderLineData[4];
        this.ol_supply_w_id = orderLineData[5];
        this.ol_delivery_d = orderLineData[6];
        this.ol_quantity = orderLineData[7];
        this.ol_amount = orderLineData[8];
        this.ol_dist_info = orderLineData[9];
        this.ol_item_data = ol_item_data;

    }
    
    // get o_id()
    // {
    //     return this.o_id;
    // }

    // get o_d_id()
    // {
    //     return this.o_d_id;
    // }

    // get o_c_id()
    // {
    //     return this.o_c_id;
    // }

    // get o_w_id()
    // {
    //     return this.o_w_id;
    // }

    // get o_entry_d()
    // {
    //     return this.o_entry_d;
    // }

    // get o_carrier_id()
    // {
    //     return this.o_carrier_id;
    // }

    // get o_ol_cnt()
    // {
    //     return this.o_ol_cnt;
    // }

    // get o_all_local()
    // {
    //     return this.o_all_local;
    // }

}

module.exports = {OrderLine};