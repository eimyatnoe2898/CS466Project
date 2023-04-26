//import the sql, database

class District
{
    constructor(districtData)
    {
        this.d_id = districtData['d_id'];
        this.d_tax = districtData['d_tax'];
        this.d_next_o_id = districtData['d_next_o_id'];
    }

    static fromJSON(jsonObj){
        const menuItem = new District(jsonObject);
        return menuItem;
    }

    // set D_id(newD_id)
    // {
    //     this.d_id = newD_id;
    // }

    // set D_tax(newD_tax)
    // {
    //     this.d_tax = newD_tax;
    // }

    // set D_next_o_id(newD_next_o_id)
    // {
    //     this.d_next_o_id = newD_next_o_id;
    // }

    get D_id()
    {
        return this.d_id;
    }

    get D_tax()
    {
        return this.d_tax;
    }

    get D_next_o_id()
    {
        return this.d_next_o_id;
    }


}

module.exports = {District};