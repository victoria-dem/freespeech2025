import PetitionCard from "../PetitionCard/PetitionCard";
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

import './petition-card-list.css';

const PetitionCardList = ({ petitions, onLikeClick, onDislikeClick, 
    onMyPetitionsChoose, onActualPetitionsChoose }) => {
  const handleMyPetitionsButtonClick = () => {
    onMyPetitionsChoose();
  }

  const handleActualPetitionsButtonClick = () => {
    onActualPetitionsChoose();
  }

  const isListEmpty = petitions.length === 0;

  return (
    <div className="petition-card-list">
      <h2>Инициативы</h2>
      <div className="petition-card-list__options">
        <button type="button" className="petition-card-list__button"
          onClick={handleActualPetitionsButtonClick} >Актуальные инициативы</button>
        <button type="button" className="petition-card-list__button"
          onClick={handleMyPetitionsButtonClick}>Мои инициативы</button>
      </div>
      {isListEmpty ? 'empty' :
        <Carousel slides={
          petitions.map((petition) => {
            return ({
              key: uuidv4(),
              content: <PetitionCard petition={petition} onLikeClick={onLikeClick} onDislikeClick={onDislikeClick} />
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