// import React, {useEffect, useState} from 'react';
// import './petitionform.css'
// import {db, storage} from '../../utils/firebase'
// import Card from "../Card/Card";
//
// function PetitionForm() {
//
//     // const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
//     // const [values, setValues] = useState({
//     //     petition: '',
//     //     petitionTag: '',
//     //     picFullPath: '',
//     //     picName: '',
//     //     picBucket: ''
//     //
//     // })
//     // const [pictures, setPictures] = useState([])
//     // const [isPicturesReady, setIsPicturesReady] = useState(false)
//     // const [picturesRef, setPicturesRef] = useState({})
//
//     // useEffect(() => {
//     //     if (isPetitionSubmitted && props.currentUserId) {
//     //         const timestamp = Date.now().toString()
//     //         // TODO: обсудить использование ключа isPublic
//     //         db.collection("petitions").add({
//     //                 uid: props.currentUserId,
//     //                 petition: values.petition,
//     //                 petitionTag: values.petitionTag,
//     //                 isPublic: false,
//     //                 picFullPath: picturesRef.fullPath || '1.jpeg',
//     //                 picName: picturesRef.name || '1.jpeg',
//     //                 picBucket: picturesRef.bucket || 'freespeech2025-46bc5.appspot.com',
//     //                 timestamp: timestamp
//     //             })
//     //             .then(function (docRef) {
//     //                 console.log("Document written with ID: ", docRef);
//     //             })
//     //             .catch(function (error) {
//     //                 console.error("Error adding document: ", error);
//     //             });
//     //     }
//     // }, [isPetitionSubmitted])
//
//     // useEffect(() => {
//     //     // TODO: подумать надо ли нам сделать внутренний backed для картинок
//     //     if (isPicturesReady && props.currentUserId) {
//     //         const storageRef = storage.ref();
//     //         const thisRef = storageRef.child(pictures.name);
//     //         console.log(thisRef.bucket, thisRef.name, thisRef.fullPath);
//     //         setPicturesRef(thisRef);
//     //         // TODO: сейчас картинка загружается под своим именем -
//     //         //  надо попробовать загружать ее под именем timestamp+имя
//     //         thisRef.put(pictures).then(function (snapshot) {
//     //             // TODO: надо будет попробовать обработать визуализацию загрузки картинки при помощи snapshot.
//     //             //  В файле test.html есть пример как получить данные для отображения загрузки.
//     //         }).catch((err) => console.log(err));
//     //     }
//     // }, [isPicturesReady])
//
//     // const handleChange = e => {
//     //     const {name, value} = e.target;
//     //     setValues({...values, [name]: value})
//     // }
//     //
//     // function handleSubmitPetition(e) {
//     //     e.preventDefault();
//     //     setIsPetitionSubmitted(true)
//     // }
//
//     // function handleChoosePictures(e) {
//     //     e.preventDefault();
//     //     setPictures(e.target.files[0])
//     // }
//     //
//     // function handleSubmitPictures(e) {
//     //     e.preventDefault();
//     //     setIsPicturesReady(!isPicturesReady)
//     // }
//
//     return (
//
//         <div className="form-complaint">
//             <form className="form form_complaint" name="form-complaint" noValidate>
//                 <h2 className="form__heading">Сгенерированная петиция</h2>
//                 <fieldset className="form__fields">
//
//                     <label className="form__field-input">
//                         <input
//                             className="form__input form__input-first-field"
//                             type="textarea"
//                             id="first-field-place"
//                             placeholder="Здесь, типа, уже готовый стих"
//                             name="petition"
//                             minLength="10"
//                             maxLength="130"
//                             required
//                             onChange={handleChange}
//                         />
//                         <span className="form__field"/>
//                     </label>
//
//
//
//                     <label className="form__field-input">
//                         <input
//                             className="form__input form__input-first-field"
//                             type="textarea"
//                             id="second-field-place"
//                             placeholder="Добавьте тег"
//                             name="petitionTag"
//                             minLength="10"
//                             maxLength="130"
//                             required
//                             onChange={handleChange}
//                         />
//                         <span className="form__field"/>
//                     </label>
//                     {/*<label>*/}
//                     {/*    <input className="form__input" type="file" id="files" multiple*/}
//                     {/*           onChange={handleChoosePictures} name="files[]"*/}
//                     {/*           placeholder="Выберите картинку"*/}
//                     {/*    />*/}
//                     {/*    <button className="form__submit-button" id="send" onClick={handleSubmitPictures}>Загрузить*/}
//                     {/*        картинку*/}
//                     {/*    </button>*/}
//                     {/*</label>*/}
//                     <button type="submit" className="form__submit-button" onClick={handleSubmitPetition}>Подать
//                         петицию
//                     </button>
//                 </fieldset>
//             </form>
//         </div>
//     )
// }
//
// export default PetitionForm
