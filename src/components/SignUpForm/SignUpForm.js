import {useContext} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import './sign-up-form.css';
import cn from 'classnames';


const SignUpForm = ({onChange, onSignUp, onLogout, isAccountPageOpen}) => {
    const currentUser = useContext(CurrentUserContext);
    // TODO: validation and button disable
    return (
        <form className="form" name="form-signup" noValidate>
            <h2 className="form__heading">Добро пожаловать!</h2>
            <fieldset className="form__fields">
                <label
                    className={cn("form__field - input", {"form__field_hide": isAccountPageOpen && currentUser.uid})}>
                    <input
                        className="form__input form__input-first-field"
                        type="email"
                        id="first-field-place"
                        placeholder="E-mail"
                        name="email"
                        minLength="5"
                        maxLength="130"
                        required
                        autoComplete="username"
                        onChange={onChange}
                    />
                    <span className="form__field"/>
                </label>
                <input required
                       className={cn("form__checkbox", {"form__checkbox_hide": isAccountPageOpen && currentUser.uid})}
                       type="checkbox" id="checkbox-first" name="agree1" value="checkbox-first"/>
                <span className="form__pseudo-item"></span>
                <label
                    className={cn("form__checkbox-label", {"form__checkbox-label_hide": isAccountPageOpen && currentUser.uid})}
                    htmlFor="checkbox-first">Да, я нахожусь в здравом уме</label><br/>
                <input required
                       className={cn("form__checkbox", {"form__checkbox_hide": isAccountPageOpen && currentUser.uid})}
                       type="checkbox" id="checkbox-second" name="agree2" value="checkbox-second"/>
                <span className="form__pseudo-item"></span>
                <label
                    className={cn("form__checkbox-label", {"form__checkbox-label_hide": isAccountPageOpen && currentUser.uid})}
                    htmlFor="checkbox-second">Да, я пытался решить проблему сам</label><br/>
                <input required
                       className={cn("form__checkbox", {"form__checkbox_hide": isAccountPageOpen && currentUser.uid})}
                       type="checkbox" id="checkbox-third" name="agree3" value="checkbox-third"/>
                <span className="form__pseudo-item"></span>
                <label
                    className={cn("form__checkbox-label", {"form__checkbox-label_hide": isAccountPageOpen && currentUser.uid})}
                    htmlFor="checkbox-third">Нет, я никому больше не расскажу</label>
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
    );
}

export default SignUpForm;

