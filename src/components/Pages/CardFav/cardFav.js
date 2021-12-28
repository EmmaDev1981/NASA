import React from "react";
import "./cardFav.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteFromFavorites,
  getPhotoDetailsFavorites,
} from "../../Store/actions";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import noimage from "../../assets/noimage.jpg";

function CardFav(props) {
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFromFavorites = () => {
    props.deleteFromFavorites(props.id);
    handleClickVariantDelete();
  };

  const handleInfoDetails = () => {
    props.getPhotoDetailsFavorites(props.id);
  };

  const open = Boolean(anchorEl);

  //popover 1
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handlePopoverOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);

  //popover 2
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handlePopoverOpen1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);

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
            <img src={`${props.image}`} alt="photo" className="Img"></img>
          </Typography>
        ) : (
          <img src={noimage} alt="noImage" className="Img"></img>
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
      >
        <Typography sx={{ p: 1 }}>Details</Typography>
      </Popover>
    </div>
  );
}

export default connect(null, { deleteFromFavorites, getPhotoDetailsFavorites })(
  CardFav
);
