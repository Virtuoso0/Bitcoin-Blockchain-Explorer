import Navbar from "./Navbar";
import Footer from "./Footer";
import Table from "./Table";
import styled from "styled-components";
import { useEffect, useState } from "react";

const trxTable = [];
const bigTrxTable = [];

const TransactionsExplorer = () => {
  const [lastTransactionsTable, setLastTransactionsTable] = useState(null);
  const [bigTransactionsTable, setBigTransactionsTable] = useState(null);

  const convertUnixTime = (unixTimestamp) => {
    const includeZero = (number) => {
      if (number < 10) return `0${number}`;
      else return number;
    };

    const date = new Date(unixTimestamp * 1000);
    const hours = includeZero(date.getHours());
    const minutes = includeZero(date.getMinutes());
    const seconds = includeZero(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  };

  const addToTable = (json) => {
    if (trxTable.length > 9) trxTable.pop();

    const tmpIn = json.x.inputs.reduce(
      (total, next) => total + next.prev_out.value,
      0
    );
    const tmpOut = json.x.out.reduce((total, next) => total + next.value, 0);
    const transaction = {
      time: convertUnixTime(json.x.time),
      size: `${json.x.size} Bytes`,
      amount: `${tmpIn / 100000000} BTC`,
      fee: `${tmpIn - tmpOut} satoshi`,
    };

    trxTable.unshift(transaction);
    if (tmpIn > 200000000) {
      bigTrxTable.unshift(transaction);
      if (bigTrxTable.length > 10) bigTrxTable.pop();
    }
    setLastTransactionsTable(
      <Table contents={trxTable} title={"Last Transactions"} />
    );
    setBigTransactionsTable(
      <Table contents={bigTrxTable} title={"Big Transactions (>2 BTC)"} />
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

    return () => ws.close();
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <TableSection>
        {lastTransactionsTable}
        {bigTransactionsTable}
      </TableSection>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  background-color: #0e0e11;
  background-image: url(https://hatchet.com.au/art/backgrounds/background-happy-dark.svg);
`;

const TableSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 460px;
`;

export default TransactionsExplorer;
