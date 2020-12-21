import React, {useState} from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css";
import logo2 from "../../images/logo2.svg"


function Header({handleAccountBtnClick, buttonMsg}) {

    const [buttonVisibility, setButtonVisibility] = useState("header__account")
    setTimeout(() => {
        setButtonVisibility("header__account_visibility")
    }, 1000)

    return (
        <header className="header">
            <img src={logo2} alt="Logo" className="logo"/>
            <HeaderMenu />
            <button type='button'  className={buttonVisibility} onClick={handleAccountBtnClick}>{buttonMsg ? buttonMsg : ''}</button>
        </header>
    )
}

export default Header
