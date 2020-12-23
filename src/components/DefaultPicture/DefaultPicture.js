import React, {useState, useEffect, useContext} from 'react';
import greyPic from '../../images/grey_default_pic.png'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import cn from 'classnames';

function DefaultPicture({url, getDefaultPetitionPicData, isTextReadyToRender}){
    
    const currentUser = useContext(CurrentUserContext);
    const [defaultPicName, setDefaultPicName] = useState('')
    const [isReadyToClick, setIsReadyToClick] = useState(false)
    
    function handleDefaultPictureClick(e) {
        e.preventDefault();
        if (isTextReadyToRender && currentUser.uid) {
            const filePath = e.target.src
            setDefaultPicName([...filePath.matchAll(/o\/(.*)\?/g)][0][1])
        }
    }
    
    useEffect(()=>{
        getDefaultPetitionPicData(defaultPicName)
    },[defaultPicName])
    
    useEffect(()=>{
        if (isTextReadyToRender && currentUser.uid) {
            setIsReadyToClick(true)
        }
        
    }, [currentUser.uid, isTextReadyToRender])

    return(
        <>
            <img
                className={cn("petition-form__default-picture", {"petition-form__default-picture_cursor" : isReadyToClick})}
                src={isTextReadyToRender && currentUser.uid ? url : greyPic}
                alt={'картинка по умолчанию'}
                onClick={handleDefaultPictureClick}/>
        </>
    )
}

export default DefaultPicture