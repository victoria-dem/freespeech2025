import React, {useEffect, useState} from 'react';
import './petitionform.css'
import {db, storage} from '../../utils/firebase'

function PetitionForm(props) {
    
    
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    const [values, setValues] = useState({
        petition: '',
        firstTag: '',
        secondTag: ''
    })
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    console.log(pictures.length)
    
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
        if (isPicturesReady && props.currentUserId) {
            for (let i = 0; i < pictures.length; i++) {
                //create a storage reference
                let storageRef = storage.ref(pictures[i].name);
        
                //upload file
                let upload = storageRef.put(pictures[i]);
        
                //update progress bar
                upload.on(
                    "state_changed",
                    function progress(snapshot) {
                        document.getElementById("progress").value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
            
                    function error() {
                        alert("error uploading file");
                    },
            
                    function complete() {
                        document.getElementById(
                            "uploading"
                        ).innerHTML += `${pictures[i].name} uploaded <br />`;
                    }
                );
            }
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
        console.log(e.target, e.target.files)
        setPictures(e.target.files)
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
                        <p>Выберите картинку</p>
                        <input type="file" id="files" multiple onChange={handleChoosePictures}/>
                        <button id="send" onClick={handleSubmitPictures}>Загрузить картинку</button>
                        <p id="uploading"/>
                        <progress value="0" max="100" id="progress"/>
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
