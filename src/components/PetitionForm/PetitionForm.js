import React, {useEffect, useState} from 'react';
import './petitionform.css'
import {db, storage} from '../../utils/firebase'

function PetitionForm(props) {
    
    
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    const [values, setValues] = useState({
        petition: '',
        firstTag: '',
        secondTag: '',
        pictureReference: {}
    })
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    
    useEffect(() => {
        if (isPetitionSubmitted && props.currentUserId) {
            db.collection("petitions").add({
                    uid: props.currentUserId,
                    petition: values.petition,
                    firstTag: values.firstTag,
                    secondTag: values.secondTag,
                    isPublic: false
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }, [isPetitionSubmitted])
    
    useEffect(() => {
        // TODO: подумать надо ли нам сделать внутренний backed для картинок
        if (isPicturesReady && props.currentUserId) {
            const storageRef = storage.ref();
            const thisRef = storageRef.child(pictures.name);
            console.log(thisRef)
            console.log(thisRef.fullPath)
            console.log(thisRef.name)
            console.log(thisRef.bucket)
            thisRef.put(pictures).then(function (snapshot) {
                // TODO: обработать визуализацию загрузки картинки при помощи snapshot
            }).catch((err) => console.log(err));
        }
    }, [isPicturesReady])
    
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }
    
    function handleSubmitPetition(e) {
        e.preventDefault();
        setIsPetitionSubmitted(true)
    }
    
    function handleChoosePictures(e) {
        e.preventDefault();
        console.log(e.target, e.target.files[0])
        setPictures(e.target.files[0])
    }
    
    function handleSubmitPictures(e) {
        console.log('submit Picture')
        e.preventDefault();
        setIsPicturesReady(!isPicturesReady)
    }
    
    return (
        
        <div className="form-complaint">
            <form className="form form_complaint" name="form-complaint" noValidate>
                <h2 className="form__heading">Сгенерированная петиция</h2>
                <fieldset className="form__fields">
                    
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="first-field-place"
                            placeholder="Здесь, типа, уже готовый стих"
                            name="petition"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="second-field-place"
                            placeholder="Добавьте тег"
                            name="firstTag"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="second-field-place"
                            placeholder="Добавьте тег"
                            name="secondTag"
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
                        <button className="form__submit-button" id="send" onClick={handleSubmitPictures}>Загрузить
                            картинку
                        </button>
                    </label>
                    
                    
                    <button type="submit" className="form__submit-button" onClick={handleSubmitPetition}>Подать
                        петицию
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default PetitionForm
