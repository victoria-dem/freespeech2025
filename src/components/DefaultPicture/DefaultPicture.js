import React, {useState, useEffect} from 'react';
import greyPic from '../../images/grey_default_pic.png'
import cn from 'classnames';
import './default-picture.css'

function DefaultPicture({url, getDefaultPetitionPicData, isTextReadyToRender, setIsAnimationIn}){
    
    const [defaultPicName, setDefaultPicName] = useState('')
    const [isReadyToClick, setIsReadyToClick] = useState(false)
    
    function handleDefaultPictureClick(e) {
        e.preventDefault();
        if (isTextReadyToRender) {
            const filePath = e.target.src
            setDefaultPicName([...filePath.matchAll(/o\/(.*)\?/g)][0][1])
        }
    }
    
    useEffect(()=>{
        if (defaultPicName) {
            setIsAnimationIn(false)
        }
    }, [defaultPicName])
    
    useEffect(()=>{
        getDefaultPetitionPicData(defaultPicName)
    },[defaultPicName])
    
    // useEffect(()=>{
    //     if (isTextReadyToRender) {
    //             setIsReadyToClick(true)
    //     } else {
    //         setIsReadyToClick(false)
    //     }
    //
    // }, [isTextReadyToRender])
// console.log('default')
    return(
        <>
            <img
                className={cn("petition-form__default-picture", {"petition-form__default-picture_cursor" : isTextReadyToRender})}
                src={isTextReadyToRender ? url : greyPic}
                alt={'картинка по умолчанию'}
                onClick={handleDefaultPictureClick}
            />
        </>
    )
}

export default DefaultPicture