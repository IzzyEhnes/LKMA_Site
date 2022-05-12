import { useState, useEffect } from "react";
import { Instructors } from "./components/aboutPage/instructors";
import JsonData from "./data/aboutData.json";
import SmoothScroll from "smooth-scroll";
{/*import YoutubePlayer from "./components/aboutPage/YoutubePlayer"*/}

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
      {/*<YoutubePlayer videoID='d0akqRlyjo8' /> */}
    </div>
  );
};

export default About;