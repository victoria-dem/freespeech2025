import React, {useContext, useState} from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css";
import logoPoet from "../../images/logoPoet.svg"
import userIcon from "../../images/userIcon.svg"
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function Header({handleAccountBtnClick, nickname, showMenu}) {

    const currentUser = useContext(CurrentUserContext);

    const [buttonVisibility, setButtonVisibility] = useState(false)
    setTimeout(() => {
        setButtonVisibility(true)
    }, 1000)

    const userNickname = nickname.split(' ');

    const headerClassName = (
        `header ${showMenu ?
            'header_menu-visible' :
            'header_menu-hidden'}`
    );

    //TODO вынести отображение пользователя в отдельный компонет чтобы переиспользовать в выпадашке


    return (
        <header className={headerClassName}>
            <img src={logoPoet} alt="Logo" className="logo"/>
            <HeaderMenu showMenu={showMenu} nickname={nickname} buttonVisibility={buttonVisibility}/>
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
