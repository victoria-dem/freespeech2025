import './FuturePage.css';
import Auth from '../Auth/Auth';
import {Link} from 'react-router-dom';
import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const FuturePage = ({onUpdateUser, isLoggedIn}) => {
    
    const currentUser = useContext(CurrentUserContext);
    const [isAccountPageOpen, setIsAccountPageOpen] = useState(false)
    const [isLinkSent, setIsLinkSent] = useState(false)
    const [buttonMsg, setButtonMsg] = useState('Что-то мы не учли')
    
    useEffect(()=>{
        if (isLinkSent && !currentUser.uid) {
            setIsAccountPageOpen(false)
            setButtonMsg('Проверьте, пожалуйста, почту и кликните на линк в письме')
        } else if (currentUser.uid) {
            setButtonMsg(`Пользователь ${currentUser.email} на сайте`)
            setIsLinkSent(false)
        } else {
            setButtonMsg(`Личный кабинет`)
        }
        
    }, [isLinkSent, currentUser])
    
    function handleAccountBtnClick() {
        setIsAccountPageOpen(!isAccountPageOpen)
    }
    
    function emailLinkStatus(props) {
        setIsLinkSent(props)
    }
    
    return (
        <div className="future-page">
            <header className="future-page__header">
                <Link to="/" className="future-page__link">Вернуться в реальность!</Link>
                <p>FREE SPEECH 2025 SITE IS HERE -)))))</p>
                <button type='button' onClick={handleAccountBtnClick}>{buttonMsg}</button>
            </header>
            <Auth onUpdateUser={onUpdateUser}
                  isLoggedIn={isLoggedIn}
                  isAccountPageOpen={isAccountPageOpen}
                  emailLinkStatus={emailLinkStatus}
            />
            {/*TODO: перенести форму или петицию в эту точку*/}
        </div>
    );
}

export default FuturePage;