import './main.css';
import Auth from '../Auth/Auth';
import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import PetitionCardList from '../PetitionCardList/PetitionCardList';
import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import Petition from "../Petition/Petition";


const Main = ({onUpdateUser, isLoggedIn, petitions, onLikeClick, onDislikeClick, onAddPetition}) => {

    const currentUser = useContext(CurrentUserContext);
    const [isAccountPageOpen, setIsAccountPageOpen] = useState(false)
    const [isLinkSent, setIsLinkSent] = useState(false)
    const [buttonMsg, setButtonMsg] = useState('Что-то мы не учли')

    useEffect(() => {
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

    function  closePopup () {
        setIsAccountPageOpen(!isAccountPageOpen)
    }


    return (

        <>
            <div className="future-page">
                <Header handleAccountBtnClick={handleAccountBtnClick} buttonMsg={buttonMsg}/>
                {/*TODO: перенести форму или петицию в эту точку*/}
                <Petition onAddPetition={onAddPetition}/>
                <PetitionCardList petitions={petitions} onLikeClick={onLikeClick} onDislikeClick={onDislikeClick} />
                <Auth onUpdateUser={onUpdateUser}
                      isLoggedIn={isLoggedIn}
                      isAccountPageOpen={isAccountPageOpen}
                      emailLinkStatus={emailLinkStatus}
                      onAddPetition={onAddPetition}
                />
                <Popup
                    // isOpen={isPopupOpen}
                    onClose={closePopup}
                    onChange={onChange}
                    onSignUp={onSignUp}
                    onLogout={onLogout}
                    isAccountPageOpen={isAccountPageOpen}
                />
            </div>

        </>
    );
}

export default Main;
