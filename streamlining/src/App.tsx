import React, { useState } from "react";
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
import Explore from "./pages/Explore";
import HamburgerMenu from "./components/Navbar/components/HambergerMenu";
import Doc from "./pages/Documentation/Doc";
import UpdateModel from "./pages/UpdateModel/UpdateModel";

const App: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Router>
      <HamburgerMenu isOpen={isOpen} state={setOpen}/>
      <Navbar isOpen={isOpen} state={setOpen} />
      <Routes>
      
        <Route path="/" element={<Home/>}/>        
        <Route path="/doc" element={<Doc/>}/>
        <Route path="/login/github/:status" element={<CallbackGithub />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/model/:model_id" element={<Modelpage />} />
        <Route path="/explore" element={<Explore/>}/>
        <Route
          path="/uploadModel"
          element={
            <ProtectedRoute>
              <UploadModel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateModel/:model_id"
          element={
            <ProtectedRoute>
              <UpdateModel />
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
