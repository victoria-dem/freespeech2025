import React, {useState, useEffect} from 'react';
import './form.css'
import {db, storage} from '../../utils/firebase'

function Form(props) {

    const [isSubmitClicked, setIsSubmitClicked] = React.useState(false)
    const [petitionValues, setPetitionValues] = React.useState({
        petitionTag: '',
        petition: '',
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    const [poemText, setPoemText] = React.useState('')
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    const [picturesRef, setPicturesRef] = useState({})
    const [isTagReady, setIsTagReady] = useState(false)
    
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    
    useEffect(() => {
        if (isPetitionSubmitted && props.currentUserId) {
            const timestamp = Date.now().toString()
            // TODO: обсудить использование ключа isPublic
            db.collection("petitions").add({
                    uid: props.currentUserId,
                    petition: petitionValues.petition,
                    petitionTag: petitionValues.petitionTag,
                    isPublic: false,
                    picFullPath: picturesRef.fullPath || '1.jpeg',
                    picName: picturesRef.name || '1.jpeg',
                    picBucket: picturesRef.bucket || 'freespeech2025-46bc5.appspot.com',
                    timestamp: timestamp
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }, [isPetitionSubmitted])
    
    useEffect(() => {
        if (isTagReady) {
            getPoemText(petitionValues.petitionTag);
            setIsTagReady(false)
        }
    }, [isTagReady])
    
    useEffect(() => {
        // TODO: подумать надо ли нам сделать внутренний backed для картинок
        if (isPicturesReady && props.currentUserId) {
            const storageRef = storage.ref();
            const thisRef = storageRef.child(pictures.name);
            console.log(thisRef.bucket, thisRef.name, thisRef.fullPath);
            setPicturesRef(thisRef);
            // TODO: сейчас картинка загружается под своим именем -
            //  надо попробовать загружать ее под именем timestamp+имя
            thisRef.put(pictures).then(function (snapshot) {
                // TODO: надо будет попробовать обработать визуализацию загрузки картинки при помощи snapshot.
                //  В файле test.html есть пример как получить данные для отображения загрузки.
            }).catch((err) => console.log(err));
        }
    }, [isPicturesReady])
    
    
    
    
    const getPoemText = (word) => {
        console.log(word)
        const poemsRef = db.collection("poems");
        const query = poemsRef.where("tagText", "array-contains", word)

        db.collection("poems")
            .where("tagText", "array-contains", word)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc)
                {
                    setPoemText(doc.data().text);
                    console.log(doc.data().text)
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            }).finally(() => console.log('done')
       );
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setPetitionValues({...value, [name]: value});
    }

    function handleSubmitPetition(e) {
        // if focus was true and now false and input is not null then ....
        e.preventDefault();
        setIsSubmitClicked(true)
        setIsPetitionSubmitted(true)
    }
    
    function handleChoosePictures(e) {
        e.preventDefault();
        setPictures(e.target.files[0])
    }
    
    function handleSubmitPictures(e) {
        e.preventDefault();
        setIsPicturesReady(!isPicturesReady)
    }
    
    function handleFocus(e) {
        console.log('tag not ready')
        setIsTagReady(false)
    }
    
    function handleOnBlur(e) {
       if (petitionValues.petitionTag) {
           console.log('ready')
           setIsTagReady(true)
       }
        // console.log(e, e.target, e.target.name)
    }
    return (
        <div className="petition_old">
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
                        <button className="form__submit-button" id="send" onClick={handleSubmitPictures}>Загрузить
                            картинку
                        </button>
                    </label>
                    
                    
                    <button type="submit" className="form__submit-button" onClick={handleSubmitPetition}>Готово</button>
                </fieldset>
            </form>
            <div className='translation'>
            <p>{ poemText}</p>
            </div>
        </div>
    )
}

export default Form
