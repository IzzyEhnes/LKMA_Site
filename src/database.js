const {createPool} = require('mysql')

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "CicadaCode@7",
  connectionLimit: 10
})

pool.query('select * from lkmadb.student', (err, res)=>{
    return console.log(res)
})
/*pool.query('create database lkmadb', (err, res)=>{
    return console.log(res)
})
pool.query('use student', (err, res)=>{
    return console.log(res)
})
pool.query('show tables', (err, res)=>{
    return console.log(res)
})*/