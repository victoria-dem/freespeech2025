// здесь находится тестовый код для регистрации пользователя по линку в e-mail
import React, { useState, useEffect, useContext } from 'react';
import './auth.css'
import '../PetitionForm/petitionform.css'
import { auth } from '../../utils/firebase'
import PetitionForm from "../PetitionForm/PetitionForm";
import SignUpForm from '../SignUpForm/SignUpForm';


function Auth({ onUpdateUser }) {
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLogOutClicked, setIsLogOutClicked] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    //current user устанавливается в методе onUpdateUser
    // const [currentUser, setCurrentUser] = useState('Unknown')
    const [currentUserId, setCurrentUserId] = useState('')


    const [values, setValues] = useState({ email: '' })

    const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true
    };


    // определяем юзер на сайте или нет
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setIsLoggedIn(true)
                // setCurrentUser(user.email)
                setCurrentUserId(user.uid)
                onUpdateUser({ user });
            } else {
                setIsLoggedIn(false)
                // setCurrentUser('Unknown')
                onUpdateUser({});
            }
        });
    }, [isLoggedIn])

    // Confirm the link is a sign-in with email link.
    useEffect(() => {
        if (auth.isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            if (email) {
                auth.signInWithEmailLink(email, window.location.href).then(function (result) {
                    window.location.href = "https://freespeech2025.com/future"
                    window.localStorage.removeItem('emailForSignIn');
                }).catch(function (error) {
                    console.log(error)
                });
            }
        }
    }, [])

    useEffect(() => {
        if (isSignUpClicked) {
            auth.sendSignInLinkToEmail(values.email, actionCodeSettings)
                .then(function () {
                    window.localStorage.setItem('emailForSignIn', values.email);
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
                setCurrentUserId('')
                onUpdateUser({});
            }).catch(function (error) {
                console.log(error);
            });
            setIsLogOutClicked(false)
        }
    }, [isLogOutClicked])

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
    }

    return (
        <>
            {/* currentUser теперь берется в самом компоненте формы из контекста */}
            <SignUpForm onChange={handleChange} onSignUp={handleSignUp} onLogout={handleLogout} />

            {/* TODO: возможно,имеет смысл в этой форме тоже находить currentUser через контест 
                и брать его ID */}
            <PetitionForm currentUserId={currentUserId}/>
        </>
    )
};

export default Auth;


