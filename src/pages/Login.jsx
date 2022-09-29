import { useState, useEffect } from "react";
import { LoginComponent } from "./components/loginPage/loginComponent";
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
      <LoginComponent data={loginPageData.LoginData} />
    </div>
  );
};

export default Login;