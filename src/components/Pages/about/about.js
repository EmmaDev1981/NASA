import React from 'react'
import Navigation from '../Nav/nav'
import imagen from '../../assets/curiosity.jpg'
import './about.css'

function About() {
    return (
      <>
        <Navigation />
        <div className="home-sub-title">
          <h2>About</h2>
        </div>
        <div className="container-about">
          <h1>NASA API</h1>
          <div className="div-foto">
            <img src={imagen} alt="foto"></img>
          </div>
          <div className="description-about">
            <p>
              Part of NASA's Mars Science Laboratory mission, Curiosity is the
              largest and most capable rover ever sent to Mars. It launched Nov.
              26, 2011 and landed on Mars at 10:32 p.m. PDT on Aug. 5, 2012
              (1:32 a.m. EDT on Aug. 6, 2012). Curiosity set out to answer the
              question: Did Mars ever have the right environmental conditions to
              support small life forms called microbes? Early in its mission,
              Curiosity's scientific tools found chemical and mineral evidence
              of past habitable environments on Mars. It continues to explore
              the rock record from a time when Mars could have been home to
              microbial life.
            </p>
          </div>
        </div>
      </>
    );
}

export default About
