import { NavLink } from "react-router-dom";
import { useRef } from 'react';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { GoToLogin } from "../loginPage/loginComponent";
import { useEffect } from "react";
import { fromAdmin, fromStudent } from "../adminPage/adminComponent";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var regFirstName = "";
var regLastName = "";
var expRegEmail = "";
var expRegPassword = "";
var expRegPhone = "";
var regFilePath = "profile-blank-whitebg.png";
var exportImage = "";
var validFirstName, validLastName, validEmail, validPassword,
    validConfirm, validAccessCode = false;
var signUp = false;
var adminLogin = "";

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

/*
const validateAccessCode = async (code) => {
  const formData = new FormData();
  formData.append('access_code', code);
  matchingCode = false;
  useEffect(() => {
    let isMounted = true;
    fetchCode();
    return () => {
      isMounted = false;
    };
    function fetchCode() {
      if(String(code).toLowerCase().match(/^[a-zA-Z]+$/)) {
        try {
          axios.post("http://localhost:3001/accessCode", formData).then((response) => {
            console.log(response.data.message);
            if(response.data.message !== "Invalid Access Code") {
              matchingCode = true; //Given access code matches code in DB
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
  }, []);
  return matchingCode;
};
*/

const validateCode = (code) => {
  return String(code)
    .toLowerCase()
    .match(
      /^[a-zA-Z\-0-9]+$/
    );
};

