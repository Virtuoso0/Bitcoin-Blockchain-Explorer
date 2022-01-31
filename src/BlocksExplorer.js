import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import styled from "styled-components";

let blockInfo = null;
const blocksArray = [];
let firstBlock = true;
let setBlocksTimeout = null;
let setPingInterval = null;

const BlocksExplorer = () => {
  const [oldBlocks, setOldBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const [testButton, setTestButton] = useState(null);
  // const [lastBlockTime, setLastBlockTime] = useState(null);
  // const [timeArr, setTimeArr] = useState([]);

  // const setTimeUpdater = () => {
  //   setInterval(() => {
  //     if (blockInfo) {
  //       setLastBlockTime(
  //         Math.ceil((Date.now() - blockInfo.time * 1000) / 60000)
  //       );
  //     }
  //     const tempArr = [];
  //     oldBlocks.forEach((block) => {
  //       tempArr.shift((Date.now() - block.time * 1000) / 60000);
  //     });
  //     setTimeArr(tempArr);
  //   }, 5000);
  // };
  // setTimeUpdater();

  const saveLastBlockInfo = (json) => {
    console.log(json);
    blockInfo = {
      blockIndex: json.x.blockIndex,
      nTx: json.x.nTx,
      reward: Math.trunc(json.x.reward / 1000000) / 100,
      time: json.x.time,
    };
  };

  const prepareLastBlock = (json) => {
    if (!firstBlock) {
      setLastBlock(
        <>
          <LastBlock fadeOut>
            <LastBlockInfo index>{blockInfo.blockIndex}</LastBlockInfo>
            <LastBlockInfo>{`transactions:   ${blockInfo.nTx}`}</LastBlockInfo>
            <LastBlockInfo>{`reward:   ${blockInfo.reward}`}</LastBlockInfo>
          </LastBlock>
          {/* <Timer fadeOut>
            {lastBlockTime && `${lastBlockTime} minutes ago`}
          </Timer> */}
        </>
      );
    }

    setBlocksTimeout = setTimeout(() => {
      setLastBlock(
        <>
          <LastBlock fadeIn>
            <LastBlockInfo index>{json.x.blockIndex}</LastBlockInfo>
            <LastBlockInfo>{`transactions:   ${json.x.nTx}`}</LastBlockInfo>
            <LastBlockInfo>{`reward:   ${blockInfo.reward}`}</LastBlockInfo>
          </LastBlock>
          {/* <Timer fadeOut>
            {lastBlockTime && `${lastBlockTime} minutes ago`}
          </Timer> */}
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
          <BlockInfo>{block.nTx}</BlockInfo>
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
            <BlockInfo>{block.nTx}</BlockInfo>
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

    // setInterval(() => {
    //   if (blockInfo) {
    //     setLastBlockTime(
    //       Math.ceil((Date.now() - blockInfo.time * 1000) / 60000)
    //     );
    //   }
    //   const tempArr = [];
    //   oldBlocks.forEach((block) => {
    //     tempArr.shift((Date.now() - block.time * 1000) / 60000);
    //   });
    //   setTimeArr(tempArr);
    // }, 5000);

    return () => {
      clearTimeout(setBlocksTimeout);
      clearInterval(setPingInterval);
      ws.close();
    };
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <AllBlocks>
        <LastBlockWrapper>{lastBlock}</LastBlockWrapper>
        <BlocksHistory>{oldBlocks}</BlocksHistory>
      </AllBlocks>
      {testButton}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: #0e0e11;
  background-image: url(https://hatchet.com.au/art/backgrounds/background-happy-dark.svg);
`;

const AllBlocks = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  align-items: center;
`;

const LastBlockInfo = styled.p`
  font-size: ${(props) => (props.index ? "2.2vw" : "1.4vw")};
  color: ${(props) => (props.index ? "white" : "white")};
  letter-spacing: ${(props) => (props.index ? "1px" : "0")};
  font-weight: ${(props) => (props.index ? "700" : "400")};
`;

const BlockInfo = styled.p`
  font-size: ${(props) => (props.index ? "1.22vw" : "1vw")};
  color: ${(props) => (props.index ? "white" : "white")};
  letter-spacing: ${(props) => (props.index ? "1px" : "0")};
  font-weight: ${(props) => (props.index ? "700" : "400")};
`;

const Block = styled.div`
  position: relative;
  font-weight: 700;
  font-family: Orbitron;
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

const Timer = styled.div`
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 8vw;
  left: 0;

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
