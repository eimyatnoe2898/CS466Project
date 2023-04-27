//import the sql, database

class Item
{
    constructor(itemData)
    {
        this.i_id = itemData['i_id'];
        this.i_im_id = itemData['i_im_id'];
        this.i_name = itemData['i_name'];
        this.i_price = itemData['i_price'];
        this.i_data = itemData['i_data'];
        this.i_stock = null;
    }

    static fromJSON(jsonObj){
        const menuItem = new Warehouse(jsonObject);
        return menuItem;
    }

    get i_id()
    {
        return this.i_id;
    }

    get i_name()
    {
        return this.i_name;
    }

    get i_im_id()
    {
        return this.i_im_id;
    }

    get i_price()
    {
        return this.i_price;
    }

    get i_data()
    {
        return this.i_data;
    }

    set i_stock(newIstock)
    {
        this.i_stock = newIstock;
    }


}

module.exports = {Item};