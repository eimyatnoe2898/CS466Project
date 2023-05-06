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
        this.used = null;
    }

    /**
     * @param {any} stockObject
     */
    // set i_stock(stockObject)
    // {
    //     this.i_stock = stockObject;
    // }


}

module.exports = {Item};