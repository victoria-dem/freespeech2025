import React, {useEffect, useState} from 'react';
import './card.css'
import {storage} from '../../utils/firebase'

function Card() {
    
    const [url, setUrl] = useState('')
    
    const storagePic = storage.ref('photo-1607888051999-8f28fb8ae37e.jpeg');
    
    storagePic
        .getDownloadURL()
        .then(function(url) {
            console.log(url);
            setUrl(url)
        })
        .catch(function(error) {
            console.log("error encountered");
        });
    
    
    return (
        <div className="card">
            <img className="photo" src={url} alt={'test'}/>
        </div>
)
}

export default Card