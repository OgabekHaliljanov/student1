// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/add-student" style={linkStyle}>Add Student</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/admin" style={linkStyle}>Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

// Добавьте стили для Navbar
const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px 0',
};

const navListStyle = {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
};

const navItemStyle = {
  margin: '0 15px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
};

export default Navbar;
