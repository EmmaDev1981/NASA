import React from "react";
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
import "./card.css";

function Card(props) {
  //UI size adjust
  const [screeWidth, setScreenWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  //toast 1 "added correctly to fav"
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

  //toast 2 "Photo repeted alert"
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

  //popover 1
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    if (screeWidth < 800) return;
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //popover 2
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handlePopoverOpen2 = (event) => {
    if (screeWidth < 800) return;
    setAnchorEl2(event.currentTarget);
  };
  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);

  //popover 3
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const handlePopoverOpen3 = (event) => {
    if (screeWidth < 800) return;
    setAnchorEl3(event.currentTarget);
  };
  const handlePopoverClose3 = () => {
    setAnchorEl3(null);
  };
  const open3 = Boolean(anchorEl3);

  //handlers
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
            <img src={`${props.image}`} alt="nophoto" className="Img"></img>
          </Typography>
        ) : (
          <img src={noimage} alt="notFound" className="Img"></img>
        )}
      </div>

      <div className="favorite-icon">
        <FavoriteIcon
          className="fav-icon"
          onClick={handleAddToFavorites}
          onMouseEnter={handlePopoverOpen2}
          onMouseLeave={handlePopoverClose2}
        />
        {props.id && (
          <Link to={`/details`}>
            <InfoIcon
              className="info-icon"
              onClick={handleInfoDetails}
              onMouseEnter={handlePopoverOpen3}
              onMouseLeave={handlePopoverClose3}
            />
          </Link>
        )}
      </div>
      {/* <Popover
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
        // disableRestoreFocus
        disableScrollLock
      >
        <Typography sx={{ p: 1 }}>{props.name}</Typography>
        <Typography sx={{ p: 1 }}>{props.camera}</Typography>
        <Typography sx={{ p: 1 }}>{props.sol}</Typography>
        <Typography sx={{ p: 1 }}>{props.date}</Typography>
      </Popover> */}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open2}
        anchorEl={anchorEl2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose2}
        disableScrollLock
      // disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Add to Favorites</Typography>
      </Popover>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open3}
        anchorEl={anchorEl3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose3}
        disableScrollLock
      // disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Details</Typography>
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
