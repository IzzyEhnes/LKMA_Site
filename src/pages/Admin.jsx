import React, { useState, useEffect } from "react";
import { AdminComponent } from "./components/adminPage/adminComponent";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Admin = () => {
  return (
    <div>
      {/*Path to this page needs to be protected, such that only an logged in, verified admin can load this page */}
      <AdminComponent />
    </div>
  );
};

export default Admin;