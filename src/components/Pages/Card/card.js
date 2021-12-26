import React from 'react'
import './card.css'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {addToFavorites} from '../../Store/actions'
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

function Card(props) {

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariantOk = () => {
    enqueueSnackbar('ADDED CORRECTLY TO FAVORITES', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
      variant: 'success',
    })
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAddToFavorites = () => {
    props.addToFavorites(props.id)
    handleClickVariantOk()
  }

  const open = Boolean(anchorEl);
    
    return (
      <div className="container-game">
        <div className="game-div">
          {props.image ? (
            <Typography
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <img src={`${props.image}`} alt="Videogame" className="Img"></img>
            </Typography>
          ) : (
            {
              /* <img src={photo} alt="Videogame" className="Img"></img> */
            }
          )}
        </div>

        <div className="favorite-icon">
            <FavoriteIcon onClick={handleAddToFavorites}/>
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

export default connect (null, {addToFavorites})(Card)

