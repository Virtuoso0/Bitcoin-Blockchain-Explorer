import logo from "./img/mainLogo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <StyledWrapper>
      <header>
        <Link to="/">
          <LogoImg src={logo} alt="logo" />
        </Link>
      </header>
      <Nav>
        <Option to="/">Bitcoin</Option>
        <Option to="/blocks">Blocks</Option>
        <Option to="/">Contact us</Option>
      </Nav>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 22px;
  background-color: #03071e;
  background-image: none;
  border-bottom: 1px solid #f48c06;
  justify-content: space-between;
`;

const Nav = styled.nav`
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: none;
`;

const Option = styled(Link)`
  letter-spacing: 2px;
  transition: all 0.2s ease;
  text-decoration: none;
  color: white;
  :hover {
    transform: scale(0.95);
    color: #f48c06;
    cursor: pointer;
  }
`;

const LogoImg = styled.img`
  width: 200px;
  height: 150px;
  margin-left: 40px;
  margin-top: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  :hover {
    transform: scale(0.95);
  }
`;

export default Navbar;
