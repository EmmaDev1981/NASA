import React from "react";
import { NavLink } from 'react-router-dom'
import './nav.css'
import {connect} from 'react-redux'
import {signOUT, resetLogin} from '../../Store/actions'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

function NavBar({favorites, userLogged, signOUT, resetLogin}) {

  const navigate = useNavigate();

  var favItems = 0;
  if(favorites !== 'undefined' && favorites.length > 0) {
    favItems = favorites.length
  }

  const handleSignOut = () => {
    signOUT()
    resetLogin()
    navigate('/home')
    handleLogoutMessage()
  }

    //toast "Logout message"
    const { enqueueSnackbar } = useSnackbar();
    const handleLogoutMessage = () => {
      enqueueSnackbar(`GOOD BYE!!!!`, {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "info",
      });
    };

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
        <button onClick={handleSignOut} >SIGN-OUT</button>
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

export default connect(mapStateToProps, {signOUT, resetLogin}) (NavBar)
