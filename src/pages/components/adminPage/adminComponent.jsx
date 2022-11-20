import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { LoggingOut, changeFilePath } from "../loginPage/loginComponent";
import { exportEmail, inputFirstName, inputLastName, exportPhone, filePath, 
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
  const accessCode=useRef(null);
  const newPhone = useRef(null);

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

    if (logOut) {
      LoggingOut();
      setFirstName("N/A");
      setLastName("N/A");
      setProfileEmail("N/A");
    }
  }, [renderPage]);

  const resetImage = () => {
    const formData = new FormData();
    formData.append('email', storageData.email);

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
  }

  const uploadImage = () => {
    const formData = new FormData();

    if (tempImage != "") {
      formData.append('image', tempImage);
      formData.append('email', storageData.email);

      try {
        axios.post("http://localhost:3001/uploadImage", formData).then((response) => {
          const filePath = response.data.filePath;

          changeFilePath(filePath);
          setImageFilePath(filePath);
          tempImage = "";

          window.localStorage.setItem("filePath", JSON.stringify(filePath));
          storageDataFile = JSON.parse(localStorage.getItem("filePath"));
          setRender(Math.random());
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
    if(validate()){
      const formData = new FormData();
      formData.append('email', storageData.email);
      formData.append('phone', phone);

      try {
        axios.post("http://localhost:3001/changePhone", formData).then((response) => {
          if (response.data.message === "Changed Phone Successfully") {
            changePhone(response.data.result[0].phone_number);
            const user = { email: storageData.email, firstName: storageData.firstName, 
              lastName: storageData.lastName, phone: phone };
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
  }


  //Remove account by ID
  //Attempting to make a confirm dialog
  //const [accountId, setId] = useState("");
  //const accountId=setId;

  const inputAccountId = useRef(null); //Input from Form
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
    }, window.location.reload(false));
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

  function validate() {
    const regex = new RegExp(/[^0-9.]+/g);
    if(newPhone.current.value.length !== 10){
      console.log("Phone number must be 10 digits (Include area code)");
      document.getElementById("phoneError").innerHTML = "Phone number must be 10 digits (Include area code)";
      return false;
    }else if (!regex.test(newPhone.current.value)) {
      console.log("Phone Number Valid");
      document.getElementById("phoneError").innerHTML = "";
      return true;
    } else {
      console.log("Phone number most contain only numbers.");
      document.getElementById("phoneError").innerHTML = "Phone number most contain only numbers.";
      return false;
    }
  }

  return (
    <div id='admin' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Admin</h2>
        </div>
        <div className='row'>
          <div className='row'>
            {storageDataFile ? (
              <img data-testid="profilePic" src={storageDataFile} />
            ) : (<img data-testid="profilePic" src={imageFilePath} />)}
            <h1 id="chosenImage"></h1>
          </div>
          <div className='row'>
            <div className="login-form">
              <label htmlFor="file-upload" className="custom-file">Choose Image</label>
                <input data-testid="uploadFile" type="file" id="file-upload" 
                name="imageFile" accept="image/*" onChange={(e) => {
                  tempImage = e.target.files[0];

                  if (tempImage == undefined) {
                    resetImage();
                    document.getElementById("chosenImage").innerHTML = "";
                  }	else {
                    document.getElementById("chosenImage").innerHTML 
                      = tempImage.name;
                  }							
                }} />
              <NavLink className="nav-link" to="/admin">
                <input data-testid="uploadSubmit" type="submit" 
                value="Upload Image" onClick={() => {
                  if (tempImage != undefined) {
                    uploadImage();
                    document.getElementById("chosenImage").innerHTML = "";
                  }
                }} />
              </NavLink>
            </div>
          </div>
          <div className="column-left">
          <h3>First Name</h3>
            {storageData ? (
              <h1 data-testid="firstName">{storageData.firstName}</h1>
            ) : (<h1 data-testid="firstName">{firstName}</h1>)}
            <h3>Last Name</h3>
            {storageData ? (
              <h1 data-testid="lastName">{storageData.lastName}</h1>
            ) : (<h1 data-testid="lastName">{lastName}</h1>)}
            <h3>Email</h3>
            {storageData ? (
              <h1 data-testid="profileEmail">{storageData.email}</h1>
            ) : (<h1 data-testid="profileEmail">{profileEmail}</h1>)}
            <h3>Phone Number</h3>
            {storageData ? (
              storageData.phone && storageData.phone.length > 9 ? (
                <h1>{storageData.phone.substr(0, 3)}-{storageData.phone.substr(3, 3)}-{storageData.phone.substr(6, 4)}</h1>
              ) : (<h1>{phone}</h1>)
            ) : (<h1>N/A</h1>)}
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
              <div id="phoneError"></div>
              <input ref={newPhone} className="text" type="text" minLength="10"
                    placeholder="Enter new phone" onChange={(e) => {
                      const result = e.target.value.replace(/[^0-9.]+/g, '');
                      setPhone(result);
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
