//database connection class

const express = require('express');
const mysql = require('mysql2');

//provide database credentials
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Sql783knui1-1l;/klaa-9',
        database: 'tpcc_database'
    }
);

//connect to datbase
db.connect((err) => {
    if(err){
        console.log('Error connecting to db');
    }else{
    console.log('Mysql Connected');
    }
});


//maybe we can make the general database functions here
module.exports = db;