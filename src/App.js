import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Pages/landing/landing";
import Home from "./components/Pages/Home/home";
import About from "./components/Pages/about/about";
import Page404 from "./components/Pages/Page404/page404";
import Favorites from "./components/Pages/Favorites/favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
