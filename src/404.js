import Navbar from "./Navbar";
import styled from "styled-components";
import pageNotFoundImg from "./img/404.png";

const NotFoundPage = () => {
  return (
    <StyledWrapper>
      <Navbar />
      <StyledImg src={pageNotFoundImg} alt="page-not-found-image" />
      <H1>404 - Page Not Found</H1>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const H1 = styled.h1`
  text-align: center;
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
