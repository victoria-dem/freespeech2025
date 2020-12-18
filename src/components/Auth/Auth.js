import React, {useEffect, useState} from 'react';
import './auth.css'
import {auth} from '../../utils/firebase'
import SignUpForm from '../SignUpForm/SignUpForm';
import '../PetitionFormOld/petitionform.css'
// import Petition from "../Petition/Petition";

function Auth({onUpdateUser, isLoggedIn, isAccountPageOpen, emailLinkStatus, onAddPetition}) {
    const [isSignUpClicked, setIsSignUpClicked] = useState(false)
    const [isLogOutClicked, setIsLogOutClicked] = useState(false)
    const [values, setValues] = useState({email: ''})
    
    
    const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true
    };
    
    
    // определяем юзер на сайте или нет
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                onUpdateUser({email: user.email, uid: user.uid});
            } else {
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
                window.location.href = window.location.href.replace(/\?.*/, '')
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
        <>
            {isAccountPageOpen &&
            <SignUpForm
                onChange={handleChange}
                onSignUp={handleSignUp}
                onLogout={handleLogout}
                isAccountPageOpen={isAccountPageOpen}
            />}
            {/* TODO: возможно,имеет смысл в этой форме тоже находить currentUser через контест и брать его ID */}
            {/*<Petition onAddPetition={onAddPetition}/>*/}
        </>
    )
}

export default Auth;


