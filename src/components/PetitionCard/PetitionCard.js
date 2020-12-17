import React, { useEffect, useState } from 'react';
import './petition-card.css';
import { storage, pictureUpload } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';

const PetitionCard = ({ petition }) => {
  const [url, setUrl] = useState('');

  //получение ссылки на картинку
  useEffect(() => {
    let cleanUp = false;
    pictureUpload(petition.picFullPath)
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

  }

  const handleDisLikeClick = () => {

  }

  return (
      <div className="petition-card">
        <div className="petition-card__image" style={{background:`center/cover url(${url})`}}></div>
        <div className="petition-card__info">
          <p className="petition-card__timestamp">{`Time: ${petition.timestamp}`}</p>
          <p className="petition-card__tag">{`Тэг: ${petition.petitionTag}`}</p>
          <ul className="petition-card__poem">
            {
              petition.petition.map((line) => {
                return <p key={uuidv4()}>{line}</p>
              })
            }
          </ul>
          <button className="petition-card__reaction petition-card__reaction_type_like"
            onClick={handleLikeClick}>{`Likes: ${petition.likes.length}`}</button>
          <button className="petition-card__reaction petition-card__reaction_type_dislike"
            onClick={handleDisLikeClick}>{`Dislikes: ${petition.disLikes.length}`}</button>
        </div>
      </div>
  );
}

export default PetitionCard;