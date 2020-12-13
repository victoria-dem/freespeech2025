import React, {useState, useEffect} from 'react';
import './petitionform.css'
import {db} from '../../utils/firebase'

function PetitionForm() {
    
    const [isPetitionSubmitted, setIsPetitionSubmitted] = React.useState(false)
    const [values, setValues] = React.useState('')
    const [petition, setPetition] = React.useState( '')
    
    
    useEffect(() => {
        if (isPetitionSubmitted) {
            console.log(values)
        }
    }, [isPetitionSubmitted])
    
    // const determinateComplaintWord = (string) => {
    //     const worddd = string.match(/[а-яА-ЯёЁ]*а\s/gm);
    //     if (!worddd) {
    //         return "жизни"
    //     }
    //     console.log(worddd)
    //     return worddd
    // }
    
    // const getPoemText = (word) => {
    //     const petitionRef = db.collection("petition");
    //     const query = poemsRef.where("name", "array-contains", word);
    //     db.collection("poems").where("name", "array-contains", word)
    //         .get()
    //         .then(function(querySnapshot) {
    //             querySnapshot.forEach(function(doc) {
    //                 // doc.data() is never undefined for query doc snapshots
    //                 // setPoemText(doc.data().text);
    //                 const dataText = doc.data().text;
    //                 setPoemText(doc.data().text.toString());
    //                 console.log('const',dataText);
    //                 setTimeout(function() {console.log('set', poemText);}, 2000)
    //                 console.log('typeof', typeof dataText)
    //                 console.log('typeof', typeof dataText)
    //
    //             });
    //         })
    //         .catch(function(error) {
    //             console.log("Error getting documents: ", error);
    //         }).finally (() =>  setTimeout(function() {console.log('set', poemText);}, 2000));
    // }
    
    const handleChange = e => {
        const {name, value} = e.target;
        setValues(e.target.value);
    }
    
    function handleSubmitPetition(e) {
        e.preventDefault();
        setIsPetitionSubmitted(true)
    }
    
    return (
        
        <div className="form-complaint">
            <form className="form form_complaint" name="form-complaint" noValidate>
                <h2 className="form__heading">Текст петиции</h2>
                <fieldset className="form__fields">
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="first-field-place"
                            placeholder="Опишите подробно что вас волнует"
                            name="complaint"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    <button type="submit" className="form__submit-button" onClick={handleSubmitPetition}>Подать петицию</button>
                </fieldset>
            </form>
        </div>
    )
}

export default PetitionForm
