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
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

function Apod({getPhotosFromApod, apodPhotos, fetching, error}) {

  //input reference
  const focusInputRef = useRef();
  useEffect(() => {
    focusInputRef.current.focus();
  },[])

  useEffect(() => {
    if(error !== null){
      handleError()
  }
  }, [error])

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
  //toast "Wrong input range or character"
  const handleClickBabInput = () => {
    enqueueSnackbar(
      `PLEASE ONLY NUMBERS BETWEEN 1 TO 100`,
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "warning",
      }
    );
  }

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
      if(validate()) {
        handleClickLoading()
        getPhotosFromApod(data)
      } else {
        handleClickBabInput()
      }
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

      //validate input (only 1 to 100)
      const validate = () => {
        const regex = /^0*(?:[1-9][0-9]?|100)$/
        return regex.test(parseInt(data.count))
      }

    return (
      <div>
        <Navbar />
        <div className="home-sub-title">
          <h2>Astronomy Picture of the Day</h2>
        </div>
        <div className="div-title-qty">
          <h3>INSERT A NUMBER BETWEEN 1 & 100</h3>
        </div>
        <div className="description-about-apod">
          <p>
            Each day a different image or photograph of our fascinating universe
            is featured, along with a brief explanation written by a
            professional astronomer.
          </p>
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
      {
        fetching && <div className='loading-div'>
        <Spinner animation="border" variant="primary" />
        </div>
      }

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
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={apodPhotos.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <Footer />
      </div>
    );
}

function mapStateToProps(state) {
    return {
        apodPhotos: state.apodPhotos,
        fetching: state.fetching,
        error: state.error
    }
}

export default connect (mapStateToProps, {getPhotosFromApod})(Apod)
