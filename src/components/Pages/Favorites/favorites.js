import { React, useState } from "react";
import Navigation from "../Nav/nav";
import Pagination from "../Pagination/pagination";
import CardFav from "../CardFav/cardFav";
import { connect } from "react-redux";
import { getPhotosFromApi } from "../../Store/actions";
import "./favorites.css";
import Footer from "../Footer/footer";

function Favorites({ photos }) {
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
    <div>
      <Navigation />
      <div className="home-sub-title">
        <h2>Favorites</h2>
      </div>
      <div className="games-div">
        {currentCards.length >= 1 ? (
          currentCards.map((g) => (
            <CardFav
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
            <h1>Not found</h1>
          </div>
        ) : (
          <div>
            <h1>ANY FAVORITE PHOTO ADDED</h1>
          </div>
        )}
      </div>
      <Pagination
        cardPerPage={cardPerPage}
        totalCards={photos.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    photos: state.favorites,
  };
};

export default connect(mapStateToProps, { getPhotosFromApi })(Favorites);
