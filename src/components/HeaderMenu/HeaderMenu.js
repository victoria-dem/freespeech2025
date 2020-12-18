import {Link} from 'react-router-dom';
import './header-menu.css';


function HeaderMenu({handleAccountBtnClick,buttonMsg}) {
    console.log(window)
    return (
        <nav>
            <ul className="header__list">
                <li className="header__list-item">
                    <a className="header__list-link" href="#"
                    >Инициативы</a
                    >
                </li>
                <li className="header__list-item">
                    <a className="header__list-link" href="#"
                    >Высказаться</a
                    >
                </li>
                <li className="header__list-item">
                    <a className="header__list-link" href="#" target="_blank" rel="noopener"
                    >Мои инициативы</a
                    >
                </li>
                <li className="header__list-item">
                    <Link to="/" className="header__list-link">Назад в реальность!</Link>
                </li>
                <li className="header__list-item">
                    <button type='button' onClick={handleAccountBtnClick}>{buttonMsg ? buttonMsg : ''}</button>
                </li>
            </ul>
        </nav>
    )
}

export default HeaderMenu;




