import React, {useContext, useEffect, useState} from 'react';
import './petition-card.css';
import {pictureUpload} from '../../utils/firebase';
import {v4 as uuidv4} from 'uuid';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import pic from '../../images/backgroundIntro.jpg';
import isClose from "../../images/icClose.svg";
import PetitionCardInfo from '../PetitionCardInfo/PetitionCardInfo';

const PetitionCard = ({petition, onLikeClick, isLoggedIn, nickname, onDeletePetition}) => {
    const handleDeletePetition = () => {
        // onDeletePetition(petition);
    }
    return (
        <div className="petition-card">
            <div className="petition-card__image" style={{
                background: `center/cover url(${petition.data.url? petition.data.url : pic})`
            }}/>
           <PetitionCardInfo petition={petition} onLikeClick={onLikeClick} isLoggedIn={isLoggedIn}
                nickname={nickname} />
            <button className="petition-card__delete-button" 
            // onClick={handleDeletePetition}
            >&#128465;</button>
        </div>
    );
}

export default PetitionCard;