import React from 'react'
import './banner.css'

function Banner() {
    return (
        <section className="banner">
            <div className="banner__overlay">
                <div className="banner__text-container">
                    <h1 className="banner__title">Цензура больше не проблема! Опубликуем инициативу, цитируя великих классиков.</h1>
                    <a className="banner__link-button" href="#petition-form">
                        <p className="banner__link" >Написать</p>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Banner
