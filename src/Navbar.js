import logo from "./img/mainLogo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 1.3rem;
  background-color: #0c0c0f;
  background-image: none;
  border-bottom: 1px solid gray;
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
    color: #faa307;
    cursor: pointer;
  }
`;

const LogoImg = styled.img`
  width: 160px;
  margin-left: 2em;
  margin-top: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  :hover {
    transform: scale(0.95);
  }
`;

export default Navbar;
