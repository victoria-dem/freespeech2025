import './petitions-page.css';
import { NavLink } from 'react-router-dom';
import PetitionCard from '../PetitionCard/PetitionCard';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const PetitionsPage = ({petitions, onLikeClick, onDislikeClick, isLoggedIn, nickname}) => {
  // const currentUser = useContext(CurrentUserContext);
  return (
    <div className="petitions-page">
      <h1>Все петиции</h1>
      <div className="petitions-page__petitions">
        {
          petitions.map((petition) => {
            return (
              <PetitionCard key={uuidv4()} petition={petition} onLikeClick={onLikeClick}
                onDislikeClick={onDislikeClick} isLoggedIn={isLoggedIn} nickname={nickname}/>
            )
          })
        }
      </div>
      <NavLink to="/main" className="petitions-page__return-link">Назад &larr;</NavLink>
    </div>
  );
}

export default PetitionsPage;