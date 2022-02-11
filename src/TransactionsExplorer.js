import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Table from "./Table";

const TransactionsExplorer = () => {
  return (
    <Wrapper>
      <Navbar />
      <TableSection>
        <Table></Table>
      </TableSection>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TableSection = styled.section``;

export default TransactionsExplorer;
