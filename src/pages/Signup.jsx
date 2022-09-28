import { useState, useEffect } from "react";
import JsonData from "./data/signupData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Signup = () => {
  const [signupPageData, setSignupPageData] = useState({});
  useEffect(() => {
    setSignupPageData(JsonData);
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Signup;