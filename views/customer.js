//import the sql, database

class Customer
{
    constructor(customerData)
    {
        this.c_id = customerData['c_id'];
        this.c_d_id = customerData['c_d_id'];
        this.c_w_id = customerData['c_w_id'];
        this.c_discount = customerData['c_discount'];
        this.c_last = customerData['c_last'];
        this.c_credit = customerData['c_credit'];
    }

    //use this method to send tax back to the homepage

    // static fromJSON(jsonObj){
    //     const menuItem = new Warehouse(jsonObject);
    //     return menuItem;
    // }

    // get W_id()
    // {
    //     return this.w_id;
    // }

    // get W_tax()
    // {
    //     return this.w_tax;
    // }

}

module.exports = {Customer};