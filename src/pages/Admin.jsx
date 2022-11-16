import React, { useState, useEffect } from "react";
import { AdminComponent } from "./components/adminPage/adminComponent";
import JsonData from "./data/adminData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Admin = () => {
  const [adminPageData, setAdminPageData] = useState({});
  useEffect(() => {
    setAdminPageData(JsonData);
  }, []);

  return (
    <div>
      <AdminComponent data={adminPageData.ProfileData}/>
    </div>
  );
};

export default Admin;