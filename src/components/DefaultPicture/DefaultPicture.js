import React, {useState, useEffect} from 'react';
import greyPic from '../../images/grey_default_pic.png'

function DefaultPicture({url, getDefaultPetitionPicData, isTextReadyToRender}){
    
    const [defaultPicName, setDefaultPicName] = useState('')
    
    function handleDefaultPictureClick(e) {
        if (isTextReadyToRender) {
            const filePath = e.target.src
            setDefaultPicName([...filePath.matchAll(/o\/(.*)\?/g)][0][1])
        }
    }
    
    useEffect(()=>{
        getDefaultPetitionPicData(defaultPicName)
    },[defaultPicName])

    return(
        <>
            <img
                className="petition-form__default-picture"
                src={isTextReadyToRender ? url : greyPic}
                alt={'картинка по умолчанию'}
                onClick={handleDefaultPictureClick}/>
        </>
    )
}

export default DefaultPicture