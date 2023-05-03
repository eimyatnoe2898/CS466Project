//import the sql, database

class Order
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

    constructor(orderData)
    {
        this.ol_o_id = orderData[0];
        this.o_d_id = orderData[2];
        this.o_w_id = orderData[3];
        this.o_entry_d = orderData[4];
        this.o_carrier_id = orderData[5];
        this.o_ol_cnt = orderData[6];
        this.o_all_local = orderData[7];


    }
    static fromJSON(jsonObj){
        const menuItem = new Warehouse(jsonObject);
        return menuItem;
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

module.exports = {Order};