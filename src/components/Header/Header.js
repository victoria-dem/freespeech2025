import React, {useContext, useState} from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css";
import logo from "../../images/logo.svg"
import userIcon from "../../images/userIcon.svg"
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function Header({handleAccountBtnClick, nickname}) {

    const currentUser = useContext(CurrentUserContext);

    const [buttonVisibility, setButtonVisibility] = useState(false)
    setTimeout(() => {
        setButtonVisibility(true)
    }, 1000)
    const userNickname = nickname.split(' ');


    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo"/>
            <HeaderMenu/>
            <div
                className={buttonVisibility ? "header__nickname-content header__nickname-content_visibility" : "header__nickname-content"}>
                {nickname ?
                    <>
                        <img src={userIcon} alt="User Icon" className="header__user-icon"/>
                        <div className="header__nickname-text">
                            <p className="header__nickname-title">Ваш псевдоним на сайте:</p>
                            <p className="header__nickname">{userNickname[0]}</p>
                            <p className="header__nickname">{userNickname[1]}</p>
                        </div>
                    </> : null}
            </div>
            <button type='button' className="header__button" onClick={handleAccountBtnClick}>
                <div className={!currentUser.uid ? "header__button-image header__button-image_login"
                    : "header__button-image header__button-image_logout"}/>
            </button>
        </header>
    )
}

export default Header
