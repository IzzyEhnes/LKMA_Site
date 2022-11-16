const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//for uploading images
const path = require("path");
const mv = require("mv");
const detect = require('detect-file');
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// For sending Forgot Password emails
const fromEmail = "teamname404@gmail.com";  // temporary, for testing purposes; change to client's email
const nodemailer = require("nodemailer");
const crypto = require('crypto');


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  //adapt password to your MySQL password
  password: "Sinude3!",
  database: "lkma",
});

var hashPassword;

app.post("/", (req, res) => {
  const email = req.body.email;
  var password = req.body.password;
  const first_name = req.body.fname;
  const last_name = req.body.lname;
  const file_path = req.body.imageFile;
  const access_code = req.body.accCode;
  var validAccess = false;

  //implement password hashing algorithm here before password enters database

  if (email != "" && password != "") {
    connection.query("SELECT * FROM access_code WHERE access_code = ?",
      [access_code], (err, result) => {
        if (err) {
          console.log(err);
        }

        //if access code is correct
        if (result.length > 0) {
          connection.query("SELECT * FROM account WHERE email = ?",
            [email], (err, result) => {
              if (err) {
                console.log(err);
                res.status(200).json({ message: "email is not valid", err });
              }

              //if email is already being used
              if (result.length > 0) {
                res.status(200).json({ message: "email is already being used" });
              } else {
                hashPassword = password;

                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(password, salt, function (err, hash) {
                    password = hash;

                    console.log(password)
                    connection.query("INSERT INTO account (first_name, last_name, email, password, account_image) VALUES (?,?,?,?,?)",
                      [first_name, last_name, email, password, file_path], 
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        }

                        if ((result.email != "" && result.password != "")) {
                          res.status(200).json({
                            message: "registration successful", result});
                        } else {
                          res.status(200).json({message: "no input", result});
                        }
                      });
                  });
                })
              }
            });
        } else {
          res.status(200).json({ message: "Invalid Access Code", result });
        }
      });
  } else {
    res.status(200).json({ message: "no input" });
  }
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    var password = req.body.password;
    var oldPasswordHash;
  
    bcrypt.hash(password, saltRounds, function (err, hash) {
      connection.query("SELECT * FROM account WHERE email = ?",
        [email], (err, result) => {
          if (err) {
            console.log(err);
          }
  
          if (result.length > 0) {
            oldPasswordHash = result[0].password;
  
            bcrypt.compare(password, oldPasswordHash, (error, hashResult) => {
              if (error) {
                console.log(error);
              } else {
                if (hashResult) {
                  hashPassword = password;
                  const profilePic = result[0].account_image;
                  const filePath = 'img/' + profilePic;
  
                  res.status(200).json({
                    message: "You logged in", result,
                    fileName: profilePic, filePath: filePath
                  });
                } else {
                  res.status(200).json({ message: "Wrong combination", result });
                }
              }
            });
          } else {
            res.status(200).json({ message: "Wrong combination", result });
          }
        });
    });
  });  

app.post("/accessCode", (req, res) => {
  const access_code = req.body.accCode;

  connection.query("SELECT * FROM access_code WHERE access_code = ?",
    [access_code], (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.status(200).json({ message: "Valid Access Code", result });
      } else {
        res.status(200).json({ message: "Invalid Access Code", result });
      }
    });
});

app.post("/changeAccessCode", (req, res) => {
  const accessCode = req.body.code;

  connection.query("UPDATE access_code SET access_code = ?",
    [accessCode], (err, result) => {
      if (err) {
        console.log(err);
      }
    });

});

app.post("/admin", (req, res) => {
  connection.query("SELECT * FROM admin", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "Retrieved admin emails", result });
    }
  });
});

/*
app.post("/image", (req, res) => {
    */
app.post("/retrieveImage", (req, res) => {
  const email = req.body.email;

  connection.query("SELECT * FROM account WHERE email = ?",
    [email], (err, result) => {
      if (err) {
        console.log("triggered error");
        return "";
      }

      if (result.length > 0) {
        const profilePic = result[0].account_image;
        const filePath = 'img/' + profilePic;
        res.status(200).json({
          message: "Image retrieved", result,
          fileName: profilePic, filePath: filePath
        });
      }
    });
});

