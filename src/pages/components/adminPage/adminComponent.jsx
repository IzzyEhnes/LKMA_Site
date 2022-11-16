import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { LoggingOut } from "../loginPage/loginComponent";
import { exportEmail, inputFirstName, inputLastName, login } 
  from "../loginPage/loginComponent";
import { useAuth } from "../../../AuthContext";
import {useRef} from 'react';

var logOut = true;
var storageData;
var changeAdminInfo = false;
var renderPage = "";

export const adminLogIn = () => {
  logOut = false;
}

export const adminLogout = () => {
  logOut = true;
}

export const fromAdmin = () => {
  changeAdminInfo = true;
}

export const fromStudent = () => {
  changeAdminInfo = false;
}

export const AdminComponent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [render, setRender] = useState("");
  
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    storageData = JSON.parse(localStorage.getItem("user"));
    if (login) {
      setRender(true);
      setAuth(true);
      setFirstName(inputFirstName);
      setLastName(inputLastName);
      setProfileEmail(exportEmail);
    }

    if (logOut) {
      LoggingOut();
      setFirstName("N/A");
      setLastName("N/A");
      setProfileEmail("N/A");
    }
  }, [renderPage]);


  const accessCode=useRef(null);

  const handleSubmit = async (e) => {
    alert("Success! The access code has been updated.")
    e.preventDefault();
    const { code } = e.target.elements;
    let details = {
      code: code.value,
    };
    let response = await fetch("http://localhost:3001/changeAccessCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
  };

  return (
    <div id='admin' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Admin</h2>
        </div>
        <div className='row'>
          <h1>Display Admin Account Details Below</h1>
          <div className="column">
            {storageData ? (
              <h1 data-testid="firstName">{storageData.firstName}</h1>
            ) : (<h1 data-testid="firstName">{firstName}</h1>)}
            {storageData ? (
              <h1 data-testid="lastName">{storageData.lastName}</h1>
            ) : (<h1 data-testid="lastName">{lastName}</h1>)}
          </div>
          <div className="column"></div>
          <div className="column">
            {storageData ? (<h1 data-testid="profileEmail">Email: {storageData.email}</h1>) 
              : (<h1 data-testid="profileEmail">Email: {profileEmail}</h1>)}
          </div>
        </div>
        <div className='row'>
          <div className="column">
            <NavLink to="/ResetPassword">
              <button>Change Password</button>
            </NavLink>
          </div>
          <div className="column">
            <NavLink className="nav-link" to="/login">
              <button data-testid="logOut" className="ghost" id="logIn" 
              onClick={() => {
                logOut = true;
                setRender(Math.random());
                setAuth(false);
                localStorage.clear();
              }}>Log out</button>
            </NavLink>
          </div>
          <div className="column">
            <NavLink to="/changeemail">
              <button type="button">
                Change Email
              </button>
            </NavLink>
          </div>
        </div>
        <div className='row'>
          <button>See Student Info</button>
        </div>
        <div className="access-code">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
                  <h3>Change access code:</h3>
                  <input ref={accessCode} id="code" type="text" placeholder="Enter a new access code" required/>
                  <button type="submit">Submit</button>
                  <div id="submitMessage"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export const resetRender = () => {
  renderPage = "";
}

export { changeAdminInfo };
