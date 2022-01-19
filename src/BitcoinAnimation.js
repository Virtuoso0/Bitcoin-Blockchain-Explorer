import bitcoinImg from "./img/btc.png";
import "./bitcoinAnimation.css";

const BitcoinAnimation = () => {
  return (
    <div className="bitcoin-animation">
      <img className="fade-in" src={bitcoinImg} alt="bitcoin-img" />
    </div>
  );
};

export default BitcoinAnimation;
