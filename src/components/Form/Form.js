import React, {useState, useEffect} from 'react';
import './form.css'
import {db} from '../../utils/firebase'

function Form() {

    const [isSubmitClicked, setIsSubmitClicked] = React.useState(false)
    const [values, setValues] = React.useState('')
    const [complaintWord, setComplaintWord] = React.useState( '')
    const [poemText, setPoemText] = React.useState( '')


    useEffect(() => {
        if (isSubmitClicked) {
            // setComplaintWord(values)
            console.log( determinateComplaintWord(values));
            // determinateComplaintWord(values);
            getPoemText( determinateComplaintWord(values));
        }
    }, [isSubmitClicked])

    const determinateComplaintWord = (string) => {
        const worddd = string.match(/[а-яА-ЯёЁ]*а\s/gm);
        if (!worddd) {
            return "жизни"
        }
        console.log(worddd)
        return worddd
    }

    const getPoemText = (word) => {
        const poemsRef = db.collection("poems");
        const query = poemsRef.where("name", "array-contains", word);
        db.collection("poems").where("name", "array-contains", word)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // setPoemText(doc.data().text);
                    const dataText = doc.data().text;
                    setPoemText(doc.data().text.toString());
                    console.log('const',dataText);
                    setTimeout(function() {console.log('set', poemText);}, 2000)
                    console.log('typeof', typeof dataText)
                    console.log('typeof', typeof dataText)

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            }).finally (() =>  setTimeout(function() {console.log('set', poemText);}, 2000));
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setValues(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitClicked(true)
    }

    return (

        <div className="form-complaint">
            <form className="form form_complaint" name="form-complaint" noValidate>
                <h2 className="form__heading">Ваша жалоба</h2>
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
                            // autoComplete="username"
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                     <button type="submit" className="form__submit-button" onClick={handleSubmit}>Submit</button>
                </fieldset>
            </form>
            <p>{poemText}</p>
        </div>
    )
}

export default Form
