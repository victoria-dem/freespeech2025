import './sign-up-form.css';
import signInBtn from '../../images/signInBtn.svg'


const SignUpForm = ({onChange, onSignUp}) => {
    // TODO: validation and button disable
    return (
        <form className="form" name="form-signup" noValidate>
            <h2 className="form__heading">Добро пожаловать!</h2>
            <fieldset className="form__fields">
                <label className="form__field-input">
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
                <label>
                    <input required className="form__checkbox" type="checkbox" id="checkbox-first" name="agree1"
                           value="checkbox-first"/>
                    <span className="form__pseudo-item"></span>
                    <span className="form__checkbox-label">Да, я нахожусь в здравом уме</span><br/>
                </label>
                <label>
                    <input required
                           className="form__checkbox"
                           type="checkbox" id="checkbox-second" name="agree2" value="checkbox-second"/>
                    <span className="form__pseudo-item"></span>
                    <span className="form__checkbox-label">Да, я пытался решить проблему сам</span><br/>
                </label>
                <label>
                    <input required
                           className="form__checkbox"
                           type="checkbox" id="checkbox-third" name="agree3" value="checkbox-third"/>
                    <span className="form__pseudo-item"></span>
                    <span className="form__checkbox-label">Нет, я никому больше не расскажу</span><br/>
                </label>
                <button type="submit"
                        className="form__submit-button"
                        onClick={onSignUp}>
                    <span className="form__submit-text">Войти</span>
                    <img src={signInBtn} alt='Button Sign-in'></img>
                </button>
            </fieldset>
        </form>
    );
}

export default SignUpForm;

