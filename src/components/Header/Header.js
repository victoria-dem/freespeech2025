import HeaderMenu from "../HeaderMenu/HeaderMenu";
import "./header.css"


function Header({handleAccountBtnClick, buttonMsg, isAccountPageOpen}) {
    return (
        <header className="header">
            <img src='#' alt="Free speech 2025" className="logo"/>
            <HeaderMenu handleAccountBtnClick={handleAccountBtnClick} buttonMsg={buttonMsg}/>
        </header>
    )
}

export default Header
