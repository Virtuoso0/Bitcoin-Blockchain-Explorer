import styled from "styled-components";
import { Link } from "react-router-dom";

const TextAnimation = () => {
  return (
    <Wrapper>
      <Title className="fade">Specialists in the analysis</Title>
      <Title className="fade">of</Title>
      <Title gold className="fade">
        Blockchain!
      </Title>

      <StyledLink to="/blocks">
        <StyledButton className="fade">try our tools</StyledButton>
      </StyledLink>
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  letter-spacing: 2px;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => (props.gold ? "#faa307" : "white")};
  margin-bottom: ${(props) => (props.gold ? "90px" : "0")};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .fade {
    animation: fade-in-left 2.6s ease;
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
`;

const StyledButton = styled.button`
  padding: 1.3em 3em;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  color: black;
  background-color: #f48c06;
  border: none;
  border-radius: 45px;
  transition: all 0.3s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #faa307;
    color: black;
    transform: translateY(-7px);
  }
`;

export default TextAnimation;
