import React from 'react';

function PetitionStatus({status}) {
    return(
            <div className="petition-form__poem-preview">
                {/*<p className="petition-form__poem-preview-title">Просто контролируем каждое ваше нажатие клавиш</p>*/}
                <div className="petition-form__poem-box">
                    <div>
                        {status}
                    </div>
                </div>
            </div>
    )
}

export default PetitionStatus