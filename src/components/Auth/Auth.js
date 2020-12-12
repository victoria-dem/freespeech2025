import React, {useState, useEffect} from 'react';
import './auth.css'
import {auth, db} from '../../utils/firebase'

function Auth() {
    
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const actionCodeSettings = {
        url: 'https://freespeech2025.com',
        handleCodeInApp: true
    };


// Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        auth.signInWithEmailLink(email, window.location.href)
            .then(function(result) {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn');
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
            })
            .catch(function(error) {
                console.error(error);
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
            });
    }
    
    useEffect(() => {
        if (isSubmitClicked) {
            auth.sendSignInLinkToEmail(values.email, actionCodeSettings)
                .then(function () {
                    console.log('The link was successfully sent')
                    window.localStorage.setItem('emailForSignIn', values.email);
                })
                .catch(function (error) {
                    console.error(error);
                });
            setIsSubmitClicked(false)
        }
    }, [isSubmitClicked])
    
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitClicked(true)
    }
    
    return (
        <div className="authForm">
            <form className="form form-sign-up" name="form-signup" noValidate>
                <h2 className="form__heading">Sign UP With Email Link</h2>
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
                    <button type="submit" className="form__submit-button" onClick={handleSubmit}>Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Auth


