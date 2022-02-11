import styled from "styled-components";

const Table = ({ contents }) => {
  return (
    <Wrapper>
      <TitleRow>Last Transactions</TitleRow>
      <ColumnWrapper>
        <Column width="22">
          {contents.map((content, index) => (
            <Row key={index}>
              <Element>Time:{content.time}</Element>
            </Row>
          ))}
        </Column>
        <Column width="37">
          {contents.map((content, index) => (
            <Row key={index}>
              <Element>Amount:{content.amount}</Element>
            </Row>
          ))}
        </Column>
        <Column width="19">
          {contents.map((content, index) => (
            <Row key={index}>
              <Element>Size:{content.size}</Element>
            </Row>
          ))}
        </Column>
        <Column width="22">
          {contents.map((content, index) => (
            <Row key={index}>
              <Element>Fee:{content.fee}</Element>
            </Row>
          ))}
        </Column>
      </ColumnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 60%;
  margin: 40px;
  border: 2px solid #ad6834;
  border-radius: 4px;
`;

const Element = styled.div``;

const Column = styled.div`
  display: flex;
  width: ${(props) => props.width}%;
  flex-direction: column;
  justify-content: center;
`;

const ColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const Row = styled.div`
  display: flex;
  font-family: "Montserrat", sans-serif;
  align-items: center;
  justify-content: left;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  height: 40px;
  background-color: ${(props) => (props.diffColor ? "#24242b" : "#1b1b21")};
  color: white;
`;

const TitleRow = styled(Row)`
  justify-content: center;
  padding-top: auto;
  font-family: "Orbitron", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 0;
  height: 60px;
  background-color: #ad6834;
`;

export default Table;
