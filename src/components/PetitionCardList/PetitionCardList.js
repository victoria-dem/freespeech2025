import PetitionCard from "../PetitionCard/PetitionCard";
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-spring-3d-carousel';
import {config} from 'react-spring';

import './petition-card-list.css';

const PetitionCardList = ({ petitions, onLikeClick, onDislikeClick }) => {
  return (
    <div className="petition-card-list">
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
      />
    </div>
  );
}

export default PetitionCardList;