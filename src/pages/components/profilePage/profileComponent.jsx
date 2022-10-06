import React, { useState } from "react";
import axios from "axios";

export const ProfileComponent = (props) => {
    const [regStatus, setRegStatus] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [uploadedFile, setUploadedFile] = useState({});

    const [submit, setSubmit] = useState("");
    const [uploadedSub, setUploadedSub] = useState("");

    const register = () => {
        const data = {email: emailReg, password: passwordReg};
        axios.post("http://localhost:3001/", data).then((response) => {
        setRegStatus(response.data.message); 
        console.log(response.data);
        }); 
    };

    const login = () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            axios.post("http://localhost:3001/login", formData).then((response) => {
                if (response.data.message !== "Wrong combination") {
                    setLoginStatus("Email: " + response.data.result[0].email);
        
                    const fileName = response.data.fileName;
                    const filePath = response.data.filePath;
                    setUploadedFile({fileName, filePath});
                } else {
                    setLoginStatus(response.data.message);
                }
                console.log(response.data);
            });
        } catch(err) {
            if (err.response.status === 500) {
                console.log("There was a problem with server.");
            } else {
                console.log(err.response.data.message);
            }
        }
    };

    const uploadImage = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('email', email);
        
        try {
            const res = await axios.post("http://localhost:3001/image", formData, {
                headers: {
                    "Content-Type": "mulitpart/form-data"
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({fileName, filePath});
        } catch(err) {
            if (err.response.status === 500) {
                console.log("There was a problem with server.");
            } else {
                console.log(err.response.data.message);
            }
        }
    }

    const uploadSub = async e => {
        e.preventDefault();
        
    }

    return(
        <div id='profile' >
            <div className="containerBlock">
                <ul>
                    <h1>Registration</h1>
                    <label>Email: </label>
                    <input type="text" onChange={(e) => {
                        setEmailReg(e.target.value);
                        }} 
                    />
                    <label>Password: </label>
                    <input type="text" onChange={(e) => {
                        setPasswordReg(e.target.value);
                        }} 
                    />
                    <button onClick={register}>Register</button>
                </ul>
            </div>
            <div className="containerBlock">
                <ul>
                    <h1>Login</h1>
                    <label>Email: </label>
                    <input data-testid="loginEmail" type="text" onChange={(e) => {
                        setEmail(e.target.value);
                        }} 
                    />
                    <label>Password: </label>
                    <input data-testid="loginPassword" type="text" onChange={(e) => {
                        setPassword(e.target.value);
                        }} 
                    />
                    <button data-testid="loginSubmit" onClick={login}>Login</button> 
                </ul>
            </div>
            <h1>{regStatus}</h1>

            <div className="profileInfo">
                <div className="subPortal">
                    <h1>Profile Picture</h1>
                    <img src={uploadedFile.filePath} alt="" /> 
                    <div className='row'>
                        <div class="login-form">
                            <input type="file" name="imageFile" accept="image/*" onChange={(e) => {
                                setImage(e.target.files[0]);
                                setImageName(e.target.files[0].name);
                            }}/>
                            <input data-testid="uploadSubmit" type="submit" value="Upload" onClick={uploadImage}/>
                        </div>
                    </div>

                    <h3 data-testid="displayEmail" className="emailAddress">{loginStatus}</h3>
                    <h1>Submission Portal</h1>
                    <div className='row'>
                        <div class="login-form">
                            <input type="file" onChange={(e) => {
                                setSubmit(e.target.files[0]);
                                setUploadedSub(e.target.files[0].name);
                            }}/>
                            <input type="submit" value="Upload" onClick={uploadSub}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}