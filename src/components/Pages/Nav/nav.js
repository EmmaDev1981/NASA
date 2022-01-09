import React from "react";
import { NavLink } from 'react-router-dom'
import './nav.css'
import {connect} from 'react-redux'
import {signOUT} from '../../Store/actions'

function NavBar({favorites, userLogged, signOUT}) {

  var favItems = 0;
  if(favorites !== 'undefined' && favorites.length > 0) {
    favItems = favorites.length
  }

  return (
    <div className="navbar-app-div">
      <NavLink to="/">
        <button>INTRO</button>
      </NavLink>
      <NavLink to="/home">
        <button>ROVERS</button>
      </NavLink>
      <NavLink to="/apod">
        <button>APOD</button>
      </NavLink>
      <NavLink to="/epic">
        <button>EPIC</button>
      </NavLink>
      <NavLink to="/favorites">
        <button>{`FAVORITES(${favItems})`}</button>
      </NavLink>
      <NavLink to="/about">
        <button>ABOUT</button>
      </NavLink>
      {userLogged ? (
        <button onClick={signOUT} >SIGN-OUT</button>
      ) : (
        <NavLink to="/signup">
          <button>SIGN-UP</button>
        </NavLink>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    userLogged: state.userLogged
  }
}

export default connect(mapStateToProps, {signOUT}) (NavBar)
