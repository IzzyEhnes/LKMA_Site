import { TokenExpiredComponent } from "./components/tokenExpiredPage/tokenExpiredComponent";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const TokenExpired = () => {
  return (
    <div>
      {/*Path to this page needs to be protected, such that only an logged in, verified admin can load this page */}
      <TokenExpiredComponent />
    </div>
  );
};

export default TokenExpired;