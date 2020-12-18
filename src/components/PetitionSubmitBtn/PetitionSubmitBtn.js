import React, {useState, useEffect} from 'react';
import './petition-submit-btn.css'
import cn from 'classnames'
import {act} from "@testing-library/react";

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
    const [isSubmitBtnAvailable, setIsSubmitBtnAvailable] = useState(false)
    
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
    
    useEffect(()=>{
        if (isTextReadyToRender && isPictureReady) {
            setIsSubmitBtnAvailable(true)
        }  else {
            setIsSubmitBtnAvailable(false)
            
        }
    },[isTextReadyToRender, isPictureReady])
    
    return (
        <button
            type="submit"
            className={cn("form__submit-button", {"form__submit-button_disabled" : !isSubmitBtnAvailable} )}
            onClick={handleSubmitPetition}
            disabled={!isSubmitBtnAvailable}
        >
            {petitionBtnTitle}
        </button>
    )
}

export default PetitionSubmitBtn
