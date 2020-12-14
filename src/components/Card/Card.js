import React, {useEffect, useState} from 'react';
import './card.css'
import {db, storage} from '../../utils/firebase'

function Card(props) {
    
    // Points to the root reference
    // const storageRef = storage.ref();

// Points to 'images'
// let imagesRef = storageRef.child('images');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
//     let fileName = 'space.jpg';
//     let spaceRef = imagesRef.child(fileName);

// File path is 'images/space.jpg'
//     let path = spaceRef.fullPath

// File name is 'space.jpg'
//     let name = spaceRef.name

// Points to 'images'
//     imagesRef = spaceRef.parent;
    
    
    
    // const storage = storage.ref(filename);
    //
    // //get file url
    // storage
    //     .getDownloadURL()
    //     .then(function(url) {
    //         console.log(url);
    //     })
    //     .catch(function(error) {
    //         console.log("error encountered");
    //     });
    
    
    return (
        <div className="card">Place for picture
            {/*<img src={} alt={}/>*/}
        </div>
)
}

export default Card