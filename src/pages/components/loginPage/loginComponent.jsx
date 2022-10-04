import { NavLink } from "react-router-dom";
import {useRef} from 'react';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const LoginComponent = (props) => {

  const inputEmail=useRef(null);
  const inputPassword=useRef(null);

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
      document.getElementById("passwordError").innerHTML = "Please provide a password"
    }else if(inputPassword.current.value.length > 7){
      console.log("Valid Password")
      document.getElementById("passwordError").innerHTML = ""
    }else{
      console.log("Password must be 8 characters or longer in length")
      document.getElementById("passwordError").innerHTML = "Password must be 8 characters or greater in length"
    }
  }

    return (
      <div id='login' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="login-form">
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div id="emailError"></div>
                        <div id="passwordError"></div>
                        <input ref={inputEmail} id="email" type="email" placeholder="Enter your email" required/>
                        <input ref={inputPassword} id="password" type="password" placeholder="Password" minlength="8" required/>
                        <a href="#">Forgot your password?</a>
                        <button type="button" onClick={validate} >Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>Don't have an account with us yet?</h1>
                            <p>Click the button below to go to the Sign Up page.</p>
                            <NavLink className="nav-link" to="/signup">
                              <button class="ghost" id="logIn">Sign Up</button>
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