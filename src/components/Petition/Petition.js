import React from 'react';
import './petition.css'
import Form from "../Form/Form";

function Petition({currentUserId}) {
    return (
        <div className="petition">
            <Form currentUserId={currentUserId}/>
        </div>
    )
}

export default Petition