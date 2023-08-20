import { React, useState } from "react";
import Navigation from "../Nav/nav";
import Paginate from "../Pagination/pagination";
import Card from "../Card/card";
import Filter from "../Filter/filter";
import { useSelector } from "react-redux";
import Manifest from "../Manifest/manifest";
import Footer from "../Footer/footer";
import Lazyload from "react-lazyload";
import noresults from '../../assets/noresults.jpeg'
import "./home.css";

export default function Home() {

  const photos = useSelector((state) => state.photos)

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(25); //max photos x page

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  var currentCards;
  if (typeof photos === "string" || photos.length === 0) {
    currentCards = photos;
  } else {
    currentCards = photos.slice(indexOfFirstCard, indexOfLastCard);
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navigation />
      <div className="home-sub-title">
        <h2>Mars Rover Photo Missions</h2>
      </div>
      <Filter />
      <Manifest />
      <div className="games-div">
        {currentCards.length >= 1 ? (
          currentCards.map((g) => (
            <Lazyload
              key={g.id}
              height={200}
              once={true}
              offset={100}
              debounce={300}
            >
              <Card
                key={g.id}
                name={g.rover.name}
                date={g.earth_date}
                sol={g.sol}
                camera={g.camera.name}
                image={g.img_src}
                id={g.id}
              />
            </Lazyload>
          ))
        ) : typeof currentCards === "string" ? (
          <div>
            <p>LOADING....</p>
          </div>
        ) : (
          <div className="noresults-div">
            <img src={noresults} alt='noresults'></img>
          </div>
        )}
      </div>
      <Paginate
        cardPerPage={cardPerPage}
        totalCards={photos.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
}
