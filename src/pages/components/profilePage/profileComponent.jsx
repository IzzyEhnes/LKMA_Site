import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { loggingOut, changeFilePath } from "../loginPage/loginComponent";
import { exportEmail, exportPassword, inputName, filePath, login } from "../loginPage/loginComponent";

var loggedIn = true;
var logOut = true;
var firstLogin = 0;
var tempImage = "";
var resetImage = false;
var uploadImage = false;

export const logIn = () => {
	logOut = false;
}

export const ProfileComponent = (props) => {

	const [profileName, setProfileName] = useState("");
	const [profileEmail, setProfileEmail] = useState("");
	const [imageFilePath, setImageFilePath] = useState("");

	const [submit, setSubmit] = useState("");
	const [uploadedSub, setUploadedSub] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (loggedIn && login) {
			if (firstLogin < 5) {
				setImageFilePath(filePath);
				firstLogin++;
			}
			setProfileName(inputName);
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
						document.getElementById("imageUploaded").innerHTML 
							= response.data.message;
						const filePath = response.data.filePath;
		
						changeFilePath(filePath);
						setImageFilePath(filePath);
						tempImage = "";
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
			loggingOut();
			setProfileName("N/A");
			setProfileEmail("N/A");
			setImageFilePath("\\img\\profile-blank-whitebg.png");
		}
	}, [uploadImage, tempImage, resetImage]);
	
	const uploadSub = async e => {
		e.preventDefault();
	}

	return (
		<div id='profile' >
			<div className="profileInfo">
				<div className="subPortal">
					<h1>Profile Picture</h1>
					<br/>
					<h1><img src={imageFilePath} alt="" /></h1>
					<div id="imageUploaded"></div>
					<div className='row'>
						<div class="login-form">
							<input type="file" name="imageFile" accept="image/*" onChange={(e) => {
								tempImage = e.target.files[0];

								if (tempImage == undefined) {
									resetImage = true;
								}								
								uploadImage = false;
							}} />
							<NavLink className="nav-link" to="/profile">
								<input data-testid="uploadSubmit" type="submit" value="Upload Image" onClick={() => {
									if (tempImage != undefined) {
										uploadImage = true;
										resetImage = false;
									}
								}} />
							</NavLink>
						</div>
					</div>

					<h1>{profileName}</h1>
					<br/>
					<h1>Email: {profileEmail}</h1>
					<h2></h2>
					<h1>Submission Portal</h1>
					<div className='row'>
						<div class="login-form">
							<input type="file" onChange={(e) => {
								setSubmit(e.target.files[0]);
								setUploadedSub(e.target.files[0].name);
							}} />
							<input type="submit" value="Upload" onClick={uploadSub} />
						</div>
					</div>
					<NavLink className="nav-link" to="/login">
						<button class="ghost" id="logIn" onClick={() => {
							logOut = true;
						}}>Log out</button>
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export const resetTempImage = () => {
	tempImage = "";
}