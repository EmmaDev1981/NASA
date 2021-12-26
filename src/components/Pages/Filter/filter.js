import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {
  getPhotosByModel,
  getManifestByModel,
  getPhotosBySearch,
} from "../../Store/actions";
import "./filter.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

function Filter({
  getPhotosByModel,
  getManifestByModel,
  manifest,
  getPhotosBySearch,
  photos
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [modelRover, setModelRover] = useState("");
  const [cameraRover, setCameraRover] = useState("");
  const [selectedValue, setSelectedValue] = useState("a");
  const [martianDate, setMartianDate] = useState(1000)

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  var dates = `sol=1000`
  if(selectedValue === 'a') {
    dates = `earth_date=${startDate.toISOString().split("T")[0]}`
  }
  if(selectedValue === 'b') {
    dates = `sol=${martianDate}`
  }

  const data = {
    date: dates,
    camera: cameraRover || "fhaz",
    rover: modelRover || "curiosity",
  };

  if (manifest && manifest?.photo_manifest.photos.length > 1) {
    var uniqueObjects = manifest.photo_manifest.photos.map((cam) => cam.cameras)
    var flattened = [].concat(...uniqueObjects);
    var camerasArr = [...new Set(flattened)]
  }

  const handleSelectRover = (e) => {
    setModelRover(e.target.value);
    getPhotosByModel(e.target.value);
    getManifestByModel(e.target.value);
  };

  const handleSelectCameras = (e) => {
    setCameraRover(e.target.value);
  };

  const handleMatianSolDate = (e) => {
    setMartianDate(e.target.value)
  }

  const handleSubmit = () => {
    getPhotosBySearch(data);
    handleClickVariantOk()
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariantOk = () => {
    enqueueSnackbar(`SEARCH: ${data.rover.toUpperCase()} -- ${data.camera.toUpperCase()} -- ${data.date.toUpperCase()}`, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
      variant: 'success',
    })
  }

  const handleClickVariantResponse = () => {
    enqueueSnackbar(`PHOTOS FOUNDED: ${photos.length}`, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      TransitionComponent: Slide,
      variant: 'info',
    })
  }

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
      <div>
        <DatePicker
          className="date-picker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          disabled={selectedValue === "b" ? true : false}
        />
      </div>
      <p className="date-type">EARTH</p>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
      <p className="date-type">SOL</p>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '15ch' },
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
      <button className="button-submit" onClick={handleSubmit}>
        SEARCH
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    manifest: state.manifest,
    photos: state.photos
  };
};

export default connect(mapStateToProps, {
  getPhotosByModel,
  getManifestByModel,
  getPhotosBySearch,
})(Filter);
