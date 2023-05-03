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

    static fromJSON(jsonObj){
        const menuItem = new Warehouse(jsonObject);
        return menuItem;
    }

    get c_id()
    {
        return this.c_id;
    }

    get c_w_id()
    {
        return this.c_w_id;
    }

    get c_d_id()
    {
        return this.c_d_id;
    }

    get c_discount()
    {
        return this.c_discount;
    }

    get c_last()
    {
        return this.c_last;
    }

    get c_credit()
    {
        return this.c_last;
    }
    


}

module.exports = {Customer};