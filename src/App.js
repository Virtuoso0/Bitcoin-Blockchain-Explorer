import Home from "./Home";
import NotFoundPage from "./404";
import BlocksExplorer from "./BlocksExplorer";
import TransactionsExplorer from "./TransactionsExplorer";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blocks" element={<BlocksExplorer />} />
          <Route path="/transactions" element={<TransactionsExplorer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
