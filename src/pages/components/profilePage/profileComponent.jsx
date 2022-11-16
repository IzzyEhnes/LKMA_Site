import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoggingOut, changeFilePath } from "../loginPage/loginComponent";
import { exportEmail, inputFirstName, inputLastName, filePath,
  login} from "../loginPage/loginComponent";
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
  const [profileEmail, setProfileEmail] = useState("");
  const [imageFilePath, setImageFilePath] = useState("");
  const [render, setRender] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    storageData = JSON.parse(localStorage.getItem("user"));
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
      setImageFilePath("\\img\\profile-blank-whitebg.png");
    }
  }, [render]);

  const resetImage = () => {
    const formData = new FormData();
    formData.append('email', exportEmail);

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
      formData.append('email', exportEmail);

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
              <label htmlFor="file-upload" className="custom-file">Choose File</label>
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
          <div className="column">
            {storageData ? (
              <h1 data-testid="firstName">{storageData.firstName}</h1>
            ) : (<h1 data-testid="firstName">{firstName}</h1>)}
            {storageData ? (
              <h1 data-testid="lastName">{storageData.lastName}</h1>
            ) : (<h1 data-testid="lastName">{lastName}</h1>)}
            <NavLink className="nav-link" to="/login">
              <button data-testid="logOut" className="ghost" id="logIn" onClick={() => {
                logOut = true;
                setRender(Math.random());
                setAuth(false);
                localStorage.clear();
              }}>Log out</button>
            </NavLink>
          </div>
          <div className="column">
            {storageData ? (<h1 data-testid="profileEmail">Email: {storageData.email}</h1>) 
              : (<h1 data-testid="profileEmail">Email: {profileEmail}</h1>)}
            {/*If Phone # is in DB, display, else display Add Phone Button.*/}
            <h1>Phone # Here</h1>
            <button>Add Phone</button>
          </div>
        </div>
        <div className='row'>
          <div className="column">
            <NavLink to="/ChangeEmail">
              <button>Change Email</button>
            </NavLink>
          </div>
          <div className="column">
            <NavLink to="/ResetPassword">
              <button>Change Password</button>
            </NavLink>
          </div>
        </div>
        <div className='row'>
          <div className="column">
            <a href={props.data ? props.data.uploadLink : ""} target="_blank">
              <button>Upload Assignment</button>
            </a>
          </div>
          <div className="column">
            <a href={props.data ? props.data.downloadLink : ""} target="_blank">
              <button>Download Assignment</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const resetTempImage = () => {
  tempImage = "";
}