import BitcoinAnimation from "./BitcoinAnimation";
import TextAnimation from "./TextAnimation";
import "./mainAnimations.css";

const MainAnimations = () => {
  return (
    <div className="main-animations">
      <TextAnimation />
      <BitcoinAnimation />
    </div>
  );
};

export default MainAnimations;
