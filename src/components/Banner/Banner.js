import React from 'react'
import banner from '../../images/banner.png'
import './banner.css'

function Banner() {
    return (
        <section className="banner">
            <div className="banner__overlay">
                {/*<img className="banner__image" src={banner} alt="banner"/>*/}
                <div className="banner__text-container">
                    <h1 className="banner__title">Цензура больше не проблема! Опубликуем инициативу цитируя великих классиков</h1>
                    <div className="banner__link-button">
                        <a className="banner__link" href="#petition-form">Написать</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