export const SignUpComponent = (props) => {

  const navigate = useNavigate();
  const [regStatus, setRegStatus] = useState("");
  const [fnameReg, setFnameReg] = useState("");
  const [lnameReg, setLnameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [phoneReg, setPhoneReg] = useState("");
  const [user, setUser] = useState();
  const [imageReg, setImageReg] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputPasswordConfirm = useRef(null);
  const inputAccessCode = useRef(null);

  const checkAdmin = async () => {
    adminLogin = false;

    try {
      axios.post("http://localhost:3001/admin").then((response) => {
        const adminEmails = response.data.result;
        var i;

        for (i = 0; i < adminEmails.length; i++) {
          if (adminEmails[i].email == expRegEmail) {
            adminLogin = true;
          }
        }

        if (adminLogin) {
          fromAdmin();
          setAdminStatus(1);
          navigate("/admin");
        } else {
          fromStudent();
          setAdminStatus(0);
          navigate("/profile");
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with server.");
      } else {
        console.log(err.response.message);
      }
    }
  };

  const setAdminStatus = async (adminStatus) => {
    const formData = new FormData();
    formData.append("admin", adminStatus);
    formData.append("jwt", localStorage.getItem("token"));
    
    try {
      await axios.post("http://localhost:3001/setAdmin", formData);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with server.");
      } else {
        console.log(err.response.data.message);
      }
    }
  };

  const HandleClick = () => {
    const data = {
      fname: fnameReg, lname: lnameReg, email: emailReg, password: passwordReg, 
      imageFile: imageReg, phone: phoneReg, accCode: accessCode
    };

    axios.post("http://localhost:3001/", data).then((response) => {
      const user = {firstName: fnameReg, lastName: lnameReg};
      setRegStatus(response.data.message);

      if(response.data.message === "registration successful") {
        exportImage = imageReg;
        regFirstName = fnameReg;
        regLastName = lnameReg;
        expRegEmail = emailReg;
        expRegPassword = passwordReg;
        expRegPhone = phoneReg;
        signUp = true;

        const jwt = response.data.accessToken;
        window.localStorage.setItem("token", jwt);
        
        GoToLogin();
        checkAdmin();
      } else if (response.data.message === "Invalid Access Code") {
        document.getElementById("accessCodeError").innerHTML = "Access Code Incorrect"
      } else { 
        // console.log("email is already being used");
        document.getElementById("emailError").innerHTML 
          = "That email already has an account. Please choose another email.";
      }
    });
  };

  function functions() {
    validate();
    validatePass();
    validateConfirmPass();
    validated();
  }

  function validate() {
    if (inputFirstName.current.value === "") {
      // console.log("No first name provided")
      document.getElementById("firstNameError").innerHTML = "Please provide your first name"
    } else if (validateName(inputFirstName.current.value)) {
      // console.log("First name valid")
      validFirstName = true;
      document.getElementById("firstNameError").innerHTML = ""
    } else {
      // console.log("First name must only contain letters")
      document.getElementById("firstNameError").innerHTML = "First name must only contain letters"
    }

    if (inputLastName.current.value === "") {
      // console.log("No last name provided")
      document.getElementById("lastNameError").innerHTML = "Please provide your last name"
    } else if (validateName(inputLastName.current.value)) {
      // console.log("Last name valid")
      validLastName = true;
      document.getElementById("lastNameError").innerHTML = ""
    } else {
      // console.log("Last name must only contain letters")
      document.getElementById("lastNameError").innerHTML = "Last name must only contain letters"
    }

    if (inputEmail.current.value === "") {
      // console.log("No email provided")
      document.getElementById("emailError").innerHTML = "Please provide an email"
    } else if (validateEmail(inputEmail.current.value)) {
      // console.log("Email valid")
      validEmail = true;
      document.getElementById("emailError").innerHTML = ""
    } else {
      // console.log("Email invalid")
      document.getElementById("emailError").innerHTML = "Please enter a valid email"
    }

    if(inputAccessCode.current.value === "") {
      // console.log("No access code provided")
      document.getElementById("accessCodeError").innerHTML = "Please provide an access code"
    } else if(validateCode(inputAccessCode.current.value)) {
      validAccessCode = true;
      // console.log("Access Code Valid");
      document.getElementById("accessCodeError").innerHTML = ""
    } else {
      // console.log("Access Code Incorrect")
      document.getElementById("accessCodeError").innerHTML = "Access Code Incorrect"
    }

  }

  function validatePass() {
      validPassword = false;

    //PASS LEFT BLANK
    if (inputPassword.current.value === "") {
       //console.log("No password provided") 
      document.getElementById("passwordError").innerHTML = "Please provide a password"

    //PASS LESS THAN 8
    }  else if (inputPassword.current.value.length < 8) {
       //console.log("Password must be 8 characters or longer in length")
      document.getElementById("passwordError").innerHTML = "Password must be 8 characters or greater in length"
      document.getElementById("matchingError").innerHTML = ""

    //PASS NEEDS UPPERCASE
    } else if (!checkUppercase(inputPassword.current.value)) {
       //console.log("Password must contain at least one uppercase letter")
      document.getElementById("passwordError").innerHTML = "Password must contain at least one uppercase letter"
      document.getElementById("matchingError").innerHTML = ""

    //PASS NEEDS LOWERCASE
    } else if (!checkLowercase(inputPassword.current.value)) {
       //console.log("Password must contain at least one lowercase letter")
      document.getElementById("passwordError").innerHTML = "Password must contain at least one lowercase letter"
      document.getElementById("matchingError").innerHTML = ""

    //PASS GREATER THAN 7, UPPERCASE, LOWERCASE = VALID PASSWORD
    } else if (inputPassword.current.value.length > 7 && checkUppercase(inputPassword.current.value) && checkLowercase(inputPassword.current.value)) {
       //console.log("Valid Password")
      validPassword = true;
      document.getElementById("passwordError").innerHTML = "Valid Password"

    //This shouldnt happen but if it does something went wrong.
    } else {
        document.getElementById("passwordError").innerHTML = "An Error Occured Please Contact Admin: Password Box"
    }
  }

  function validateConfirmPass() {
      validConfirm = false;
    
    //CONFIRM LEFT BLANK
    if (inputPasswordConfirm.current.value === "") {
       //console.log("Confirmation password not provided")
      document.getElementById("passwordConfirmError").innerHTML = "No confirmation password provided"

    //IF EITHER ARE BLANK = FAIL
    } else if (inputPassword.current.value === "" || inputPasswordConfirm.current.value === "") {
      //Doing nothing as error already given by another error message
      document.getElementById("passwordConfirmError").innerHTML = ""
      document.getElementById("matchingError").innerHTML = "Password or Confirm Are Empty"

    //IF THEY DO NOT MATCH = FAIL
    } else if (inputPassword.current.value !== inputPasswordConfirm.current.value) {
      //console.log("Password and confirmation password do not match")
      document.getElementById("matchingError").innerHTML = "Password and confirmation password do not match"
      document.getElementById("passwordConfirmError").innerHTML = ""

    //CONFIRM LESS THAN 8
    } else if (inputPasswordConfirm.current.value.length < 8) {
      // console.log("Password must be 8 characters or longer in length")
      // Doing nothing since they must be more than 7 Char.
      document.getElementById("passwordConfirmError").innerHTML = ""

    //PASS NEEDS UPPERCASE
    } else if (!checkUppercase(inputPasswordConfirm.current.value)) {
      // console.log("Password must contain at least one lowercase letter")
      document.getElementById("passwordConfirmError").innerHTML = ""

    //PASS NEEDS LOWERCASE
    } else if (!checkLowercase(inputPasswordConfirm.current.value)) {
      // console.log("Password must contain at least one uppercase letter")
      document.getElementById("passwordConfirmError").innerHTML = ""

    //PASS GREATER THAN 7, UPPERCASE, LOWERCASE = VALID PASSWORD
    } else if (inputPassword.current.value === inputPasswordConfirm.current.value && inputPassword.current.value !== "") {
      // console.log("Passwords match")
      validConfirm = true;
      document.getElementById("matchingError").innerHTML = "Passwords Match"
      document.getElementById("passwordConfirmError").innerHTML = ""
      
    //This shouldnt happen unless something goes wrong
    } else {
        document.getElementById("passwordConfirmError").innerHTML = "An Error Occured Please Contact Admin - Confirm Password"
    }
    
  }

  function validated(){
    if (validFirstName && validLastName && validEmail && validPassword &&
      validConfirm && validAccessCode) {
      HandleClick();
    }

  }




  return (
    <div id='sign-up' className='text-center'>
      <div className='container'>
        <div className='row'>
          <div className="sign-up-form">
            <div className="form-container sign-in-container">
              <form action="#">
                <h1>Create Account</h1>
                <div id="firstNameError"></div>
                <div id="lastNameError"></div>
                <div id="emailError"></div>
                <div id="passwordError"></div>
                <div id="passwordConfirmError"></div>
                <div id="matchingError"></div>
                <div id="accessCodeError"></div>
                <input ref={inputFirstName} data-testid="firstName"
                  id="firstName" type="text" placeholder="First Name"
                  onChange={(e) => {
                    setFnameReg(e.target.value);
                    setImageReg(regFilePath);
                    setPhoneReg("N/A");
                  }} required />
                <input ref={inputLastName} data-testid="lastName"
                  id="lastName" type="text" placeholder="Last Name"
                  onChange={(e) => {
                    setLnameReg(e.target.value);
                  }} required />
                <input ref={inputEmail} data-testid="email"
                  id="email" type="email" placeholder="Enter your email"
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                  }} required />
                <input ref={inputPassword} data-testid="password"
                  id="password" type="password" placeholder="Password"
                  minLength="8" required />
                <input ref={inputPasswordConfirm} id="passwordConfirm"
                  name="passwordConfirm" type="password"
                  placeholder="Confirm Password" minLength="8" onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }} required />
                <input ref={inputAccessCode} id="accessCode"
                  name="accessCode" type="text"
                  placeholder="Enter Access Code (Given by LKMA)" onChange={(e) => {
                    setAccessCode(e.target.value);
                  }} required />
                <button type="button" data-testid="submit"
                  onClick={functions} >Sign Up</button>
                <label></label>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <h1>Already have an account?</h1>
                  <p>Click the button below to go to the Login page and sign in to an existing account.</p>
                  <NavLink className="nav-link" to="/login">
                    <button className="ghost" id="logIn">Login</button>
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

export { expRegEmail, expRegPassword, regFirstName, regLastName, exportImage, 
  signUp };