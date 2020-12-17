import React, {useState, useEffect} from 'react';
import './petition-submit-btn.css'

function PetitionSubmitBtn(props) {
    
    const {
        getSubmitPetitionEvent,
        isTextReadyToRender,
        isLoaded,
        isPictureReady,
        isPetitionPublished,
        isPetitionSubmitted
    } =  props
    
    const [petitionBtnTitle, setPetitionBtnTitle] = useState('Мы что-то не учли')
    
    function handleSubmitPetition(e) {
        e.preventDefault();
        getSubmitPetitionEvent(true)
    }
    
    
    useEffect(() => {
        if (!isTextReadyToRender && !isLoaded) {
            setPetitionBtnTitle('Создайте петицию')
        } else if (isTextReadyToRender && !isLoaded && !isPictureReady && !isPetitionPublished) {
            setPetitionBtnTitle('Петиция готова, но картинки нет -(')
        } else if (isTextReadyToRender && !isLoaded && isPictureReady && !isPetitionPublished) {
            setPetitionBtnTitle('Петиция готова, и картинка есть -)')
        } else if (isLoaded) {
            setPetitionBtnTitle('Загружаем петицию...')
        } else if (isPetitionPublished) {
            setPetitionBtnTitle('Петиция загружена. Ждите ответа...')
        }
    }, [isPetitionSubmitted, isTextReadyToRender, isPictureReady, isLoaded, isPetitionPublished])
    
    
    return (
        <button
            type="submit"
            className="form__submit-button"
            onClick={handleSubmitPetition}
        >
            {petitionBtnTitle}
        </button>
    )
}

export default PetitionSubmitBtn