import './main.css';
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PetitionCardList from '../PetitionCardList/PetitionCardList';
import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import Petition from "../Petition/Petition";
import { auth } from "../../utils/firebase";
import Footer from '../Footer/Footer';
import Banner from "../Banner/Banner";
import Statistic from "../Statistic/Statistic";


const Main = ({ onUpdateUser, isLoggedIn, petitions, onLikeClick,
    onAddPetition, onMyPetitionsChoose, onActualPetitionsChoose,
    nickname, onAllPetitionsChoose, onDeletePetition, allPetitions, isLoading }) => {

    const currentUser = useContext(CurrentUserContext);
    const [isAccountPageOpen, setIsAccountPageOpen] = useState(false)
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLogOutClicked, setIsLogOutClicked] = useState(false)
    const [values, setValues] = useState({
        email: '',
        checkBoxOne: false,
        checkBoxTwo: false,
        checkBoxThree: false
    })
    const [formValidity, setFormValidity] = useState({
        emailValid: false,
        checkBoxOneValid: false,
        checkBoxTwoValid: false,
        checkBoxThreeValid: false
    })
    const [emailErrorText, setEmailErrorText] = useState('')
    const [popupContain, setPopupContain] = useState('')

    useEffect(() => {
        if (isSignUpClicked) {
            auth.sendSignInLinkToEmail(values.email, actionCodeSettings)
                .then(function () {
                    window.localStorage.setItem('emailForSignIn', values.email);
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
        currentUser.uid ? setPopupContain("sign-out") : setPopupContain("sign-in");
    }

    const closePopup = () => {
        setIsAccountPageOpen(!isAccountPageOpen)
        setFormValidity({
            emailValid: false,
            checkBoxOneValid: false,
            checkBoxTwoValid: false,
            checkBoxThreeValid: false
        })
    }
    
    const handleSignUpChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        validation(e);
    }

    function validation(e) {
        const validatedFieldName = [e.target.name] + 'Valid'
        setFormValidity({ ...formValidity, [validatedFieldName]: e.target.validity.valid })
        if (e.target.name === 'email' && !e.target.validity.valid) {
            setEmailErrorText("Введите правильный почтовый адрес")
        } else if (e.target.name === 'email' && e.target.validity.valid) {
            setEmailErrorText("")
        }
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
                <Header handleAccountBtnClick={handleAccountBtnClick} nickname={nickname} showMenu={true}/>
                <Banner />
                <Statistic allPetitions={allPetitions} />
                <PetitionCardList petitions={petitions} onLikeClick={onLikeClick}
                    onMyPetitionsChoose={onMyPetitionsChoose}
                    onActualPetitionsChoose={onActualPetitionsChoose} isLoggedIn={isLoggedIn}
                    onAllPetitionsChoose={onAllPetitionsChoose} onDeletePetition={onDeletePetition} isLoading={isLoading} />
                <Petition onAddPetition={onAddPetition} nickname={nickname} handleAccountBtnClick={handleAccountBtnClick}/>
                <Popup
                    onClose={closePopup}
                    onChange={handleSignUpChange}
                    onSignUp={handleSignUp}
                    onLogout={handleLogout}
                    isAccountPageOpen={isAccountPageOpen}
                    popupContain={popupContain}
                    formValidity={formValidity}
                    emailErrorText={emailErrorText}
                    setFormValues={setValues}
                    setEmailErrorText={setEmailErrorText}
                    formValues={values}
                    setIsAccountPageOpen={setIsAccountPageOpen}
                />
                <Footer />
            </div>
        </>
    );
}

export default Main;
