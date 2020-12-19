import React, {useEffect, useState, useContext} from 'react';
import './petition.css'
import PetitionForm from "../PetitionForm/PetitionForm";
import PetitionPicture from "../PetitionPicture/PetitionPicture"
import PetitionTextPreview from "../PetitionTextPreview/PetitionTextPreview";
import PetitionSubmitBtn from "../PetitionSubmitBtn/PetitionSubmitBtn";
import PetitionDefaultPicture from "../PetitionDefaultPicture/PetitionDefaultPicture"
import {db, storage} from "../../utils/firebase";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import PetitionSteps from "../PetitionSteps/PetitionSteps";

function Petition({onAddPetition}) {
    const currentUser = useContext(CurrentUserContext);
    const [poemText, setPoemText] = useState('')
    const [tagText, setTagText] = useState('')
    const [isTextReadyToRender, setIsTextReadyToRender] = useState(false)
    const [pictureData, setPictureData] = useState({})
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPetitionPublished, setIsPetitionPublished] = useState(false)
    const [isPictureReady, setIsPictureReady] = useState(false)
    const [resetTextInputs, setResetTextInputs] = useState(false)
    const [url, setUrl] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    
    // console.log(isTextReadyToRender, isTextReadyToRender, isTextReadyToRender, url, pictureData)
    
    function handleDeletePicture() {
        if (url) {
            setUrl('')
            setPictureData({})
            setIsPictureReady(false)
        }
        // TODO: надо получить текущее имя файла и запустить удаление этого файла, если он не принадлежит к массиву заглушек
        // TODO: затем внутри then очистить объект pictureData setPictureData({}) и убрать эту очистку из предыдущего if
        
    }
    
    function getPetitionTextData(petitionTextData) {
        setPoemText(petitionTextData.poemText)
        setTagText(petitionTextData.tagText)
        setIsTextReadyToRender(petitionTextData.isPetitionReady)
    }
    
    function getPetitionPicData({picRef, isPicUploaded}) {
        setPictureData(picRef)
        setIsPictureReady(isPicUploaded)
        setIsPublic(false)
    }
    
    function getDefaultPetitionPicData(defaultPicName) {
        if (defaultPicName) {
            setPictureData({
                picFullPath: defaultPicName,
                picName: defaultPicName,
                picBucket: "freespeech2025-46bc5.appspot.com"
            })
            setIsPictureReady(true)
            setIsPublic(true)
        }
    }
    
    useEffect(() => {
        if (isPictureReady) {
            const storagePic = storage.ref(pictureData.picFullPath);
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
    }, [pictureData])
    
    function getSubmitPetitionEvent(isBtnClicked) {
        console.log('getSubmitPetitionEvent')
        setIsPetitionSubmitted(isBtnClicked)
    }
    
    // создание записи в db
    useEffect(() => {
        if (isPetitionSubmitted && currentUser.uid) {
            setIsLoaded(true)
            setIsPetitionPublished(false)
            const timestamp = Date.now().toString()
            // TODO: обсудить использование ключа isPublic
            // TODO: setTimeout поставил специально, для отслеживания статуса загрузки
            const data = {
                uid: currentUser.uid,
                petition: poemText,
                petitionTag: tagText,
                isPublic: isPublic,
                picFullPath: pictureData.picFullPath,
                picName: pictureData.picName,
                picBucket: pictureData.picBucket,
                timestamp: timestamp,
                likes: [],
                disLikes: []
            }
            setTimeout(() => {
                db.collection("petitions")
                    .add(data)
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        setIsLoaded(false)
                        setIsPetitionPublished(true)
                        onAddPetition({data: data, id: docRef.id});
                    }).then(function () {
                        // загрузка картинки (после того, как пользователь нажал на submit)
                        // pictureUpload()
                        setIsPetitionPublished(true)
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    }).finally((() => {
                    // TODO: подумать правильно ли то, что этот находится в finally а не в then
                    // TODO: резон для этого в том, что я хочу чтобы даже если ошибка возникла мы
                    //  TODO:все равно проресетили все стейты и были готовы к приему новой петиции
                    setTimeout(() => {
                        console.log('reset petition form')
                        setIsPetitionPublished(false)
                        setIsTextReadyToRender(false)
                        setIsPictureReady(false)
                        setUrl('')
                        setPoemText('')
                        setTagText('')
                        setResetTextInputs(!resetTextInputs)
                        setIsPetitionSubmitted(false)
                    }, 1000)
                }))
            }, 1500)
        }
    }, [isPetitionSubmitted])
    
    return (
        <section className="petition-form">
            <h1 className="petition-form__title">Создать инициативу</h1>
            <div className="petition-form__content">
                <div className="petition-form__steps">
                    <PetitionSteps/>
                </div>
                <div className="petition-form__input">
                    <PetitionForm
                        getPetitionTextData={getPetitionTextData}
                        resetTextInputs={resetTextInputs}
                    />
                    <PetitionPicture
                        getPetitionPicData={getPetitionPicData}
                        url={url}
                        handleDeletePicture={handleDeletePicture}/>
                    <PetitionDefaultPicture
                        getDefaultPetitionPicData={getDefaultPetitionPicData}
                        isTextReadyToRender={isTextReadyToRender}/>
                    <PetitionSubmitBtn
                        getSubmitPetitionEvent={getSubmitPetitionEvent}
                        isTextReadyToRender={isTextReadyToRender}
                        isLoaded={isLoaded}
                        isPictureReady={isPictureReady}
                        isPetitionPublished={isPetitionPublished}
                        isPetitionSubmitted={isPetitionSubmitted}
                    />
                </div>
                <div className="petition-form__output">
                    <PetitionTextPreview
                        poemText={poemText}
                        isTextReadyToRender={isTextReadyToRender}
                    />
                </div>
            </div>
        </section>
    )
}

export default Petition


