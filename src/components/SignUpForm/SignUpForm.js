import {useContext} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import './SignUpForm.css';
import cn from 'classnames';


const SignUpForm = ({onChange, onSignUp, onLogout, isAccountPageOpen}) => {
    const currentUser = useContext(CurrentUserContext);
    
    return (
        <div className="authForm">
            <form className="form form-sign-up" name="form-signup" noValidate>
                <h2 className="form__heading">Личный кабинет</h2>
                <fieldset className="form__fields">
                    <label
                        className={cn("form__field - input", {"form__field_hide": isAccountPageOpen && currentUser.uid})}>
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
                            onChange={onChange}
                        />
                        <span className="form__field"/>
                    </label>
                    <button type="submit"
                            className={cn("form__submit-button", {"form__field_hide": isAccountPageOpen && currentUser.uid})}
                            onClick={onSignUp}>Sign Up
                    </button>
                    <button type="submit"
                            className={cn("form__submit-button", {"form__field_hide": isAccountPageOpen && !currentUser.uid})}
                            onClick={onLogout}>Log Out
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default SignUpForm;

