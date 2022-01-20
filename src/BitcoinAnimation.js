import bitcoinImg from "./img/btc.png";
import styled from "styled-components";

const BitcoinAnimation = () => {
  return <StyledImg src={bitcoinImg} alt="bitcoin-image" />;
};

const StyledImg = styled.img`
  width: 30vw;
  margin-top: 100px;
  animation: fade-in 2.5s linear;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default BitcoinAnimation;
