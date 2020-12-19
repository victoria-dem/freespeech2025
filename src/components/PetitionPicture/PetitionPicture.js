import React, {useState, useEffect, useContext} from 'react';
import {storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import cn from 'classnames';
import fileUploadButton from '../../images/file-upload.png'
import deleteButton from '../../images/delete-btn.png'

function PetitionPicture({getPetitionPicData, url, handleDeletePicture, isPetitionPublished }) {
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
    
    // console.log(pictures, isPicturesReady, url)
    
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
    }
    
    console.log(progressBar, isPicturesReady, pictures, isPicUploaded)
    
    return (
        <div className="petition-form__user-picture">
            {url ? <img className="petition-form__user-picture"
                        src={url} alt={'картинка'}/> : null}
            <input className={cn("petition-form__picture", {"petition-form__picture_invisible": progressBar !== 0})}
                   type="file"
                   id="files"
                   onChange={handleChoosePictures} name="files[]"
                   placeholder="Выберите картинку"
                   onClick={resetFileInput} //reset input
            />
            <label htmlFor="file" className="petition-form__picture-label">Выберите картинку</label>
            {/*TODO: статья о том как стилизовать input file button in react js*/}
            {/*TODO: https://masakudamatsu.medium.com/how-to-customize-the-file-upload-button-in-react-b3866a5973d8*/}
            {/*TODO: если успеем можем переделать как показано здесь если сочтем, что это хорошее решение https://www.youtube.com/watch?v=XlAs-Lid-TA*/}
            <p className={cn("petition-form__progress-bar", {"petition-form__progress-bar_invisible": progressBar === 0})}>
                Прогресс загрузки картинки: {progressBar}
            </p>
            <img className={cn("petition-form__delete-btn", {"petition-form__delete-btn_invisible": progressBar === 0})} src={deleteButton} alt="delete-btn" onClick={handleDeleteButtonClick}/>
        </div>
    )
}

export default PetitionPicture



