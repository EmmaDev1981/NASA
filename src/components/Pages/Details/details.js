import React from "react";
import NavBar from "../Nav/nav";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/footer";
import { Table } from 'react-bootstrap'
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
              <h3>Photo: {photoDetails[0].id}</h3>
            </div>
            <div className="info-photo">
              <img src={photoDetails[0].img_src} alt="sin" />
            </div>
            <Table striped bordered hover className="wrapper-title-div">
              <tbody>
                <tr>
                  <td>Rover:</td>
                  <td>{photoDetails[0].rover.name}</td>
                </tr>
                <tr>
                  <td>Photo Sol Date:</td>
                  <td> {photoDetails[0].sol}</td>
                </tr>
                <tr>
                  <td>Photo Earth Date:</td>
                  <td>{photoDetails[0].earth_date}</td>
                </tr>
                <tr>
                  <td>Camera: </td>
                  <td> {photoDetails[0].camera.full_name}</td>
                </tr>
              </tbody>
            </Table>
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
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    photoDetails: state.photoDetails,
  };
}

export default connect(mapStateToProps, null)(Details);
