import React, { useContext, useEffect, useState } from 'react';
import './petition-card.css';
import { storage, pictureUpload } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const PetitionCard = ({ petition, onLikeClick, onDislikeClick }) => {
  const [url, setUrl] = useState('');
  const currentUser = useContext(CurrentUserContext);
  
  //получение ссылки на картинку
  useEffect(() => {
    let cleanUp = false;
    pictureUpload(petition.data.picFullPath)
      .then((url) => {
        if (!cleanUp) {
          setUrl(url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => cleanUp = true;
  }, []);

  const handleLikeClick = () => {
    onLikeClick(petition);
  }

  const handleDisLikeClick = () => {
    onDislikeClick(petition);
  }

  return (
      <div className="petition-card">
        <div className="petition-card__image" style={{background:`center/cover url(${url})`}}></div>
        <div className="petition-card__info">
          <p className="petition-card__timestamp">{`Time: ${petition.data.timestamp}`}</p>
          <p className="petition-card__tag">{`Тэг: ${petition.data.petitionTag}`}</p>
          <ul className="petition-card__poem">
            {
              petition.data.petition.map((line) => {
                return <p key={uuidv4()}>{line}</p>
              })
            }
          </ul>
          <button className="petition-card__reaction petition-card__reaction_type_like"
            onClick={handleLikeClick}>{`Likes: ${petition.data.likes.length}`}</button>
          <button className="petition-card__reaction petition-card__reaction_type_dislike"
            onClick={handleDisLikeClick}>{`Dislikes: ${petition.data.disLikes.length}`}</button>
        </div>
      </div>
  );
}

export default PetitionCard;