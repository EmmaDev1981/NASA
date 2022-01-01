import React from 'react'
import Navbar from '../Nav/nav'
import pagenotfound from '../../assets/pagenotfound.png'
import './page404.css'

function Page404() {
    return (
      <div>
        <Navbar />
        <div className="not-found-div">
          <img src={pagenotfound} alt="notfound"></img>
        </div>
      </div>
    );
}

export default Page404
