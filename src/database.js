const dotenv = require("dotenv");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//for uploading images
const path = require("path");
const mv = require("mv");
const fs = require("fs");
const detect = require('detect-file');
const fileUpload = require("express-fileupload");

dotenv.config();
const app = express();
app.use(fileUpload());
app.use(express.json());console.log
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

// For sending Forgot Password emails
const fromEmail = "noreply.leeskoreanmartialarts@gmail.com";
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const e = require("express");

// goes with all imports
// for writing sql query results to studentInfoData.json file

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

var hashPassword;
var userID;

app.post("/", (req, res) => {
  const email = req.body.email;
  var password = req.body.password;
  const first_name = req.body.fname;
  const last_name = req.body.lname;
  const file_path = req.body.imageFile;
  const phone = req.body.phone;
  const access_code = req.body.accCode;
  const default_status = false;
  var validAccess = false;
  var accessToken;
  var refreshToken;

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

                    connection.query("INSERT INTO account (first_name, last_name, email, password, phone_number, account_image, admin_status) VALUES (?,?,?,?,?,?,?)",
                      [first_name, last_name, email, password, phone, file_path, default_status], 
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        }

                        connection.query("SELECT * FROM account WHERE email = ?",
                          [email], (err, result) => {
                            if (err) {
                              console.log(err);
                            }

                            const userID = result[0].account_id;
                            accessToken = jwt.sign({userID}, "LKMA_ACCESS_KEY", {
                              expiresIn: 900,
                            });
                            refreshToken = jwt.sign({userID}, "LKMA_REFRESH_KEY", {
                              expiresIn: 1209600,
                            });
            
                            const accountData = result;
                            connection.query("UPDATE account SET access_token = ? WHERE account_id = ?",
                              [accessToken, userID], (err, result) => {
                                if (err) {
                                  console.log(err);
                                }

                                if ((accountData.email != "" && accountData.password != "")) {
                                  res.status(202).cookie("refreshToken", refreshToken, {
                                    path: "/",
                                    expires: new Date(new Date().getTime() + 1209600 * 1000), //refresh token and cookie expiration: 2 weeks
                                    httpOnly: true,
                                    sameSite: "strict",
                                    secure: true
                                  });
        
                                  res.status(200).json({
                                    message: "registration successful", 
                                    accessToken: accessToken,
                                    result: accountData
                                  });
                                } else {
                                  res.status(200).json({message: "no input", result});
                                }
                              });
                          });
                      });
                  });
                });
                const directoryPath = path.join(__dirname, '..') + '\\public\\img\\users\\' + email;
  
                fs.access(directoryPath, (error) => {
                  if (error) {
                    fs.mkdir(directoryPath, (error) => {
                      if (error) {
                        console.log(error);
                      }
                    });
                  }
                });
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
  var filePath;

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
                
                if (profilePic == "profile-blank-whitebg.png") {
                  filePath = "img/" + profilePic;
                } else {
                  filePath = "img/users/" + email + "/" + profilePic;
                }
                
                userID = result[0].account_id;

                const accessToken = jwt.sign({userID}, "LKMA_ACCESS_KEY", {
                  expiresIn: 900,
                });
                const refreshToken = jwt.sign({userID}, "LKMA_REFRESH_KEY", {
                  expiresIn: 1209600,
                });

                const userInfo = result;
                connection.query("UPDATE account SET access_token = ? WHERE email = ?",
                  [accessToken, email], (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.status(202).cookie("refreshToken", refreshToken, {
                        path: "/",
                        expires: new Date(new Date().getTime() + 1209600 * 1000), //refresh token and cookie expiration: 2 weeks
                        httpOnly: true,
                        sameSite: "strict",
                        secure: true
                      });

                      res.status(200).json({
                        auth: true,
                        accessToken: accessToken,
                        message: "You logged in",
                        result: userInfo,
                        fileName: profilePic,
                        filePath: filePath
                      });
                    }
                  });
              } else {
                res.status(200).json({ 
                  auth: false,
                  message: "Wrong username/password combination", 
                  result: result 
                });
              }
            }
          });
        } else {
          res.status(200).json({ 
            auth: false,
            message: "Wrong username/password combination", 
            result: result 
          });
        }
      });
  });
});

