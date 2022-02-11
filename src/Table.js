import { useEffect, useState } from "react";
import styled from "styled-components";

const TrxTable = [];

const Table = (contents) => {
  const [lastTransactions, setLastTransactions] = useState(null);

  const addToTable = (json) => {
    if (TrxTable.length > 5) TrxTable.pop();
    TrxTable.unshift(json);
    setLastTransactions(
      TrxTable.map((content, index) => (
        <Row key={index}>test{content.x.hash}</Row>
      ))
    );
  };

  useEffect(() => {
    const ws = new WebSocket("wss://ws.blockchain.info/inv");
    const apiCallTransactions = {
      op: "unconfirmed_sub",
    };

    ws.onopen = () => ws.send(JSON.stringify(apiCallTransactions));

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      addToTable(json);
    };
  }, []);

  return (
    <Wrapper>
      <TitleRow>Last Transactions</TitleRow>
      {lastTransactions}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40%;
  min-height: 300px;
  background-color: red;
`;

const Row = styled.div`
  background-color: green;
`;

// const Row = styled.div`
//   display: flex;
//   font-family: "Montserrat", sans-serif;
//   align-items: center;
//   width: 100%;
//   height: 40px;
//   padding-left: 30px;
//   background-color: ${(props) => (props.diffColor ? "#24242b" : "#1b1b21")};
//   color: white;
// `;

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
