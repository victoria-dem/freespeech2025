import React, {useState, useEffect, useContext} from 'react';
import {storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function PetitionPicture({getPetitionPicData}) {
    const currentUser = useContext(CurrentUserContext);
    const [pictures, setPictures] = useState([])
    const [isPicturesReady, setIsPicturesReady] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    const [isPicUploaded, setIsPicUploaded] = useState(false)
    const [url, setUrl] = useState('')
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
    
    // выгрузка картинки
    useEffect(() => {
        if (isPicUploaded) {
            getPetitionPicData({picRef, isPicUploaded})
            const storagePic = storage.ref(picRef.picFullPath || '1.jpeg');
            storagePic
                .getDownloadURL()
                .then(function (url) {
                    // console.log(url);
                    setUrl(url)
                })
                .catch(function (error) {
                    console.log("error encountered");
                });
        }
    }, [isPicUploaded])
    
    function handleChoosePictures(e) {
        e.preventDefault();
        setPictures(e.target.files[0])
        setIsPicturesReady(!isPicturesReady)
    }
    
    return (
        <div className="petition-form__user-picture">
            {url ? <img className="photo" src={url} alt={'картинка'}/> : null}
            <label>
                <input className="form__input" type="file" id="files" multiple
                       onChange={handleChoosePictures} name="files[]"
                       placeholder="Выберите картинку"
                />
                <p>Прогресс загрузки картинки: {progressBar}</p>
            </label>
        </div>
    )
}

export default PetitionPicture
