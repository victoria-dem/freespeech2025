import React from 'react';
import './petition-text-preview.css'
import PoemLine from "../PoemLine/PoemLine";
import {v4 as uuidv4} from 'uuid';

function PetitionTextPreview({poemText, isTextReadyToRender, poemId}) {
    
    return (
        <div className="petition-form__poem-preview">
            <p className="petition-form__poem-preview-title">Ваша инициатива в стихах</p>
            <div className="petition-form__poem-box">
                {!isTextReadyToRender ? <p className="petition-form__poem-box-default">появится здесь</p>: null}
                <div>
                    {poemText && isTextReadyToRender && poemText.map((line) => <PoemLine key={uuidv4()} line={line} poemId={poemId}/>)}
                </div>
            </div>
        </div>
    )
}

export default PetitionTextPreview
