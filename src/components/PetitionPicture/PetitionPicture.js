import React, {useState, useEffect, useContext, useRef} from 'react';
import {storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import deleteButton from '../../images/del_button.svg'
import Loader from 'react-loader-spinner'
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
    
    // console.log(isPictureChosen, isPicUploaded)
    
    const handleChoosePicture = e => {
        setPicture(e.target.files[0])
        setIsPictureChosen(true)
    }
    
    const handlePictureUpload = (e) => {
        hiddenFileInput.current.click();
    }
    
    const resetFileInput = e => {
        e.target.value = null;
        // TODO: избыточный код???
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
                // const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                    <a className="petition-form__anonymous-user-msg-link" onClick={handleAccountBtnClick}>
                        залогиньтесь
                    </a> пожалуйста.
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
                    <a className="petition-form__pic-upload-link" onClick={handlePictureUpload}>Загрузите картинку</a>
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
                {/*<Loader*/}
                {/*    type="TailSpin"*/}
                {/*    color="#3348d0"*/}
                {/*    height={40}*/}
                {/*    width={40}*/}
                {/*    timeout={13000}*/}
                {/*/>*/}
            </div>
            }
            {isPictureReady &&
            <img className="petition-form__delete-btn"
                 src={deleteButton}
                 alt="delete-btn"
                 onClick={handleDeleteButtonClick}
            />}
        </div>
    )
}

export default PetitionPicture


