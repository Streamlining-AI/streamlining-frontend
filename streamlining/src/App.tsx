import React from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
//Component
import Navbar from './components/Navbar';

// eslint-disable-next-line
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Login from './pages/ Login';

const App : React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Login/>
    </Router>
  );
}

export default App;
