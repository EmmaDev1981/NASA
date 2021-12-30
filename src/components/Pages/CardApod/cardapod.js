import React from "react";
import "./cardapod.css";
import noimage from "../../assets/noimage.jpg";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import HdIcon from '@mui/icons-material/Hd';
import { connect } from "react-redux";

function CardApod(props) {

  const [screeWidth, setScreenWidth] = React.useState(window.innerWidth)

  React.useEffect(()=>{
    setScreenWidth(window.innerWidth)
  }, [])

  //popover 1
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    if(screeWidth < 800) return
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  //popover 2
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handlePopoverOpen1 = (event) => {
    if(screeWidth < 800) return
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);

  return (
    <div className="container-apod-photos">
      <div className="photos-apod-div">
        {props.image ? (
          <Typography
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <img src={`${props.image}`} alt="--- No photo Founded ---" className="Img"></img>
          </Typography>
        ) : (
          <img src={noimage} alt="notFound" className="Img"></img>
        )}
      </div>

      <div className="favorite-icon">
        {props.id && (
          <a href={props.hdurl} target="_blank" rel="noreferrer">
            <HdIcon
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


export default connect()(
 CardApod
);
