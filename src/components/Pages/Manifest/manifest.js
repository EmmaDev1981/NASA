import React from "react";
import { connect } from "react-redux";
import "./manifest.css";

function Manifest({ manifest }) {
  return (
    <div className="wrapper-title-div">
      <div className="title-div">
        <h1>{manifest && manifest?.photo_manifest.name}</h1>
      </div>
      <div className="wrapper-info">
        <h3>
          Landing Date: {manifest && manifest?.photo_manifest.landing_date}
        </h3>
        <h3>Launch Date: {manifest && manifest?.photo_manifest.launch_date}</h3>
        <h3>Status: {manifest && manifest?.photo_manifest.status}</h3>
        <h3>Max Sol: {manifest && manifest?.photo_manifest.max_sol}</h3>
        <h3>Max Date: {manifest && manifest?.photo_manifest.max_date}</h3>
        <h3>
          Total Photos: {manifest && manifest?.photo_manifest.total_photos}
        </h3>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    manifest: state.manifest,
  };
};

export default connect(mapStateToProps, null)(Manifest);
