import logo from "./img/mainLogo.png";
import styled from "styled-components";

const Navbar = () => {
  return (
    <div className="navbar">
      <Style>
        <div className="logo-container">
          <LogoImg src={logo} alt="logo" />
        </div>
        <Menu>
          <Option>Bitcoin</Option>
          <Option>Blocks</Option>
          <Option>Contact us</Option>
        </Menu>
      </Style>
    </div>
  );
};

const Style = styled.div`
  width: 100%;
  display: flex;
  font-size: 22px;
  background-color: #03071e;
  background-image: none;
  border-bottom: 1px solid #f48c06;
  justify-content: space-between;
`;

const Menu = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: none;
`;

const Option = styled.div`
  letter-spacing: 2px;
  transition: all 0.2s ease;
  &:hover {
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
  &:hover {
    transform: scale(0.95);
  }
`;

export default Navbar;
