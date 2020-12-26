import './sign-out-form.css';
import arrowButton from '../../images/arrowButton.svg'

const SignOutForm = ({onLogout, setIsAccountPageOpen,  isAccountPageOpen}) => {

    function onEscLogout() {
        setIsAccountPageOpen(!isAccountPageOpen);
    }

    return (
        <>
            <h2 className="sign-out__heading">Уже уходите?</h2>
                <button type="button"  className="sign-out__submit-button" onClick={onLogout}>
                    <span
                        className="sign-out__message">Выйти</span>
                    <div className="sign-out__button"> <img src={arrowButton} alt='Log out'/></div>
                </button>
            <button type="button"  className="sign-out__escape-button" onClick={onEscLogout}>
                <p className="sign-out__escape-button-text">Пожалуй, останусь</p></button>
        </>
    );
}

export default SignOutForm;
