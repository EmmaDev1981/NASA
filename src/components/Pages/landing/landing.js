import React from "react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/landing.png";
import { connect } from "react-redux";
import { getPhotosFromApi, getManifestByModel } from "../../Store/actions";
import "./landing.css";

function Landing({ getPhotosFromApi, getManifestByModel }) {
  React.useEffect(() => {
    getPhotosFromApi();
    getManifestByModel("curiosity");
  }, []);
  return (
    <div className="landing-div">
      <img src={imageLanding} alt="landing" className="theImage"></img>
      <Link to="/home">
        <button className="myButton">ENTER</button>
      </Link>
    </div>
  );
}

export default connect(null, { getPhotosFromApi, getManifestByModel })(Landing);
