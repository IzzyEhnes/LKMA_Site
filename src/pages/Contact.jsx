import { useState, useEffect } from "react";
import { ContactComponent } from "./components/contactPage/contactComponent";
import JsonData from "./data/contactData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Contact = () => {
  const [contactPageData, setContactPageData] = useState({});
  useEffect(() => {
    setContactPageData(JsonData);
  }, []);

  return (
    <div>
      <ContactComponent data={contactPageData.ContactData} />
    </div>
  );
};

export default Contact;