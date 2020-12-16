import React from 'react';
import './petition.css'
import PetitionForm from "../PetitionForm/PetitionForm";
import PetitionPicture from "../PetitionPicture/PetitionPicture"

function Petition() {
    
    return (
        <section className="petition-form">
            <h1 className="petition-form__title">Создать инициативу</h1>
            <div className="petition-form__content">
                <div className="petition-form__text">
                    <PetitionForm/>
                    {/*<form className="form form_petition" name="form-petition" noValidate>*/}
                    {/*    <fieldset className="form__fields">*/}
                    {/*        <label className="form__field-input">*/}
                    {/*            <input*/}
                    {/*                className="form__input form__input-first-field"*/}
                    {/*                type="text"*/}
                    {/*                id="petition-tag"*/}
                    {/*                placeholder="* Опишите вашу проблему любым одним словом"*/}
                    {/*                name="petitionTag"*/}
                    {/*                minLength="4"*/}
                    {/*                maxLength="20"*/}
                    {/*                required*/}
                    {/*                // onChange={handleChange}*/}
                    {/*                // onFocus={handleFocus}*/}
                    {/*                // onBlur={handleOnBlur}*/}
                    {/*            />*/}
                    {/*            /!*<span className="form__field">{errorMessage.errorMessageTag}</span>*!/*/}
                    {/*        </label>*/}
                    {/*        <label className="form__field-input">*/}
                    {/*            <input*/}
                    {/*                className="form__input form__input-first-field"*/}
                    {/*                type="textarea"*/}
                    {/*                id="petition"*/}
                    {/*                placeholder="* Опишите подробно что вас волнует"*/}
                    {/*                name="petition"*/}
                    {/*                minLength="10"*/}
                    {/*                maxLength="130"*/}
                    {/*                required*/}
                    {/*                // onChange={handleChange}*/}
                    {/*            />*/}
                    {/*            /!*<span className="form__field">{errorMessage.errorMessageText}</span>*!/*/}
                    {/*        </label>*/}
                    {/*    */}
                    {/*    */}
                    {/*    </fieldset>*/}
                    {/*</form>*/}
                    {/*<div>*/}
                    {/*    <p>Ваша инициатива в стихах:</p>*/}
                    {/*    <p>Lorem ipsum dolor sit amet, consectetur</p>*/}
                    {/*    <p>adipisicing elit. Aperiam atque, beatae</p>*/}
                    {/*    <p>doloremque et hic illo impedit labore necessitatibus </p>*/}
                    {/*    <p>nostrum numquam quaerat quidem tempora totam. </p>*/}
                    {/*    <p>Hic iste laudantium neque perferendis quo?</p>*/}
                    {/*    /!*{poemText && isPoemReady && isPetitionReady && poemText.map((line, i) => <PoemLine key={uuidv4()} line={line}/>)}*!/*/}
                    {/*</div>*/}
                </div>
                <div className="petition-form__picture">
                    <PetitionPicture />
                    {/*<div className="petition-form__user-picture">*/}
                    {/*    <label>*/}
                    {/*        <input className="form__input" type="file" id="files" multiple*/}
                    {/*            // onChange={handleChoosePictures} name="files[]"*/}
                    {/*               placeholder="Выберите картинку"*/}
                    {/*        />*/}
                    {/*        /!*<p>Прогресс загрузки картинки: {progressBar}</p>*!/*/}
                    {/*    </label>*/}
                    {/*</div>*/}
                    {/*<div className="petition-form__default-pictures">*/}
                    {/*    <img className="petition-form__default-picture" alt="#"/>*/}
                    {/*    <img className="petition-form__default-picture" alt="#"/>*/}
                    {/*    <img className="petition-form__default-picture" alt="#"/>*/}
                    {/*</div>*/}
                    {/*<button*/}
                    {/*    type="submit"*/}
                    {/*    className="form__submit-button"*/}
                    {/*    // onClick={handleSubmitPetition}*/}
                    {/*>*/}
                    {/*    Текст на кнопке*/}
                    {/*    /!*{petitionBtnTitle}*!/*/}
                    {/*</button>*/}
                </div>
            </div>
        </section>
    )
}

export default Petition