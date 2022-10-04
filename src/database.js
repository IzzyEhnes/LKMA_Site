const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    //adapt password to your MySQL password
    password: "CicadaCode@7",
    database: "lkmadb",
});

app.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //implement proper registration authentication
    connection.query("INSERT INTO account (email, password) VALUES (?,?)",
    [email, password], (err, result) => {
        if (err) {
            console.log(err);
        } 
            
        if ((result.email != "" && result.password != "")) {
            res.status(200).json({ message: "registration successful", 
                result });
        } else {
            res.status(200).json({ message: "no input", 
                result });
        }       
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    connection.query("SELECT * FROM account WHERE email = ? AND password = ?",
    [email, password], (err, result) => {
        if (err) {
            console.log(err);
        }
            
        if (result.length > 0) {
            res.status(200).json({ message: "You logged in", result });
        } else {
            res.status(200).json({ message: "Wrong combination", result });
        }       
    });
});