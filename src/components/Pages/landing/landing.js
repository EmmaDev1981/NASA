import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import imageLanding from "../../assets/landing.jpg";
import { connect } from "react-redux";
import nasaMobile from "../../assets/nasaMobile.jpg";
import { getPhotosFromApi, getManifestByModel,getPhotosFromApod } from "../../Store/actions";
import "./landing.css";

function Landing({ getPhotosFromApi, getManifestByModel,getPhotosFromApod }) {

  const [screeWidth, setScreenWidth] = React.useState(window.innerWidth)

  React.useEffect(()=>{
    setScreenWidth(window.innerWidth)
  }, [])

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

export default connect(null, { getPhotosFromApi, getManifestByModel,getPhotosFromApod })(Landing);
