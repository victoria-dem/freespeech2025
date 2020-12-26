import letter from '../../images/letter.svg'

import ('./sign-in-success-form.css')

function SignInSuccessForm() {
    return (
        <div className='popup__success'>
            <img className="popup__success-image" src={letter} alt='letter'/>
            <p className="popup__success-header">Пожалуйста, проверьте вашу почту.
            
            </p>
            <p className="popup__success-text popup__success-text_narrow">Вам отправлена ссылка для подтверждения регистрации.</p>
            <p className="popup__success-text popup__success-text_narrow">Министерство Свободы Слова оставляет за собой
                право на любые действия в ответ на публикацию вашей инициативы.</p>
        </div>
    )
}

export default SignInSuccessForm;
