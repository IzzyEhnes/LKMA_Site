import { useState, useEffect } from "react";
import { FAQ } from "./components/faqPage/faq";
import JsonData from "./data/faqData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const FAQs = () => {
  const [faqPageData, setFaqPageData] = useState({});
  useEffect(() => {
    setFaqPageData(JsonData);
  }, []);

  return (
    <div>
      <FAQ data={faqPageData.FAQ} />
    </div>
  );
};

export default FAQs;