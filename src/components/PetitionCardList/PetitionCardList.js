import React, { useState, useRef } from 'react';
import PetitionCard from "../PetitionCard/PetitionCard";
import { v4 as uuidv4 } from 'uuid';
//import Carousel from 'react-spring-3d-carousel';
import Carousel from 'react-elastic-carousel';
import { config } from 'react-spring';
import './petition-card-list.css';
import { NavLink } from 'react-router-dom';

const PetitionCardList = ({ petitions, onLikeClick, onDislikeClick,
  onMyPetitionsChoose, nickname, onActualPetitionsChoose, isLoggedIn, onAllPetitionsChoose }) => {
  const carousel = useRef();
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
          onClick={handleActualPetitionsButtonClick} >Актуальные инициативы</button>
        <button type="button" className={`petition-card-list__button ${isMyButtonClicked && 'petition-card-list__button_active'}`}
          onClick={handleMyPetitionsButtonClick}>Мои инициативы</button>
      </div>
      {isListEmpty ? 'empty' :
        <Carousel itemPosition='center' enableSwipe={true} ref={carousel}>
          {
            petitions.map((petition) => {
              return (
                <PetitionCard key={uuidv4()} petition={petition} onLikeClick={onLikeClick}
                  onDislikeClick={onDislikeClick} isLoggedIn={isLoggedIn} nickname={nickname}/>
              )
            })
          }
        </Carousel>
      }
      {/* {isListEmpty ? 'empty' :
        <Carousel slides={
          petitions.map((petition) => {
            return ({
              key: uuidv4(),
              content: <PetitionCard petition={petition} onLikeClick={onLikeClick} 
                onDislikeClick={onDislikeClick} isLoggedIn={isLoggedIn}/>
            }
            )
          })
        }
          showNavigation={true}
          animationConfig={config.slow}
        />} */}
        <NavLink to="/petitions" className="petition-card-list__all-link" onClick={onAllPetitionsChoose}>
          Все инициативы &rarr;
        </NavLink>
    </div>
  );
}

export default PetitionCardList;
