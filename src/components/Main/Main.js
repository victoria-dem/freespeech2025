import './main.css';
import Auth from '../Auth/Auth';
import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import PetitionCardList from '../PetitionCardList/PetitionCardList';
import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import Petition from "../Petition/Petition";
import {auth} from "../../utils/firebase";
import Footer from '../Footer/Footer';
import Banner from "../Banner/Banner";


const Main = ({
                  onUpdateUser, isLoggedIn, petitions, onLikeClick,
                  onDislikeClick, onAddPetition, onMyPetitionsChoose, onActualPetitionsChoose, nickname, isDisplayName
              }) => {

    const currentUser = useContext(CurrentUserContext);
    const [isAccountPageOpen, setIsAccountPageOpen] = useState(false)
    const [isLinkSent, setIsLinkSent] = useState(false)
    const [buttonMsg, setButtonMsg] = useState('Кнопка')
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLogOutClicked, setIsLogOutClicked] = useState(false)
    const [values, setValues] = useState({email: ''})
    const [popupContain, setPopupContain] = useState('')

    //  console.log(currentUser)
    useEffect(() => {
        if (isLinkSent && !currentUser.uid) {
            // setIsAccountPageOpen(false)
            setButtonMsg('Проверьте, пожалуйста, почту и кликните на линк в письме')
        } else if (currentUser.uid && nickname !== '') {
            setIsLinkSent(false)
            setButtonMsg(` Ваш псевдоним на сайте: ${nickname}`)
        } else {
            setButtonMsg(`Зайти на сайт`)
        }
    }, [isLinkSent, currentUser, isLoggedIn, nickname, buttonMsg, isDisplayName])

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

    const handleAccountBtnClick = () => {
        setIsAccountPageOpen(!isAccountPageOpen);
        currentUser.uid ?  setPopupContain("sign-out") : setPopupContain("sign-in");
    }

    const emailLinkStatus = (props) => {
        setIsLinkSent(props)
    }

    const closePopup = () => {
        setIsAccountPageOpen(!isAccountPageOpen)
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        setIsSignUpClicked(true)
        setPopupContain("sign-in-success")
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setIsLogOutClicked(true)
        setIsAccountPageOpen(!isAccountPageOpen)
    }

    return (
        <>
            <div className="main-page">
                <Header handleAccountBtnClick={handleAccountBtnClick} buttonMsg={buttonMsg}/>
                <Banner/>
                <PetitionCardList petitions={petitions} onLikeClick={onLikeClick} onDislikeClick={onDislikeClick}
                                  onMyPetitionsChoose={onMyPetitionsChoose}
                                onActualPetitionsChoose={onActualPetitionsChoose} isLoggedIn={isLoggedIn}/>
                <Petition onAddPetition={onAddPetition}/>
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
                    popupContain={popupContain}
                />
                <Footer/>
            </div>
        </>
    );
}

export default Main;
