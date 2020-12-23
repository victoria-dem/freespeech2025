import React, { useContext } from 'react';
import './petition-card.css';
import pic from '../../images/backgroundIntro.jpg';
import PetitionCardInfo from '../PetitionCardInfo/PetitionCardInfo';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const PetitionCard = ({petition, onLikeClick, isLoggedIn, nickname, onDeletePetition}) => {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = petition.data.uid === currentUser.uid;
    const petitionDeleteButtonClassName = (
        `petition-card__delete-button ${isOwn ?
          'petition-card__delete-button_active' :
          'petition-card__delete-button_inactive'}`
      );

    const handleDeletePetition = () => {
        onDeletePetition(petition);
    }
    return (
        <div className="petition-card">
            <div className="petition-card__image" style={{
                background: `center/cover url(${petition.data.url? petition.data.url : pic})`
            }}/>
           <PetitionCardInfo petition={petition} onLikeClick={onLikeClick} isLoggedIn={isLoggedIn}
                nickname={nickname} />
            <button className={petitionDeleteButtonClassName}
                onClick={handleDeletePetition}
            >&#128465;</button>
        </div>
    );
}

export default PetitionCard;