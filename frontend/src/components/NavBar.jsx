import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/books/select'>Search</Link>
        </li>
        <li>
          <Link to='/signIn'>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
