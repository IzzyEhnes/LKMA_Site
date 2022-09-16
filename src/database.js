//Approach 1: using mysql2

/*const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "CicadaCode@7",
  connectionLimit: 10
});

exports.getName = function(callback) {
    pool.query('select * from lkmadb.student', (err, res)=>{
        return console.log(res);
    });
    console.log('test');
}

console.log("test 1");
pool.query('create database lkmadb', (err, res)=>{
    return console.log(res);
});
console.log("test 2");

pool.query('use student', (err, res)=>{
    return console.log(res);
});
console.log("test 3");

//var getName = function(callback) {
    var getName = function getNames() {
        pool.query('select * from lkmadb.student', function (err, res) {
            if (err) throw err;
            
            return console.log(res);
        });
    }
//}
export {getName};

console.log("test 4");

pool.query('show tables', (err, res)=>{
    return console.log(res);
});*/

///////////////////////////////////////////
//approach 2: using mysql with express

const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'testing',
    user: 'root',
    password: 'CicadaCode@7'
});

app.listen(3000, () => {
    console.log('running server');
});

/*connection.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log('MySQL database is connected successfully.');
    }
})
*/
module.exports = connection;

