import React, {useEffect, useState} from 'react';
import './card-preview.css'
import {storage, db, auth} from '../../utils/firebase'
import PoemLine from "../PoemLine/PoemLine";
import { v4 as uuidv4 } from 'uuid';

function CardPreview(props) {
    
    const {
        currentUserId,
        poemText,
        petitionTag,
        isPoemReady,
        isPetitionReady,
        picRef,
        petitionValues,
        isPicUploaded
    } = props
    
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    const [url, setUrl] = useState('')
    const [petitionDate, setPetitionDate] = useState('')
    
    useEffect(() => {
        if (isPetitionSubmitted && currentUserId) {
            const timestamp = Date.now().toString()
            setPetitionDate(timestamp)
            // TODO: обсудить использование ключа isPublic
            db.collection("petitions").add({
                    uid: currentUserId,
                    petition: poemText,
                    petitionTag: petitionTag,
                    isPublic: false,
                    picFullPath: picRef.picFullPath || '1.jpeg',
                    picName: picRef.picName || '1.jpeg',
                    picBucket: picRef.picBucket || 'freespeech2025-46bc5.appspot.com',
                    timestamp: timestamp
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef);
                }).then(function () {
                    // загрузка картинки (после того, как пользователь нажал на submit)
                    const storagePic = storage.ref(picRef.picFullPath || '1.jpeg');
                    storagePic
                        .getDownloadURL()
                        .then(function (url) {
                            console.log(url);
                            setUrl(url)
                        })
                        .catch(function (error) {
                            console.log("error encountered");
                        });
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }, [isPetitionSubmitted])
    
    // предварительная загрузка картинки (до того, как пользователь нажал на submit)
    useEffect(()=>{
        if (isPicUploaded) {
            const storagePic = storage.ref(picRef.picFullPath);
            storagePic
                .getDownloadURL()
                .then(function (url) {
                    console.log(url);
                    setUrl(url)
                })
                .catch(function (error) {
                    console.log("error encountered");
                });
        }
    }, [isPicUploaded])
    
    
    function handleSubmitPetition(e) {
        e.preventDefault()
        setIsPetitionSubmitted(true)
    }
    
    console.log(poemText, typeof poemText)
    
    return (
        <div className="card">
            <p>Актуальная петиция</p>
            <p>Тег: {petitionTag}</p>
            <div>Текст петиции: {isPoemReady && isPetitionReady &&
            poemText.map((line, i) => <PoemLine key={uuidv4()} line={line}/>)}</div>
            <p>Дата публикации (условная): {petitionDate}</p>
            {url ? <img className="photo" src={url} alt={'картинка'}/> : null}
            <button type="submit" className="form__submit-button" onClick={handleSubmitPetition}>Готово</button>
        </div>
    )
}

export default CardPreview


