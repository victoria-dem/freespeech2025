import React, {useState, useEffect, useContext} from 'react';
import './petition-submit-btn.css'
import cn from 'classnames'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function PetitionSubmitBtn(props) {
    
    const {
        getSubmitPetitionEvent,
        isTextReadyToRender,
        isLoaded,
        isPictureReady,
        isPetitionPublished,
        isPetitionSubmitted
    } = props
    
    const currentUser = useContext(CurrentUserContext);
    const [petitionBtnTitle, setPetitionBtnTitle] = useState('Прояви инициативу')
    const [isSubmitBtnAvailable, setIsSubmitBtnAvailable] = useState(false)
    const [justPublished, setJustPublished] = useState(false)
    
    const handleSubmitPetition = e => {
        e.preventDefault();
        getSubmitPetitionEvent(true)
    }
    
    useEffect(() => {
        if (!isTextReadyToRender && !isLoaded) {
            if (justPublished) {
                setPetitionBtnTitle('Инициатива на сайте')
                setTimeout(() => {
                    setJustPublished(false)
                    setPetitionBtnTitle('Прояви инициативу')
                }, 3000)
            }
        } else if (isTextReadyToRender && !isLoaded && !isPictureReady && !isPetitionPublished) {
            setPetitionBtnTitle('А картинка где?')
        } else if (isTextReadyToRender && !isLoaded && isPictureReady && !isPetitionPublished && currentUser.uid) {
            setPetitionBtnTitle('Готова к публикации')
        } else if (isLoaded) {
            setPetitionBtnTitle('Публикуем ...')
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
        <button
            type="submit"
            className={cn("petition-form__submit-btn", {"petition-form__submit-btn_disabled": !isSubmitBtnAvailable})}
            onClick={handleSubmitPetition}
            disabled={!isSubmitBtnAvailable}
        >
            Отправить
            {/*{petitionBtnTitle}*/}
        </button>
    )
}

export default PetitionSubmitBtn
