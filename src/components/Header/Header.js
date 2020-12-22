import React, {useContext} from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css";
import logo2 from "../../images/logo2.svg"
import login from "../../images/login.svg"
import logout from "../../images/logout.svg"
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function Header({handleAccountBtnClick, nickname}) {
    
    const currentUser = useContext(CurrentUserContext);
    
    return (
        <header className="header">
            <img src={logo2} alt="Logo" className="logo"/>
            <HeaderMenu/>
            <div className="header__nickname-content">{nickname ? <> <p className="header__nickname-title">Ваш псевдоним
                на сайте:</p>
                <p className="header__nickname">{nickname}</p> </> : ''}</div>
            <button type='button' className="header__button" onClick={handleAccountBtnClick}>
                {(currentUser.uid === null) ? <img src={login} alt='Login'/> : <img src={logout} alt='Login'/>}</button>
        </header>
    )
}

export default Header
