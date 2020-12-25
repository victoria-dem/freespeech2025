import React, {useState, useEffect} from 'react';
import './petition-submit-btn.css'
import cn from 'classnames'

function PetitionSubmitBtn(props) {
    
    const {
        getSubmitPetitionEvent,
        isTextReadyToRender,
        isPictureReady,
        isPetitionPublished,
        resetPublishState
    } = props
    
    const [petitionBtnTitle, setPetitionBtnTitle] = useState('Отправить')
    const [isSubmitBtnAvailable, setIsSubmitBtnAvailable] = useState(false)
    const [justPublished, setJustPublished] = useState(false)
    
    const handleSubmitPetition = e => {
        e.preventDefault();
        getSubmitPetitionEvent(true)
    }
    
    useEffect(() => {
        if (isPetitionPublished) {
            setJustPublished(true)
            setPetitionBtnTitle('Публикуем...')
            setTimeout(()=>{
                setPetitionBtnTitle('Опубликовано')
                setTimeout(() => {
                    setJustPublished(false)
                    setPetitionBtnTitle('Отправить')
                    resetPublishState(false)
                }, 3000)
            }, 1000)

        } else {
            setPetitionBtnTitle('Отправить')
        }
    }, [isPetitionPublished])
    
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
            className={cn("petition-form__submit-btn",
                {"petition-form__submit-btn_disabled": !isSubmitBtnAvailable && !justPublished},
                {"petition-form__submit-btn_active": isSubmitBtnAvailable && !justPublished},
                {"petition-form__submit-btn_published": justPublished})}
            onClick={handleSubmitPetition}
            disabled={!isSubmitBtnAvailable}
        >
            {petitionBtnTitle}
        </button>
    )
}

export default PetitionSubmitBtn
