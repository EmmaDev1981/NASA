import React, {useState, useRef, useEffect} from 'react'
import Navbar from '../Nav/nav'
import {connect} from 'react-redux'
import {getPhotosFromApod} from '../../Store/actions'
import Pagination from '../Pagination/pagination'
import CardApod from '../CardApod/cardapod'
import { Button } from 'react-bootstrap'
import './apod.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Footer from '../Footer/footer'
import LazyLoad from 'react-lazyload'
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

function Apod({getPhotosFromApod, apodPhotos}) {

  //input reference
  const focusInputRef = useRef();
  useEffect(() => {
    focusInputRef.current.focus();
  },[])

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

    //format data to search
    const [data, setData] = useState(
      { 
        date: "", 
        count: 4, 
        startDate: "", 
        endDate: ""
    }
    )
    const handleSearch = () => {
        handleClickLoading()
        getPhotosFromApod(data)
    }


      //pagination index
      const [currentPage, setCurrentPage] = useState(1);
      const [cardPerPage] = useState(24);
      const indexOfLastCard = currentPage * cardPerPage;
      const indexOfFirstCard = indexOfLastCard - cardPerPage;
      var currentCards;
      if (typeof apodPhotos === "string" || apodPhotos.length === 0) {
        currentCards = apodPhotos;
      } else {
        currentCards = apodPhotos.slice(indexOfFirstCard, indexOfLastCard);
      }
      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      //set the number of aleatory photos to search
      const handleApodPhotos = (e) => {
        e.preventDefault()
        setData({ 
          date: "", 
          count: e.target.value, 
          startDate: "", 
          endDate: ""
      });
      };

    return (
      <div>
        <Navbar />
        <div className="home-sub-title">
          <h2>Astronomy Picture of the Day</h2>
        </div>
        <div className="div-title-qty">
          <p>INSERT A NUMBER BETWEEN 1 & 100</p>
        </div>
        <div className="input-box-photos">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "15ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Photos QTY"
              onChange={handleApodPhotos}
              variant="standard"
              color="warning"
              placeholder="4"
              inputRef={focusInputRef}
              focused
            />
          </Box>
        </div>
        <div className="boton-apod-search">
          <Button variant="primary" onClick={handleSearch}>
            ALEATORY PHOTOS
          </Button>
        </div>
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={apodPhotos.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="games-div">
          {currentCards.length >= 1 ? (
            currentCards.map((g) => (
              <LazyLoad key={g.date} height={200} offset={-200}>
                <CardApod
                  key={g.date}
                  title={g.title}
                  date={g.date}
                  explanation={g.explanation}
                  hdurl={g.hdurl}
                  image={g.url}
                  id={g.date}
                />
              </LazyLoad>
            ))
          ) : typeof currentCards === "string" ? (
            <div>
              <p>LOADING....</p>
            </div>
          ) : (
            <div>
              <h1>NO PHOTOS FOUND - PLEASE TRY ANOTHER DATE OR CAMERA</h1>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
}

function mapStateToProps(state) {
    return {
        apodPhotos: state.apodPhotos
    }
}

export default connect (mapStateToProps, {getPhotosFromApod})(Apod)
