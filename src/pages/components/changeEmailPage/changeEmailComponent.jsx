//import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useState, useEffect } from "react";
import { exportEmail, inputFirstName, inputLastName, exportPhone, changeEmail } from "../loginPage/loginComponent";
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
        axios.post("http://localhost:3001/email", data).then((response) => {
          if (response.data.message !== "email is already being used") {
            changeEmail(response.data.changedEmail);
            validEmail = false;
            const user = {exportEmail, inputFirstName, inputLastName, exportPhone};
            window.localStorage.setItem("user", JSON.stringify(user));
            if (changeAdminInfo) {
              //implement new admin email in database via DB query
              navigate("/admin");
            } else {
              navigate("/profile");
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

      if (inputEmail.current.value === inputEmailConfirm.current.value && inputEmail.current.value !== "") {
        console.log("Emails match")
        validEmail = true;
        document.getElementById("matchingError").innerHTML = ""
      } else if (inputEmail.current.value === "" || inputEmailConfirm.current.value === "") {
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
                <div id="emailError"></div>
                <div id="matchingError"></div>
                <input ref={inputEmail} id="email" type="email"
                  placeholder="Email" required />
                <input ref={inputEmailConfirm} id="EmailConfirm" type="email"
                  placeholder="Confirm Email" onChange={(e) => {
                    setNewEmail(e.target.value);
                    validate();
                  }} required />
                <button type="button" onClick={changeProfileEmail}>Submit</button>
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