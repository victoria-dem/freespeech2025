import React, {useState, useEffect, useContext, useRef} from 'react';
import {storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import './petition-picture.css'
import loader from '../../images/spinner.svg'

function PetitionPicture({
                             getPetitionPicData,
                             url,
                             handleDeletePicture,
                             isPetitionPublished,
                             isPictureReady,
                             isDefaultPictureChosen,
                             handleAccountBtnClick
                         }) {
    const currentUser = useContext(CurrentUserContext);
    const [picture, setPicture] = useState({})
    const [isPictureChosen, setIsPictureChosen] = useState(false)
    const [isPicUploaded, setIsPicUploaded] = useState(false)
    const [picRef, setPicRef] = useState({
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    const hiddenFileInput = useRef(null);
    
    const handleChoosePicture = e => {
        setPicture(e.target.files[0])
        setIsPictureChosen(true)
    }
    
    const handlePictureUpload = (e) => {
        hiddenFileInput.current.click();
    }
    
    const resetFileInput = e => {
        e.target.value = null;
        setPicture([])
        setIsPictureChosen(false)
        setIsPicUploaded(false)
    }
    
    const handleDeleteButtonClick = e => {
        handleDeletePicture()
        setIsPictureChosen(false)
    }
    
    useEffect(() => {
        // TODO: подумать надо ли нам сделать внутренний bucket для картинок
        if (isPictureChosen && currentUser.uid) {
            const storageRef = storage.ref();
            const thisRef = storageRef.child(picture.name);
            setPicRef({
                picFullPath: thisRef.fullPath,
                picName: thisRef.name,
                picBucket: thisRef.bucket
            })
            // TODO: сейчас картинка загружается под своим именем -
            //  надо попробовать загружать ее под именем timestamp+имя
            thisRef.put(picture).then(function (snapshot) {
                setIsPicUploaded(true)
            }).catch((err) => console.log(err));
        }
    }, [isPictureChosen, picture])
    
    // передаем наверх данные для отображения картинки
    useEffect(() => {
        if (isPicUploaded) {
            getPetitionPicData({picRef, isPicUploaded})
        }
    }, [isPicUploaded])
    
    useEffect(() => {
        if (isPetitionPublished) {
            setPicture([])
            setIsPictureChosen(false)
            setIsPicUploaded(false)
        }
    }, [isPetitionPublished])
    
    return (
        <div className="petition-form__user-picture-element"
             style={{border: (isPicUploaded && isPictureChosen) || (isDefaultPictureChosen && isPictureReady) ? 'none' : '1px dashed #C4C4C4'}}>
            {!currentUser.uid &&
            <div className="petition-form__anonymous-user-msg">
                <p className="petition-form__anonymous-user-msg-text">
                    Для того чтобы создать инициативу,
                </p>
                <p className="petition-form__anonymous-user-msg-text">
                    <div className="petition-form__anonymous-user-msg-link" onClick={handleAccountBtnClick}>
                        залогиньтесь
                    </div> пожалуйста.
                </p>
            </div>}
            
            {url &&
            <img className="petition-form__user-picture"
                 src={url} alt={'картинка'}
            />}
            
            {currentUser.uid && !isPictureChosen && !isPictureReady &&
            <>
                <button type="button"
                        className="petition-form__button"
                        onClick={handlePictureUpload}>
                </button>
                <span className="petition-form__button-text">
                    <div className="petition-form__pic-upload-link" onClick={handlePictureUpload}>Загрузите картинку</div>
                </span>
            </>}
            
            {currentUser.uid && !isPictureChosen && !isPictureReady &&
            <input className="petition-form__picture"
                   ref={hiddenFileInput}
                   type="file"
                   id="files"
                   onChange={handleChoosePicture} name="files[]"
                   placeholder="placeholder text"
                   onClick={resetFileInput} //reset input
            />}
            
            {isPictureChosen && !isPicUploaded &&
            <div className="petition-form__progress-bar">
                <img className="petition-form__progress-bar-loader" src={loader} alt='loader'/>
            </div>
            }
            
            {isPictureReady &&
            <div
                className="petition-form__delete-btn"
                onClick={handleDeleteButtonClick}
            />}
        </div>
    )
}

export default PetitionPicture


