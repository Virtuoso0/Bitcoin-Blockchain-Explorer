import styled from "styled-components";

const Table = ({ contents, title }) => {
  return (
    <Wrapper>
      <MainTitleRow>{title}</MainTitleRow>
      <ColumnWrapper>
        <Column width="22">
          <TitleRow>Time</TitleRow>
          {contents.map((content, index) => (
            <Row key={index} index={index}>
              <Element>{content.time}</Element>
            </Row>
          ))}
        </Column>
        <Column width="34">
          <TitleRow>Amount</TitleRow>
          {contents.map((content, index) => (
            <Row key={index} index={index}>
              <Element>{content.amount}</Element>
            </Row>
          ))}
        </Column>
        <Column width="22">
          <TitleRow>Size</TitleRow>
          {contents.map((content, index) => (
            <Row key={index} index={index}>
              <Element>{content.size}</Element>
            </Row>
          ))}
        </Column>
        <Column width="22">
          <TitleRow>Fee</TitleRow>
          {contents.map((content, index) => (
            <Row key={index} index={index}>
              <Element>{content.fee}</Element>
            </Row>
          ))}
        </Column>
      </ColumnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 70%;
  min-height: 460px;
  margin: 40px;
  border: 2px solid #ad6834;
  border-radius: 4px;
  background-color: #0e0e11;
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
  background-color: ${(props) => (props.index % 2 ? "#24242b" : "#1b1b21")};
  color: white;
`;

const MainTitleRow = styled(Row)`
  justify-content: center;
  font-family: "Orbitron", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 0;
  height: 60px;
  background-color: #ad6834;
`;

const TitleRow = styled(Row)`
  justify-content: left;
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  background-color: #0e0e11;
`;

export default Table;
