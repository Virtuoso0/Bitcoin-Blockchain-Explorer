import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import styled from "styled-components";

const blocksArray = [];
let blockInfo = null;
let firstBlock = true;
let setBlocksTimeout = null;
let setPingInterval = null;

const BlocksExplorer = () => {
  const [oldBlocks, setOldBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const [lastBlockInfoTable, setLastBlockInfoTable] = useState(null);
  const [testButton, setTestButton] = useState(null);

  const convertUnixTime = (unixTimestamp) => {
    const includeZero = (number) => {
      if (number < 10) return `0${number}`;
      else return number;
    };

    const date = new Date(unixTimestamp * 1000);
    const day = includeZero(date.getDate());
    const month = includeZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = includeZero(date.getHours());
    const minutes = includeZero(date.getMinutes());
    const seconds = includeZero(date.getSeconds());

    return `${hours}:${minutes}:${seconds} / ${day}.${month}.${year}`;
  };

  const saveLastBlockInfo = (json) => {
    blockInfo = {
      blockIndex: json.x.blockIndex,
      hash: json.x.hash,
      mrklRoot: json.x.mrklRoot,
      nTx: json.x.nTx,
      nonce: json.x.nonce.toString(16),
      reward: Math.trunc(json.x.reward / 1000000) / 100,
      size: Math.trunc(json.x.size / 10000) / 100,
      time: convertUnixTime(json.x.time),
      version: json.x.version.toString(16),
      weight: Math.trunc(json.x.weight / 10000) / 100,
    };
  };

  const prepareLastBlock = (json) => {
    if (!firstBlock) {
      setLastBlock(
        <>
          <LastBlock fadeOut>
            <LastBlockInfo index>{blockInfo.blockIndex}</LastBlockInfo>
            <LastBlockInfo>
              transactions:<Bold>{blockInfo.nTx}</Bold>
            </LastBlockInfo>
            <LastBlockInfo>
              reward:<Bold>{blockInfo.reward}&nbsp;BTC</Bold>
            </LastBlockInfo>
          </LastBlock>
        </>
      );
    }

    setBlocksTimeout = setTimeout(() => {
      const reward = Math.trunc(json.x.reward / 1000000) / 100;
      setLastBlock(
        <>
          <LastBlock fadeIn>
            <LastBlockInfo index>{json.x.blockIndex}</LastBlockInfo>
            <LastBlockInfo>
              transactions:<Bold>{json.x.nTx}</Bold>
            </LastBlockInfo>
            <LastBlockInfo>
              reward:<Bold>{reward}&nbsp;BTC</Bold>
            </LastBlockInfo>
          </LastBlock>
        </>
      );
    }, 800);
  };
  const prepareOldBlocks = () => {
    setOldBlocks(
      blocksArray.map((block, index) => (
        <Block fadeOut key={index}>
          <BlockInfo index>{block.blockIndex}</BlockInfo>
          <BlockInfo>transactions:</BlockInfo>
          <BlockInfo>
            <Bold>{block.nTx}</Bold>
          </BlockInfo>
        </Block>
      ))
    );

    blocksArray.unshift(blockInfo);
    if (blocksArray.length > 4) blocksArray.pop();

    setBlocksTimeout = setTimeout(() => {
      setOldBlocks(
        blocksArray.map((block, index) => (
          <Block fadeIn key={index}>
            <BlockInfo index>{block.blockIndex}</BlockInfo>
            <BlockInfo>transactions:</BlockInfo>
            <BlockInfo>
              <Bold>{block.nTx}</Bold>
            </BlockInfo>
          </Block>
        ))
      );
    }, 800);
  };

  useEffect(() => {
    const ws = new WebSocket("wss://ws.blockchain.info/inv");

    const apiCallBlocks = {
      op: "blocks_sub",
    };
    const apiCallPing = {
      op: "ping",
    };
    const apiCallLastBlock = {
      op: "ping_block",
    };

    setTestButton(
      <button onClick={() => ws.send(JSON.stringify(apiCallLastBlock))}>
        ADD BLOCK
      </button>
    );

    setPingInterval = setInterval(
      () => ws.send(JSON.stringify(apiCallPing)),
      60000
    );

    ws.onopen = () => {
      ws.send(JSON.stringify(apiCallLastBlock));
      ws.send(JSON.stringify(apiCallBlocks));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      if (firstBlock) {
        prepareLastBlock(json);
        saveLastBlockInfo(json);
        firstBlock = false;
      } else if (event.data !== '{"op":"pong"}') {
        prepareLastBlock(json);
        prepareOldBlocks();
        saveLastBlockInfo(json);
      }
    };

    return () => {
      clearTimeout(setBlocksTimeout);
      clearInterval(setPingInterval);
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (blockInfo)
      setLastBlockInfoTable(
        <>
          <Row>
            Block Index:&nbsp;&nbsp;<Bold>{blockInfo.blockIndex}</Bold>
          </Row>
          <Row diffColor>
            hash:<Bold>&nbsp;&nbsp;{blockInfo.hash}</Bold>
          </Row>
          <Row>
            Merkle root:&nbsp;&nbsp;<Bold>{blockInfo.mrklRoot}</Bold>
          </Row>
          <Row diffColor>
            Number of transaction:&nbsp;&nbsp;<Bold>{blockInfo.nTx}</Bold>
          </Row>
          <Row>
            Nonce:&nbsp;&nbsp;<Bold>{"0x" + blockInfo.nonce}</Bold>
          </Row>
          <Row diffColor>
            Reward:&nbsp;&nbsp;<Bold>{blockInfo.reward}&nbsp;BTC</Bold>
          </Row>
          <Row>
            Size:&nbsp;&nbsp;<Bold>{blockInfo.size}&nbsp;MB</Bold>
          </Row>
          <Row diffColor>
            Time:&nbsp;&nbsp;<Bold>{blockInfo.time}</Bold>
          </Row>
          <Row>
            Version:&nbsp;&nbsp;<Bold>{"0x" + blockInfo.version}</Bold>
          </Row>
          <Row diffColor>
            Weight:&nbsp;&nbsp;<Bold>{blockInfo.weight}&nbsp;MWU</Bold>
          </Row>
        </>
      );
  }, [lastBlock]);

  return (
    <Wrapper>
      <Navbar />
      <BlocksSection>
        <LastBlockWrapper>{lastBlock}</LastBlockWrapper>
        {lastBlock && <Divider />}
        <BlocksHistory>{oldBlocks}</BlocksHistory>
      </BlocksSection>
      {testButton}
      <BlockInfoSection>
        <TitleRow>Last Block Info</TitleRow>
        {lastBlockInfoTable}
      </BlockInfoSection>
      <Footer />
    </Wrapper>
  );
};

const BlockInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 85%;
  min-height: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  border: 2px solid #ad6834;
  border-radius: 4px;
  background-color: #0e0e11;
`;

const Divider = styled.div`
  width: 3px;
  height: 220px;
  margin-left: 3vw;
  border-right: 3px dotted white;
`;

const Row = styled.div`
  display: flex;
  font-family: "Montserrat", sans-serif;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 30px;
  background-color: ${(props) => (props.diffColor ? "#24242b" : "#1b1b21")};
  color: white;
`;

const Bold = styled.span`
  font-weight: 700;
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

const Wrapper = styled.div`
  height: 100%;
  background-color: #0e0e11;
  background-image: url(https://hatchet.com.au/art/backgrounds/background-happy-dark.svg);
`;

const BlocksSection = styled.section`
  display: flex;
  width: 100%;
  min-height: 31.5vw;
  padding-top: 30px;
  align-items: center;
`;

const LastBlockInfo = styled.p`
  font-size: ${(props) => (props.index ? "2.2vw" : "1.4vw")};
  letter-spacing: ${(props) => (props.index ? "1px" : "0")};
  font-weight: ${(props) => (props.index ? "700" : "400")};
`;

const BlockInfo = styled.p`
  font-size: ${(props) => (props.index ? "1.22vw" : "1vw")};
  letter-spacing: ${(props) => (props.index ? "1px" : "0")};
  font-weight: ${(props) => (props.index ? "700" : "400")};
  ${(props) => (props.index ? "" : "margin: 2px")};
`;

const Block = styled.div`
  position: relative;
  font-weight: 700;
  font-family: "Orbitron", sans-serif;
  width: 10vw;
  height: 10vw;
  margin: 2vw;
  padding: 1px;
  color: white;
  text-align: center;
  background-image: linear-gradient(20deg, #3d348b, #f18701);
  outline: 1px solid black;
  animation: ${(props) => (props.fadeOut ? "fadeOut" : "fadeIn")} 0.8s linear;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:before {
    content: "";
    display: block;
    background-image: linear-gradient(-90deg, #161a1d, #2d2e2e);
    width: 1.65vw;
    height: 10vw;
    position: absolute;
    bottom: 0.48vw;
    left: 10vw;
    outline: 1px solid black;
    transform: skewY(-30deg);
  }

  &:after {
    content: "";
    display: block;
    background-color: #2d2e2e;
    background-image: linear-gradient(#161a1d, #2d2e2e);
    width: 10vw;
    height: 0.97vw;
    position: absolute;
    top: -0.96vw;
    left: 0.86vw;
    outline: 1px solid black;
    transform: skew(-60deg);
  }
`;

const LastBlockWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const LastBlock = styled(Block)`
  width: 18vw;
  height: 18vw;

  &:before {
    width: 3vw;
    height: 18vw;
    bottom: 0.9vw;
    left: 18vw;
  }

  &:after {
    width: 18vw;
    height: 1.75vw;
    top: -1.75vw;
    left: 1.5vw;
  }
`;

const BlocksHistory = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

export default BlocksExplorer;
