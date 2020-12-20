import React from 'react';
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css";


function Header({handleAccountBtnClick, buttonMsg}) {
    
    return (
        <header className="header">
            <img src='#' alt="Logo" className="logo"/>
            <HeaderMenu />
            <button type='button' onClick={handleAccountBtnClick}>{buttonMsg ? buttonMsg : ''}</button>
        </header>
    )
}

export default Header
