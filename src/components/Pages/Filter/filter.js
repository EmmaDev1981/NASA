import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import "react-datepicker/dist/react-datepicker.css";
import "./filter.css";
import {
  getPhotosByModel,
  getManifestByModel,
  getPhotosBySearch,
  addSearchParamFavorites,
  deleteSearchParamFavorites
} from "../../Store/actions";

const popOverSettings = {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      TransitionComponent: Slide,
    }

function Filter({
  getPhotosByModel,
  getManifestByModel,
  manifest,
  getPhotosBySearch,
  addSearchParamFavorites,
  searchedFavorites,
  deleteSearchParamFavorites,
  fetching,
  error
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [modelRover, setModelRover] = useState("");
  const [cameraRover, setCameraRover] = useState("");
  const [selectedValue, setSelectedValue] = useState("b");
  const [martianDate, setMartianDate] = useState(1000);
  const [show, setShow] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  useEffect(() => {
    if(error !== null){
      handleError()
  }
  }, [error])

  //toast "network or server error"
  const handleError = () => {
    enqueueSnackbar(
      `ERROR MESSAGE: ${error.message}`,
      {
        ...popOverSettings, variant: "error"
       }
    );
  }

  //input reference
  const focusInputRef = useRef();
  useEffect(() => {
    focusInputRef.current.focus();
  }, []);

  
  //popover 1
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  
  //popover 2
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const handlePopoverOpen1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };
  const open1 = Boolean(anchorEl1);
  
  //set and format dates
  var dates = `sol=${manifest.photo_manifest.max_sol}`;
  if (selectedValue === "a") {
    dates = `earth_date=${startDate.toISOString().split("T")[0]}`;
  }
  if (selectedValue === "b") {
    dates = `sol=${martianDate}`;
  }
  
  var id = Date.now().toString();
  const data = {
    id: id.slice(9, 13),
    date: dates,
    camera: cameraRover || "fhaz",
    rover: modelRover || "curiosity",
  };
  
  //set cameras for option menu
  if (manifest && manifest?.photo_manifest.photos.length > 1) {
    var uniqueObjects = manifest.photo_manifest.photos.map(
      (cam) => cam.cameras
    );
    var flattened = [].concat(...uniqueObjects);
    var camerasArr = [...new Set(flattened)];
  }

  //handlers
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const handleSelectRover = (e) => {
    e.preventDefault();
    setModelRover(e.target.value);
    getManifestByModel(e.target.value);
    getPhotosByModel(e.target.value);
  };
  
  const handleSelectCameras = (e) => {
    e.preventDefault();
    setCameraRover(e.target.value);
  };
  
  const handleMatianSolDate = (e) => {
    e.preventDefault();
    setMartianDate(e.target.value);
  };

  const handleSubmit = () => {
    getPhotosBySearch(data);
    addSearchParamFavorites(data);
    handleClickVariantOk();
  };

  const handleSubmitSearcedFav = (e) => {
    e.preventDefault()
    if(e.target.value === 'default') {
      return
    }
    setItemSelected(e.target.value);
    setShow(true);
  };

  //modal handlers
  const handleClose = () => {
    setShow(false);
  };
  const handleSearch = () => {
    setShow(false);
    if (itemSelected === "default") return;
    let search = searchedFavorites.filter((fav) => fav.id == itemSelected);
    getPhotosBySearch(search[0]);
    handleClickVariantSearhFav();
  };
  const handleRemoveRedords = () => {
    if (itemSelected === "default") {
      setShow(false);
      return;
    }
    deleteSearchParamFavorites(itemSelected);
    setShow(false);
    handleClickRemoveItemFromSearch();
  };

  //toast 1 "SEARCH...."
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariantOk = () => {
    enqueueSnackbar(
      `SEARCH: ${data.rover.toUpperCase()} -- ${data.camera.toUpperCase()} -- ${data.date.toUpperCase()}`,
      {
       ...popOverSettings, variant: "success"
      }
    );
  };

  //toast 2 "SEARCH...."
  const handleClickVariantSearhFav = () => {
    enqueueSnackbar(`SEARCH BY SAVED PARAMETERS SUCCESS`, {
      ...popOverSettings, variant: "success"
     });
  };

  //toast 3 "warning search delete...."
  const handleClickRemoveItemFromSearch = () => {
    enqueueSnackbar(`SEARCH PARAMETER DELETED`, {
      ...popOverSettings, variant: "success"
     });
  };

  return (
    <div className="container-div">
      <div className="customize-title-search">
        <h2>Customize your Photo´s search</h2>
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Rover Model</FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="row-radio-buttons-group"
          defaultValue={"curiosity"}
        >
          <FormControlLabel
            value="curiosity"
            control={<Radio onChange={handleSelectRover} />}
            label="Curiosity"
          />
          <FormControlLabel
            value="spirit"
            control={<Radio onChange={handleSelectRover} />}
            label="Spirit"
          />
          <FormControlLabel
            value="opportunity"
            control={<Radio onChange={handleSelectRover} />}
            label=" Opportunity"
          />
        </RadioGroup>
      </FormControl>
      <select
        className="form-select"
        onChange={handleSelectCameras}
        name=""
        id=""
      >
        <option className="option" value="fhaz">
          Select the Camera
        </option>
        {camerasArr &&
          camerasArr.map((g) => (
            <option key={g} value={g && g.toLowerCase()}>
              {g}
            </option>
          ))}
      </select>
      <Radio
        checked={selectedValue === "b"}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ "aria-label": "B" }}
        onMouseEnter={handlePopoverOpen1}
        onMouseLeave={handlePopoverClose1}
      />
      <p className="date-type">MARTIAN SOL DATE</p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "15ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Martian SOL"
          onChange={handleMatianSolDate}
          variant="standard"
          color="warning"
          placeholder="1000"
          disabled={selectedValue === "a" ? true : false}
          inputRef={focusInputRef}
          focused
        />
      </Box>
      <p className="date-type">EARTH DATE </p>
      <Radio
        checked={selectedValue === "a"}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <div>
        <DatePicker
          className="date-picker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date("01-04-2004")}
          maxDate={new Date()}
          disabled={selectedValue === "b" ? true : false}
        />
      </div>
      <Button
        className="button-search"
        variant="primary"
        onClick={handleSubmit}
      >
        SEARCH
      </Button>
      <select
        className="form-select"
        onChange={handleSubmitSearcedFav}
        name=""
        id=""
      >
        <option className="option-saved" value="default">
          Saved Search Parameters
        </option>
        {searchedFavorites.length > 0 &&
          searchedFavorites.map((g) => (
            <option key={g.id} value={g.id}>
              {`Search ID: ${g.id && g.id} <> Model: ${g.rover && g.rover.toUpperCase()
                } <> Date: ${g.date && g.date} <> Camera: ${g.camera && g.camera.toUpperCase()
                } `}
            </option>
          ))}
      </select>
      {
        fetching && <Spinner animation="border" variant="primary" />
      }
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        disableScrollLock
      >
        <Typography sx={{ p: 1 }}>{`Select an EARTH DATE between: ${manifest && manifest.photo_manifest.landing_date
          } and ${manifest && manifest.photo_manifest.max_date}`}</Typography>
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
        <Typography
          sx={{ p: 1 }}
        >{`Select a MARTIAN SOL DATE between: ${0} and ${manifest && manifest.photo_manifest.max_sol
          }`}</Typography>
      </Popover>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Saved Search Parameters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            - <strong>Remove: </strong> Selected record will be deleted
            definitly
          </Modal.Body>
          <Modal.Body>
            - <strong>Search: </strong> Using the saved parameters
          </Modal.Body>
          <Modal.Footer className="buttons-modal">
            <Button variant="warning" onClick={handleRemoveRedords}>
              Remove
            </Button>
            <Button className="button-close-modal" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className="button-search-modal" variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    manifest: state.manifest,
    photos: state.photos,
    searchedFavorites: state.searchFavorites,
    fetching: state.fetching,
    error: state.error
  };
};

export default connect(mapStateToProps, {
  getPhotosByModel,
  getManifestByModel,
  getPhotosBySearch,
  addSearchParamFavorites,
  deleteSearchParamFavorites
})(Filter);
