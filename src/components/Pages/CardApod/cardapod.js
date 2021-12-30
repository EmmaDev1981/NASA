import React from "react";
import "./cardapod.css";
import noimage from "../../assets/noimage.jpg";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { addToFavorites, getPhotoDetails } from "../../Store/actions";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

function CardApod(props) {
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
        {props.id && (
          <a href={props.hdurl} target="_blank">
            <InfoIcon
              className="info-icon"
              onMouseEnter={handlePopoverOpen1}
              onMouseLeave={handlePopoverClose1}
            />
          </a>
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
        <Typography sx={{ p: 1 }}>{props.title}</Typography>
        <Typography sx={{ p: 1 }}>{props.date}</Typography>
        <Typography sx={{ p: 1 }}>{props.explanation}</Typography>
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
        <Typography sx={{ p: 1 }}>HD PHOTO</Typography>
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
 CardApod
);
