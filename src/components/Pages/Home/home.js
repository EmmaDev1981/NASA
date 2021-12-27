import { React, useState } from "react";
import Navigation from "../Nav/nav";
import Pagination from "../Pagination/pagination";
import Card from "../Card/card";
import Filter from "../Filter/filter";
import { connect } from "react-redux";
import { getPhotosFromApi, getManifestByModel } from "../../Store/actions";
import "./home.css";
import Manifest from "../Manifest/manifest";

function Home({ photos }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(24);

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
    <div className="container">
      <Navigation />
      <div className="home-sub-title">
        <h2>Home</h2>
      </div>
      <Filter />
      <Manifest />
      <div className="games-div">
        <h3></h3>
        {currentCards.length >= 1 ? (
          currentCards.map((g) => (
            <Card
              key={g.id}
              name={g.rover.name}
              date={g.earth_date}
              camera={g.camera.name}
              image={g.img_src}
              id={g.id}
            />
          ))
        ) : typeof currentCards === "string" ? (
          <div>
            <p>LOADING....</p>
          </div>
        ) : (
          <div>
            <h1>NO PHOTOS FOUND - PLEASE TRY ANOTHER DATE OR CAMERA</h1>
          </div>
        )}
      </div>
      <Pagination
        cardPerPage={cardPerPage}
        totalCards={photos.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

export default connect(mapStateToProps, {
  getPhotosFromApi,
  getManifestByModel,
})(Home);
