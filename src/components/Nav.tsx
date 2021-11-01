import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = (props: any) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/toast">Toast</Link>
        </li>
        <li>
          <Link to="/psd">PsdJS</Link>
        </li>
        <li>
          <Link to="/glotoon">Glotoon</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;