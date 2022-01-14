import React, {useState, useEffect} from 'react'
import Navbar from '../Nav/nav'
import {connect} from 'react-redux'
import {getInfoFromEpic} from '../../Store/actions'
import { Button } from 'react-bootstrap'
import Footer from '../Footer/footer'
import Slide from "@material-ui/core/Slide";
import DatePicker from "react-datepicker";
import { useSnackbar } from "notistack";
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import * as dayjs from 'dayjs'
import './epic.css'

function Epic({getInfoFromEpic, epicInfo, fetching, error}) {
    const [startDate, setStartDate] = useState(new Date());
    let today = dayjs().subtract(3, 'day').format().split("T")[0]
    useEffect(()=> {
        getInfoFromEpic(today)
    },[])

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
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          TransitionComponent: Slide,
          variant: "error",
        }
      );
    }

  //toast "loading....please wait"
  const { enqueueSnackbar } = useSnackbar();
  const handleClickLoading = () => {
    enqueueSnackbar(
      `LOADING.....PLEASE WAIT`,
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "success",
      }
    );
  }

  const [imageUrl, setImageUrl] = useState(`https://api.nasa.gov/EPIC/archive/natural/2021/12/29/png/epic_1b_20211229001752.png?api_key=${process.env.REACT_APP_API}`) 
  const handleSearch = () => {
        handleClickLoading()
        let date = startDate.toISOString().slice(0,10)
        getInfoFromEpic(date)
        let formatDate = epicInfo[0].date.slice(0,10).replace(/\-/g, '/')
        setImageUrl(`https://api.nasa.gov/EPIC/archive/natural/${formatDate}/png/${epicInfo[0].image}.png?api_key=${process.env.REACT_APP_API}`)
    } 

    return (
      <div>
        <Navbar />
        <div className="home-sub-title">
          <h2>Earth Polychromatic Imaging Camera</h2>
        </div>
        <div>
          <div className="title-div">
            <h3>SELECT THE DATE OF EPIC PHOTO</h3>
          </div>
          <div className="description-about-apod">
            <p>
              The EPIC API provides information on the daily imagery collected
              by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument
            </p>
          </div>
          <div className="title-div">
            <div className="date-picker-div">
              <DatePicker
                className="date-picker"
                selected={startDate}
                minDate={new Date("06-13-2015")}
                maxDate={new Date()}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="boton-apod-search">
            <Button variant="primary" onClick={handleSearch}>
              SEARCH PHOTO
            </Button>
          </div>
            {
        fetching && <div className='loading-div'>
        <Spinner animation="border" variant="primary" />
        </div>
      }
        </div>
        <div className="epic-div-img">
        <>
          <img src={imageUrl} alt="epicPhoto"></img>
        </>
        </div>
        <Table striped bordered hover className="wrapper-title-div">
          <tbody>
            <tr>
              <td>Identifier:</td>
              <td>{epicInfo.length > 0 && epicInfo[0].identifier}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td> {epicInfo.length > 0 && epicInfo[0].date.slice(0, 10)}</td>
            </tr>
            <tr>
              <td>Latitud:</td>
              <td>
                {epicInfo.length > 0 && epicInfo[0].centroid_coordinates.lat}
              </td>
            </tr>
            <tr>
              <td>Longitud:</td>
              <td>
                {epicInfo.length > 0 && epicInfo[0].centroid_coordinates.lon}
              </td>
            </tr>
            <tr>
              <td>Sun X:</td>
              <td>
                {" "}
                {epicInfo.length > 0 && epicInfo[0].sun_j2000_position.x}
              </td>
            </tr>
            <tr>
              <td>Sun Y:</td>
              <td>{epicInfo.length > 0 && epicInfo[0].sun_j2000_position.y}</td>
            </tr>
            <tr>
              <td>Sun Z:</td>
              <td>{epicInfo.length > 0 && epicInfo[0].sun_j2000_position.z}</td>
            </tr>
          </tbody>
        </Table>
        <Footer />
      </div>
    );
}

function mapStateToProps(state) {
    return {
        epicInfo: state.epicInfo,
        fetching: state.fetching,
        error: state.error
    }
}

export default connect (mapStateToProps, {getInfoFromEpic})(Epic)
