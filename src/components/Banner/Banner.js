import React from 'react'
import banner from '../../images/banner.png'
import './banner.css'

function Banner() {
    return (
        <div className="banner">
            <img className="banner__image" src={banner} alt="banner"/>
            <h1 className="banner__title">Цензура больше не проблема! Опубликуем инициативу цитатой великого классика</h1>
            <div className="banner__link-button">
            <a className="banner__link" href="#petition-form">Написать</a>
            </div>
        </div>
    )
}

export default Banner
