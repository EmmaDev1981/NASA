import React from "react";
import "./card.css";
import noimage from "../../assets/noimage.jpg";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { addToFavorites, getPhotoDetails } from "../../Store/actions";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";

function Card(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariantOk = () => {
    enqueueSnackbar("ADDED CORRECTLY TO FAVORITES", {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      TransitionComponent: Slide,
      variant: "success",
    });
  };

  const handleClickVariantAlreadyAdded = () => {
    enqueueSnackbar("PHOTO ALREADY ADDED", {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      TransitionComponent: Slide,
      variant: "info",
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAddToFavorites = () => {
    const alreadyAdded = props.favorites.some((p) => p.id === props.id);
    if (alreadyAdded) {
      handleClickVariantAlreadyAdded();
    } else {
      props.addToFavorites(props.id);
      handleClickVariantOk();
    }
  };

  const handleInfoDetails = () => {
    props.getPhotoDetails(props.id);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="container-photos">
      <div className="photos-div">
        {props.image ? (
          <Typography
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <img src={`${props.image}`} alt="photo" className="Img"></img>
          </Typography>
        ) : (
          <img src={noimage} alt="notFound" className="Img"></img>
        )}
      </div>

      <div className="favorite-icon">
        <FavoriteIcon className="fav-icon" onClick={handleAddToFavorites} />
        {props.id && (
          <Link to={`/details`}>
            <InfoIcon className="info-icon" onClick={handleInfoDetails} />
          </Link>
        )}
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{props.name}</Typography>
        <Typography sx={{ p: 1 }}>{props.camera}</Typography>
      </Popover>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
  };
}

export default connect(mapStateToProps, { addToFavorites, getPhotoDetails })(
  Card
);
