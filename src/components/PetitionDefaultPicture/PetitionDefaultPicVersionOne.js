import React, {useEffect, useState} from 'react'
import "./petition-default-picture.css"
import {storage} from "../../utils/firebase";
import getDefaultPictures from "../../utils/defaultPictures";
import {v4 as uuidv4} from 'uuid';
import DefaultPicture from "../DefaultPicture/DefaultPicture"

function PetitionDefaultPicture({isTextReadyToRender}) {
    
    const [defaultPicUrls, setDefaultPicUrls] = useState([])
    const picDataSet = getDefaultPictures()
    
    
    function funOne(picReef) {
        storage.ref(picReef)
            .getDownloadURL().then(function (url) {
                console.log(url);
                const newUrl = [...defaultPicUrls, url]
                setDefaultPicUrls(newUrl)
            })
            .catch(function (error) {
                console.log("error encountered");
            });
    }
    
    function fun() {
        return Promise.all([funOne(picDataSet[0]), funOne(picDataSet[1]), funOne(picDataSet[2])])
    }
    
    fun().then(
        (value => {
            console.log(value);
        })
    )
    
    return (
        <div className="petition-form__default-pictures">
            {defaultPicUrls.map((url) => <DefaultPicture key={uuidv4()} url={url}/>)}
        </div>
    )
}

export default PetitionDefaultPicture
