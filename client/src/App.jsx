import './App.css';
import Navbar from './Components/Navbar';
import { Routes ,Route } from 'react-router-dom';
import HomePage from './Components/HomePage/index';
import React from 'react';
function App() {
  return (
    <div className="App">
      <Navbar/>
      
      <Routes>
      <Route path="/"  element={<HomePage />} />
      </Routes>
  
    </div>
  );
}

export default App;
