import React, { useState, useEffect } from "react";
import { SignUpComponent } from "./components/signUpPage/signUpComponent";
import JsonData from "./data/signUpData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const SignUp = () => {
  const [signUpPageData, setSignUpPageData] = useState({});
  useEffect(() => {
    setSignUpPageData(JsonData);
  }, []);

  return (
    <div>
      <SignUpComponent data={signUpPageData.SignUpData} />
    </div>
  );
};

export default SignUp;