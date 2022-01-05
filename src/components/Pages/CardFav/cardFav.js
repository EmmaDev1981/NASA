import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import noimage from "../../assets/noimage.jpg";
import "./cardFav.css";
import {
  deleteFromFavorites,
  getPhotoDetailsFavorites,
} from "../../Store/actions";

function CardFav(props) {
  
  //Ui adjust
  const [screeWidth, setScreenWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  //toast "REMOVED CORRECTLY"
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariantDelete = () => {
    enqueueSnackbar("REMOVED CORRECTLY FROM FAVORITES", {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      TransitionComponent: Slide,
      variant: "success",
    });
  };

  //handlers
  const handleDeleteFromFavorites = () => {
    props.deleteFromFavorites(props.id);
    handleClickVariantDelete();
  };

  const handleInfoDetails = () => {
    props.getPhotoDetailsFavorites(props.id);
  };

  //popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    if (screeWidth < 800) return;
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  //popover 1
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const handlePopoverOpen1 = (event) => {
    if (screeWidth < 800) return;
    setAnchorEl1(event.currentTarget);
  };
  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };
  const open1 = Boolean(anchorEl1);

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

  return (
    <div className="container-photo-fav">
      <div className="photo-fav-div">
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
          <img src={noimage} alt="sin" className="Img" />
        )}
      </div>

      <div className="favorite-icon">
        <DeleteIcon
          className="fav-icon"
          onClick={handleDeleteFromFavorites}
          onMouseEnter={handlePopoverOpen2}
          onMouseLeave={handlePopoverClose2}
        />
        {props.id && (
          <Link to={`/details`}>
            <InfoIcon
              className="info-icon"
              onMouseEnter={handlePopoverOpen1}
              onMouseLeave={handlePopoverClose1}
              onClick={handleInfoDetails}
            />
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
        disableScrollLock
      >
        <Typography sx={{ p: 1 }}>{props.name}</Typography>
        <Typography sx={{ p: 1 }}>{props.camera}</Typography>
      </Popover>
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
        disableRestoreFocus
        disableScrollLock
      >
        <Typography sx={{ p: 1 }}>Remove from Favorites</Typography>
      </Popover>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open1}
        anchorEl={anchorEl1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose1}
        disableRestoreFocus
        disableScrollLock
      >
        <Typography sx={{ p: 1 }}>Details</Typography>
      </Popover>
    </div>
  );
}

export default connect(null, { deleteFromFavorites, getPhotoDetailsFavorites })(
  CardFav
);
