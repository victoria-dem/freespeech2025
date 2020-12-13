import React, {useState, useEffect} from 'react';
import './petitionform.css'
import {auth, db} from '../../utils/firebase'

function PetitionForm(props) {
    
    const [isPetitionSubmitted, setIsPetitionSubmitted] = useState(false)
    const [values, setValues] = useState({
        petition: '',
        firstTag: '',
        secondTag: ''
    })
    const [petition, setPetition] = useState('')
    console.log(props.currentUserId)
    
    useEffect(() => {
        if (isPetitionSubmitted && props.currentUserId) {
            console.log('petition')
            db.collection("petitions").add({
                    uid: props.currentUserId,
                    petition: values.petition,
                    firstTag: values.firstTag,
                    secondTag: values.secondTag
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            console.log(values)
        }
        console.log(values.petition)
        
    }, [isPetitionSubmitted])
    
    
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
        // setValues(e.target.value);
    }
    
    function handleSubmitPetition(e) {
        e.preventDefault();
        setIsPetitionSubmitted(true)
    }
    
    return (
        
        <div className="form-complaint">
            <form className="form form_complaint" name="form-complaint" noValidate>
                <h2 className="form__heading">Сгенерированная петиция</h2>
                <fieldset className="form__fields">
                    
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="first-field-place"
                            placeholder="Здесь, типа, уже готовый стих"
                            name="petition"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="second-field-place"
                            placeholder="Добавьте тег"
                            name="firstTag"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="second-field-place"
                            placeholder="Добавьте тег"
                            name="secondTag"
                            minLength="10"
                            maxLength="130"
                            required
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    
                    <button type="submit" className="form__submit-button" onClick={handleSubmitPetition}>Подать
                        петицию
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default PetitionForm
