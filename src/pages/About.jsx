import { useState, useEffect } from "react";
import { Instructors } from "./components/aboutPage/instructors";
import JsonData from "./data/aboutData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const About = () => {
  const [aboutPageData, setAboutPageData] = useState({});
  useEffect(() => {
    setAboutPageData(JsonData);
  }, []);

  return (
    <div>
      <Instructors data={aboutPageData.Instructors} />
    </div>
  );
};

export default About;