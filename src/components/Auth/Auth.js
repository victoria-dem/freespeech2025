import React, {useEffect} from 'react';
import './auth.css'
import {auth} from '../../utils/firebase'


function Auth({onUpdateUser, isLoggedIn}) {

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


    return (
        <>
        </>
    )
}

export default Auth;
