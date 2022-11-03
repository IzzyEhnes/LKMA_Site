import {useRef} from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";

var expRegEmail = "";
var expRegNewEmail = "";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const ChangeEmailComponent = (props) => {

  const inputEmail=useRef(null);
  const inputEmailConfirm=useRef(null);
  var dupeEmail = "";
  var validEmail, validConfirm = false;

  const [emailReg, setEmailReg] = useState("");
  const [newEmailReg, setNewEmailReg] = useState("");

  const changeEmail = () => {
        const data = {email: emailReg, newEmail: newEmailReg};

        if (dupeEmail === false && validateEmail(inputEmail.current.value) && validConfirm){
          axios.post("http://localhost:3001/email", data).then((response) => {
          console.log(response.data + "1");

          expRegEmail = emailReg;
          expRegNewEmail = newEmailReg;
          }); 
      }
    };

  const checkDupeEmail = async () => {
    dupeEmail = false;

    try {
      axios.post("http://localhost:3001/emailCheck").then((response) => {
        const dupeEmails = response.data.result;
        var i;
        console.log("test:" + expRegNewEmail);

        for (i = 0; i < dupeEmails.length; i++) {
          if (dupeEmails[i].email == inputEmailConfirm.current.value) {
            dupeEmail = true;
            console.log(dupeEmails[i].email);
            console.log("wat");
          }
        }

        console.log("dupeEmail: " + dupeEmail);
        if (dupeEmail === false && validEmail && validConfirm) {
          changeEmail();
          //navigate("/profile");
        }else if(dupeEmail){
          document.getElementById("emailError").innerHTML = "Email already in use.";
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with server.");
      } else {
        console.log(err.response.data.message + "2");
      }
    }
  };

  function validate() {
    if(inputEmail.current.value === ""){
        console.log("No email provided")
        document.getElementById("emailError").innerHTML = "Please provide an email"
      }else if(validateEmail(inputEmail.current.value)){
        console.log("Email valid")
        document.getElementById("emailError").innerHTML = ""
        validEmail = true;
      }else{
        console.log("Email invalid")
        document.getElementById("emailError").innerHTML = "Please enter a valid email"
      }


      if(inputEmail.current.value === inputEmailConfirm.current.value && inputEmail.current.value !== "") {
        console.log("Emails match")
        document.getElementById("matchingError").innerHTML = ""
        validConfirm = true;
      }else if(inputEmail.current.value === "" || inputEmailConfirm.current.value === ""){
        //Doing nothing as error already given by another error message
        document.getElementById("matchingError").innerHTML = ""
      }else{
        console.log("Email and confirmation email do not match")
        document.getElementById("matchingError").innerHTML = "Email and confirmation email do not match"
      }

      checkDupeEmail();
  }

    return (
      <div id='change-email' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="change-email-form">
                <div class="form-container submit-container">
                    <form action="#">
                        <h1>Change Email</h1>
                        <div id="emailError"></div>
                        <div id="matchingError"></div>
                        {/* THIS IS A TEMP SOLUTION FOR EMAIL CHANGE*/}
                        <input onChange={(e) => {setEmailReg(e.target.value);}} ref={setEmailReg} id="email" type="email" placeholder="Old Email"/>
                        <input ref={inputEmail} id="email" type="email" placeholder="Email" required/>
                        <input ref={inputEmailConfirm} onChange={(e) => {setNewEmailReg(e.target.value);}} id="EmailConfirm" type="email" placeholder="Confirm Email" required/>
                        <button type="button" onClick={validate}>Submit</button>
                    </form>
                </div>
                <div class="overlay-container">
                <div class="overlay">
                        <div class="overlay-panel overlay-right">
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

  export { expRegEmail, expRegNewEmail };