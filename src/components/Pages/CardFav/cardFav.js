import React from "react";
import "./cardFav.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFromFavorites, getPhotoDetailsFavorites } from "../../Store/actions";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import {Link} from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';

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
    props.getPhotoDetailsFavorites(props.id)
  }

  const open = Boolean(anchorEl);

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
          {
            /* <img src={photo} alt="Videogame" className="Img"></img> */
          }
        )}
      </div>

      <div className="favorite-icon">
        <DeleteIcon className='fav-icon' onClick={handleDeleteFromFavorites} />
        {props.id && (
            <Link to={`/details`}>
            <InfoIcon className='info-icon' onClick={handleInfoDetails}/>
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

export default connect(null, { deleteFromFavorites, getPhotoDetailsFavorites })(CardFav);
