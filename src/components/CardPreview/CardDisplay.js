import React, {useEffect, useState} from 'react';
import './card.css'
import {storage, db, auth} from '../../utils/firebase'

function CardDisplay(props) {
    
    const [url, setUrl] = useState('')
    const [petition, setPetition] = useState('')
    const [firstTag, setFirstTag] = useState('')
    const [secondTag, setSecondTag] = useState('')
    const [petitionData, setPetitionData] = useState('')
    const [path, setPath] = useState('')
    
    db.collection('petitions')
        .orderBy("timestamp", "desc")
        .limit(1)
        .get()
        .then(petitions => {
        petitions.forEach(doc => {
            setPetition(doc.data().petition)
            setFirstTag(doc.data().firstTag)
            setSecondTag(doc.data().secondTag)
            // TODO: перевести время из timestamp в реальное время + 5 лет
            setPetitionData(doc.data().timestamp)
            setPath(doc.data().picFullPath)
        })
        })
        .catch(err=>console.log(err))
    
    
    const storagePic = storage.ref(path);
    console.log(props.currentUser)
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
            <p>Актуальная петиция</p>
            <p>Текст петиции: {petition}</p>
            <p>Первый тег: {firstTag}</p>
            <p>Второй тег: {secondTag}</p>
            <p>Время (пока условное): {petitionData}</p>
            <img className="photo" src={url} alt={'картинка'}/>
            {/*<button type="submit" className="form__submit-button" onClick={handleSubmitPetition}>Готово</button>*/}
        </div>
)
}

export default CardDisplay