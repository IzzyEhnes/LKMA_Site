import { NavLink } from "react-router-dom";
import {useRef} from 'react';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const ForgotComponent = (props) => {

  const inputEmail=useRef(null);

  const handleSubmit = async (e) => {
    document.getElementById("submitMessage").innerHTML = "Success! If an account associated with that email address was found, a password reset email has been sent."
    e.preventDefault();
    const { email } = e.target.elements;
    let details = {
      email: email.value,
    };
    let response = await fetch("http://localhost:3001/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
  };

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
  }

    return (
      <div id='forgot' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h1>Forgot Password?</h1>
                <h3>Enter your email below and you will receive a link to reset your password.</h3>
                <div id="emailError"></div>
                <input ref={inputEmail} id="email" type="email" placeholder="Enter your email" required/>
                <button type="submit" onClick={validate}>Submit</button>
                <div id="submitMessage"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }