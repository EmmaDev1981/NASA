import React from 'react'
import Navigation from '../Nav/nav'
import imagen from '../../assets/curiosity.jpg'
import './about.css'
import Footer from '../Footer/footer'

function About() {
  return (
    <>
      <Navigation />
      <div className="home-sub-title">
        <h2>About</h2>
      </div>
      <div className="container-about">
        <h1>Rover Mission Overview</h1>
        <div className="div-foto">
          <img src={imagen} alt="foto"></img>
        </div>
        <div className="description-about">
          <p>
            Part of NASA's Mars Science Laboratory mission, Curiosity is the
            largest and most capable rover ever sent to Mars. It launched Nov.
            26, 2011 and landed on Mars at 10:32 p.m. PDT on Aug. 5, 2012 (1:32
            a.m. EDT on Aug. 6, 2012). Curiosity set out to answer the question:
            Did Mars ever have the right environmental conditions to support
            small life forms called microbes? Early in its mission, Curiosity's
            scientific tools found chemical and mineral evidence of past
            habitable environments on Mars. It continues to explore the rock
            record from a time when Mars could have been home to microbial life.
          </p>
          <p>
            Surveying Gale Crater Curiosity explores Gale Crater and acquires
            rock, soil, and air samples for onboard analysis. The car-size rover
            is about as tall as a basketball player and uses a 7 foot-long arm
            to place tools close to rocks selected for study. Curiosity's large
            size allows it to carry an advanced kit of 10 science instruments.
            It has tools including 17 cameras, a laser to vaporize and study
            small pinpoint spots of rocks at a distance, and a drill to collect
            powdered rock samples. It hunts for special rocks that formed in
            water and/or have signs of organics. Strong, Smart and Curious
            Curiosity carries the biggest, most advanced instruments for
            scientific studies ever sent to the Martian surface. The history of
            Martian climate and geology is written in the chemistry and
            structure of the rocks and soil. Curiosity reads this record by
            analyzing powdered samples drilled from rocks. It also measures the
            chemical fingerprints present in different rocks and soils to
            determine their composition and history, especially their past
            interactions with water. Coming in for a Landing Mars Science
            Laboratory arrived at Mars through technological innovations that
            tested a completely new landing method. The spacecraft descended on
            a parachute, then during the final seconds before landing, the
            landing system fired rockets to allow it to hover while a tether
            lowered Curiosity to the surface. The rover landed on its wheels,
            the tether was cut, and the landing system flew off to crash-land a
            safe distance away. The Mars Science Laboratory mission represents a
            huge step in Mars exploration because it has: Demonstrated the
            ability to land a very large, heavy rover to the surface of Mars
            Demonstrated the ability to land more precisely in a 12.4-mile
            (20-kilometer) landing area Demonstrated long-range mobility on Mars
            for studying diverse environments and analyzing samples found in
            different settings
          </p>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default About
