import React, {useContext, useState} from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css";
import logo2 from "../../images/logo2.svg"
import login from "../../images/login.svg"
import logout from "../../images/logout.svg"
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function Header({handleAccountBtnClick, nickname, showMenu}) {

    const currentUser = useContext(CurrentUserContext);

    const [buttonVisibility, setButtonVisibility] = useState(false)
    setTimeout(() => {
        setButtonVisibility(true)
    }, 1000)

    const headerClassName = (
        `header ${showMenu ?
          'header_menu-visible' :
          'header_menu-hidden'}`
      ); 


    return (
        // <header className="header">
        <header className={headerClassName}>
            <img  src={logo2} alt="Logo" className="logo"/>
            <HeaderMenu showMenu={showMenu}/>
                <div   className={buttonVisibility ? "header__nickname-content header__nickname-content_visibility" : "header__nickname-content"}>
                    {nickname ?
                        <> <p className="header__nickname-title">Ваш псевдоним на сайте:</p>
                            <p className="header__nickname">{nickname}</p>
                        </> : null }
                </div>
                <button type='button' className="header__button" onClick={handleAccountBtnClick}>
                    {(currentUser.uid === null) ? <img src={login} alt='Login'/> :
                        <img src={logout} alt='Login'/>}</button>
        </header>
    )
}

export default Header
