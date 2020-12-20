import React, {useEffect, useState} from 'react'
import "./petition-default-pictures.css"
import {storage} from "../../utils/firebase";
import getDefaultPictures from "../../utils/defaultPictures";
import {v4 as uuidv4} from 'uuid';
import DefaultPicture from "../DefaultPicture/DefaultPicture"

function PetitionDefaultPictures({getDefaultPetitionPicData, isTextReadyToRender, handleIsPublicState}) {
    
    const [defaultPicUrls, setDefaultPicUrls] = useState([])
    const picDataSet = getDefaultPictures()
    
    useEffect(() => {
        const getUrl = (picReef) => {
            return storage.ref(picReef)
                .getDownloadURL().then(function (url) {
                    return url
                })
                .catch(function (error) {
                    console.log("error encountered");
                });
        }
        
        const getUrls = () => {
            return Promise.all([getUrl(picDataSet[0]), getUrl(picDataSet[1]), getUrl(picDataSet[2])])
        }
        
        getUrls().then(
            (urls => setDefaultPicUrls(urls))
        )
    }, [])
    
    return (
        <>
            <h3 className="petition-form__default-picture-title">Или выберите одну из предложенных:</h3>
            <div className="petition-form__default-pictures">
                {defaultPicUrls.map((url) => <DefaultPicture key={uuidv4()} url={url}
                                                             getDefaultPetitionPicData={getDefaultPetitionPicData}
                                                             isTextReadyToRender={isTextReadyToRender}
                                                             handleIsPublicState={handleIsPublicState}
                    />
                )}
            </div>
        </>
    )
}

export default PetitionDefaultPictures