app.post("/uploadImage", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(200).json({ message: "No files were uploaded." });
  }

  const email = req.body.email;
  const imageFile = req.files.image;
  const uploadPath = path.join(__dirname, '..') + '\\public\\img\\'
    + imageFile.name;

  /*
  imageFile.mv(uploadPath, err => {
      */
  var checkImage = detect(uploadPath);
  if (uploadPath != checkImage) {
    imageFile.mv(uploadPath, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  if (req.files === null) {
    return res.status(200).json({ message: "No files were uploaded." });
  }

  const image = imageFile.name;
  /*
  const email = req.body.email
  */

  connection.query("UPDATE account SET account_image = ? WHERE email = ?",
    [image, email], (err, result) => {
      if (err) {
        console.log(err);
      }

      res.status(200).json({
        message: "", result,
        fileName: image, filePath: '/img/' + image
      });
    });
});

// DB Method to change password of account
app.post("/password", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var newPassword = req.body.newPassword;
  hashPassword = newPassword;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPassword, salt, function (err, hash) {
      newPassword = hash;

      connection.query("UPDATE account SET password = ? WHERE email = ?",
      [newPassword, email], (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({ message: "Password is not valid", err });
        }
        res.status(200).json({
          message: "Password changed successfully.", result,
          changedPassword: newPassword
        });
      });
    });
  })
});

// Method for Email change
app.post("/emailCheck", (req, res) => {
  const email = req.body.email;
  const newEmail = req.body.newEmail;

  connection.query("SELECT * FROM account WHERE email = ?",
    [newEmail], (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json({ message: "email is not valid", err });
      }

      if (result.length > 0) {
        res.status(200).json({ message: "email is already being used" });
      } else {
        //check if email belongs to admin
        connection.query("SELECT * FROM admin WHERE email = ?",
          [email], (err, result) => {
            if (err) {
              console.log(err);
              res.status(200).json({ message: "email is not valid", err });
            }

            //email exists in admin table
            if (result.length > 0) {
              //check if someone else in DB already uses the new email
              connection.query("SELECT * FROM admin WHERE email = ?",
                [newEmail], (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(200).json({message: "email is not valid", err});
                  }

                  if (result.length > 0) {
                    res.status(200).json({
                      message: "email is already being used"
                    });
                  } else {
                    res.status(200).json({
                      message: "admin email can be changed"
                    });
                  }
                });
            } else {
              res.status(200).json({ message: "not an admin email" });
            }
          });
      }
    });
});

app.post("/accountEmail", (req, res) => {
  const email = req.body.email;
  const newEmail = req.body.newEmail;

  connection.query("SELECT * FROM admin WHERE email = ?",
    [newEmail], (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json({ message: "email is not valid", err });
      }

      //prevents students from changing email to an admin email
      if (result.length > 0) {
        res.status(200).json({ message: "email is already being used" });
      } else {
        connection.query("UPDATE account SET email = ? WHERE email = ?",
          [newEmail, email], (err, result) => {
            if (err) {
              console.log(err);
              res.status(200).json({ message: "email is not valid", err });
            }
            res.status(200).json({
              message: "email succesfully changed", result,
              changedEmail: newEmail
            });
          });
      }
    });
});

app.post("/adminEmail", (req, res) => {
  const email = req.body.email;
  const newEmail = req.body.newEmail;

  connection.query("UPDATE admin SET email = ? WHERE email = ?",
    [newEmail, email], (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json({ message: "email is not valid", err });
      }
      res.status(200).json({
        message: "email succesfully changed", result,
        changedEmail: newEmail
      });
    });
});

var passwordResetEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: 'zpypjzurpmcclpxn' // client needs to set up an app password: go to https://myaccount.google.com/security -> enable 2FA -> App passwords
  }
});

// // Indicates if email capabilities are working
// passwordResetEmail.verify((error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Ready to Send Email");
//     }
// });

