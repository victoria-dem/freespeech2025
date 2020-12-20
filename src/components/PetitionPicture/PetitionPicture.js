import React, {useState, useEffect, useContext} from 'react';
import {storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import deleteButton from '../../images/delete-btn.png'

function PetitionPicture({getPetitionPicData, url, handleDeletePicture, isPetitionPublished, isPictureReady}) {
    const currentUser = useContext(CurrentUserContext);
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    const [isPicUploaded, setIsPicUploaded] = useState(false)
    const [picRef, setPicRef] = useState({
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    
    const handleChoosePictures = e => {
        e.preventDefault();
        setPictures(e.target.files[0])
        setIsPicturesReady(true)
    }
    
    const resetFileInput = e => {
        e.target.value = null;
        // TODO: избыточный код
        setPictures([])
        setIsPicturesReady(false)
        setIsPicUploaded(false)
    }
    
    const handleDeleteButtonClick = e => {
        handleDeletePicture()
        setIsPicturesReady(false)
    }
    
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
                // const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }).catch((err) => console.log(err));
        }
    }, [isPicturesReady, pictures])
    
    // передаем наверх данные для отображения картинки
    useEffect(() => {
        if (isPicUploaded) {
            getPetitionPicData({picRef, isPicUploaded})
        }
    }, [isPicUploaded])
    
    useEffect(() => {
        if (isPetitionPublished) {
            setPictures([])
            setIsPicturesReady(false)
            setIsPicUploaded(false)
        }
        
    }, [isPetitionPublished])
    
    return (
        <div className="petition-form__user-picture">
            {!currentUser.uid ?
                <div className="petition-form__anonymous-user-msg">Загружать свои картинки и подавать инициативу могут
                    подавать только залогиненые пользователи. Линк на логин будет здесь... Пока идите наверх,
                    пожалуйста.</div> : null}
            {url ? <img className="petition-form__user-picture" src={url} alt={'картинка'}/> : null}
            {currentUser.uid && (!isPicturesReady) ? <input className="petition-form__picture"
                                                            type="file"
                                                            id="files"
                                                            onChange={handleChoosePictures} name="files[]"
                                                            placeholder="placeholder text"
                                                            onClick={resetFileInput} //reset input
            /> : null}
            {currentUser.uid && (!isPicturesReady) ? <label htmlFor="file"
                                                            className="petition-form__picture-label">{currentUser.uid ? "Загрузите свою картинку" : null}</label> : null}
            {(isPicturesReady) ? <p className="petition-form__progress-bar">Загружаем картинку....</p> : null}
            {isPictureReady ? <img className="petition-form__delete-btn" src={deleteButton} alt="delete-btn"
                                   onClick={handleDeleteButtonClick}/> : null}
        </div>
    )
}

export default PetitionPicture
