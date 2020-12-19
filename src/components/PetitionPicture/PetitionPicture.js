import React, {useState, useEffect, useContext} from 'react';
import {storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import cn from 'classnames';
import fileUploadButton from '../../images/file-upload.png'
import deleteButton from '../../images/delete-btn.png'

function PetitionPicture({getPetitionPicData, url, handleDeletePicture, isPetitionPublished, isPictureReady }) {
    const currentUser = useContext(CurrentUserContext);
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    const [isPicUploaded, setIsPicUploaded] = useState(false)
    const [isPicUploadedReady, setIsPicUploadedReady] = useState(false)
    // const [picLabel, setPicLabel] = useState('')
    const [picRef, setPicRef] = useState({
        picFullPath: '',
        picName: '',
        picBucket: ''
    })
    
    // console.log(pictures, isPicturesReady, url)
    
    useEffect(() => {
        // TODO: подумать надо ли нам сделать внутренний bucket для картинок
        if (isPicturesReady && currentUser.uid) {
            console.log('start pic upload -2')
            
            
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
    }, [isPicturesReady, pictures])
    
    // передаем наверх данные для отображения картинки
    useEffect(() => {
        if (isPicUploaded) {
            getPetitionPicData({picRef, isPicUploaded})
        }
    }, [isPicUploaded])
    
    useEffect(()=>{
        if (isPetitionPublished){
            setPictures([])
            setIsPicturesReady(false)
            setProgressBar(0)
            setIsPicUploaded(false)
        }
       
    }, [isPetitionPublished])
    
    
    function handleChoosePictures(e) {
        e.preventDefault();
        setPictures(e.target.files[0])
        setIsPicturesReady(true)
        setProgressBar(0)
        console.log('start pic upload - 1')
    }
    
    function resetFileInput(e) {
        console.log('resetFileInput')
        e.target.value = null;
        // TODO: избыточный код
        setPictures([])
        setIsPicturesReady(false)
        setProgressBar(0)
        setIsPicUploaded(false)
    }
    
    function handleDeleteButtonClick(e) {
        console.log('Delete')
        handleDeletePicture()
        setIsPicturesReady(false)
    }
    
    // console.log(progressBar, isPicturesReady, pictures, isPicUploaded)
    
    useEffect(()=>{
        // currentUser ? setPicLabel('Выберите картинку') : setPicLabel('Инициативу могут подавать только залогиненые пользователи ')
    }, [currentUser])
    console.log(isPictureReady, progressBar, (progressBar>0 && progressBar<100))
    
    return (
        <div className="petition-form__user-picture">
            {!currentUser.uid ? <div className="petition-form__anonymous-user-msg">Загружать свои картинки и подавать инициативу могут подавать только залогиненые пользователи. Линк на логин будет здесь... Пока идите наверх, пожалуйста.</div> : null}
            {url ? <img className="petition-form__user-picture" src={url} alt={'картинка'}/> : null}
            {currentUser.uid && (!isPicturesReady) ? <input className="petition-form__picture"
                   type="file"
                   id="files"
                   onChange={handleChoosePictures} name="files[]"
                   placeholder="placeholder text"
                   onClick={resetFileInput} //reset input
            /> : null}
            {currentUser.uid && (!isPicturesReady) ? <label htmlFor="file"
                    className="petition-form__picture-label">{currentUser.uid ? "Label Text" : null}</label> :null}
            {(isPicturesReady) ? <p className="petition-form__progress-bar">Прогресс загрузки картинки: {progressBar}</p> : null}
            {isPictureReady ? <img className="petition-form__delete-btn" src={deleteButton} alt="delete-btn"
                  onClick={handleDeleteButtonClick}/>:null}
        </div>
    )
}

export default PetitionPicture



{/*<input className={cn("petition-form__picture", {"petition-form__picture_invisible": progressBar !== 0})}*/}
{/*<input className={cn("petition-form__picture", {"petition-form__picture_invisible": !currentUser})}*/}