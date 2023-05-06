//import the sql, database

class Stock
{
    constructor(stockData, stockDist)
    {
        this.s_quantity = stockData['s_quantity'];
        this.stockDist = stockData[stockDist];
        this.s_data = stockData['s_data'];
        this.s_ytd = stockData['s_ytd'];
        this.s_order_cnt = stockData['s_order_cnt'];
        this.s_remote_cnt = stockData['s_remote_cnt'];
        this.s_i_id = stockData["s_i_id"];
        this.s_w_id = stockData["s_w_id"];
    }

    // static fromJSON(jsonObj){
    //     const menustock = new Warehouse(jsonObject);
    //     return menustock;
    // }

}

module.exports = {Stock};