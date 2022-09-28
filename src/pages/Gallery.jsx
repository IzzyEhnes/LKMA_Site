import { useState, useEffect } from "react";
import { GalleryComponent } from "./components/galleryPage/galleryComponent";
import JsonData from "./data/galleryData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Gallery = () => {
  const [galleryPageData, setGalleryPageData] = useState({});
  useEffect(() => {
    setGalleryPageData(JsonData);
  }, []);

  return (
    <div>
      <GalleryComponent data={galleryPageData.GalleryData} />
    </div>
  );
};

export default Gallery;