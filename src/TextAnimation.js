import styled from "styled-components";
import { Link } from "react-router-dom";

const TextAnimation = () => {
  return (
    <StyledWrapper>
      <Title className="fade-in-left">Try our tools for&nbsp;</Title>
      <Title gold className="fade-in-left">
        free!
      </Title>
      <StyledLink to="/blocks">
        <button className="fade-in-left">
          <span>try now</span>
          <div class="liquid"></div>
        </button>
      </StyledLink>
    </StyledWrapper>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 40px;
  font-weight: 700;
  padding-bottom: 100px;
  margin-top: 100px;
  color: ${(props) => (props.gold ? "#f48c06" : "white")};
`;

const StyledWrapper = styled.div`
  .fade-in-left {
    animation: fade-in-left 2.5s ease;
  }
  @keyframes fade-in-left {
    0% {
      opacity: 0;
      transform: translateX(-700px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  button {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    padding: 28px 54px;
    display: block;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    border-radius: 40px;
    border: 1px solid rgb(255, 81, 0);
    cursor: pointer;
  }

  button span {
    text-decoration: none;
    position: relative;
    color: white;
    font-family: Arial;
    letter-spacing: 8px;
    z-index: 1;
  }

  button .liquid {
    position: absolute;
    top: -80px;
    left: 0;
    width: 100%;
    height: 200px;
    background: rgb(255, 81, 0);
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
    transition: 0.5s;
  }

  button .liquid::after,
  button .liquid::before {
    content: "";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -75%);
    background: #fff;
  }

  button .liquid::before {
    border-radius: 45%;
    background: rgba(20, 20, 20, 0.5);
    animation: animate 5s linear infinite;
  }

  button .liquid::after {
    border-radius: 40%;
    background: rgba(20, 20, 20, 0.5);
    animation: animate 10s linear infinite;
  }

  button:hover .liquid {
    top: -120px;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }
`;

export default TextAnimation;
