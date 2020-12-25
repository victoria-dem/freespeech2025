import './petitions-page.css';
import { NavLink } from 'react-router-dom';
import PetitionCard from '../PetitionCard/PetitionCard';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PetitionsPage = ({ petitions, onLikeClick, onDislikeClick, isLoggedIn, nickname, onReturn,
  onDeletePetition }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="petitions-page">
      <Header handleAccountBtnClick={()=>console.log('TODO:добавить обработчик логин-кнопки')} 
        nickname={''} showMenu={false}/>
      <NavLink to="/main" className="petitions-page__return-link" onClick={onReturn}></NavLink>
      <h1 className="petitions-page__title">
        <a id="all-petitions" name="all-petitions"></a>
        Все петиции</h1>
      <p className="petitions-page__count">Всего: {petitions.length}</p>
      <div className="petitions-page__petitions">
        {
          petitions.map((petition) => {
            return (
              <PetitionCard key={uuidv4()} petition={petition} onLikeClick={onLikeClick}
                onDislikeClick={onDislikeClick} isLoggedIn={isLoggedIn} nickname={nickname}
                onDeletePetition={onDeletePetition} />
            )
          })
        }
      </div>
      <Footer/>
    </div>
  );
}

export default PetitionsPage;