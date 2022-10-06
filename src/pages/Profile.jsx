import React, { useState, useEffect } from "react";
import { ProfileComponent } from "./components/profilePage/profileComponent";
import JsonData from "./data/profileData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Profile = () => {
  const [profilePageData, setProfilePageData] = useState({});
  useEffect(() => {
    setProfilePageData(JsonData);
  }, []);

  return (
    <div>
      <ProfileComponent data={profilePageData.ProfileData} />
    </div>
  );
};

export default Profile;