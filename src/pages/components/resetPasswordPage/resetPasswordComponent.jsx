import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { changePassword } from "../loginPage/loginComponent";
import { exportEmail, email } from "../loginPage/loginComponent";
import { changeAdminInfo } from "../adminPage/adminComponent";

var validPassword = false;

function checkUppercase(str) {
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)) {
      return true;
    }
  }
  return false;
};

function checkLowercase(str) {
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === str.charAt(i).toLowerCase() && str.charAt(i).match(/[a-z]/i)) {
      return true;
    }
  }
  return false;
};

export const ResetPasswordComponent = (props) => {
  const inputPassword = useRef(null);
  const inputPasswordConfirm = useRef(null);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  var resMessage;
  var email;
  var isAdmin;
  var data;
  const jwt = localStorage.getItem("token");
  const formData = new FormData();
  formData.append('jwt', jwt);

  const changeProfilePassword = async () => {
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
        resMessage = data.message;
      })
      .catch((error) => {
        console.log(error);
      });

    if (resMessage == "Authorization Successful.") {
      await axios.post("http://localhost:3001/retrieveUserInfo", formData).then((response) => {
        if (response.data.result[0] !== undefined) {
          email = response.data.result[0].email;
          isAdmin = response.data.result[0].admin_status;
          data = { email: email, newPassword: newPassword };
        }
      });

      if (validPassword && newPassword != "") {
        try {
          await axios.post("http://localhost:3001/password", data).then((response) => {
            changePassword(response.data.changedPassword);
            validPassword = false;

            if (isAdmin == 1) {
              navigate("/admin");
            } else {
              navigate("/profile");
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
  };

  function validate() {
    validPassword = false;
    if (inputPassword.current.value === "") {
      console.log("No password provided")
      document.getElementById("passwordError").innerHTML = "Please provide a password"
    } else if (inputPassword.current.value.length > 7 && checkUppercase(inputPassword.current.value) && checkLowercase(inputPassword.current.value)) {
      console.log("Valid Password")
      document.getElementById("passwordError").innerHTML = ""
    } else if (inputPassword.current.value.length > 7 && !checkUppercase(inputPassword.current.value) && !checkLowercase(inputPassword.current.value)) {
      console.log("Password must contain letters")
      document.getElementById("passwordError").innerHTML = "Password must contain letters"
    } else if (inputPassword.current.value.length < 8) {
      console.log("Password must be 8 characters or longer in length")
      document.getElementById("passwordError").innerHTML = "Password must be 8 characters or greater in length"
    } else if (checkUppercase(inputPassword.current.value)) {
      console.log("Password must contain at least one lowercase letter")
      document.getElementById("passwordError").innerHTML = "Password must contain at least one lowercase letter"
    } else if (checkLowercase(inputPassword.current.value)) {
      console.log("Password must contain at least one uppercase letter")
      document.getElementById("passwordError").innerHTML = "Password must contain at least one uppercase letter"
    }
    if (inputPasswordConfirm.current.value === "") {
      console.log("Confirmation password not provided")
      document.getElementById("passwordConfirmError").innerHTML = "No confirmation password provided"
    } else {
      document.getElementById("passwordConfirmError").innerHTML = ""
    }

    if (inputPassword.current.value === inputPasswordConfirm.current.value && inputPassword.current.value !== "") {
      console.log("Passwords match")
      document.getElementById("matchingError").innerHTML = ""
      validPassword = true;

    } else if (inputPassword.current.value === "" || inputPasswordConfirm.current.value === "") {
      //Doing nothing as error already given by another error message
      document.getElementById("matchingError").innerHTML = ""
    } else {
      console.log("Password and confirmation password do not match")
      document.getElementById("matchingError").innerHTML = "Password and confirmation password do not match"
    }
  }

  return (
    <div id='reset-password' className='text-center'>
      <div className='container'>
        <div className='row'>
          <div className="reset-password-form">
            <div className="form-container submit-container">
              <form action="#">
                <h1>Reset Password</h1>
                <div id="passwordError"></div>
                <div id="passwordConfirmError"></div>
                <div id="matchingError"></div>
                <input ref={inputPassword} id="password" type="password"
                  placeholder="Password" minLength="8" required />
                <input ref={inputPasswordConfirm} id="PasswordConfirm" type="password"
                  placeholder="Confirm Password" minLength="8" onChange={(e) => {
                    setNewPassword(e.target.value);
                    validate();
                  }} required />
                <button type="button" onClick={changeProfilePassword}>Submit</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <img src="/img/resetpassword.jpg"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}