import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { loggingOut } from "../loginPage/loginComponent";
import { exportEmail, inputFirstName, inputLastName, login } 
  from "../loginPage/loginComponent";

var logOut = true;
var renderPage = "";

export const adminLogIn = () => {
  logOut = false;
}

export const adminLogout = () => {
  logOut = true;
}

export const AdminComponent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      setFirstName(inputFirstName);
      setLastName(inputLastName);
      setProfileEmail(exportEmail);
    }

    if (logOut) {
      loggingOut();
      setFirstName("N/A");
      setLastName("N/A");
      setProfileEmail("N/A");
    }
  }, [renderPage]);

  return (
    <div id='admin' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Admin</h2>
        </div>
        <div className='row'>
          <h1>Display Admin Account Details Below</h1>
          <div className="column">
            <h1 data-testid="firstName">{firstName}</h1>
            <h1 data-testid="lastName">{lastName}</h1>
          </div>
          <div className="column"></div>
          <div className="column">
            <h1 data-testid="profileEmail">{profileEmail}</h1>
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
      </div>
    </div>
  )
}

export const resetRender = () => {
  renderPage = "";
}
