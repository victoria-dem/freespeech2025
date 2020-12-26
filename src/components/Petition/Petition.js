import React, { useEffect, useState, useContext } from 'react';
import './petition.css'
import PetitionForm from "../PetitionForm/PetitionForm";
import PetitionPicture from "../PetitionPicture/PetitionPicture"
import PetitionTextPreview from "../PetitionTextPreview/PetitionTextPreview";
import PetitionSubmitBtn from "../PetitionSubmitBtn/PetitionSubmitBtn";
import PetitionDefaultPictures from "../PetitionDefaultPictures/PetitionDefaultPictures"
import { db, storage } from "../../utils/firebase";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PetitionSteps from "../PetitionSteps/PetitionSteps";

function Petition({ onAddPetition, nickname, handleAccountBtnClick }) {
    const currentUser = useContext(CurrentUserContext);
    const [poemText, setPoemText] = useState('')
    const [tagText, setTagText] = useState('')
    const [isTextReadyToRender, setIsTextReadyToRender] = useState(false)
    const [pictureData, setPictureData] = useState({})
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    const [isPetitionPublished, setIsPetitionPublished] = useState(false)
    const [isPictureReady, setIsPictureReady] = useState(false)
    const [resetTextInputs, setResetTextInputs] = useState(false)
    const [url, setUrl] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [isAnimationIn, setIsAnimationIn] = React.useState(false)
    const [isDefaultPictureChosen, setIsDefaultPictureChosen] =useState(false)

    const handleDeletePicture = () => {
        if (url) {
            setUrl('')
            setPictureData({})
            setIsPictureReady(false)
        }
        // TODO: надо получить текущее имя файла и запустить удаление этого файла, если он не принадлежит к массиву заглушек
        // TODO: затем внутри then очистить объект pictureData setPictureData({}) и убрать эту очистку из предыдущего if
    }

    const getPetitionTextData = (petitionTextData) => {
        setPoemText(petitionTextData.poemText)
        setTagText(petitionTextData.tagText)
        setIsTextReadyToRender(petitionTextData.isPetitionReady)
    }

    const resetPublishState = (state) => {
        setIsPetitionPublished(state)
    }

    useEffect(() => {
        if (isTextReadyToRender && poemText) {
            setIsAnimationIn(true)
            setTimeout(()=>{
                setIsAnimationIn(false)
            }, 3000)
        }
    }, [isTextReadyToRender, poemText])


    const getPetitionPicData = ({ picRef, isPicUploaded }) => {
        setPictureData(picRef)
        setIsPictureReady(isPicUploaded)
        setIsPublic(false)
    }

    const getDefaultPetitionPicData = (defaultPicName) => {
        if (defaultPicName) {
            console.log('default picture chosen')
            setIsDefaultPictureChosen(true)
            setPictureData({
                picFullPath: defaultPicName,
                picName: defaultPicName,
                picBucket: "freespeech2025-46bc5.appspot.com"
            })
            setIsPictureReady(true)
            setIsPublic(true)
        }
    }

    const getSubmitPetitionEvent = (isBtnClicked) => {
        setIsPetitionSubmitted(isBtnClicked)
    }

    useEffect(() => {
        if (isPictureReady) {
            const storagePic = storage.ref(pictureData.picFullPath);
            storagePic
                .getDownloadURL()
                .then(function (url) {
                    setUrl(url)
                })
                .catch(function (error) {
                    console.log("error encountered");
                });
        }
    }, [pictureData])

    // создание записи в db
    useEffect(() => {
        if (isPetitionSubmitted && currentUser.uid) {
            // setIsLoaded(true)
            setIsPetitionPublished(false)
            const timestamp = Date.now().toString();
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
                disLikes: [],
                url: url,
                nick: nickname
            }
            db.collection("petitions")
                .add(data)
                .then(function (docRef) {
                    onAddPetition({ data: data, id: docRef.id });
                }).then(function () {
                    setIsPetitionPublished(true)
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                }).finally((() => {
                    // TODO: подумать правильно ли то, что этот находится в finally а не в then
                    // TODO: резон для этого в том, что я хочу чтобы даже если ошибка возникла мы
                    //  TODO:все равно проресетили все стейты и были готовы к приему новой петиции
                    setIsTextReadyToRender(false)
                    setIsPictureReady(false)
                    setUrl('')
                    setPoemText('')
                    setTagText('')
                    setResetTextInputs(!resetTextInputs)
                    setIsPetitionSubmitted(false)
                }))
        }
    }, [isPetitionSubmitted])

    return (
        <section className="petition-form">
            <h1 id="petition-form" className="petition-form__title">Создать инициативу</h1>
            <div className="petition-form__steps">
                <PetitionSteps />
            </div>
            <div className="petition-form__input">
                <PetitionForm
                    getPetitionTextData={getPetitionTextData}
                    resetTextInputs={resetTextInputs}
                />
                <PetitionPicture
                    getPetitionPicData={getPetitionPicData}
                    url={url}
                    handleDeletePicture={handleDeletePicture}
                    isPetitionPublished={isPetitionPublished}
                    isPictureReady={isPictureReady}
                    isDefaultPictureChosen={isDefaultPictureChosen}
                    handleAccountBtnClick={handleAccountBtnClick}
                />
                <PetitionDefaultPictures
                    getDefaultPetitionPicData={getDefaultPetitionPicData}
                    isTextReadyToRender={isTextReadyToRender} />
            </div>
            <PetitionSubmitBtn
                getSubmitPetitionEvent={getSubmitPetitionEvent}
                isTextReadyToRender={isTextReadyToRender}
                isPictureReady={isPictureReady}
                isPetitionPublished={isPetitionPublished}
                resetPublishState={resetPublishState}
            />
            <PetitionTextPreview
                poemText={poemText}
                isTextReadyToRender={isTextReadyToRender}
                isAnimationIn={isAnimationIn}
            />
        </section>
    )
}

export default Petition


