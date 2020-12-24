import letter from '../../images/letter.svg'
import ('./sign-in-success-form.css')


function SignInSuccessForm () {
    return (
        <div className='popup__success'>
        <img className="popup__success-image" src={letter} alt='letter'/>
            <p className="popup__success-header">Подтвердите адрес электронной почты</p>
            <p className="popup__success-text">Добро пожаловать в Центр общественных инициатив!</p>
            <p className="popup__success-text popup__success-text_narrow">На указанную электронную почту отправлено письмо с ссылкой для авторизации.</p>
</div>
    )
}
export default SignInSuccessForm;
