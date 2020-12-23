import './popup.css'
import SignUpForm from "../SignUpForm/SignUpForm";
import SignOutForm from "../SignOutForm/SignOutForm";
import SignInSuccessForm from "../SignInSuccessForm/SignInSuccessForm";
import loginFormHeader from "../../images/loginFormHeader.png"
import icClose from "../../images/icClose.svg"

function Popup(props) {
    const {
        onClose,
        onChange,
        onSignUp,
        onLogout,
        isAccountPageOpen,
        popupContain,
        formValidity,
        emailErrorText,
        setFormValues,
        setEmailErrorText,
        formValues
    } = props
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setScrollPosition(position);
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll, {passive: true});
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // const styleContainer = {
    //     marginTop: scrollPosition + (window.innerHeight / 100) * 20 + 'px'
    // }

   function renderInsightPopup(popupContain) {
        switch (popupContain) {
            case 'sign-in':
                return <SignUpForm
                    onChange={onChange}
                    onSignUp={onSignUp}
                    isAccountPageOpen={isAccountPageOpen}
                    formValidity={formValidity}
                    emailErrorText={emailErrorText}
                    setFormValues={setFormValues}
                    setEmailErrorText={setEmailErrorText}
                    formValues={formValues}
                />;
            case 'sign-out':
                return <SignOutForm onLogout={onLogout}/>;
            case 'sign-in-success':
                return <SignInSuccessForm onLogout={onLogout}/>;
            default:
               return <></>;
        }
    }

    return (
        <div className={isAccountPageOpen ? `popup  popup_opened` : `popup`}>
            {/*<div style={styleContainer} className="popup__container">*/}
            <div className="popup__container">
                {/*<div></div>*/}
                <img src={loginFormHeader} alt='login form' className='popup__image'/>
                <button onClick={onClose} className="popup__button-close"><img src={icClose} alt='close popup'/></button>
                {renderInsightPopup(popupContain)}
            </div>
        </div>
    )
}

export default Popup
