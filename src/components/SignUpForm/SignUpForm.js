import React, {useEffect} from 'react';
import './sign-up-form.css';
import signInBtn from '../../images/signInBtn.svg'
import signInBtnDis from '../../images/signInBtnDis.svg'


const SignUpForm = ({
                        onChange,
                        onSignUp,
                        isAccountPageOpen,
                        formValidity,
                        emailErrorText,
                        setFormValues,
                        setEmailErrorText,
                        formValues
                    }) => {

    const {
        emailValid,
        checkBoxOneValid,
        checkBoxTwoValid,
        checkBoxThreeValid
    } = formValidity

    useEffect(function clearForm() {
        setFormValues({
            email: '',
            checkBoxOne: false,
            checkBoxTwo: false,
            checkBoxThree: false
        });
        setEmailErrorText('');

    }, [isAccountPageOpen]);

    console.log('formvalues', formValues.checkBoxOne)

    const {email, checkBoxOne, checkBoxTwo, checkBoxThree} = formValues;
    console.log(formValidity)
    const isSubmitDisabled = !Object.values(formValidity).every(Boolean);

    return (
        <>
            <form className="form" name="form-signup" noValidate>
                <h2 className="form__heading">Добро пожаловать!</h2>
                <input
                    onChange={onChange}
                    className="form__input form__input-first-field"
                    type="email"
                    id="email"
                    placeholder="E-mail"
                    name="email"
                    minLength="5"
                    maxLength="130"
                    required
                    autoComplete="username"
                    value={email}
                />
                <span className="form__error-text">{emailErrorText}</span>
                <label htmlFor="checkBoxOne" className="form__label form__label_direction_right">
                    <input onChange={onChange} required className="form__checkbox" type="checkbox" id="checkBoxOne"
                           name="checkBoxOne"
                        // checked={checkBoxOne}
                           value="checkBoxOne"/>
                    <span
                        className={checkBoxOneValid ? "form__pseudo-item form__pseudo-item_checked" : "form__pseudo-item"}/>
                    <span className="form__checkbox-label">Да, я нахожусь в здравом уме</span><br/>
                </label>
                <label htmlFor="checkBoxTwo" className='form__label'>
                    <input onChange={onChange} required
                           className="form__checkbox"
                        // checked={checkBoxTwo}
                           type="checkbox" id="checkBoxTwo" name="checkBoxTwo" value="checkBoxTwo"/>
                    <span
    className={checkBoxTwoValid ? "form__pseudo-item form__pseudo-item_checked" : "form__pseudo-item"}/>
                    <span className="form__checkbox-label">Да, я пытался решить проблему сам</span><br/>
                </label>
                <label htmlFor="checkBoxThree" className='form__label'>
                    <input onChange={onChange} required
                           className="form__checkbox"
                        // checked={checkBoxThree}
                           type="checkbox" id="checkBoxThree" name="checkBoxThree" value="checkBoxThree"/>
                    <span
    className={checkBoxThreeValid ? "form__pseudo-item form__pseudo-item_checked" : "form__pseudo-item"}/>
                    <span className="form__checkbox-label">Нет, я никому больше не расскажу</span><br/>
                </label>
                <button
                    disabled={isSubmitDisabled}
                    type="submit"
                    className="form__submit-button"
                    onClick={onSignUp}>
                    <span
                        className={isSubmitDisabled ? "form__submit-text form__submit-text_disabled" : "form__submit-text"}>Войти</span>
                    <img src={isSubmitDisabled ? signInBtnDis : signInBtn} alt='Button Sign-in'/>
                </button>
            </form>
            <p className="form__disclaimer">Входя на сайт вы заранее соглашаетесь с любыми последствиями своих действий</p>
        </>
    );
}

export default SignUpForm;

