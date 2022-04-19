import { useState, useEffect } from "react";
import { Faq } from "./components/faqPage/faq";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const FAQ = () => {
  const [faqPageData, setFaqPageData] = useState({});
  useEffect(() => {
    setFaqPageData(JsonData);
  }, []);

  return (
    <div>
      <Faq />
    </div>
  );
};

export default FAQ;