import React, {useState, useEffect, useContext} from 'react';
import './petition-form.css'
import {db} from '../../utils/firebase'
import petitionTextPrep from "../../utils/petitionTextPrep";
import petitionDefaultTextPrep from "../../utils/petitionDefaultTextPrep";
import cn from 'classnames';
import {obsceneVocabulary} from '../../data/data'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const validators = {
    petitionTag: {
        required: (value) => {
            return value === ''
        },
        minLength: (value) => {
            return value.length < 3
        },
        oneWord: (value) => {
            return !/(^[а-яА-ЯёЁ]+$)|(^\s+)([а-яА-ЯёЁ]+$)|(^\s+)([а-яА-ЯёЁ]+)(\s+$)|(^[а-яА-ЯёЁ]+)(\s+$)/.test(value)
        },
        forbidden: (value) => {
            return obsceneVocabulary.test(value)
        }
    },
    petition: {
        minLength: (value) => {
            return value.length < 10
        }
    }
}

function PetitionForm({getPetitionTextData, resetTextInputs}) {
    const currentUser = useContext(CurrentUserContext);
    const [petitionValues, setPetitionValues] = React.useState({
        petitionTag: '',
        petition: '',
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
            oneWord: true,
            forbidden: false
        },
        petition: {
            required: true,
            minLength: true,
        }
    })

    const handleChange = e => {
        setIsKeyPressed(!isKeyPressed)
        const {name, value} = e.target;
        setPetitionValues(currentValue => {
            return {
                ...currentValue,
                [name]: value
            }
        });
    }

    const handleFocus = e => {
        setIsKeyPressed(!isKeyPressed)
        setIsTagReady(false)
        setIsPoemReady(false)
    }

    const handleOnBlur = e => {
        setIsKeyPressed(!isKeyPressed)
        if (petitionValues.petitionTag) {
            setIsTagReady(true)
        }
    }

    // здесь надо добавить валидность двух полей
    useEffect(() => {
        if (isPoemReady &&
            petitionValues.petition.length > 10 &&
            petitionValues.petitionTag.length > 3 &&
            isTagReady &&
            !errorMessage.errorMessageTag &&
            !errorMessage.errorMessageText
        ) {
            setIsPetitionReady(true)
        } else {
            setIsPetitionReady(false)
        }
    }, [isPoemReady, petitionValues, isTagReady, errorMessage])

    useEffect(() => {
        if (isTagReady) {
            // TODO: trim space
            setSearchWord(petitionValues.petitionTag.toLowerCase().trim())
            // setIsTagReady(false)
        } else {
            setPoemText('')
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
                });
        }
    }, [searchWord])

    useEffect(function validateInputs() {
        // console.log('validating')
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
            setErrorMessage({...errorMessage, errorMessageTag: 'Минимальная длина 4 символа. Только русские буквы'});
        } else if (!errors.petitionTag.minLength && errors.petitionTag.oneWord && petitionValues.petitionTag) {
            setErrorMessage({...errorMessage, errorMessageTag: 'Одно слово русскими буквами'});
        } else if (errors.petitionTag.forbidden && petitionValues.petitionTag) {
            setErrorMessage({...errorMessage, errorMessageTag: 'Нельзя писать нецензурные слова'});
        } else if (errors.petition.minLength && petitionValues.petition) {
            setErrorMessage({...errorMessage, errorMessageText: 'Минимальная длина 10 символов'})
        } else {
            setErrorMessage({errorMessageText: '', errorMessageTag: ''})
        }
    }, [isKeyPressed]);

    useEffect(() => {
        setPetitionValues({
            petitionTag: '',
            petition: '',
        })
    }, [resetTextInputs])

    return (
        <>
            <form className="petition-form__form" name="form-petition" noValidate>
                <fieldset className="petition-form__form-fields">
                    <label className="petition-form__form-label">
                        <input
                            className={cn("petition-form__form-input",
                                {"petition-form__form-input_error": errorMessage.errorMessageTag})}
                            type="text"
                            id="petition-tag"
                            placeholder="Ключевое слово"
                            name="petitionTag"
                            minLength="4"
                            maxLength="20"
                            required
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleOnBlur}
                            value={petitionValues.petitionTag}
                            autoComplete="off"
                            disabled={!currentUser.uid}
                        />
                        <span className="petition-form__form-error">{errorMessage.errorMessageTag}</span>
                    </label>
                    <label className="petition-form__form-label">
                        <textarea
                            className={cn("petition-form__form-input petition-form__form-input_size",
                                {"petition-form__form-input_error": errorMessage.errorMessageText})}
                            id="petition"
                            placeholder="Текст инициативы ..."
                            name="petition"
                            minLength="10"
                            maxLength="140"
                            required
                            onChange={handleChange}
                            value={petitionValues.petition}
                            autoComplete="off"
                            disabled={!currentUser.uid}
                        />
                        <span className="petition-form__form-error petition-form__form-error_position">
                            {errorMessage.errorMessageText}
                        </span>
                    </label>
                </fieldset>
            </form>
        </>
    )
}

export default PetitionForm
