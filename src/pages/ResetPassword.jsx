import { useState, useEffect } from "react";
import { ResetPasswordComponent } from "./components/resetPasswordPage/resetPasswordComponent";
import JsonData from "./data/resetPasswordData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const ResetPassword = () => {
  const [ResetPasswordPageData, setResetPasswordPageData] = useState({});
  useEffect(() => {
    setResetPasswordPageData(JsonData);
  }, []);

  return (
    <div>
      <ResetPasswordComponent data={ResetPasswordPageData.ResetPasswordData} />
    </div>
  );
};

export default ResetPassword;