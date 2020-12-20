import React from 'react'
import banner from '../../images/main_banner.png'
import './banner.css'

function Banner() {
    return(
        <img className="banner" src={banner} alt="banner"/>
    )
}

export default Banner