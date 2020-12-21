import React from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css";
import logo2 from "../../images/logo2.svg"
import login from "../../images/login.svg"
import logout from "../../images/logout.svg"
import {auth} from "../../utils/firebase";


function Header({handleAccountBtnClick, nickname}) {
    const user=auth.currentUser
    return (
        <header className="header">
            <img src={logo2} alt="Logo" className="logo"/>
            <HeaderMenu />
            <div className="header__nickname-content">{nickname ?<> <p className="header__nickname-title">Ваш псевдоним на сайте:</p>
                <p className="header__nickname">{nickname}</p> </>: ''}</div>
            <button type='button'  className="header__button" onClick={handleAccountBtnClick}>
                {(user === null)? <img src={login} alt='Login'/> : <img src={logout} alt='Login'/>}</button>
        </header>
    )
}

export default Header
