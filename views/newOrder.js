//import the sql, database

class NewOrder
{
    constructor(orderData)
    {
        this.no_o_id = orderData[0];
        this.no_w_id = orderData[2];
        this.no_d_id = orderData[1];
    }

    static fromJSON(jsonObj){
        const menuItem = new Warehouse(jsonObject);
        return menuItem;
    }

    // get no_o_id()
    // {
    //     return this.no_o_id;
    // }

    // get no_w_id()
    // {
    //     return this.no_w_id;
    // }

    // get no_d_id()
    // {
    //     return this.no_d_id;
    // }



}

module.exports = {NewOrder};