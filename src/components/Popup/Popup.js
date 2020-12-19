import './popup.css'
import React, {useState, useEffect} from 'react';
import SignUpForm from "../SignUpForm/SignUpForm";

function Popup(props) {
    const {
        onClose,
        onChange,
        onSignUp,
        onLogout,
        isAccountPageOpen,
    } = props
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const styleContainer = {
        marginTop: scrollPosition + (window.innerHeight / 100) * 20 + 'px'
    }

    return (
        <div className={isAccountPageOpen ? `popup  popup_opened` : `popup`}>
            <div style={styleContainer} className="popup__container">
                <button onClick={onClose} className="popup__button-close"></button>
                <SignUpForm
                    onChange={onChange}
                    onSignUp={onSignUp}
                    onLogout={onLogout}
                    isAccountPageOpen={isAccountPageOpen}
                />
            </div>
        </div>
    )
}

export default Popup
