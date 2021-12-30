import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Pages/landing/landing";
import Home from "./components/Pages/Home/home";
import Favorites from "./components/Pages/Favorites/favorites";
import Apod from "./components/Pages/Apod/apod";
import Details from "./components/Pages/Details/details";
import About from "./components/Pages/about/about";
import Page404 from "./components/Pages/Page404/page404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/apod" element={<Apod />} />
        <Route exact path='/details' element={<Details/>} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
