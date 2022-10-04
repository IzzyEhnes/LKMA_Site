import React, { useState, useEffect } from "react";
import { Header } from "./components/homePage/header";
import { Features } from "./components/homePage/features";
import { About } from "./components/homePage/about";
import { Location } from "./components/homePage/location";
import { Programs } from "./components/homePage/programs";
import { Gallery } from "./components/homePage/gallery";
import { Team } from "./components/homePage/Team";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import axios from "axios";
import "./Home.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const [regStatus, setRegStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  
  const register = () => {
    const data = {email: emailReg, password: passwordReg};
    axios.post("http://localhost:3001/", data).then((response) => {
      setRegStatus(response.data.message); 
      console.log(response.data);
    }); 
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = {email: email, password: password};
    axios.post("http://localhost:3001/login", data).then((response) => {
      if (response.data.message != "Wrong combination") {
        setLoginStatus(response.data.result[0].email);
      } else {
        setLoginStatus(response.data.message);
      }
      console.log(response.data);
    });
  };

  return (
    <div>
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

      <h1>{regStatus}</h1>

      <h1>Login</h1>
      <label>Email: </label>
      <input type="text" onChange={(e) => {
        setEmail(e.target.value);
        }} 
      />
      <label>Password: </label>
      <input type="text" onChange={(e) => {
        setPassword(e.target.value);
        }} 
      />
      <button onClick={login}>Login</button>

      <h1>{loginStatus}</h1>

      {/*````````````````````````*/}
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Location data={landingPageData.Location} />      
      <Programs data={landingPageData.Programs} />
      <Gallery data={landingPageData.Gallery}/>
      <Team data={landingPageData.Team} />
    </div>
  );
};

export default Home;