import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useRef} from 'react';
import { LoggingOut, changeFilePath } from "../loginPage/loginComponent";
import { exportEmail, inputFirstName, inputLastName, exportPhone, filePath,
  login, changePhone} from "../loginPage/loginComponent";
import { useAuth } from "../../../AuthContext";

var logOut = true;
var firstLogin = 0;
var tempImage = "";
var storageData;
var storageDataFile;

export const logIn = () => {
  logOut = false;
}

export const studentLogout = () => {
  logOut = true;
}

export const ProfileComponent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [imageFilePath, setImageFilePath] = useState("");
  const [render, setRender] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const newPhone = useRef(null);

	useEffect(() => {
    storageData = JSON.parse(localStorage.getItem("user"));
    /* if(storageData.exportEmail) { exportEmail = storageData.exportEmail; }
    if(storageData.inputFirstName) { inputFirstName = storageData.inputFirstName; }
    if(storageData.inputLastName) { inputLastName = storageData.inputLastName; }
    if(storageData.exportPhone) { exportPhone = storageData.exportPhone; } */
    storageDataFile = JSON.parse(localStorage.getItem("filePath"));
    if (login) {
      if (firstLogin < 5) {
        setImageFilePath(filePath);
        firstLogin++;
      }

      setRender(true);
      setAuth(true);
      setFirstName(inputFirstName);
      setLastName(inputLastName);
      setPhone(exportPhone);
      setProfileEmail(exportEmail);
      setImageFilePath(storageDataFile);
    } else {
      setImageFilePath("\\img\\profile-blank-whitebg.png");
    }

    if (logOut) {
      LoggingOut();
      setFirstName("N/A");
      setLastName("N/A");
      setProfileEmail("N/A");
      setPhone("N/A");
      setImageFilePath("\\img\\profile-blank-whitebg.png");
    }
  }, [render]);

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

  const phoneSubmit = () => {
    if(validate()){
      const formData = new FormData();

      formData.append('email', storageData.exportEmail);
			formData.append('phone', phone);

    try {
      axios.post("http://localhost:3001/changePhone", formData).then((response) => {
        if (response.data.message === "Changed Phone Successfully") {
          console.log(response.data);
          changePhone(response.data.result[0].phone_number);
          const user = { email: storageData.email, firstName: storageData.firstName, 
            lastName: storageData.lastName, phone: phone };
          window.localStorage.setItem("user", JSON.stringify(user));

          storageData = JSON.parse(localStorage.getItem("user"));
        }
        navigate("/profile");
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
    <div id='student' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Profile</h2>
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
                  } else {
                    document.getElementById("chosenImage").innerHTML
                      = tempImage.name;
                  }
                }} />
              <NavLink className="nav-link" to="/profile">
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
            ) : (<h1>{phone}</h1>)}
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
    </div>
  )
}

export const resetTempImage = () => {
  tempImage = "";
}