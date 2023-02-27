//import the sql, database

class Customer
{
    constructor(c_id, orders)
    {
        this.c_id = c_id;
        this.orders = orders;
    }

    submitOrders()
    {
        //make sql querys and 

    }

    //use this method to send orders back to the homepage
    checkOrders()
    {
        result = "";
        for (let eachOrder in orders)
        {
            //
            result += eachOrder["quantity"];
            result += "<br>";
        }

        return result;
    }
}