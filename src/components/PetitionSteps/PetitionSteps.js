import React from 'react';

function PetitionSteps() {
    return (
        <>
            <div className="petition-form__step petition-form__step_blot_first"><p className="petition-form__step-num">1</p></div>
            <div className="petition-form__step-connector"/>
            <div className="petition-form__step petition-form__step_blot_second"><p className="petition-form__step-num">2</p></div>
            <div className="petition-form__step-connector petition-form__step-connector_position_second"/>
            <div className="petition-form__step petition-form__step_blot_third"><p className="petition-form__step-num">3</p></div>
            <div className="petition-form__step-connector petition-form__step-connector_position_third"/>
            <div className="petition-form__step petition-form__step_blot_forth"><p className="petition-form__step-num">4</p></div>
        </>
    )
    
    
}

export default PetitionSteps