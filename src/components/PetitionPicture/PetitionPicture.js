import React, {useState, useEffect, useContext} from 'react';
import {storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function PetitionPicture() {
    const currentUser = useContext(CurrentUserContext);
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    const [isPicUploaded, setIsPicUploaded] = useState(false)
    const [picRef, setPicRef] = useState({
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    
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
    
    
    
    function handleChoosePictures(e) {
        e.preventDefault();
        setPictures(e.target.files[0])
        setIsPicturesReady(!isPicturesReady)
    }
    
    return (
        <>
            <div className="petition-form__user-picture">
                <label>
                    <input className="form__input" type="file" id="files" multiple
                        onChange={handleChoosePictures} name="files[]"
                           placeholder="Выберите картинку"
                    />
                    <p>Прогресс загрузки картинки: {progressBar}</p>
                </label>
            </div>
            <div className="petition-form__default-pictures">
                <img className="petition-form__default-picture" alt="#"/>
                <img className="petition-form__default-picture" alt="#"/>
                <img className="petition-form__default-picture" alt="#"/>
            </div>
            <button
                type="submit"
                className="form__submit-button"
                // onClick={handleSubmitPetition}
            >
                Текст на кнопке
                {/*{petitionBtnTitle}*/}
            </button>
        </>
    )
}

export default PetitionPicture