import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Container from "./layouts/container";
import {JOIN_PATH, MAIN_PATH} from "./constants";
import Main from "./views/main/main";
import Join from "./views/auth/join";

function App() {
  return (
      <Routes>
          <Route element={<Container />}>
              <Route path={MAIN_PATH()} element={<Main />} />
              <Route path={JOIN_PATH()} element={<Join />} />
          </Route>
      </Routes>
  );
}

export default App;
