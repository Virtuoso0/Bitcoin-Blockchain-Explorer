import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import styled from "styled-components";

const BlocksExplorer = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.blockchain.info/inv");
    const blocksArray = [];
    let setBlocksTimeout = null;
    let setPingInterval = null;
    const apiCallBlocks = {
      op: "blocks_sub",
    };
    const apiCallPing = {
      op: "ping",
    };

    setPingInterval = setInterval(
      () => ws.send(JSON.stringify(apiCallPing)),
      60000
    );

    ws.onopen = () => {
      ws.send(JSON.stringify(apiCallBlocks));
    };
    ws.onmessage = function (event) {
      try {
        if (event.data !== '{"op":"pong"}') {
          const json = JSON.parse(event.data);
          setBlocks(
            blocksArray.map((block, index) => (
              <BlockOut key={index}>
                <p>{block.x.blockIndex}</p>
              </BlockOut>
            ))
          );

          blocksArray.unshift(json);
          if (blocksArray.length > 5) blocksArray.pop();
          setBlocksTimeout = setTimeout(() => {
            setBlocks(
              blocksArray.map((block, index) => (
                <Block delay={(index + 1) / 2} key={index}>
                  <p>{block.x.blockIndex}</p>
                </Block>
              ))
            );
          }, 800);
        }
      } catch (err) {
        console.log(err);
      }
    };
    return () => {
      clearTimeout(setBlocksTimeout);
      clearInterval(setPingInterval);
      ws.close();
    };
  }, []);

  return (
    <div className="blocks-explorer">
      <Navbar />
      <Blocks>{blocks}</Blocks>
    </div>
  );
};

const Blocks = styled.div`
  display: flex;
  justify-content: center;
`;

const Block = styled.div`
  width: 150px;
  height: 150px;
  margin: 60px;
  color: black;
  text-align: center;
  background-color: pink;
  animation: fade-in ${(props) => props.delay || "0"}s linear;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const BlockOut = styled(Block)`
  animation: fade-out 0.8s linear;
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default BlocksExplorer;
