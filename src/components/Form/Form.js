import React, {useState, useEffect} from 'react';
import './form.css'
import {db} from '../../utils/firebase'

function Form() {

    const [isSubmitClicked, setIsSubmitClicked] = React.useState(false)
    const [complaintValues, setComplaintValues] = React.useState({
        complaint: '',
        tag: ''
    })
    const [poemText, setPoemText] = React.useState('')


    useEffect(() => {
        if (isSubmitClicked) {
            getPoemText(complaintValues.tag);
        }
    }, [isSubmitClicked])

    // const determinateComplaintWord = (string) => {
    //     const worddd = string.match(/[а-яА-ЯёЁ]*а\s/gm);
    //     if (!worddd) {
    //         return "жизни"
    //     }
    //     console.log(worddd)
    //     return worddd
    // }

    const getPoemText = (word) => {
        const poemsRef = db.collection("poems");
        const query = poemsRef.where("tagText", "array-contains", word)

        db.collection("poems")
            .where("tagText", "array-contains", word)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc)
                {
                    // doc.data() is never undefined for query doc snapshots
                    setPoemText(doc.data().text);
                    // setTitleList(titleList => [...titleList,doc.data().text]);
                    // console.log(poemText);
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            }).finally(() => console.log('done')
       );
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setComplaintValues({...value, [name]: value});
        // setComplaintValues(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitClicked(true)
    }

    return (

        <div className="complaint">
            <form className="form form_complaint" name="form-complaint" noValidate>
                <h2 className="form__heading">Ваш текст петиции</h2>
                <fieldset className="form__fields">
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="textarea"
                            id="complaint"
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
                    <label className="form__field-input">
                        <input
                            className="form__input form__input-first-field"
                            type="text"
                            id="complaint-tag"
                            placeholder="Опишите вашу проблему любым одним словом"
                            name="tag"
                            minLength="4"
                            maxLength="20"
                            required
                            // autoComplete="username"
                            onChange={handleChange}
                        />
                        <span className="form__field"/>
                    </label>
                    <button type="submit" className="form__submit-button" onClick={handleSubmit}>Готово</button>
                </fieldset>
            </form>
            <div className='translation'>
            <p>{ poemText}</p>
            {/*<p>{(poemText && isSubmitClicked) ? poemText : 'Постарайтесь подобрать более точное слово'}</p>*/}
            </div>
        </div>
    )
}

export default Form
