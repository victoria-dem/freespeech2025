import letter from '../../images/letter.svg'
import ('./sign-in-success-form.css')


function SignInSuccessForm () {
    return (
        <div>
        <img src={letter}></img>
            <p>Подтвердите адрес электронной почты</p>
            <p>Добро пожаловать в Центр общественных инициатив</p>
            <p>На указанную электронную почту отправлено письмо с ссылкой для авторизации</p>
</div>
    )
}
export default SignInSuccessForm;
