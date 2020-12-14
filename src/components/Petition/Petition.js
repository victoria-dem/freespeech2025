import React from 'react';
import './petition.css'
import Form from "../Form/Form";
import Card from "../Card/Card";

function Petition(props) {
    
    return (
        <div className="petition">
            <Form currentUserId={props.currentUserId}/>
            <Card currentUser={props.currentUser}/>
        </div>
    )
}

export default Petition