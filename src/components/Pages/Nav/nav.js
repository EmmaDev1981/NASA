import React from "react";
import { NavLink } from 'react-router-dom'
import './nav.css'

function NavBar() {
  return (
    <div className="navbar-div">
      <NavLink to="/">
        <button>MAIN</button>
      </NavLink>
      <NavLink to="/home">
        <button>HOME</button>
      </NavLink>
      <NavLink to="/favorites">
        <button>FAVORITES</button>
      </NavLink>
      <NavLink to="/about">
        <button>ABOUT</button>
      </NavLink>
    </div>
  );
}

export default NavBar
