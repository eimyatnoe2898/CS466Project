//import the sql, database

class NewOrder
{
    constructor(itemData)
    {
        this.no_o_id = itemData['no_o_id'];
        this.no_w_id = itemData['no_w_id'];
        this.no_d_id = itemData['no_d_id'];
    }

    static fromJSON(jsonObj){
        const menuItem = new Warehouse(jsonObject);
        return menuItem;
    }

    get no_o_id()
    {
        return this.no_o_id;
    }

    get no_w_id()
    {
        return this.no_w_id;
    }

    get no_d_id()
    {
        return this.no_d_id;
    }



}

module.exports = {NewOrder};