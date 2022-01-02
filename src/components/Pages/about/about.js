import React from 'react'
import Navigation from '../Nav/nav'
import imagen from '../../assets/curiosity.jpg'
import apod from '../../assets/apod.png'
import epic from '../../assets/epic.jpg'
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
        <h1>Rover Mission Overview (ROVERS)</h1>
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
        <h1>Astronomy Picture of the Day (APOD)</h1>
        <div className="div-foto">
          <img src={apod} alt="foto"></img>
        </div>
        <div className="description-about">
          <p>
            Astronomy Picture of the Day (APOD) is a website provided by NASA
            and Michigan Technological University (MTU). According to the
            website, "Each day a different image or photograph of our universe
            is featured, along with a brief explanation written by a
            professional astronomer."[1] The photograph does not necessarily
            correspond to a celestial event on the exact day that it is
            displayed, and images are sometimes repeated.[2] However, the
            pictures and descriptions often relate to current events in
            astronomy and space exploration. The text has several hyperlinks to
            more pictures and websites for more information. The images are
            either visible spectrum photographs, images taken at non-visible
            wavelengths and displayed in false color, video footage, animations,
            artist's conceptions, or micrographs that relate to space or
            cosmology. Past images are stored in the APOD Archive, with the
            first image appearing on June 16, 1995.[3] This initiative has
            received support from NASA, the National Science Foundation, and
            MTU. The images are sometimes authored by people or organizations
            outside NASA, and therefore APOD images are often copyrighted,
            unlike many other NASA image galleries.[4] When APOD began it
            received only 14 page views on its first day. As of 2012 it had
            received over a billion image views.[5] APOD is also translated into
            21 languages daily.[6]
          </p>
          <p>
            APOD was presented at a meeting of the American Astronomical Society
            in 1996.[7] Its practice of using hypertext[2] was analyzed in a
            paper in 2000.[8] It received a Scientific American Sci/Tech Web
            Award in 2001.[9] In 2002, the website was featured in an interview
            with Nemiroff on CNN Saturday Morning News.[10] In 2003, the two
            authors published a book titled The Universe: 365 Days[11] from
            Harry N. Abrams, which is a collection of the best images from APOD
            as a hardcover "coffee table" style book. APOD was the Featured
            Collection in the November 2004 issue of D-Lib Magazine.[12] During
            the United States federal government shutdown of 2013, APOD
            continued its service on mirror sites.[13][14] Dr. Robert J.
            Nemiroff and Dr. Jerry T. Bonnell were awarded the 2015
            Klumpke-Roberts Award by the Astronomical Society of the Pacific
            "for outstanding contributions to public understanding and
            appreciation of astronomy" for their work on APOD.[15][16]
          </p>
        </div>
        <h1>Earth Polychromatic Imaging Camera (EPIC)</h1>
        <div className="div-foto">
          <img src={epic} alt="foto"></img>
        </div>
        <div className="description-about">
          <p>
            EPIC (Earth Polychromatic Imaging Camera) is a 10-channel
            spectroradiometer (317 – 780 nm) onboard NOAA’s DSCOVR (Deep Space
            Climate Observatory) spacecraft. EPIC provides 10 narrow band
            spectral images of the entire sunlit face of Earth using a 2048x2048
            pixel CCD (Charge Coupled Device) detector coupled to a 30-cm
            aperture Cassegrain telescope (Figure 1). The DSCOVR spacecraft is
            located at the Earth-Sun Lagrange-1 (L-1) point giving EPIC a unique
            angular perspective that will be used in science applications to
            measure ozone, aerosols, cloud reflectivity, cloud height,
            vegetation properties, and UV radiation estimates at Earth's
            surface.
          </p>
          <p>
            The DSCOVR spacecraft with the DSCOVR Earth Science instruments
            NISTAR and EPIC are shown in Figure 5 relative to the size of
            persons working with them. The National Institute of Standards and
            Technology (NIST) Advanced Radiometer (NISTAR) is on the left side
            at the top of the spacecraft. It measures the absolute "irradiance"
            as a single pixel integrated over the entire sunlit face of the
            Earth. On the right side at the top of the spacecraft, EPIC is shown
            with the circular door closed. The door was opened when the
            spacecraft achieved orbit at L-1 in June 2015.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default About
