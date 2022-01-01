import { React, useState, useEffect, useCallback } from "react";
import Navigation from "../Nav/nav";
import Paginate from "../Pagination/pagination";
import Card from "../Card/card";
import Filter from "../Filter/filter";
import { connect } from "react-redux";
import { getPhotosFromApi, getManifestByModel } from "../../Store/actions";
import Manifest from "../Manifest/manifest";
import Footer from "../Footer/footer";
import Lazyload from "react-lazyload";
import "./home.css";

function Home({ photos }) {

  const fetchPhotos = useCallback(() => {
    getPhotosFromApi();
    getManifestByModel("curiosity");
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos]);

  //pagination index
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
      <Manifest />
      <Filter />
      <div className="games-div">
        {currentCards.length >= 1 ? (
          currentCards.map((g) => (
            <Lazyload key={g.id} height={200} offset={-100}>
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
          <div>
            <h1>NO PHOTOS FOUND - PLEASE TRY ANOTHER DATE OR CAMERA</h1>
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

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

export default connect(mapStateToProps, {
  getPhotosFromApi,
  getManifestByModel,
})(Home);
