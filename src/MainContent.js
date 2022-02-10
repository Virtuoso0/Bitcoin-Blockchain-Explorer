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
  min-height: calc(100vh - 121px);
  padding-top: 100px;
  padding-bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default MainContent;
