import { useState, useEffect } from "react";
import { ProgramsComponent } from "./components/programsPage/programsComponent";
import JsonData from "./data/programsData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Programs = () => {
  const [programsPageData, setProgramsPageData] = useState({});
  useEffect(() => {
    setProgramsPageData(JsonData);
  }, []);

  return (
    <div>
      <ProgramsComponent data={programsPageData.Programs} />
    </div>
  );
};

export default Programs;