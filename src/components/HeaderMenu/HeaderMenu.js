import './header-menu.css';


function HeaderMenu() {
    return (
        <>
            <nav>
                <ul className="header__list">
                    <li className="header__list-item">
                        <a className="header__list-link" href="#"
                        >Статистика</a
                        >
                    </li>
                    <li className="header__list-item">
                        <a className="header__list-link" href="#"
                        >Инициативы</a
                        >
                    </li>
                    <li className="header__list-item">
                        <a className="header__list-link" href="#" target="_blank" rel="noopener"
                        >Высказаться</a
                        >
                    </li>
                    {/*<li className="header__list-item">*/}
                    {/*    <Link to="/" className="header__list-link">Назад в реальность!</Link>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        </>
    )
}

export default HeaderMenu;



