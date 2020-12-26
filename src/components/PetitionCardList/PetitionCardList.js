import React, { useState, useRef } from 'react';
import PetitionCard from "../PetitionCard/PetitionCard";
import { v4 as uuidv4 } from 'uuid';
//import Carousel from 'react-spring-3d-carousel';
import Carousel from 'react-elastic-carousel';
import { config } from 'react-spring';
import './petition-card-list.css';
import { NavLink } from 'react-router-dom';
import EmptyPetition from '../EmptyPetition/EmptyPetition';
import loader from '../../images/spinner.svg';

const PetitionCardList = ({ petitions, onLikeClick, onMyPetitionsChoose, onActualPetitionsChoose,
  isLoggedIn, onAllPetitionsChoose, onDeletePetition, isLoading }) => {

  const [isActButtonClicked, setIsActButtonClicked] = useState(true);
  const [isMyButtonClicked, setIsMyButtonClicked] = useState(false);
  const handleMyPetitionsButtonClick = () => {
    onMyPetitionsChoose();
    setIsMyButtonClicked(true);
    setIsActButtonClicked(false);
  }

  const handleActualPetitionsButtonClick = () => {
    onActualPetitionsChoose();
    setIsActButtonClicked(true);
    setIsMyButtonClicked(false);
  }

  const isListEmpty = petitions.length === 0;

  return (
    <div className="petition-card-list">
      <h2 className="petion-card-list__title">
        <a id="petition-card-list" name="petitions" />
        Инициативы
      </h2>
      <div className="petition-card-list__options">
        <button type="button" className={`petition-card-list__button ${isActButtonClicked && 'petition-card-list__button_active'}`}
          onClick={handleActualPetitionsButtonClick} >Актуальные</button>
        <button type="button" className={`petition-card-list__button ${isMyButtonClicked && 'petition-card-list__button_active'}`}
          onClick={handleMyPetitionsButtonClick}>Мои инициативы</button>
      </div>
      {isLoading ?
        <img className="petition-card-list__progress-bar-loader" src={loader} alt="loader"></img> :
        isListEmpty ? <EmptyPetition /> :
          <Carousel itemPosition='center' enableSwipe={true} enableMouseSwipe={true} >
            {
              petitions.map((petition) => {
                return (
                  <PetitionCard key={uuidv4()} petition={petition} onLikeClick={onLikeClick}
                    isLoggedIn={isLoggedIn} onDeletePetition={onDeletePetition} />
                )
              })
            }
          </Carousel>
      }
      <NavLink to="/petitions" className="petition-card-list__all-link" onClick={onAllPetitionsChoose}>
        Все инициативы 
        <div className="petition-card-list__all-link-arrow"></div>
      </NavLink>
    </div>
  );
}

export default PetitionCardList;
