import { useState, useEffect } from "react";
import JsonData from "./data/loginData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Login = () => {
  const [loginPageData, setLoginPageData] = useState({});
  useEffect(() => {
    setLoginPageData(JsonData);
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Login;