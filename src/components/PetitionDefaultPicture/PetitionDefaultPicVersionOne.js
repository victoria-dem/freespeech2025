// import React, {useEffect, useState} from 'react'
// import "./petition-default-picture.css"
// import {storage} from "../../utils/firebase";
// import getDefaultPictures from "../../utils/defaultPictures";
// import {v4 as uuidv4} from 'uuid';
// import DefaultPicture from "../DefaultPicture/DefaultPicture"
//
// function PetitionDefaultPicture({isTextReadyToRender}) {
//
//     const [defaultPicUrls, setDefaultPicUrls] = useState([])
//
//     const picDataSet = getDefaultPictures()
//
//     useEffect(() => {
//         console.log(picDataSet[0], picDataSet[1], picDataSet[2])
//
//         storage.ref(picDataSet[0])
//             .getDownloadURL()
//             .then(function (url) {
//                 console.log(url);
//                 const newUrl = [...defaultPicUrls, url]
//                 setDefaultPicUrls(newUrl)
//                 console.log('111111111111111111111111111111111111111111111111')
//             })
//             .catch(function (error) {
//                 console.log("error encountered");
//             });
//
//         storage.ref(picDataSet[1])
//             .getDownloadURL()
//             .then(function (url) {
//                 console.log(url);
//                 const newUrl = [...defaultPicUrls, url]
//                 setDefaultPicUrls(newUrl)
//                 console.log('22222222222222222222222222222222222221')
//             })
//             .catch(function (error) {
//                 console.log("error encountered");
//             });
//
//         storage.ref(picDataSet[2])
//             .getDownloadURL()
//             .then(function (url) {
//                 console.log(url);
//                 const newUrl = [...defaultPicUrls, url]
//                 setDefaultPicUrls(newUrl)
//                 console.log('3333333333333333333333333')
//             })
//             .catch(function (error) {
//                 console.log("error encountered");
//             });
//     }, [])
//
//     console.log(defaultPicUrls.length);
//
//     return (
//         <div className="petition-form__default-pictures">
//             {defaultPicUrls.map((url) => <DefaultPicture key={uuidv4()} url={url}/>)}
//         </div>
//     )
// }
//
// export default PetitionDefaultPicture
