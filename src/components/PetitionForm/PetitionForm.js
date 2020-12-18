import React, {useState, useEffect} from 'react';
import './petition-form.css'
import {db} from '../../utils/firebase'
import petitionTextPrep from "../../utils/petitionTextPrep";
import petitionDefaultTextPrep from "../../utils/petitionDefaultTextPrep";

const validators = {
    petitionTag: {
        required: (value) => {
            return value === ''
        },
        minLength: (value) => {
            return value.length < 4
        },
        oneWord: (value) => {
            return !/(^[а-яА-ЯёЁ]+$)|(^\s+)([а-яА-ЯёЁ]+$)|(^\s+)([а-яА-ЯёЁ]+)(\s+$)|(^[а-яА-ЯёЁ]+)(\s+$)/.test(value)
        }
    },
    petition: {
        minLength: (value) => {
            return value.length < 10
        }
    }
}

function PetitionForm({getPetitionTextData}) {
    
    const [petitionValues, setPetitionValues] = React.useState({
        petitionTag: '',
        petition: '',
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    const [poemText, setPoemText] = React.useState('')
    const [isKeyPressed, setIsKeyPressed] = useState(false)
    const [isTagReady, setIsTagReady] = useState(false)
    const [searchWord, setSearchWord] = useState('')
    const [isPoemReady, setIsPoemReady] = useState(false)
    const [isPetitionReady, setIsPetitionReady] = useState(false)
    const [errorMessage, setErrorMessage] = useState({
        errorMessageTag: '',
        errorMessageText: ''
    })
    
    const [errors, setErrors] = useState({
        petitionTag: {
            required: true,
            minLength: true,
            oneWord: true
        },
        petition: {
            required: true,
            minLength: true,
        }
    })
    
    // const isPetitionTagInvalid = Object.values(errors.petitionTag).some(Boolean);
    // const isPetitionInvalid = Object.values(errors.petition).some(Boolean);
    // const isSubmitDisabled = isPetitionTagInvalid || isPetitionInvalid;
    
    useEffect(() => {
        if (isTagReady) {
            // TODO: trim space
            setSearchWord(petitionValues.petitionTag.toLowerCase())
            setIsTagReady(false)
        }
    }, [isTagReady])
    
    useEffect(() => {
        if (isPoemReady) {
            getPetitionTextData({poemText: poemText, tagText: searchWord, isPetitionReady: isPetitionReady})
        }
    }, [isPetitionReady, poemText])
    
    useEffect(() => {
        if (searchWord) {
            const poemsRef = db.collection("poems");
            const query = poemsRef.where("tagText", "array-contains", searchWord)
            const docIds = []
            db.collection("poems")
                .where("tagText", "array-contains", searchWord)
                .get()
                .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            docIds.push({[doc.id]: doc.data().arrayText})
                            // TODO: надо попробовать установить setIsPoemReady одни раз вне forEach
                            setIsPoemReady(true)
                        });
                        if (docIds.length !== 0) {
                            petitionTextPrep(docIds, setPoemText, searchWord)
                        } else {
                            petitionDefaultTextPrep(setIsPoemReady, setPoemText)
                        }
                    }
                )
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                }).finally(() => console.log('poem is cooked')
            );
        }
    }, [searchWord])
    
    const handleChange = e => {
        setIsKeyPressed(!isKeyPressed)
        const {name, value} = e.target;
        setPetitionValues(currentValue => {
            return {
                ...currentValue,
                [name]: value
            }
        });
        if ((e.target.name === 'petition') && e.target.value.length > 10) {
            setIsPetitionReady(true)
        } else {
            setIsPetitionReady(false)
        }
    }
    
    useEffect(function validateInputs() {
        const petitionTagValidationResult = Object.keys(validators.petitionTag).map(errorKey => {
                const errorResult = validators.petitionTag[errorKey](petitionValues.petitionTag);
                return {[errorKey]: errorResult};
            }
        ).reduce((acc, el) => ({...acc, ...el}), {})
        const petitionValidationResult = Object.keys(validators.petition).map(errorKey => {
                const errorResult = validators.petition[errorKey](petitionValues.petition);
                return {[errorKey]: errorResult};
            }
        ).reduce((acc, el) => ({...acc, ...el}), {})
        
        setErrors({
            petitionTag: petitionTagValidationResult,
            petition: petitionValidationResult
            
        })
            if (errors.petitionTag.minLength && petitionValues.petitionTag) {
                setErrorMessage({...errorMessage, errorMessageTag: 'Минимальная длина 4 символа'});
            } else if (!errors.petitionTag.minLength && errors.petitionTag.oneWord && petitionValues.petitionTag) {
                setErrorMessage({...errorMessage, errorMessageTag: 'Одно слово русскими буквами'});
            } else if (errors.petition.minLength && petitionValues.petition) {
                setErrorMessage({...errorMessage, errorMessageText: 'Минимальная длина 10 символов'})
            } else {
                setErrorMessage({errorMessageText: '', errorMessageTag: ''})
            }
    }, [isKeyPressed]);
    
    function handleFocus(e) {
        setIsKeyPressed(!isKeyPressed)
        setIsTagReady(false)
        setIsPoemReady(false)
    }
    
    function handleOnBlur(e) {
        setIsKeyPressed(!isKeyPressed)
        if (petitionValues.petitionTag) {
            setIsTagReady(true)
        }
    }
    
    return (
        <>
            <form className="form form_petition" name="form-petition" noValidate>
                <h2 className="form__heading">Ваш текст петиции</h2>
                <fieldset className="form__fields">
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="text"
                            id="petition-tag"
                            placeholder="* Главное слово вашей инициативы"
                            name="petitionTag"
                            minLength="4"
                            maxLength="20"
                            required
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleOnBlur}
                        />
                        <span className="form__field">{errorMessage.errorMessageTag}</span>
                    </label>
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="petition"
                            placeholder="* Опишите подробно что вас волнует"
                            name="petition"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field">{errorMessage.errorMessageText}</span>
                    </label>
                </fieldset>
            </form>
        
        </>
    )
}

export default PetitionForm
