const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

//for uploading images
const path = require("path");
const mv = require("mv");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
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
    password: "Sen10!",
    database: "lkmadb",
});

app.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //implement proper registration authentication here -> email, password requirements
    //implement password hashing algorithm here before password enters database

    if (email != "" && password != "") {
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
    } else {
        res.status(200).json({ message: "no input" });
    }
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
            const profilePic = result[0].account_image;
            const filePath = 'img/' + profilePic;

            res.status(200).json({ message: "You logged in", result, 
                fileName: profilePic, filePath: filePath });
        } else {
            res.status(200).json({ message: "Wrong combination", result });
        }       
    });
});

app.post("/image", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const imageFile = req.files.image;
    const uploadPath = path.join(__dirname, '..') + '/public/img/' 
    + imageFile.name;

    imageFile.mv(uploadPath, err => {
            if (err) {
                console.log(err);
                //return res.status(500).send(err);
            }
        });
        
    if (req.files === null) {
        return res.status(400).json({message: "no file uploaded"});
    }

    const image = imageFile.name;
    const email = req.body.email;

    connection.query("UPDATE account SET account_image = ? WHERE email = ?",
    [image, email], (err, result) => {
        if (err) {
            console.log(err);
        } 
            
        res.status(200).json({ message: "upload successful", result, 
            fileName: image, filePath:'/img/' + image});
    });   
});

// DB Method to change password of account (prob want to use ID here too)
app.post("/password", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    connection.query("UPDATE account SET password = ? WHERE email = ?",
    [password, email], (err, result) => {
            if (err) {
            console.log(err);
        } 
    });
});

//NEEDS TO BE CHANGED WHEN ID IS GRABBED NOT PASS ie: Need to grab UQ ID
app.post("/email", (req, res) => {
    const email = req.body.email;
    const newEmail = req.body.newEmail;
    const password = req.body.password;

    //connection.query("SELECT email FROM [account] WHERE account_id = ?")
    connection.query("UPDATE account SET email = ? WHERE account_id = ?",
    [email, newEmail], (err, result) => {
            if (err) {
            console.log(err);
        } 
    });
});