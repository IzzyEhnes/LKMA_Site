import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useRef} from 'react';
import { LoggingOut, changeFilePath } from "../loginPage/loginComponent";
import { login, changePhone } from "../loginPage/loginComponent";
import { useAuth } from "../../../AuthContext";

var logOut = true;
var tempImage = "";
var phoneResult;

export const logIn = () => {
  logOut = false;
}

export const studentLogout = () => {
  logOut = true;
}

export const ProfileComponent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [imageFilePath, setImageFilePath] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [render, setRender] = useState("");
  const newPhone = useRef(null);

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  var checkAuth;
  var resData;
  const jwt = localStorage.getItem("token");
  const tokenData = new FormData();
  tokenData.append('jwt', jwt);

  useEffect(() => {  
    try {
      let details = {
        jwt: localStorage.getItem("token")
      };

      if (!localStorage.getItem("token")) {
        navigate("/");
      } else {
        tokenAuth();
  
        async function tokenAuth() {
          await axios.post("http://localhost:3001/refresh", {
            withCredentials: true,
          }).then((response) => {
            if (response.data.message === "Refresh token exists. Sending new access token.") {
              const newJWT = response.data.accessToken;
              tokenData.append('newJWT', newJWT);
              details = {
                jwt: localStorage.getItem("token"),
                newJWT: newJWT
              };
              setAuthStatus(response.data.auth);
            } else {
              localStorage.clear();
              navigate("/login");
            }
          });
  
          await fetch("http://localhost:3001/updateJWT", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
  
            body: JSON.stringify(details),
          })
          .then((response) => response.json())
          .then((data) => {
            resData = data.message;
            if (resData === "Updated account's access token.") {
              tokenData.set('jwt', details.newJWT);
              localStorage.setItem("token", details.newJWT);
              details = {
                jwt: localStorage.getItem("token"),
                newJWT: details.newJWT
              };
            }
          })
          .catch((error) => {
            console.log(error);
          });
  
          await fetch("http://localhost:3001/verifyJWT", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
          })
          .then((response) => response.json())
          .then((data) => {
            resData = data.message;
            setAuthStatus(data.auth);
            checkAuth = data.auth;
          })
          .catch((error) => {
            console.log(error);
          });
  
          if (checkAuth) {
            await axios.post("http://localhost:3001/retrieveUserInfo", tokenData).then((response) => {
              if (response.data.result[0] !== undefined) {
                if (response.data.result[0].admin_status == 1) {
                  navigate("/admin");
                } else {
                  setFirstName(response.data.result[0].first_name);
                  setLastName(response.data.result[0].last_name);
                  setPhone(response.data.result[0].phone_number);
                  setProfileEmail(response.data.result[0].email);
    
                  const profileImage = response.data.result[0].account_image;
    
                  if (profileImage == "profile-blank-whitebg.png") {
                    setImageFilePath("img/" + response.data.result[0].account_image);
                  } else {
                    setImageFilePath(response.data.directoryPath + profileImage);
                  }
                }
              }
            });
          } else {
            localStorage.clear();
            navigate("/login");
          }
        }
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with server.");
      } else {
        console.log(err.response.data.message);
      }
    }
  }, []);

	useEffect(() => {
    if (login) {
      setRender(true);
      setAuth(true);
    } else {
      setImageFilePath("\\img\\profile-blank-whitebg.png");
    }

    if (logOut) {
      LoggingOut();
      setFirstName("N/A");
      setLastName("N/A");
      setProfileEmail("N/A");
      setPhone("N/A");
      setImageFilePath("\\img\\profile-blank-whitebg.png");
    }
  }, [render]);

  const closeSession = async () => {
    const jwt = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('jwt', jwt);

    try {
      await axios.post("http://localhost:3001/endSession", formData).then((response) => {
        localStorage.clear();
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with closing the session.");
      } else {
        console.log(err.response.data.message);
      }
    }
  }

  const uploadImage = async () => {
    const formData = new FormData();
    var resData;

    if (tempImage != "") {
      formData.append('image', tempImage);
      formData.append("jwt", localStorage.getItem("token"));

      let details = {
        image: tempImage,
        jwt: localStorage.getItem("token")
      };

      await fetch("http://localhost:3001/verifyJWT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      })
        .then((response) => response.json())
        .then((data) => {
          resData = data.message;
        })
        .catch((error) => {
          console.log(error);
        });

      if (resData == "Authorization Successful.") {
        try {
          await axios.post("http://localhost:3001/uploadImage", formData).then((response) => {
            if (response.data.message === "Image was successfully uploaded.") {
              const filePath = response.data.filePath;

              setImageFilePath(filePath);
              changeFilePath(filePath);
              tempImage = "";
              //setRender(Math.random());
            }
          });
        } catch (err) {
          if (err.response.status === 500) {
            console.log("There was a problem with server.");
          } else {
            console.log(err.response.data.message);
          }
        }
      }
    }
  }
  
  const changePhoneNum = async (e) => {
    const result = e.target.value.replace(/[^0-9.]+/g, '');
    const length = result.length;
    
    if (length == 0) {
      phoneResult = "(No number entered)";
    } else if (length <= 3) {
      phoneResult = result;
    } else if (length > 3 && length <= 6) {
      phoneResult = result.substr(0, 3) + "-" + result.substr(3, length);
    } else if (length > 6 && length < 12) {
      phoneResult = result.substr(0, 3) + "-" + result.substr(3, 3) 
        + "-" + result.substr(6, 4);
    }
    setPhone(phoneResult);
  }

  const phoneSubmit = async () => {
    var resData;

    if (validate()) {
      const jwt = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('jwt', jwt);

      let details = {
        jwt: localStorage.getItem("token")
      };

      await fetch("http://localhost:3001/verifyJWT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      })
      .then((response) => response.json()) 
      .then((data) => {
        resData = data.message;
      })
      .catch((error) => {
        console.log(error);
      });

      if (resData == "Authorization Successful.") {
        axios.post("http://localhost:3001/retrieveUserInfo", formData).then((response) => {
          if (response.data.result[0] !== undefined) {
            const email = response.data.result[0].email;
            formData.append('email', email);
            formData.append('phone', phoneResult);

            try {
              axios.post("http://localhost:3001/changePhone", formData).then((response) => {
                if (response.data.message === "Changed Phone Successfully") {
                  changePhone(response.data.result[0].phone_number);
                }
                navigate("/profile");
              });
            } catch (err) {
              if (err.response.status === 500) {
                console.log("There was a problem with server.");
              } else {
                console.log(err.response.data.message);
              }
            }
          }
        });
      }
    }
  }

  function validate() {
    const regex = new RegExp(/[^0-9.]+/g);
    if(newPhone.current.value.length !== 10){
      document.getElementById("phoneError").innerHTML = "Phone number must be 10 digits (Include area code)";
      return false;
    }else if (!regex.test(newPhone.current.value)) {
      document.getElementById("phoneError").innerHTML = "";
      return true;
    } else {
      document.getElementById("phoneError").innerHTML = "Phone number must contain only numbers.";
      return false;
    }
  }
	
	return (  
    <div id='student' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Profile</h2>
        </div>
        <div className='row'>
          <div className='row'>
            <img data-testid="profilePic" src={imageFilePath} />
            <h1 id="chosenImage"></h1>
          </div>
          <div className='row'>
            <div className="login-form">
              <label htmlFor="file-upload" className="custom-file">Choose Image</label>
                <input data-testid="uploadFile" type="file" id="file-upload" 
                name="imageFile" accept="image/*" onChange={(e) => {
                  tempImage = e.target.files[0];

                  if (tempImage == undefined) {
                    document.getElementById("chosenImage").innerHTML = "";
                  } else {
                    document.getElementById("chosenImage").innerHTML
                      = tempImage.name;
                  }
                }} />
              <NavLink className="nav-link" to="/profile">
                <input data-testid="uploadSubmit" type="submit"
                  value="Upload Image" onClick={() => {
                    if (tempImage != undefined) {
                      uploadImage();
                      document.getElementById("chosenImage").innerHTML = "";
                    }
                  }} />
              </NavLink>
            </div>
          </div>
          <div className="column-left">
            <h3>First Name</h3>
            <h1 data-testid="firstName">{firstName}</h1>
            <h3>Last Name</h3>
            <h1 data-testid="lastName">{lastName}</h1>
            <h3>Email</h3>
            <h1 data-testid="profileEmail">{profileEmail}</h1>
            <h3>Phone Number</h3>
            <h1 data-testid="phone">{phone}</h1>
            <NavLink className="nav-link red" to="/login">
              <button data-testid="logOut" className="ghost" id="logIn" onClick={() => {
                logOut = true;
                setRender(Math.random());
                setAuth(false);
                localStorage.clear();
                closeSession();
              }}>Log out</button>
            </NavLink>
          </div>
          <div className="column">
            <a className="row" href={props.data ? props.data.uploadLink : ""} target="_blank">
              <button>Upload Assignment</button>
            </a>
            <a className="row" href={props.data ? props.data.downloadLink : ""} target="_blank">
              <button>Download Assignment</button>
            </a>
            <NavLink className='row' to="/ChangeEmail">
              <button>Change Email</button>
            </NavLink> 
            <NavLink className='row' to="/ResetPassword">
              <button>Change Password</button>
            </NavLink>
            <div className="row text-input">
              <div id="phoneError"></div>
              <input ref={newPhone} className="text" type="text" minLength="10"
                placeholder="Enter new phone" onChange={changePhoneNum} required />
            </div>
            <div className="row">
              <button onClick={phoneSubmit}>Click to Update Phone</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const resetTempImage = () => {
  tempImage = "";
}