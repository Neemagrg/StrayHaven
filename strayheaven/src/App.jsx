import { useState } from 'react';
import './App.css';
import Home from './pages/homepage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';

function App() {
  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage/>} />
  </Routes>
  );
}

export default App; 