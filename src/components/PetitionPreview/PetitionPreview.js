import React, {useEffect, useState, useContext} from 'react';
import './petition-preview.css'
import {storage, db, auth} from '../../utils/firebase'
import PoemLine from "../PoemLine/PoemLine";
import {v4 as uuidv4} from 'uuid';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function PetitionPreview(props) {
    const currentUser = useContext(CurrentUserContext);
    const {
        poemText,
        petitionTag,
        isPoemReady,
        isPetitionReady,
        picRef,
        isPicUploaded
    } = props
    
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    const [isPetitionPublished, setIsPetitionPublished] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [petitionBtnTitle, setPetitionBtnTitle] = useState('Что-то мы не учли')
    const [url, setUrl] = useState('')
    const [petitionDate, setPetitionDate] = useState('')
    
    useEffect(() => {
        if (isPetitionSubmitted && currentUser.uid) {
            setIsLoaded(true)
            setIsPetitionPublished(false)
            const timestamp = Date.now().toString()
            setPetitionDate(timestamp)
            // TODO: обсудить использование ключа isPublic
            // TODO: setTimeout поставил специально, для отслеживания статуса загрузки
            
            setTimeout(()=>{
                db.collection("petitions").add({
                        uid: currentUser.uid,
                        petition: poemText,
                        petitionTag: petitionTag,
                        isPublic: false,
                        picFullPath: picRef.picFullPath || '1.jpeg',
                        picName: picRef.picName || '1.jpeg',
                        picBucket: picRef.picBucket || 'freespeech2025-46bc5.appspot.com',
                        timestamp: timestamp,
                        likes: [],
                        disLikes: []
                    })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        setIsLoaded(false)
                        setIsPetitionPublished(true)
                    }).then(function () {
                        // загрузка картинки (после того, как пользователь нажал на submit)
                        pictureUpload()
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                
            }, 1500)
        }
    }, [isPetitionSubmitted])
    
    // предварительная загрузка картинки (до того, как пользователь нажал на submit)
    useEffect(() => {
        if (isPicUploaded) {
            pictureUpload()
        }
    }, [isPicUploaded])
    
    // console.log(isPetitionReady, isLoaded, isPicUploaded)
    
    useEffect(() => {
        if (!isPetitionReady && !isLoaded) {
            setPetitionBtnTitle('Создайте петицию')
        } else if (isPetitionReady && !isLoaded && !isPicUploaded && !isPetitionPublished) {
            setPetitionBtnTitle('Петиция готова, но картинки нет -(')
        } else if (isPetitionReady && !isLoaded && isPicUploaded && !isPetitionPublished) {
            setPetitionBtnTitle('Петиция готова, и картинка есть -)')
        } else if (isLoaded) {
            setPetitionBtnTitle('Загружаем петицию...')
        } else if (isPetitionPublished) {
            setPetitionBtnTitle('Петиция загружена. Ждите ответа...')
        }
    }, [isPetitionSubmitted, isPetitionReady, isPicUploaded, isLoaded, isPetitionPublished])
    
    
    function pictureUpload() {
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
    
    // function handleSubmitPetition(e) {
    //     e.preventDefault()
    //     setIsPetitionSubmitted(true)
    // }
    //
    // console.log(poemText, poemText === true, typeof poemText)
    
    return (
        <div className="card">
            <p>Ваша инициатива в стихах</p>
            {/*<p>Тег: {petitionTag}</p>*/}
            <div>
                Текст петиции:
                {poemText && isPoemReady && isPetitionReady && poemText.map((line, i) => <PoemLine key={uuidv4()}
                                                                                                   line={line}/>)}
            </div>
            {/*<p>Дата публикации (условная): {petitionDate}</p>*/}
            {/*{url ? <img className="photo" src={url} alt={'картинка'}/> : null}*/}
            {/*<button*/}
            {/*    type="submit"*/}
            {/*    className="form__submit-button"*/}
            {/*    onClick={handleSubmitPetition}*/}
            {/*>*/}
            {/*    {petitionBtnTitle}*/}
            {/*</button>*/}
        </div>
    )
}

export default PetitionPreview
