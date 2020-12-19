import React, { useState, useEffect } from 'react';
import './petition-submit-btn.css'
import cn from 'classnames'
// import {act} from "@testing-library/react";

function PetitionSubmitBtn(props) {

    const {
        getSubmitPetitionEvent,
        isTextReadyToRender,
        isLoaded,
        isPictureReady,
        isPetitionPublished,
        isPetitionSubmitted
    } = props

    const [petitionBtnTitle, setPetitionBtnTitle] = useState('Прояви инициативу')
    const [isSubmitBtnAvailable, setIsSubmitBtnAvailable] = useState(false)
    const [justPublished, setJustPublished] = useState(false)

    function handleSubmitPetition(e) {
        e.preventDefault();
        getSubmitPetitionEvent(true)
    }
    
    console.log(isPetitionPublished)
    
    useEffect(() => {
        if (!isTextReadyToRender && !isLoaded) {
            if (justPublished) {
                setPetitionBtnTitle('Инициатива опубликована на сайте')
                setTimeout(()=>{
                    setJustPublished(false)
                    setPetitionBtnTitle('Прояви инициативу')
                }, 5000)
            }
            // setPetitionBtnTitle('Создай петицию')
        } else if (isTextReadyToRender && !isLoaded && !isPictureReady && !isPetitionPublished) {
            setPetitionBtnTitle('А картинка где?')
        } else if (isTextReadyToRender && !isLoaded && isPictureReady && !isPetitionPublished) {
            setPetitionBtnTitle('Инициатива готова к публикации')
        } else if (isLoaded) {
            setPetitionBtnTitle('Публикуем инициативу...')
        } else if (isPetitionPublished) {
            setJustPublished(true)
        }
    }, [isPetitionSubmitted, isTextReadyToRender, isPictureReady, isLoaded, isPetitionPublished])

    useEffect(() => {
        if (isTextReadyToRender && isPictureReady) {
            setIsSubmitBtnAvailable(true)
        } else {
            setIsSubmitBtnAvailable(false)
        }
    }, [isTextReadyToRender, isPictureReady])

    return (
        // <button
        //     type="submit"
        //     className={cn("petition-form__submit-btn", {"petition-form__submit-btn_disabled" : !isSubmitBtnAvailable} )}
        //     onClick={handleSubmitPetition}
        //     disabled={!isSubmitBtnAvailable}
        // >
        //     {petitionBtnTitle}
        // </button>
        // <a href="#petitions">
            <button
                type="submit"
                className={cn("petition-form__submit-btn", { "petition-form__submit-btn_disabled": !isSubmitBtnAvailable })}
                onClick={handleSubmitPetition}
                disabled={!isSubmitBtnAvailable}
            >
                {petitionBtnTitle}
            </button>
        // </a>
    )
}

export default PetitionSubmitBtn
