import MainContent from "./MainContent";
import Navbar from "./Navbar";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Navbar />
      <MainContent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-image: url(https://hatchet.com.au/art/backgrounds/background-circuit-dark.svg);
`;

export default Home;
