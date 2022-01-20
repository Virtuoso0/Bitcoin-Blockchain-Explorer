import Home from "./Home";
import Navbar from "./Navbar";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blocks" element={<Navbar />} />
          <Route path="*" element={<Navbar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
