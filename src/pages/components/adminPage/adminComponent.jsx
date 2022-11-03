import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { loggingOut } from "../loginPage/loginComponent";
import { exportEmail, inputFirstName, inputLastName, login } 
  from "../loginPage/loginComponent";
import {useRef} from 'react';
import data from "../../data/studentInfoData.json";

var logOut = true;
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
  const [students, setStudents] = useState(data);
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
          {/* MAKE TABLE HERE */}
          <table>
            <thead>
              <tr>
                <th> Account ID </th>
                <th> Student ID </th>
                <th> First Name </th>
                <th> Last Name </th>
                <th> Email </th>
                <th> Password </th>
                <th> Phone Number </th>
                <th> Account Image </th>
              </tr>
            </thead>
            <tbody>
              {students.StudentInfoData.map((student) => (
                <tr>
                  <td>{student.account_id}</td>
                  <td>{student.student_id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.password}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.account_image}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