app.post("/refresh", (req, res) => {
  if (req.cookies?.refreshToken) {
    const refreshToken = req.cookies.refreshToken;

    jwt.verify(refreshToken, "LKMA_REFRESH_KEY", (err, result) => {
      if (err) {
        res.status(200).json({
          auth: false,
          message: "Invalid refresh token. Unauthorized request to user info."
        });
      } else {
        const accessToken = jwt.sign({ userID }, "LKMA_ACCESS_KEY", {
          expiresIn: 900,
        });

        res.status(200).json({
          auth: true,
          accessToken: accessToken,
          message: "Refresh token exists. Sending new access token."
        });
      }
    });
  } else {
    res.status(200).json({
      auth: false,
      message: "No refresh token exists. Unauthorized request to user info."
    });
  }
});

app.post("/updateJWT", (req, res) => {
  const jwt = req.body.jwt;
  const newJWT = req.body.newJWT;

  connection.query("UPDATE account SET access_token = ? WHERE access_token = ?",
    [newJWT, jwt], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Updated account's access token.", result });
      }
    });
});

app.post("/verifyJWT", (req, res) => {
  const token = req.body.jwt;
  
  if (!token) {
    res.status(200).json({ 
      auth: false, 
      message: "JWT does not exist. Unauthorized request to user info." 
    });
  } else {    
    jwt.verify(token, "LKMA_ACCESS_KEY", (err, result) => {
      if (err) {
        res.status(200).json({ 
          auth: false, 
          message: "Invalid JWT. Unauthorized request to user info." ,
          token: token
        });
      } else {
        req.userID = res.result;
        res.status(200).json({ auth: true, message: "Authorization Successful." });
      }
    });
  }
});

app.post("/retrieveUserInfo", (req, res) => {
  const jwt = req.body.jwt;

  connection.query("SELECT * FROM account WHERE access_token = ?",
    [jwt], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          const email = result[0].email;
          const directoryPath = "/img/users/" + email + "/";
          res.status(200).json({ 
            message: "Retrieved user information.", 
            result: result,
            directoryPath: directoryPath
          });
        }
      }
    });
});

app.post("/endSession", (req, res) => {
  res.status(202).clearCookie("refreshToken");
  const jwt = req.body.jwt;

  connection.query("UPDATE account SET access_token = ? WHERE access_token = ?",
    [null, jwt], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "The login session was closed." });
      }
    });
});

app.post("/setAdmin", (req, res) => {
  var adminStatus = req.body.admin;
  const jwt = req.body.jwt;

  connection.query("UPDATE account SET admin_status = ? WHERE access_token = ?",
    [adminStatus, jwt], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("got here");
      res.status(200).json({ message: "Successfully set admin status.", result });
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

app.post("/changePhone", (req, res) => {
  const email = req.body.email;
  const phone = req.body.phone;

  connection.query("SELECT * FROM account WHERE phone_number = ?",
    [phone], (err, result) => {

      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.status(200).json({ message: "Duplicate Phone Number", result });
      }
      else {
        connection.query("UPDATE account SET phone_number = ? WHERE email = ?",
          [phone, email], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              connection.query("SELECT * FROM account WHERE email = ?",
                [email], (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    res.status(200).json({ message: "Changed Phone Successfully", result });
                  }
                });
            }
          });
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

  // to show the database table on the admin page
  connection.execute('SELECT * FROM account;', function (err,result) {
    if (err) throw err;

    const finished = (error) => {
        if(error) {
            console.error(error);
            return;
        }
    }

    result = JSON.stringify(result, null, 2);
    fs.writeFile('pages/data/studentInfoData.json', result, finished)
  });
});

app.post("/retrieveImage", (req, res) => {
  const jwt = req.body.jwt;

  connection.query("SELECT * FROM account WHERE access_token = ?",
  [jwt], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const email = result[0].email;

      if (result.length > 0) {
        const profilePic = result[0].account_image;
        const filePath = "img/users/" + email + "/" + profilePic;
        res.status(200).json({
          message: "Image retrieved", result,
          fileName: profilePic, filePath: filePath
        });
      }
    }
  });
});

app.post("/updateImageFolder", async (req, res) => {
  const email = req.body.email;
  const newEmail = req.body.newEmail;
  const directoryPath = path.join(__dirname, '..') + '\\public\\img\\users\\'
    + email;
  const newPath = path.join(__dirname, '..') + '\\public\\img\\users\\'
    + newEmail;

  fs.rename(directoryPath, newPath, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "Directory name was updated." });
    }
  })
});

