import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css"


function Header({onUpdateUser, isLoggedIn}) {
    return (
        <header className="header">
            <img src='#' alt="Free speech 2025" className="logo"/>
            <HeaderMenu onUpdateUser={onUpdateUser} isLoggedIn={isLoggedIn}/>
        </header>
    )
}

export default Header
