import React from 'react';
import './petition-text-preview.css'
import PoemLine from "../PoemLine/PoemLine";
import {v4 as uuidv4} from 'uuid';

function PetitionTextPreview({poemText, isTextReadyToRender}) {
    return (
        <div className="card">
            <p>Ваша инициатива в стихах</p>
            <div>
                {poemText && isTextReadyToRender && poemText.map((line) => <PoemLine key={uuidv4()} line={line}/>)}
            </div>
        </div>
    )
}

export default PetitionTextPreview
