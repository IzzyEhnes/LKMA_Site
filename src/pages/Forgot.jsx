import { ForgotComponent } from "./components/forgotPage/forgotComponent";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Forgot = () => {
  return (
    <div>
      <ForgotComponent />
    </div>
  );
};

export default Forgot;