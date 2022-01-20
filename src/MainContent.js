import BitcoinAnimation from "./BitcoinAnimation";
import TextAnimation from "./TextAnimation";
import styled from "styled-components";

const MainContent = () => {
  return (
    <section>
      <StyledWrapper>
        <TextAnimation />
        <BitcoinAnimation />
      </StyledWrapper>
    </section>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default MainContent;
