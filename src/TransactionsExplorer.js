import Navbar from "./Navbar";
import Footer from "./Footer";
import Table from "./Table";
import styled from "styled-components";
import { useEffect, useState } from "react";

const TrxTable = [];

const TransactionsExplorer = () => {
  const [lastTransactionsTable, setLastTransactionsTable] = useState(null);

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
    if (TrxTable.length > 9) TrxTable.pop();

    const tmpIn = json.x.inputs.reduce(
      (total, next) => total + next.prev_out.value,
      0
    );
    const tmpOut = json.x.out.reduce((total, next) => total + next.value, 0);

    TrxTable.unshift({
      time: convertUnixTime(json.x.time),
      size: `${json.x.size} B`,
      amount: `${tmpIn / 100000000} BTC`,
      fee: `${tmpIn - tmpOut} satoshi`,
    });
    const table = <Table contents={TrxTable} />;
    setLastTransactionsTable(table);
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
      <TableSection>{lastTransactionsTable}</TableSection>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TableSection = styled.section`
  display: flex;
  justify-content: center;
`;

export default TransactionsExplorer;
