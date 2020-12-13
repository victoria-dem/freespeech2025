// здесь находится тестовый код для регистрации пользователя по линку в e-mail
import React, {useState, useEffect} from 'react';
import './auth.css'
import {auth, db} from '../../utils/firebase'

function Auth() {
    
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLogOutClicked, setIsLogOutClicked] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState('Unknown')
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const actionCodeSettings = {
        url: 'https://freespeech2025.com',
        handleCodeInApp: true
    };

    // определяем юзер на сайте или нет
    auth.onAuthStateChanged(function (user) {
        if (user) {
            setIsLoggedIn(true)
            setCurrentUser(user.email)
            console.log('User is signed in', user.email, user)
        } else {
            setIsLoggedIn(false)
            console.log('No user is signed in')
        }
    });
    
    
    // useEffect(() => {
    //     console.log('inside auth useEffect')
        // Confirm the link is a sign-in with email link.
        if (auth.isSignInWithEmailLink(window.location.href)) {
            console.log('window.location.href from isSignInWithEmailLink', window.location.href)
            let email = window.localStorage.getItem('emailForSignIn');
            console.log('email', email);
        
            if (!email) {
                console.log('User opened the link on a different device.')
                
                // email = window.prompt('Please provide your email for confirmation');
            }

        // The client SDK will parse the code from the link for you.
            auth.signInWithEmailLink(email, window.location.href)
                .then(function (result) {
                    console.log('window.location.href from signInWithEmailLink', window.location.href)
                    console.log('Clear email from storage')
                    window.localStorage.removeItem('emailForSignIn');
                    console.log('result', result)
                    console.log('result-user', result.user)
                    console.log('result.additionalUserInfo.profile', result.additionalUserInfo.profile)
                    console.log('result.additionalUserInfo.isNewUser', result.additionalUserInfo.isNewUser)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    // }, [isLoggedIn])
    
    useEffect(() => {
        if (isSignUpClicked) {
            auth.sendSignInLinkToEmail(values.email, actionCodeSettings)
                .then(function (...args) {
                    console.log('...args', ...args)
                    console.log('The link was successfully sent')
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
            auth.signOut().then(function() {
                console.log('Sign-out successful');
            }).catch(function(error) {
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
                <h2 className="form__heading">Sign UP With Email Link</h2>
                <h2 className="form__heading">Current User: {currentUser}</h2>
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


