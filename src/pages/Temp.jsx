import React, { useState, useEffect } from "react";
import { TempComponent } from "./components/tempPage/tempComponent";
import JsonData from "./data/tempData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Temp = () => {
  const [profilePageData, setProfilePageData] = useState({});
  useEffect(() => {
    setProfilePageData(JsonData);
  }, []);

  return (
    <div>
      <TempComponent data={profilePageData.TempData} />
    </div>
  );
};

export default Temp;