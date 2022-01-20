import BitcoinAnimation from "./BitcoinAnimation";
import TextAnimation from "./TextAnimation";
import styled from "styled-components";

const MainAnimations = () => {
  return (
    <div className="mainAnimations">
      <Style>
        <TextAnimation />
        <BitcoinAnimation />
      </Style>
    </div>
  );
};

const Style = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default MainAnimations;
