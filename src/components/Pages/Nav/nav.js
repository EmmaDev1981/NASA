import React from "react";
import { NavLink } from 'react-router-dom'
import './nav.css'
import {connect} from 'react-redux'

function NavBar({favorites}) {

  var favItems = 0;
  if(favorites !== 'undefined' && favorites.length > 0) {
    favItems = favorites.length
  }

  return (
    <div className="navbar-div">
      <NavLink to="/">
        <button>MAIN</button>
      </NavLink>
      <NavLink to="/home">
        <button>HOME</button>
      </NavLink>
      <NavLink to="/favorites">
        <button>{`FAVORITES(${favItems})`}</button>
      </NavLink>
      <NavLink to="/about">
        <button>ABOUT</button>
      </NavLink>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites
  }
}

export default connect(mapStateToProps, null) (NavBar)
