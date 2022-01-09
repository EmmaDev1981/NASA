import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Pages/landing/landing";
import Home from "./components/Pages/Home/home";
import Favorites from "./components/Pages/Favorites/favorites";
import Apod from "./components/Pages/Apod/apod";
import Epic from "./components/Pages/Epic/epic"
import Details from "./components/Pages/Details/details";
import About from "./components/Pages/about/about";
import Signup from "./components/Pages/Login/signup";
import Page404 from "./components/Pages/Page404/page404";
import {connect} from 'react-redux'

function App({isAuthenticated}) {
   return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/apod" element={isAuthenticated ? <Apod /> : <Signup/>} />
        <Route exact path="/epic" element={isAuthenticated ? <Epic /> : <Signup/>} />
        <Route exact path='/details' element={<Details/>} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userLogged
  }
}

export default connect (mapStateToProps, null)(App);