// when the user submits the form on the /forgot page
app.post("/forgot", (req, res) => {

  // the email entered in the form; may or may not exist in the DB
  const email = req.body.email;

  connection.query("SELECT * FROM account WHERE email = ?",
    [email], (err, result) => {

      if (err) {
        return log("Query failed. Error: %s. Query: %s", err, query);
      }

      // if an account matching the provided email address was found, send a password reset request email to that email address
      if (result.length > 0) {

        const accountId = result[0].account_id;

        var token;
        var expiration;
        var createdAt;

        // check if an account has been issued a reset token
        connection.query("SELECT * FROM resetTokens WHERE account_id = ?",
          [accountId], (err, result) => {

            if (err) {
              return log("Query failed. Error: %s. Query: %s", err, query);
            }

            // if a reset token already exists for the account
            if (result.length > 0) {
              // we only care if the existing token for an account is expired
              // if it is, we replace it with a new one
              if (Date.parse(result[0].expiration) <= Date.now()) {
                token = crypto.randomBytes(40).toString('hex');
                expiration = new Date(Date.now() + 60 * 60 * 1000); // token only valid for one hour
                createdAt = new Date(Date.now());

                connection.query("UPDATE resetTokens SET token=\"" + token + "\", expiration=\"" + expiration + "\", created_at=\"" + createdAt + "\" WHERE account_id=\"" + accountId + "\"",
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    }
                  });
              }
            }

            // no reset token found, so create one
            else {
              token = crypto.randomBytes(40).toString('hex');
              expiration = new Date(Date.now() + 60 * 60 * 1000); // token only valid for one hour
              createdAt = new Date(Date.now());

              // add token record to resetTokens table
              connection.query("INSERT INTO resetTokens (account_id, token, expiration, created_at) VALUES (?,?,?,?)",
                [accountId, token, expiration, createdAt], (err, result) => {
                  if (err) {
                    return log("Query failed. Error: %s. Query: %s", err, query);
                  }
                });
            }

            // send email containing valid token
            connection.query("SELECT token FROM resetTokens WHERE account_id = ?",
              [accountId], (err, result) => {

                if (err) {
                  return log("Query failed. Error: %s. Query: %s", err, query);
                }

                var token = result[0].token;

                var mailOptions = {
                  from: fromEmail,
                  to: email,
                  subject: 'Password Reset Request - Lee\'s Korean Martial Arts',
                  html: "<p>Hello,<br><br>Somebody requested a new password for the Lee's Korean Martial Arts</strong> account associated with " + email + ".<br><br>If you requested this change, you can reset your password by clicking the link below, which expires in one hour:<br><br><a href=\"http://localhost:3001/resetpassword?token=" + encodeURIComponent(token) + "\">http://localhost:3001/resetpassword?token=" + encodeURIComponent(token) + "</a><br><br>If you did not request a new password, you can ignore this email.<br><br>Regards,<br><br><strong>Lee's Korean Marial Arts</strong><br><br>2801 Zinfandel Drive, Rancho Cordova, CA, 95670<br>(916) 368-8824<br>leeskoreanmartialarts@gmail.com</p>"

                };

                // for internal use (console output)
                passwordResetEmail.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    res.json({ status: "Error: " + error });
                    console.log(error);
                  } else {
                    res.json({ status: "Message Sent" });
                    console.log('Email sent: ' + info.response);
                  }
                });

              });

          });
      }

      else {
        console.log('No account associated with the provided email address was found.'); // remove before site goes live
      }
    });
});

// when a user clicks a password reset link
app.get('/resetpassword', (req, res) => {

  const token = req.query.token;

  if (!token) {
    console.log("token missing from request.");
    return res.sendStatus(400);
  }

  // token validation
  connection.query("SELECT expiration FROM resetTokens WHERE token = ?",
    [token], (err, result) => {

      if (err) {
        return log("Query failed. Error: %s. Query: %s", err, query);
      }

      if (result.length > 0) {

        const expiration = Date.parse(result[0].expiration);

        // if token is expired, redirect them to the tokenexpired page
        if (expiration <= Date.now()) {

          return res.redirect('http://localhost:3000/tokenexpired');
        }

        // if token is valid, redirect them to the resetpassword page
        else {
          return res.redirect('http://localhost:3000/resetpassword');
        }

      }

      else {
        return res.redirect('http://localhost:3000/tokenexpired');
      }
    })
});