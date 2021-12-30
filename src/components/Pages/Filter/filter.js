import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getPhotosByModel,
  getManifestByModel,
  getPhotosBySearch,
  addSearchParamFavorites,
  deleteSearchParamFavorites
} from "../../Store/actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./filter.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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


function Filter({
  getPhotosByModel,
  getManifestByModel,
  manifest,
  getPhotosBySearch,
  addSearchParamFavorites,
  searchedFavorites,
  deleteSearchParamFavorites
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [modelRover, setModelRover] = useState("");
  const [cameraRover, setCameraRover] = useState("");
  const [selectedValue, setSelectedValue] = useState("b");
  const [martianDate, setMartianDate] = useState(1000);
  const [show, setShow] = useState(false);
  const [itemSelected, setItemSelected] = useState('')

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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

  var dates = `sol=1000`;
  if (selectedValue === "a") {
    dates = `earth_date=${startDate.toISOString().split("T")[0]}`;
  }
  if (selectedValue === "b") {
    dates = `sol=${martianDate}`;
  }

  var id = Date.now().toString()
  const data = {
    id: id.slice(9,13),
    date: dates,
    camera: cameraRover || "fhaz",
    rover: modelRover || "curiosity",
  };

  if (manifest && manifest?.photo_manifest.photos.length > 1) {
    var uniqueObjects = manifest.photo_manifest.photos.map(
      (cam) => cam.cameras
    );
    var flattened = [].concat(...uniqueObjects);
    var camerasArr = [...new Set(flattened)];
  }

  const handleSelectRover = (e) => {
    e.preventDefault()
    setModelRover(e.target.value);
    getPhotosByModel(e.target.value);
    getManifestByModel(e.target.value);
  };

  const handleSelectCameras = (e) => {
    e.preventDefault()
    setCameraRover(e.target.value);
  };

  const handleMatianSolDate = (e) => {
    e.preventDefault()
    setMartianDate(e.target.value);
  };

  const handleSubmit = () => {
    getPhotosBySearch(data);
    addSearchParamFavorites(data)
    handleClickVariantOk();
  };

  const handleSubmitSearcedFav = (e) => {
    e.preventDefault()
    setItemSelected(e.target.value)
    setShow(true)
  };

  //modal handlers

  const handleClose = () => {
    setShow(false)
  };

  const handleSearch = () => {
    setShow(false)
    if(itemSelected === 'default') return
    let search = searchedFavorites.filter((fav) => fav.id == itemSelected)
    getPhotosBySearch(search[0]);
    handleClickVariantSearhFav()
  };

  const handleRemoveRedords = () => {
    if(itemSelected === 'default') {
      setShow(false)
      return
    } 
    deleteSearchParamFavorites(itemSelected)
    setShow(false)
    handleClickRemoveItemFromSearch()
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariantOk = () => {
    enqueueSnackbar(
      `SEARCH: ${data.rover.toUpperCase()} -- ${data.camera.toUpperCase()} -- ${data.date.toUpperCase()}`,
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "success",
      }
    );
  };

  const handleClickVariantSearhFav = () => {
    enqueueSnackbar(
      `SEARCH BY SAVED PARAMETERS SUCCESS`,
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "success",
      }
    );
  };

  const handleClickRemoveItemFromSearch = () => {
    enqueueSnackbar(
      `SAVED SEARCH PARAMETER DELETED`,
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "warning",
      }
    );
  };

  return (
    <div className="container-div">
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
        className="selectCont"
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
          disabled={selectedValue === "a" ? true : false}
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
          disabled={selectedValue === "b" ? true : false}
        />
      </div>
      <button className="button-submit" onClick={handleSubmit}>
        SEARCH
      </button>
      <select
        className="selectCont-search"
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
              {`Search ID: ${g.id && g.id} <> Model: ${g.rover && g.rover.toUpperCase()} <> Date: ${g.date && g.date} <> Camera: ${g.camera && g.camera.toUpperCase()} `}
            </option>
          ))}
      </select>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{`Select an EARTH DATE between: ${manifest && manifest.photo_manifest.landing_date} and ${manifest && manifest.photo_manifest.max_date}`}</Typography>
      </Popover>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open1}
        anchorEl={anchorEl1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose1}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{`Select a MARTIAN SOL DATE between: ${0} and ${manifest && manifest.photo_manifest.max_sol}`}</Typography>
      </Popover>
      <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Saved Search Parameters</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please select:</Modal.Body>
        <Modal.Body> - <strong>Remove: </strong> Selected record will be deleted definitly</Modal.Body>
        <Modal.Body> - <strong>Search: </strong> Using the saved parameters</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleRemoveRedords}>
            Remove
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSearch}>
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
    searchedFavorites: state.searchFavorites
  };
};

export default connect(mapStateToProps, {
  getPhotosByModel,
  getManifestByModel,
  getPhotosBySearch,
  addSearchParamFavorites,
  deleteSearchParamFavorites
})(Filter);
