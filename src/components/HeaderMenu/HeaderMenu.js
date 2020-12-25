import React, {useContext, useState} from 'react';
import './header-menu.css';
import hamburger from '../../images/hamburger.svg'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function HeaderMenu({showMenu, nickname, buttonVisibility}) {
    const currentUser = useContext(CurrentUserContext);
    const userNickname = nickname.split(' ');
    const [isHamburgerOpenClicked, setIsHamburgerOpenClicked] = useState(false)

    const handleHamburgerOpenClick = () => {
        setIsHamburgerOpenClicked(!isHamburgerOpenClicked)
    }
    const handleHamburgerCloseClick = () => {
        setIsHamburgerOpenClicked(!isHamburgerOpenClicked)
    }
    const handleHamburgerLinkClick = () => {
        setIsHamburgerOpenClicked(!isHamburgerOpenClicked)
    }

    const headerListClassName = (
        `header__list ${showMenu ?
            'header__list_visible' :
            'header__list_hidden'}`
    );

    return (
        <>
            <nav>
                <ul className={headerListClassName}>
                    <li className="header__list-item">
                        <a className="header__list-link" href="#petition-card-list"
                        >Инициативы</a
                        >
                    </li>
                    <li className="header__list-item">
                        <a className="header__list-link" href="#petition-form"
                        >Создать инициативу</a
                        >
                    </li>
                </ul>
            </nav>
            <button type='button' onClick={handleHamburgerOpenClick} className="header__hamburger-open"><img
                src={hamburger} alt='Menu'/></button>
            <div
                className={isHamburgerOpenClicked ? "header__hamburger header__hamburger_visible" : "header__hamburger"}>
                <button type='button' onClick={handleHamburgerCloseClick} className="header__hamburger-close">
                    <div className="header__hamburger-close-btn">
                        <div className="header__hamburger-cross-left">
                            <div className="header__hamburger-cross-right"></div>
                        </div>
                    </div>
                </button>
                <nav>
                    <ul className="header__list-hamburger">
                        <li className="header__list-item-hamburger">
                            <a onClick={handleHamburgerLinkClick} className="header__list-link-hamburger"
                               href="#petition-card-list"
                            >Инициативы</a
                            >
                        </li>
                        <li className="header__list-item-hamburger">
                            <a onClick={handleHamburgerLinkClick} className="header__list-link-hamburger"
                               href="#petition-form"
                            >Создать инициативу</a
                            >
                        </li>
                    </ul>
                </nav>

                <div className={!currentUser.uid ? "header__user-hamburger"
                    : "header__user-hamburger header__user-hamburger_visible"}>
                    <div
                        className={buttonVisibility ? "header__nickname-hamburger header__nickname-hamburger_visible" : "header__nickname-hamburger"}
                    >
                        {nickname ?
                            <>
                                <div className="header__nickname-text_hamburger">
                                    <p className="header__nickname-title header__nickname-title_hamburger">Ваш псевдоним
                                        на сайте:</p>
                                    <p className="header__nickname header__nickname_hamburger">{userNickname[0]}</p>
                                    <p className="header__nickname header__nickname_hamburger">{userNickname[1]}</p>
                                </div>
                            </> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu;




