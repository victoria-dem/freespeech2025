import React from 'react';

function PetitionSteps() {
    return (
        <>
            <div className="petition-form__step"><p className="petition-form__step-num">1</p></div>
            <div className="petition-form__step-connector"/>
            
            <div className="petition-form__step"><p className="petition-form__step-num">2</p></div>
            <div className="petition-form__step-connector petition-form__step-connector_position_second"/>
    
            <div className="petition-form__step"><p className="petition-form__step-num">3</p></div>
            <div className="petition-form__step-connector petition-form__step-connector_position_third"/>
    
            <div className="petition-form__step"><p className="petition-form__step-num">4</p></div>
            <div className="petition-form__step-connector petition-form__step-connector_position_forth"/>
            
            <div className="petition-form__step"><p className="petition-form__step-num">5</p></div>
        </>
    )
    
    
}

export default PetitionSteps