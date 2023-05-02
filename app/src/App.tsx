import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import UserNFT from "./components/UserNFT";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/usernft" element={<UserNFT />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
