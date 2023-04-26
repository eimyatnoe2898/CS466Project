//import the sql, database

class Warehouse
{
    constructor(warehouseData)
    {
        this.w_id = warehouseData['w_id'];
        this.tax = warehouseData['w_tax'];
    }

    //use this method to send tax back to the homepage

    static fromJSON(jsonObj){
        const menuItem = new Warehouse(jsonObject);
        return menuItem;
    }

    get W_id()
    {
        return this.w_id;
    }

    get W_tax()
    {
        return this.w_tax;
    }

}

module.exports = {Warehouse};