import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SignUpForm.css';

const SignUpForm = ({  onChange, onSignUp, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="authForm">
      <form className="form form-sign-up" name="form-signup" noValidate>
        <h2 className="form__heading">Sign UP With Email Link 11</h2>
        <h2 className="form__heading">User: {!currentUser.email ? 'Unknown' : currentUser.email}</h2>
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
              onChange={onChange}
            />
            <span className="form__field" />
          </label>
          <button type="submit" className="form__submit-button" onClick={onSignUp}>Sign Up</button>
          <button type="submit" className="form__submit-button" onClick={onLogout}>Log Out</button>
        </fieldset>
      </form>
    </div>
  );
}

export default SignUpForm;