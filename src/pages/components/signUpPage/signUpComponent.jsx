import { NavLink } from "react-router-dom";
import {useRef} from 'react';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateName = (name) => {
  return String(name)
    .toLowerCase()
    .match(
      /^[a-zA-Z]+$/
    );
};

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

export const SignUpComponent = (props) => {

  const inputFirstName=useRef(null);
  const inputLastName=useRef(null);
  const inputEmail=useRef(null);
  const inputPassword=useRef(null);
  const inputPasswordConfirm=useRef(null);

  function handleClick() {
    // console.log(inputEmail.current.value);
    // console.log(inputPassword.current.value);
    // console.log(inputPasswordConfirm.current.value);
  }

  function functions() {
    validate();
    handleClick();
  }


  function validate() {
    if(inputFirstName.current.value === ""){
      console.log("No first name provided")
      document.getElementById("firstNameError").innerHTML = "Please provide your first name"
    }else if(validateName(inputFirstName.current.value)){
      console.log("First name valid")
      document.getElementById("firstNameError").innerHTML = ""
    }else{
      console.log("First name must only contain letters")
      document.getElementById("firstNameError").innerHTML = "First name must only contain letters"
    }

    if(inputLastName.current.value === ""){
      console.log("No last name provided")
      document.getElementById("lastNameError").innerHTML = "Please provide your last name"
    }else if(validateName(inputLastName.current.value)){
      console.log("Last name valid")
      document.getElementById("lastNameError").innerHTML = ""
    }else{
      console.log("Last name must only contain letters")
      document.getElementById("lastNameError").innerHTML = "Last name must only contain letters"
    }

    if(inputEmail.current.value === ""){
      console.log("No email provided")
      document.getElementById("emailError").innerHTML = "Please provide an email"
    }else if(validateEmail(inputEmail.current.value)){
      console.log("Email valid")
      document.getElementById("emailError").innerHTML = ""
    }else{
      console.log("Email invalid")
      document.getElementById("emailError").innerHTML = "Please enter a valid email"
    }

    if(inputPassword.current.value === ""){
      console.log("No password provided")
      document.getElementById("passwordError").innerHTML = "Please provide a password"
    }else if(inputPassword.current.value.length > 7 && checkUppercase(inputPassword.current.value) && checkLowercase(inputPassword.current.value)){
      console.log("Valid Password")
      document.getElementById("passwordError").innerHTML = ""
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

    if(inputPassword.current.value === inputPasswordConfirm.current.value && inputPassword.current.value !== "") {
      console.log("Passwords match")
      document.getElementById("matchingError").innerHTML = ""
    }else if(inputPassword.current.value === "" || inputPasswordConfirm.current.value === ""){
      //Doing nothing as error already given by another error message
      document.getElementById("matchingError").innerHTML = ""
    }else{
      console.log("Password and conformation password do not match")
      document.getElementById("matchingError").innerHTML = "Password and conformation password do not match"
    }

  }

    return (
      <div id='sign-up' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="sign-up-form">
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div id="firstNameError"></div>
                        <div id="lastNameError"></div>
                        <div id="emailError"></div>
                        <div id="passwordError"></div>
                        <div id="passwordConfirmError"></div>
                        <div id="matchingError"></div>
                        <input ref={inputFirstName} id="firstName" type="text" placeholder="First Name" required/>
                        <input ref={inputLastName} id="lastName" type="text" placeholder="Last Name" required/>
                        <input ref={inputEmail} id="email" type="email" placeholder="Enter your email" required/>
                        <input ref={inputPassword} id="password" type="password" placeholder="Password" minlength="8" required/>
                        <input ref={inputPasswordConfirm} id="passwordConfirm" name="passwordConfirm" type="password" placeholder="Confirm Password" minlength="8" required/>
                        <button type="button" onClick={functions} >Sign Up</button>
                        <label></label>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>Already have an account?</h1>
                            <p>Click the button below to go to the Login page and sign in to an existing account.</p>
                            <NavLink className="nav-link" to="/login">
                              <button class="ghost" id="logIn">Login</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    )
  }