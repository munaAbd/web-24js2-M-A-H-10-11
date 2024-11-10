import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Hem</Link></li>
        <li><Link to="/cart">Varukorg ({cartCount})</Link></li> {/* Visa antal köpta varor */}
      </ul>
    </nav>
  );
}

export default Navbar;
