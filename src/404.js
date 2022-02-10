import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import pageNotFoundImg from "./img/404.png";

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Navbar />
      <StyledImg src={pageNotFoundImg} alt="page-not-found-image" />
      <H1>404 - Page Not Found</H1>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-image: url(https://hatchet.com.au/art/backgrounds/background-circuit-dark.svg);
  align-items: center;
  flex-direction: column;
`;

const H1 = styled.h1`
  text-align: center;
  padding-top: 30px;
  padding-bottom: 100px;
`;

const StyledImg = styled.img`
  width: 20vw;
  background-color: #f48c06;
  padding: 20px;
  margin-top: 40px;
  margin-bottom: 25px;
  border-radius: 15px;
`;

export default NotFoundPage;