app.post("/uploadImage", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(200).json({ message: "No files were uploaded." });
  }

  var email;
  const jwt = req.body.jwt;

  connection.query("SELECT * FROM account WHERE access_token = ?",
    [jwt], (err, result) => {
      if (err) {
        console.log(err);
      } else {

        if (result.length > 0) {
          email = result[0].email;  
          const imageFile = req.files.image;
          const directoryPath = path.join(__dirname, '..') + '\\public\\img\\users\\' + email;
  
          fs.access(directoryPath, (error) => {
            if (error) {
              fs.mkdir(directoryPath, (error) => {
                if (error) {
                  console.log(error);
                }
              });
            }
  
            fs.access(directoryPath, (error) => {
              const uploadPath = directoryPath + "\\" + imageFile.name;
  
              fs.readdir(directoryPath, async (error, images) => {
                if (error) {
                  console.log(error);
                } else {
                  for (const image of await images) {
                    fs.unlink(path.join(directoryPath, image), (error) => {
                      if (error) {
                        console.log(error);
                      }
                    });
                  }
  
                  var checkImage = detect(uploadPath);
                  if (uploadPath != checkImage) {
                    await imageFile.mv(uploadPath, err => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                }
              });
            });
          });
  
          if (req.files === null) {
            return res.status(200).json({ message: "No files were uploaded." });
          }
  
          const image = imageFile.name;
          connection.query("UPDATE account SET account_image = ? WHERE email = ?",
            [image, email], (err, result) => {
              if (err) {
                console.log(err);
              }
  
              const newFilePath = '/img/users/' + email + "/" + image;
              res.status(200).json({
                message: "Image was successfully uploaded.", result,
                fileName: image, filePath: newFilePath
              });
            });
        } else {
          res.status(200).json({
            message: "Did not find any account with that jwt."
          });
        }
      }
    });
});

  //DB Method for Account Removal from Admin
app.post("/accountRemoval", async (req, res) => {
  var directoryPath;
  const accountId = req.body.accountId;

  connection.query("SELECT * FROM account WHERE account_id = ?",
    [accountId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json({ message: "That account id is not valid.", err });
      }

      if (result.length > 0) {
        directoryPath = path.join(__dirname, '..') + '\\public\\img\\users\\'
          + result[0].email;

        connection.query("DELETE FROM account WHERE account_id = ?",
          [accountId], (err, result) => {
            if (err) {
              console.log(err);
            }

            //remove their image folder from the img directory
            fs.rmSync(directoryPath, { recursive: true, force: true });
            console.log("User's image folder was removed.")
            res.status(200).json({ message: "User's image folder was removed." });
          });
      } else {
        res.status(200).json({ message: "An account with that ID does not exist is not valid.", err });
      }
    });
});

// DB Method to change password of account
app.post("/password", (req, res) => {
  const email = req.body.email;
  var newPassword = req.body.newPassword;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPassword, salt, function (err, hash) {
      if (newPassword != undefined) {
        hashPassword = newPassword;
      }
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
    pass: 'wdnjwpbgvbjvaotj'
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
        console.log("Query failed. Error: %s", err);
      }

      // if an account matching the provided email address was found, send a password reset request email to that email address
      if (result.length > 0) {

        var generatedPassword = "Pa" + crypto.randomBytes(6).toString('hex');

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(generatedPassword, salt, function (err, hash) {
              hashedGeneratedPassword = hash;

              connection.query("UPDATE account SET password = ? WHERE email = ?",
              [hashedGeneratedPassword, email], (err, result) => {
                if (err) {
                  console.log(err);
                }

                else {
                
                  var mailOptions = {
                    from: fromEmail,
                    to: email,
                    subject: 'Password Reset Request - Lee\'s Korean Martial Arts',
                    html: "<p>Hello,<br><br>Somebody requested a new password for the Lee's Korean Martial Arts</strong> account associated with " + email + ".<br><br>Your new password is: <strong>" + generatedPassword + "</strong><br><br>This password was automatically generated, and it is recommended that you reset your password immediately after logging in.<br><br>You can access your account by using this password here: <a href=\"http://localhost:3000/login\">http://localhost:3000/login</a><br><br>Regards,<br><br><strong>Lee's Korean Marial Arts</strong><br><br>2801 Zinfandel Drive, Rancho Cordova, CA, 95670<br>(916) 368-8824<br>leeskoreanmartialarts@gmail.com</p>"
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
                }
              });
            });
        });

        res.status(200)
      }

      else {
        res.status(200);
      }
    });
});
