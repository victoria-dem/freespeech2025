import React, {useState, useEffect} from 'react';
import './petition-form.css'
import {db} from '../../utils/firebase'
import petitionTextPrep from "../../utils/petitionTextPrep";
import petitionDefaultTextPrep from "../../utils/petitionDefaultTextPrep";


// const isForbiddenWord = /^(хуй)|^(оху)|^(пизд)|^(еб)|^(хер)|^(охре)|^(поеб)|^(уеб)|^(похуй)|^(похуи)|^(бляд)|^(побляд)/.test(petitionValues.petitionTag)
// const isForbiddenRegex = /^(хуй)|^(оху)|^(пизд)|^(еб)|^(хер)|^(охре)|^(поеб)|^(уеб)|^(похуй)|^(похуи)|^(бляд)|^(побляд)/

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
            return /^(хуй)|^(оху)|^(пизд)|^(еб)|^(хер)|^(аху)|^(поеб)|^(уеб)|^(похуй)|^(похуи)|^(бляд)|^(побляд)|^(хуе)|^(хуя)|^(хуи)|^(проеб)/.test(value)
        }
    },
    petition: {
        minLength: (value) => {
            return value.length < 10
        }
    }
}

function PetitionForm({getPetitionTextData, resetTextInputs}) {

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

    // const isForbiddenWord = /^(хуй)|^(оху)|^(пизд)|^(еб)|^(хер)|^(охре)|^(поеб)|^(уеб)|^(похуй)|^(похуи)|^(бля)|^(проеб)/.test(petitionValues.petitionTag)

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

    const handleFocus= e => {
        setIsKeyPressed(!isKeyPressed)
        setIsTagReady(false)
        setIsPoemReady(false)
    }

    const handleOnBlur= e => {
        setIsKeyPressed(!isKeyPressed)
        if (petitionValues.petitionTag) {
            setIsTagReady(true)
        }
    }


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
                setErrorMessage({...errorMessage, errorMessageTag: 'Минимальная длина 4 символа. Только русские буквы'});
            } else if (!errors.petitionTag.minLength && errors.petitionTag.oneWord && petitionValues.petitionTag) {
                setErrorMessage({...errorMessage, errorMessageTag: 'Одно слово русскими буквами'});
            }  else if (errors.petitionTag.forbidden && petitionValues.petitionTag)  {
                setErrorMessage({...errorMessage, errorMessageTag: 'Нельзя писать нецензурные слова'});
            }
            else if (errors.petition.minLength && petitionValues.petition) {
                setErrorMessage({...errorMessage, errorMessageText: 'Минимальная длина 10 символов'})
            } else {
                setErrorMessage({errorMessageText: '', errorMessageTag: ''})
            }
    }, [isKeyPressed]);

    useEffect(()=>{
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
                            className="petition-form__form-input"
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
                            value={petitionValues.petitionTag}
                            autoComplete="off"
                        />
                        <span className="petition-form__form-error">{errorMessage.errorMessageTag}</span>
                    </label>
                    <label className="petition-form__form-label">
                        <textarea
                            className="petition-form__form-input petition-form__form-input_size"
                            id="petition"
                            placeholder="* Опишите подробно что вас волнует"
                            name="petition"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                            value={petitionValues.petition}
                            autoComplete="off"
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
