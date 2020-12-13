// здесь находится тестовый код для регистрации пользователя по линку в e-mail
import React, {useState, useEffect} from 'react';
import './auth.css'
import {auth, db} from '../../utils/firebase'

function Auth() {
    
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLogOutClicked, setIsLogOutClicked] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState('Unknown')
    
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
                setCurrentUser(user.email)
            } else {
                setIsLoggedIn(false)
                setCurrentUser('Unknown')
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
                    window.location.href = "https://freespeech2025.com/"
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
            }).catch(function (error) {
                console.log(error);
            });
            setIsLogOutClicked(false)
        }
    }, [isLogOutClicked])
    
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
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
        <div className="authForm">
            <form className="form form-sign-up" name="form-signup" noValidate>
                <h2 className="form__heading">Sign UP With Email Link 11</h2>
                <h2 className="form__heading">User: {currentUser}</h2>
                <fieldset className="form__fields">
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="email"
                            id="first-field-place"
                            placeholder="e-mail"
                            name="email"
                            minLength="5"
                            maxLength="130"
                            required
                            autoComplete="username"
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    <button type="submit" className="form__submit-button" onClick={handleSignUp}>Sign Up</button>
                    <button type="submit" className="form__submit-button" onClick={handleLogout}>Log Out</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Auth


