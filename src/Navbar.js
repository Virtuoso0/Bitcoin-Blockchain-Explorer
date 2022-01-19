import logo from "./img/mainLogo.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img id="logo" src={logo} alt="logo" />
      </div>

      <div className="menu">
        <div className="option">Bitcoin</div>
        <div className="option">Blocks</div>
        <div className="option">Contact us</div>
      </div>
    </div>
  );
};

export default Navbar;
