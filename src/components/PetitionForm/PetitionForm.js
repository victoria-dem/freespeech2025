import React, {useState, useEffect, useContext} from 'react';
import './petition-form.css'
import {db, storage} from '../../utils/firebase'
import PetitionPreview from "../PetitionPreview/PetitionPreview";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import petitionTextPrep from "../../utils/petitionTextPrep";
import petitionDefaultTextPrep from "../../utils/petitionDefaultTextPrep";

function PetitionForm() {
    const currentUser = useContext(CurrentUserContext);
    const [petitionValues, setPetitionValues] = React.useState({
        petitionTag: '',
        petition: 'none',
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    const [poemText, setPoemText] = React.useState('')
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    const [isPicUploaded, setIsPicUploaded] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    const [isTagReady, setIsTagReady] = useState(false)
    const [searchWord, setSearchWord] = useState('')
    const [isPoemReady, setIsPoemReady] = useState(false)
    const [isPetitionReady, setIsPetitionReady] = useState(false)
    const [picRef, setPicRef] = useState({
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    
    useEffect(() => {
        if (isTagReady) {
            // TODO: trim space
            setSearchWord(petitionValues.petitionTag.toLowerCase())
            setIsTagReady(false)
        }
    }, [isTagReady])
    
    useEffect(() => {
        // TODO: подумать надо ли нам сделать внутренний bucket для картинок
        if (isPicturesReady && currentUser.uid) {
            const storageRef = storage.ref();
            const thisRef = storageRef.child(pictures.name);
            setPicRef({
                picFullPath: thisRef.fullPath,
                picName: thisRef.name,
                picBucket: thisRef.bucket
            })
            // TODO: сейчас картинка загружается под своим именем -
            //  надо попробовать загружать ее под именем timestamp+имя
            thisRef.put(pictures).then(function (snapshot) {
                setIsPicUploaded(true)
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBar(percentage)
                // TODO: надо будет попробовать обработать визуализацию загрузки картинки при помощи snapshot.
                //  В файле test.html есть пример как получить данные для отображения загрузки.
            }).catch((err) => console.log(err));
        }
    }, [isPicturesReady])
    
    
    useEffect(()=>{
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
                }).finally(() => console.log('done')
            );
        }
    }, [searchWord])
    
    const handleChange = e => {
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
    
    function handleChoosePictures(e) {
        e.preventDefault();
        setPictures(e.target.files[0])
        setIsPicturesReady(!isPicturesReady)
    }
    
    function handleFocus(e) {
        console.log('tag not ready')
        setIsTagReady(false)
        setIsPoemReady(false)
    }
    
    function handleOnBlur(e) {
        if (petitionValues.petitionTag) {
            console.log('ready')
            setIsTagReady(true)
        }
    }
    
    return (
        <div className="petition_object">
            <form className="form form_petition" name="form-petition" noValidate>
                <h2 className="form__heading">Ваш текст петиции</h2>
                <fieldset className="form__fields">
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="text"
                            id="petition-tag"
                            placeholder="Опишите вашу проблему любым одним словом"
                            name="petitionTag"
                            minLength="4"
                            maxLength="20"
                            required
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleOnBlur}
                        />
                        <span className="form__field"/>
                    </label>
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="petition"
                            placeholder="Опишите подробно что вас волнует"
                            name="petition"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    <label>
                        <input className="form__input" type="file" id="files" multiple
                               onChange={handleChoosePictures} name="files[]"
                               placeholder="Выберите картинку"
                        />
                    </label>
                    <p>Прогресс загрузки картинки: {progressBar}</p>
                </fieldset>
            </form>
            <PetitionPreview
                poemText={poemText}
                petitionTag={petitionValues.petitionTag}
                isPoemReady={isPoemReady}
                isPetitionReady={isPetitionReady}
                picRef={picRef}
                petitionValues={petitionValues}
                isPicUploaded={isPicUploaded}
            />
        </div>
    )
}

export default PetitionForm
