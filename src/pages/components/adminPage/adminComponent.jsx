import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { LoggingOut, changeFilePath } from "../loginPage/loginComponent";
import { exportEmail, exportPassword, inputFirstName, inputLastName, exportPhone, filePath, 
  login, changePhone } from "../loginPage/loginComponent";
import { useAuth } from "../../../AuthContext";
import {useRef} from 'react';
import data from "../../data/studentInfoData.json";

var logOut = true;
var storageData;
var changeAdminInfo = false;
var renderPage = "";
var tempImage = "";
var resetImage = false;
var uploadImage = false;
var storageData;
var storageDataFile;

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
  const [phone, setPhone] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [render, setRender] = useState("");
  
  const [imageFilePath, setImageFilePath] = useState("");
  const [students, setStudents] = useState(data);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    storageData = JSON.parse(localStorage.getItem("user"));
    storageDataFile = JSON.parse(localStorage.getItem("filePath"));
    if (login) {
      setRender(true);
      setAuth(true);
      setFirstName(inputFirstName);
      setLastName(inputLastName);
      setPhone(exportPhone);
      setProfileEmail(exportEmail);
      setImageFilePath(filePath);
    } else {
      setImageFilePath("\\img\\profile-blank-whitebg.png");
    }

    if (resetImage) {			
			const formData = new FormData();
			formData.append('email', exportEmail);
			formData.append('password', exportPassword);

			try {
				const res = axios.post("http://localhost:3001/retrieveImage", formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});

				const filePath = res.filePath;
				setImageFilePath(filePath);
				tempImage = filePath;				
			} catch (err) {
				if (err.response.status === 500) {
					console.log("There was a problem with server.");
				} else {
					console.log(err.response.data.message);
				}
			}

			resetImage = false;
		}

		if (uploadImage) {
			const formData = new FormData();

			if (tempImage != "") {
				formData.append('image', tempImage);
				formData.append('email', exportEmail);
	
				try {
					axios.post("http://localhost:3001/uploadImage", formData).then((response) => {	
						const filePath = response.data.filePath;
		
						changeFilePath(filePath);
						setImageFilePath(filePath);
						tempImage = "";

            window.localStorage.setItem("filePath", JSON.stringify(filePath));
            storageDataFile = JSON.parse(localStorage.getItem("filePath"));
						uploadImage = false;
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

    if (logOut) {
      LoggingOut();
      setFirstName("N/A");
      setLastName("N/A");
      setProfileEmail("N/A");
    }
  }, [renderPage]);


  const accessCode=useRef(null);
  const newPhone = useRef(null);

  const handleSubmit = async (e) => {
    alert("Success! The access code has been updated.")
    e.preventDefault();
    console.log("test");
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

  const phoneSubmit = () => {

    const formData = new FormData();

      formData.append('email', storageData.exportEmail);
			formData.append('phone', phone);

      try {
        axios.post("http://localhost:3001/changePhone", formData).then((response) => {
          if(response.data.message === "Changed Phone Successfully") {
            changePhone(response.data.result[0].phone_number);
            const user = {exportEmail, inputFirstName, inputLastName, exportPhone};
            window.localStorage.setItem("user", JSON.stringify(user));
                
            storageData = JSON.parse(localStorage.getItem("user"));
          }
          navigate("/admin");
        });
      } catch (err) {
        if (err.response.status === 500) {
          console.log("There was a problem with server.");
        } else {
          console.log(err.response.data.message);
        }
      }
  }


  //Remove account by ID
  //Attempting to make a confirm dialog
  //const [accountId, setId] = useState("");
  //const accountId=setId;

  const inputAccountId=useRef(null); //Input from Form
  const accountId = useRef(null);

  const accountSubmit = async (e) => {
    //const accountId = { accountId: accountId};
    e.preventDefault();
    const { accountId } = e.target.elements;
    let details = {
      accountId: accountId.value,
    };
   alert("ID: " + accountId.value + " has been deleted");
    let response = await fetch("http://localhost:3001/accountRemoval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    } ,window.location.reload(false) );
  };

  // Check for NO letters in Account ID
  const [value, setValue] = useState('');
  const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');
    setValue(result);
    //setId(result);

  };
  /*
  Test inputs
  console.log(value);
  console.log(typeof value);
  console.log(Number(value));
  */

  // Validation of NO empty string (Doesnt change empty to 0)
    if (value !== '') {
    const num = Number(value);
  }



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
          <div className='row'>
            <div className="login-form">
              <label htmlFor="file-upload" className="custom-file">Choose Image</label>
                <input data-testid="uploadFile" type="file" id="file-upload" 
                name="imageFile" accept="image/*" onChange={(e) => {
                  tempImage = e.target.files[0];

                  if (tempImage == undefined) {
                    resetImage = true;
                    document.getElementById("chosenImage").innerHTML = "";
                  }	else {
                    document.getElementById("chosenImage").innerHTML 
                      = tempImage.name;
                  }							
                  uploadImage = false;
                }} />
              <NavLink className="nav-link" to="/profile">
                <input data-testid="uploadSubmit" type="submit" 
                value="Upload Image" onClick={() => {
                  if (tempImage != undefined) {
                    uploadImage = true;
                    resetImage = false;
                    document.getElementById("chosenImage").innerHTML = "";
                  }
                }} />
              </NavLink>
            </div>
          </div>
          <div className="column-left">
            <h3>First Name</h3>
            {storageData? (storageData.inputFirstName? (<h1 data-testid="firstName">{storageData.inputFirstName}</h1>) : ((<h1 data-testid="firstName">{storageData.fnameReg}</h1>))) : (<h1 data-testid="firstName">{firstName}</h1>)} 
            <h3>Last Name</h3>
            {storageData? (storageData.inputLastName? (<h1 data-testid="firstName">{storageData.inputLastName}</h1>) : ((<h1 data-testid="firstName">{storageData.lnameReg}</h1>))) : (<h1 data-testid="firstName">{lastName}</h1>)}
            <h3>Email</h3>
            {storageData? (storageData.exportEmail? (<h1>{storageData.exportEmail}</h1>) : ((<h1>{storageData.emailReg}</h1>))) : (<h1>{profileEmail}</h1>)}
            <h3>Phone Number</h3>
            {storageData? (storageData.exportPhone && storageData.exportPhone.length>9? (<h1>{storageData.exportPhone.substr(0, 3)}-{storageData.exportPhone.substr(3, 3)}-{storageData.exportPhone.substr(6, 4)}</h1>) : (<h1>{phone}</h1>)) : (<h1>{phone}</h1>)}
            <NavLink className="nav-link red" to="/login">
              <button data-testid="logOut" className="ghost" id="logIn" onClick={() => {
                logOut = true;
                setRender(Math.random());
                setAuth(false);
                localStorage.clear();
              }}>Log out</button>
            </NavLink>
          </div>
          <div className="column">
              <a className="row" href={props.data ? props.data.uploadLink : ""} target="_blank">
                <button>Upload Assignment</button>
              </a>
              <a className="row" href={props.data ? props.data.downloadLink : ""} target="_blank">
                <button>Download Assignment</button>
              </a>
              <NavLink className='row' to="/ChangeEmail">
                <button>Change Email</button>
              </NavLink> 
              <NavLink className='row' to="/ResetPassword">
                <button>Change Password</button>
              </NavLink>
              <div className="row text-input">
                <input ref={newPhone} className="text" type="text"
                      placeholder="Enter new phone" onChange={(e) => {
                        setPhone(e.target.value);
                      }} required />
              </div>
              <div className="row">
                <button onClick={phoneSubmit}>Click to Update Phone</button>
              </div>
            </div>
          </div>
        </div>
        <div className="access-code">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
                  <h3>Change access code:</h3>
                  <div className="text-input">
                    <input ref={accessCode} id="code" type="text" placeholder="Enter new access code" required/>
                  </div>
                  <button type="submit">Submit</button>
                  <div id="submitMessage"></div>
            </form>
          </div>
        </div>
        <div className="container-table">
        <div className='row'>
          {/* MAKE TABLE HERE */}
          <table>
            <thead>
              <tr>
                <th> Account ID </th>
                <th> First Name </th>
                <th> Last Name </th>
                <th> Email </th>
                <th> Phone Number </th>
                <th> Account Image </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={i}>
                  <td>{student.account_id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.account_image}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* DB ACCOUNT DELETE */}
        <div className="delete-account">
          <div className="form-container">
            <form onSubmit={accountSubmit} >
                  <h3>Delete User Account by Entering ID:</h3>
                  <div className="text-input">
                    <input 
                        ref={accountId} id="accountId" placeholder="Enter Account ID"
                        type="text" 
                        value={value}
                        onChange={handleChange}
                        required/>
                  </div>
                  <button 
                     className="delete-button"
                     type='submit'
                  >Submit</button>
                  <div id="submitMessage"></div>
            </form>
          </div>
        </div>{/* End DB Div */}
        </div>
      </div>
  )
}

export const resetRender = () => {
  renderPage = "";
}

export { changeAdminInfo };
