import './sign-out-form.css';


const SignOutForm = ({onLogout}) => {
    return (
        <>
            <h2 className="form__heading">Уже уходите?</h2>
                <button type="submit" className="form__submit-button" onClick={onLogout}>Log Out</button>
        </>
    );
}

export default SignOutForm;
