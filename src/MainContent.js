import BitcoinAnimation from "./BitcoinAnimation";
import TextAnimation from "./TextAnimation";
import styled from "styled-components";

const MainContent = () => {
  return (
    <section>
      <Wrapper>
        <TextAnimation />
        <BitcoinAnimation />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default MainContent;
