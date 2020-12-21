import './popup.css'
import SignUpForm from "../SignUpForm/SignUpForm";
import SignOutForm from "../SignOutForm/SignOutForm";
import SignInSuccessForm from "../SignInSuccessForm/SignInSuccessForm";

function Popup(props) {
    const {
        onClose,
        onChange,
        onSignUp,
        onLogout,
        isAccountPageOpen,
        popupContain
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
                <button onClick={onClose} className="popup__button-close"/>
                {renderInsightPopup(popupContain)}
            </div>
        </div>
    )
}

export default Popup
