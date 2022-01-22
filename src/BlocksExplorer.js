import Navbar from "./Navbar";
import api from "./api/blocks.js";
import { useEffect, useState } from "react";
import styled from "styled-components";

const BlocksExplorer = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await api.get("/");
        setBlocks(response.data.slice(0, 5));
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchBlocks();
  }, []);

  return (
    <div className="blocks-explorer">
      <Navbar />
      <Blocks>
        {blocks.map((block) => (
          <Block key={block.block_index}>
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
