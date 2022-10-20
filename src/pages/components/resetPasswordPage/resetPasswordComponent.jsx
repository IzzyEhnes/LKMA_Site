import { NavLink } from "react-router-dom";
import {useRef} from 'react';

import { useState, useEffect } from "react";
import axios from "axios";

function checkUppercase(str){
  for (var i=0; i<str.length; i++){
    if (str.charAt(i) === str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
};

function checkLowercase(str){
  for (var i=0; i<str.length; i++){
    if (str.charAt(i) === str.charAt(i).toLowerCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
};


export const ResetPasswordComponent = (props) => {

  const inputPassword=useRef(null);
  const inputPasswordConfirm=useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*const changePassword = () => {
  const data = {email: email, password: password};
      axios.post("http://localhost:3001/password", data).then((response) => {
        console.log(response.data);
        }); 
    };*/




  function validate() {
    if(inputPassword.current.value === ""){
      console.log("No password provided")
      document.getElementById("passwordError").innerHTML = "Please provide a password"
    }else if(inputPassword.current.value.length > 7 && checkUppercase(inputPassword.current.value) && checkLowercase(inputPassword.current.value)){
      console.log("Valid Password")
      document.getElementById("passwordError").innerHTML = ""
    }else if(inputPassword.current.value.length > 7 && !checkUppercase(inputPassword.current.value) && !checkLowercase(inputPassword.current.value)){
      console.log("Password must contain letters")
      document.getElementById("passwordError").innerHTML = "Password must contain letters"
    }else if(inputPassword.current.value.length < 8){
      console.log("Password must be 8 characters or longer in length")
      document.getElementById("passwordError").innerHTML = "Password must be 8 characters or greater in length"
    } else if (checkUppercase(inputPassword.current.value)){
      console.log("Password must contain at least one lowercase letter")
      document.getElementById("passwordError").innerHTML = "Password must contain at least one lowercase letter"
    } else if (checkLowercase(inputPassword.current.value)){
      console.log("Password must contain at least one uppercase letter")
      document.getElementById("passwordError").innerHTML = "Password must contain at least one uppercase letter"
    }

    if(inputPasswordConfirm.current.value === ""){
      console.log("Confirmation password not provided")
      document.getElementById("passwordConfirmError").innerHTML = "No confirmation password provided"
    }else{
      document.getElementById("passwordConfirmError").innerHTML = ""
    }

    //IF passwords match then it is sent to the DB. NEED AUTH TOKEN
    if(inputPassword.current.value === inputPasswordConfirm.current.value && inputPassword.current.value !== "") {
      console.log("Passwords match")
      document.getElementById("matchingError").innerHTML = ""
      //{changePassword};
      changePassword();

    }else if(inputPassword.current.value === "" || inputPasswordConfirm.current.value === ""){
      //Doing nothing as error already given by another error message
      document.getElementById("matchingError").innerHTML = ""
    }else{
      console.log("Password and confirmation password do not match")
      document.getElementById("matchingError").innerHTML = "Password and confirmation password do not match"
    }
  }

const changePassword = () => {
  const data = {email: email, password: password};
      axios.post("http://localhost:3001/password", data).then((response) => {
        console.log(response.data);
        }); 
    };


    return (
      <div id='reset-password' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="reset-password-form">
                <div class="form-container submit-container">
                    <form action="#">
                        <h1>Reset Password</h1>
                        <div id="passwordError"></div>
                        <div id="passwordConfirmError"></div>
                        <div id="matchingError"></div>

                        {/* THIS IS A TEMP SOLUTION FOR EMAIL PASSWORD CHANGE*/}
                        <input onChange={(e) => {setEmail(e.target.value);}} ref={setEmail} id="email" type="email" placeholder="Email"/>

                        <input ref={inputPassword} id="password" type="password" placeholder="Password" minlength="8" required/>
                        <input onChange={(e) => {setPassword(e.target.value);}} ref={setPassword} id="passwordConfirm" name="passwordConfirm" type="password"  placeholder="Confirm Password" minlength="8" required/>
                        <button type="button" onClick={changePassword}>Submit</button>
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