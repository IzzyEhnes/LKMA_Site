import { useState, useEffect } from "react";
import { Header } from "./components/homePage/header";
import { Features } from "./components/homePage/features";
import { About } from "./components/homePage/about";
import { Programs } from "./components/homePage/programs";
import { Gallery } from "./components/homePage/gallery";
import { Team } from "./components/homePage/Team";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./Home.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Programs data={landingPageData.Programs} />
      <Gallery data={landingPageData.Gallery}/>
      <Team data={landingPageData.Team} />
    </div>
  );
};

export default Home;