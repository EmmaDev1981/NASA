import React, {useState, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/landing.jpg";
import { connect } from "react-redux";
import nasaMobile from "../../assets/nasaMobile.jpg";
import { getPhotosFromApi, getManifestByModel,getPhotosFromApod } from "../../Store/actions";
import "./landing.css";

function Landing({ getPhotosFromApi, getManifestByModel, getPhotosFromApod }) {

  const [screeWidth, setScreenWidth] = useState(window.innerWidth);
  const [data, setData] = useState({
    date: "",
    count: 4,
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const fetchPhotos = useCallback(() => {
    getPhotosFromApi();
    getPhotosFromApod(data);
    getManifestByModel("curiosity");
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos]);

  return (
    <div className="landing-div">
      {screeWidth > 600 ? (
        <img src={imageLanding} alt="landing" className="theImage"></img>
      ) : (
        <img src={nasaMobile} alt="mobile" className="theImage"></img>
      )}
      <Link to="/home">
        <button className="myButton">ENTER</button>
      </Link>
    </div>
  );
}

export default connect(null, {
  getPhotosFromApi,
  getManifestByModel,
  getPhotosFromApod,
})(Landing);
