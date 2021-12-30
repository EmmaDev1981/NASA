import React from "react";
import NavBar from "../Nav/nav";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./details.css";

function Details({ photoDetails }) {

  return (
    <div>
      <NavBar />
      <div className="home-sub-title">
        <h2>Details</h2>
      </div>
      {photoDetails !== null && photoDetails.length > 0 ? (
        <div className="details-div">
          <div>
            <div className="info-title-details">
              <h3>Photo ID: {photoDetails[0].id}</h3>
            </div>
            <div className="info-photo">
              <img src={photoDetails[0].img_src} alt="sin" />
            </div>
            <div className="info-details">
              <p>
                <strong>Rover: </strong>
                {photoDetails[0].rover.name}
              </p>
              <p>
                <strong>Photo Sol Date: </strong>
                {photoDetails[0].sol}
              </p>
              <p>
                <strong>Photo Earth Date: </strong>
                {photoDetails[0].earth_date}
              </p>
              <p>
                <strong>Camera: </strong>
                {photoDetails[0].camera.full_name}
              </p>
            </div>
            <div className="back-button-details">
              <NavLink to="/home">
                <button>BACK</button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <h3>No hay detalles</h3>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    photoDetails: state.photoDetails,
  };
}

export default connect(mapStateToProps, null)(Details);
