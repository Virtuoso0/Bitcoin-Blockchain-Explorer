import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Text>Wszelkie prawa zastrzeżone &copy;Patryk Piecuch</Text>
      <Social>
        <a href="https://twitter.com" className="icon-button twitter">
          <i className="icon-twitter fa-brands fa-twitter"></i>
          <span></span>
        </a>
        <a href="https://facebook.com" className="icon-button facebook">
          <i className="icon-facebook fa-brands fa-facebook-f"></i>
          <span></span>
        </a>
        <a href="https://github.com" className="icon-button github">
          <i className="icon-github fa-brands fa-github"></i>
          <span></span>
        </a>
      </Social>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 100px;
  padding-left: 40px;
  padding-right: 40px;
  background-color: #0e0e11;
`;

const Text = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  color: gray;
`;

const Social = styled.div`
  .icon-button {
    background-color: white;
    border-radius: 2.4rem;
    cursor: pointer;
    display: inline-block;
    font-size: 1.2rem;
    height: 2.4rem;
    line-height: 2.4rem;
    margin: 0 5px;
    position: relative;
    text-align: center;
    user-select: none;
    width: 2.4rem;
  }

  .icon-button span {
    border-radius: 0;
    display: block;
    height: 0;
    left: 50%;
    margin: 0;
    position: absolute;
    top: 50%;
    transition: all 0.3s;
    width: 0;
  }
  .icon-button:hover span {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 2.4rem;
    margin: -1.2rem;
  }
  .twitter span {
    background-color: #4099ff;
  }
  .facebook span {
    background-color: #3b5998;
  }
  .github span {
    background-color: #db5a3c;
  }

  .icon-button i {
    background: none;
    color: white;
    height: 2.4rem;
    left: 0;
    line-height: 2.4rem;
    position: absolute;
    top: 0;
    transition: all 0.3s;
    width: 2.4rem;
    z-index: 10;
  }
  .icon-button .icon-twitter {
    color: #4099ff;
  }
  .icon-button .icon-facebook {
    color: #3b5998;
  }
  .icon-button .icon-github {
    color: #db5a3c;
  }
  .icon-button:hover .icon-twitter,
  .icon-button:hover .icon-facebook,
  .icon-button:hover .icon-github {
    color: white;
  }
`;

export default Footer;
