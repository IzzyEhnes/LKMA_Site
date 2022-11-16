//import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useState, useEffect } from "react";
import { exportEmail, inputFirstName, inputLastName, changeEmail } from "../loginPage/loginComponent";
import { changeAdminInfo } from "../adminPage/adminComponent";
import axios from "axios";

var validEmail = false;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const ChangeEmailComponent = (props) => {

  const inputEmail = useRef(null);
  const inputEmailConfirm = useRef(null);
  const [newEmail, setNewEmail] = useState("");

  const navigate = useNavigate();

  const changeProfileEmail = () => {
    const data = { email: exportEmail, newEmail: newEmail };

    if (validEmail) {
      try {
        axios.post("http://localhost:3001/emailCheck", data).then((response) => {
          console.log("response: " + response.data.message);  
          if (response.data.message !== "email is already being used") {
            console.log(response.data.message);
            try {
              axios.post("http://localhost:3001/accountEmail", data).then((response) => {
                if (response.data.message === "email succesfully changed") {
                  changeEmail(response.data.changedEmail);
                  validEmail = false;
                  const fname = (JSON.parse(localStorage.getItem("user"))).firstName;
                  const lname = (JSON.parse(localStorage.getItem("user"))).lastName;
                  const user = {email: newEmail, firstName: fname, 
                    lastName: lname};
                  window.localStorage.setItem("user", JSON.stringify(user));

                  if (changeAdminInfo) {
                    try {
                      axios.post("http://localhost:3001/adminEmail", data).then((response) => {
                        if (response.data.message === "email is not valid") {
                          console.log("email is not valid");
                          document.getElementById("emailError").innerHTML 
                            = "That email is not valid. Please choose another one.";
                        }
                      });
                    } catch (err) {
                      if (err.response.status === 500) {
                        console.log("There was a problem with server.");
                      } else {
                        console.log(err.response.data.message);
                      }
                    }

                    navigate("/admin");
                  } else {
                    navigate("/profile");
                  }
                } else if (response.data.message === "email is not valid") {
                  console.log("email is not valid");
                  document.getElementById("emailError").innerHTML 
                    = "That email is not valid. Please choose another one.";
                } else if (response.data.message === "email is already being used") {
                  console.log("email is already being used");
                  document.getElementById("emailError").innerHTML 
                    = "That email is already being used. Please choose another one.";
                }
              });
            } catch (err) {
              if (err.response.status === 500) {
                console.log("There was a problem with server.");
              } else {
                console.log(err.response.data.message);
              }
            }
          } else {
            console.log("email is already being used");
            document.getElementById("emailError").innerHTML 
              = "That email is already being used. Please choose another one.";
          }
        });
      } catch (err) {
        if (err.response.status === 500) {
          console.log("There was a problem with server.");
        } else {
          console.log(err.response.data.message);
        }
      }
    } else {
      console.log("Email and confirmation email do not match")
      document.getElementById("emailError").innerHTML 
              = "";
      document.getElementById("matchingError").innerHTML = "Email and confirmation email do not match"
    }
  };

  function validate() {
    validEmail = false;

    if (inputEmail.current.value === "") {
      console.log("No email provided")
      document.getElementById("emailError").innerHTML = "Please provide an email"
    } else if (!validateEmail(inputEmail.current.value)) {
      console.log("Email invalid")
      document.getElementById("emailError").innerHTML = "Please enter a valid email"
    } else {
      console.log("Email valid: " + inputEmail.current.value)
      console.log("Input email confirm: " + inputEmailConfirm.current.value)
      document.getElementById("emailError").innerHTML = ""

      if (inputEmail.current.value === inputEmailConfirm.current.value 
        && inputEmail.current.value !== "") {
        console.log("Emails match")
        validEmail = true;
        document.getElementById("matchingError").innerHTML = ""
      } else if (inputEmail.current.value === "" 
        || inputEmailConfirm.current.value === "") {
        //Doing nothing as error already given by another error message
        document.getElementById("matchingError").innerHTML = ""
      } else {
        console.log("Email and confirmation email do not match")
        document.getElementById("matchingError").innerHTML = "Email and confirmation email do not match"
      }
    }    
  }

  return (
    <div id='change-email' className='text-center'>
      <div className='container'>
        <div className='row'>
          <div className="change-email-form">
            <div className="form-container submit-container">
              <form action="#">
                <h1>Change Email</h1>
                <div data-testid="emailError" id="emailError"></div>
                <div className="submit" data-testid="matchingError" id="matchingError"></div>
                <input ref={inputEmail} data-testid="emailChecks" id="email" type="email"
                  placeholder="Email" onChange={(e) => {
                    validate();
                  }} required />
                <input ref={inputEmailConfirm} data-testid="emailConfirm" id="EmailConfirm" type="email"
                  placeholder="Confirm Email" onChange={(e) => {
                    setNewEmail(e.target.value);
                    validate();
                  }} required />
                <button type="button" data-testid="emailSubmit" onClick={changeProfileEmail}>Submit</button>
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