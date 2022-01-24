import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import styled from "styled-components";

const BlocksExplorer = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.blockchain.info/inv");
    const apiCallBlocks = {
      op: "blocks_sub",
    };
    const apiCallPing = {
      op: "ping",
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCallBlocks));
    };
    setInterval(() => ws.send(JSON.stringify(apiCallPing)), 60000);

    const tempArray = [];
    ws.onmessage = function (event) {
      try {
        if (!event.data === '{"op":"pong"}') {
          const json = JSON.parse(event.data);
          tempArray.push(json);
          setBlocks(tempArray);
        }
      } catch (err) {
        console.log(err);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div className="blocks-explorer">
      <Navbar />
      <Blocks>
        {blocks.map((block) => (
          <Block key={block.blockIndex}>
            <p>{block.height}</p>
          </Block>
        ))}
      </Blocks>
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
`;

export default BlocksExplorer;
