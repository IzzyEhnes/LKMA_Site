import { NavLink } from "react-router-dom";
import {useRef} from 'react';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



export const SignUpComponent = (props) => {

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
      document.getElementById("passwordError").innerHTML = "No password provided"
    }else if(inputPassword.current.value.length > 7){
      console.log("Valid Password")
      document.getElementById("passwordError").innerHTML = ""
    }else{
      console.log("Password must be 8 characters or longer in length")
      document.getElementById("passwordError").innerHTML = "Password must be 8 characters or greater in length"
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
                        <div id="emailError"></div>
                        <div id="passwordError"></div>
                        <div id="passwordConfirmError"></div>
                        <div id="matchingError"></div>
                        <input ref={inputEmail} type="email" id="email" placeholder="Enter your email" required/>
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