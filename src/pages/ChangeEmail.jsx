import { useState, useEffect } from "react";
import { ChangeEmailComponent } from "./components/changeEmailPage/changeEmailComponent";
import JsonData from "./data/changeEmailData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const ChangeEmail = () => {
  const [ChangeEmailPageData, setChangeEmailPageData] = useState({});
  useEffect(() => {
    setChangeEmailPageData(JsonData);
  }, []);

  return (
    <div>
      <ChangeEmailComponent data={ChangeEmailPageData.ChangeEmailData} />
    </div>
  );
};

export default ChangeEmail;