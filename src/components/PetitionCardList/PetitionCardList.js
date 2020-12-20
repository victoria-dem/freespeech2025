import React, { useState } from 'react';
import PetitionCard from "../PetitionCard/PetitionCard";
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import './petition-card-list.css';
import { useContext } from "react";

const PetitionCardList = ({ petitions, onLikeClick, onDislikeClick,
  onMyPetitionsChoose, onActualPetitionsChoose, isLoggedIn}) => {
    const [isActButtonClicked, setIsActButtonClicked] = useState(false);
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
      <h2>
        <a  id="petition-card-list"  name="petitions"/>
        Инициативы
      </h2>
      <div className="petition-card-list__options">
        <button type="button" className={`petition-card-list__button ${isActButtonClicked && 'petition-card-list__button_active'}`}
          onClick={handleActualPetitionsButtonClick} >Актуальные инициативы</button>
        <button type="button" className={`petition-card-list__button ${isMyButtonClicked && 'petition-card-list__button_active'}`}
          onClick={handleMyPetitionsButtonClick}>Мои инициативы</button>
      </div>
      {isListEmpty ? 'empty' :
        <Carousel slides={
          petitions.map((petition) => {
            return ({
              key: uuidv4(),
              content: <PetitionCard petition={petition} onLikeClick={onLikeClick} onDislikeClick={onDislikeClick} isLoggedIn={isLoggedIn}/>
            }
            )
          })
        }
          showNavigation={true}
          animationConfig={config.slow}
        />}
    </div>
  );
}

export default PetitionCardList;
