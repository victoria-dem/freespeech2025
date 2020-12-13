// здесь находится тестовый код для регистрации пользователя по линку в e-mail
import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router";
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
        url: window.location.href,
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
        // Confirm the link is a sign-in with email link.
        function handleSignIn() {
        
        if (auth.isSignInWithEmailLink(window.location.href)) {
            console.log('if again')
            console.log('window.location.href from isSignInWithEmailLink', window.location.href)
            let email = window.localStorage.getItem('emailForSignIn');
            console.log('email', email);
            
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            if (email) {
                // const history = useHistory();
                auth.signInWithEmailLink(email, window.location.href).then(function (result) {
                    // Clear the URL to remove the sign-in link parameters.
                    // if (history && history.replaceState) {
                    //     window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
                    // }
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // Signed-in user's information.
                    let user = result.user;
                    let isNewUser = result.additionalUserInfo.isNewUser;
                    console.log(result)
                }).catch(function (error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    // handleError(error);
                    console.log(error)
                });
            }
        }
        }
        handleSignIn();
        
    // }, [])
    
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
                <h2 className="form__heading">Sign UP With Email Link 3</h2>
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


