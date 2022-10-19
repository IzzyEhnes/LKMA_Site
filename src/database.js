const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

//for uploading images
const path = require("path");
const mv = require("mv");
const detect = require('detect-file');
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
    password: "CicadaCode@7",
    database: "lkmadb",
});

app.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const file_path = req.body.imageFile;

    //implement password hashing algorithm here before password enters database

    if (email != "" && password != "") {
        connection.query("INSERT INTO account (first_name, last_name, email, password, account_image) VALUES (?,?,?,?,?)",
        [first_name, last_name, email, password, file_path], (err, result) => {
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

app.post("/retrieveImage", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    connection.query("SELECT * FROM account WHERE email = ? AND password = ?",
    [email, password], (err, result) => {
        if (err) {
            console.log("triggered error");
            return "";
        }
        
        if (result.length > 0) {
            const profilePic = result[0].account_image;
            const filePath = 'img/' + profilePic;
            res.status(200).json({ message: "Image retrieved", result, 
                fileName: profilePic, filePath: filePath });
        }    
    });
});

app.post("/uploadImage", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(200).json({message: "No files were uploaded."});
    }

    const email = req.body.email;
    const imageFile = req.files.image;
    const uploadPath = path.join(__dirname, '..') + '\\public\\img\\' 
    + imageFile.name;

    var checkImage = detect(uploadPath);
    if (uploadPath != checkImage) {    
        imageFile.mv(uploadPath, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    if (req.files === null) {
        return res.status(200).json({message: "No files were uploaded."});
    }

    const image = imageFile.name;
    connection.query("UPDATE account SET account_image = ? WHERE email = ?",
    [image, email], (err, result) => {
        if (err) {
            console.log(err);
        } 
            
        res.status(200).json({ message: "", result, 
            fileName: image, filePath:'/img/' + image});
    });   
});