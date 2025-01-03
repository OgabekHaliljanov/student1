// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import Navbar from './components/Navbar'; // Импортируем Navbar
import AdminPanel from './components/admin/AdminPonel';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Добавляем Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/admin" element={<AdminPanel />} />
    
      </Routes>
    </Router>
  );
};

export default App;
