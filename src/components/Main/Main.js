import './main.css';
import Auth from '../Auth/Auth';
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PetitionCardList from '../PetitionCardList/PetitionCardList';
import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import Petition from "../Petition/Petition";
import { auth } from "../../utils/firebase";
import Footer from '../Footer/Footer';


const Main = ({ onUpdateUser, isLoggedIn, petitions, onLikeClick,
    onDislikeClick, onAddPetition, onMyPetitionsChoose, onActualPetitionsChoose, nickname}) => {

    const currentUser = useContext(CurrentUserContext);
    const [isAccountPageOpen, setIsAccountPageOpen] = useState(false)
    const [isLinkSent, setIsLinkSent] = useState(false)
    const [buttonMsg, setButtonMsg] = useState('Что-то мы не учли')
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLogOutClicked, setIsLogOutClicked] = useState(false)
    const [values, setValues] = useState({ email: '' })

    //  console.log(currentUser)
    useEffect(() => {
        if (isLinkSent && !currentUser.uid) {
            setIsAccountPageOpen(false)
            setButtonMsg('Проверьте, пожалуйста, почту и кликните на линк в письме')
        } else if (currentUser.uid && nickname !== '') {
            setIsLinkSent(false)
            setButtonMsg(`Пользователь ${nickname} на сайте`)
        } else {
            setButtonMsg(`Личный кабинет`)
        }
    }, [isLinkSent, isLoggedIn])

    useEffect(()=>{console.log('isLinkSent')},[isLinkSent])
    useEffect(()=>{console.log('currentUser')},[currentUser])
    useEffect(()=>{console.log('isLoggedIn')},[isLoggedIn])
    
    
    
    

    useEffect(() => {
        if (isSignUpClicked) {
            auth.sendSignInLinkToEmail(values.email, actionCodeSettings)
                .then(function () {
                    window.localStorage.setItem('emailForSignIn', values.email);
                    emailLinkStatus(true)
                    console.log('The link was successfully sent')
                })
                .catch(function (error) {
                    console.log(error);
                });
            setIsSignUpClicked(false)
        }
    }, [isSignUpClicked])

    useEffect(() => {
        if (isLogOutClicked) {
            auth.signOut().then(function () {
                console.log('Sign-out successful');
                onUpdateUser({});
            }).catch(function (error) {
                console.log(error);
            });
            setIsLogOutClicked(false)
        }
    }, [isLogOutClicked])

    const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true
    };

    function handleAccountBtnClick() {
        setIsAccountPageOpen(!isAccountPageOpen)
    }

    function emailLinkStatus(props) {
        setIsLinkSent(props)
    }

    function closePopup() {
        setIsAccountPageOpen(!isAccountPageOpen)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    function handleSignUp(e) {
        e.preventDefault();
        setIsSignUpClicked(true)
    }

    function handleLogout(e) {
        e.preventDefault();
        setIsLogOutClicked(true)
        setIsAccountPageOpen(!isAccountPageOpen)
    }

    return (
        <>
            <div className="main-page">
                <Header handleAccountBtnClick={handleAccountBtnClick} buttonMsg={buttonMsg}/>
                <PetitionCardList petitions={petitions} onLikeClick={onLikeClick} onDislikeClick={onDislikeClick}
                    onMyPetitionsChoose={onMyPetitionsChoose} onActualPetitionsChoose={onActualPetitionsChoose} />
                <Petition onAddPetition={onAddPetition} />
                {/* <Auth
                    onUpdateUser={onUpdateUser}
                    isLoggedIn={isLoggedIn}
                /> */}
                <Popup
                    onClose={closePopup}
                    onChange={handleChange}
                    onSignUp={handleSignUp}
                    onLogout={handleLogout}
                    isAccountPageOpen={isAccountPageOpen}
                />
                <Footer />
            </div>
        </>
    );
}

export default Main;
