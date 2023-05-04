import React from "react";
import "./App.css";
import {
  BaseNFTContainer,
  UserNFTContainer,
  HeaderContainer
} from "./container";
import { BrowserRouter, Route, Routes  } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <div>
        <Routes>
          <Route path="/" element={<BaseNFTContainer />} />
          <Route path="/user-nft" element={<UserNFTContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
