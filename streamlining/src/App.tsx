import React from "react";
// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
//Component
import Navbar from "./components/Navbar";

// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/ Login";
import Register from "./pages/Register";
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
