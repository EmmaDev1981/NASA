import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/landing.png";
import { connect } from "react-redux";
import { getPhotosFromApi, getManifestByModel,getPhotosFromApod } from "../../Store/actions";
import "./landing.css";

function Landing({ getPhotosFromApi, getManifestByModel,getPhotosFromApod }) {
  const data = { 
    date: "", 
    count: 4, 
    startDate: "", 
    endDate: ""
}
  useEffect(() => {
    getPhotosFromApi();
    getPhotosFromApod(data)
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

export default connect(null, { getPhotosFromApi, getManifestByModel,getPhotosFromApod })(Landing);
