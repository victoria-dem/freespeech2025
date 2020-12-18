import React, {useEffect, useState} from 'react'
import "./petition-default-picture.css"
import {storage} from "../../utils/firebase";
import getDefaultPictures from "../../utils/defaultPictures";
import {v4 as uuidv4} from 'uuid';
import DefaultPicture from "../DefaultPicture/DefaultPicture"

function PetitionDefaultPicture({getDefaultPetitionPicData, isTextReadyToRender, handleIsPublicState}) {
    
    const [defaultPicUrls, setDefaultPicUrls] = useState([])
    const picDataSet = getDefaultPictures()
    
    useEffect(() => {
        function getUrl(picReef) {
            return storage.ref(picReef)
                .getDownloadURL().then(function (url) {
                    return url
                })
                .catch(function (error) {
                    console.log("error encountered");
                });
        }
        
        function getUrls() {
            return Promise.all([getUrl(picDataSet[0]), getUrl(picDataSet[1]), getUrl(picDataSet[2])])
        }
    
        getUrls().then(
            (urls => setDefaultPicUrls(urls))
        )
        
    }, [])
    
    return (
        <div className="petition-form__default-pictures">
            {defaultPicUrls.map((url) => <DefaultPicture key={uuidv4()} url={url}
                                                         getDefaultPetitionPicData={getDefaultPetitionPicData}
                                                         isTextReadyToRender={isTextReadyToRender}
                                                         handleIsPublicState={handleIsPublicState}
                />
                                                         )}
        </div>
    )
}

export default PetitionDefaultPicture


// import React from 'react'
// import "./petition-default-picture.css"
// import {v4 as uuidv4} from 'uuid';
// import DefaultPicture from "../DefaultPicture/DefaultPicture"
//
// function PetitionDefaultPicture({isTextReadyToRender}) {
//     const defaultPicUrls = [
//         'https://firebasestorage.googleapis.com/v0/b/freespeech2025-46bc5.appspot.com/o/33.jpeg?alt=media&token=afcbeb73-0707-4279-bddd-32ac23aa70de',
//         'https://firebasestorage.googleapis.com/v0/b/freespeech2025-46bc5.appspot.com/o/44.jpeg?alt=media&token=b3526f28-c3a4-484e-81f8-dcd8e7b5a2de',
//         'https://firebasestorage.googleapis.com/v0/b/freespeech2025-46bc5.appspot.com/o/22.jpeg?alt=media&token=ff61747d-8752-46e5-808d-ea05f8233071'
//     ]
//
//     return (
//         <div className="petition-form__default-pictures">
//             {defaultPicUrls.map((url) => <DefaultPicture key={uuidv4()} url={url}/>)}
//         </div>
//     )
// }
//
// export default PetitionDefaultPicture
//
