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
import Modelpage from "./pages/Modelpage";
import UploadModel from "./pages/UploadModel";
import ProtectedRoute from "./components/ProtectedRoute";
import CallbackGithub from "./components/CallbackGithub";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home/>}/>        
        <Route path="/login/github/:status" element={<CallbackGithub />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/model/:model_id" element={<Modelpage />} />

        <Route
          path="/uploadModel"
          element={
            <ProtectedRoute>
              <UploadModel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right"/>
    </Router>
  );
};

export default App;
