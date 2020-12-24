import React from 'react'
import banner from '../../images/banner.png'
import './banner.css'

function Banner() {
    return (
        <div className="banner">
            <img className="banner__image" src={banner} alt="banner"/>
            <h1 className="banner__title">Цензура больше не проблема, опубликуем петицию цитатой поэта-классика</h1>
        </div>
    )
}

export default Banner
