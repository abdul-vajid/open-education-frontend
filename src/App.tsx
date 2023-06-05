import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Router from "./routes/Router.tsx";
import Background from "./containers/Background/Background.tsx";
import Theme from "./features/theme/Theme.tsx";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Theme/>
        <Routes>
          <Route path="/*" element={<Router />} />
        </Routes>
        <Background />
      </BrowserRouter>
    </div>
  );
}

export default App;