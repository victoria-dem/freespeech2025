import React, {useState, useEffect} from 'react';
import './auth.css'
import {auth, db} from '../../utils/firebase'

function Auth() {
    
    const [isSubmitClicked, setIsSubmitClicked] = React.useState(false)
    const [values, setValues] = React.useState({
        email: '',
        password: ''
    })
    
    useEffect(() => {
        if (isSubmitClicked) {
            auth.createUserWithEmailAndPassword(values.email, values.password)
                .then(credentials => console.log(credentials))
                .catch((err) => console.log(err.code));
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
                <h2 className="form__heading">Sign UP</h2>
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
                    <label className="form__field-input">
                        <input
                            className="form__input form__input_position form__input-second-field"
                            type="password"
                            id="second-field-place"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            maxLength="20"
                            required
                            autoComplete="new-password"
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


