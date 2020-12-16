import React, { useEffect, useRef, useState } from 'react';
import './petition-card.css';
import { storage, pictureUpload } from '../../utils/firebase';

const PetitionCard = ({ petition }) => {
  const [url, setUrl] = useState('');

  //получение ссылки на картинку
  useEffect(() => {
    let cleanUp = false;
    pictureUpload(petition.picFullPath)
      .then((url) => {
        if(!cleanUp) {
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

  return (
    <li className="petition-card">
      <h2>Готовая петиция</h2>
      <img className="petition-card__image" alt={`Картинка: ${petition.petitionTag}`} src={url}></img>
      <div className="petition-card__info">
        <p className="petition-card__timestamp">{`Time: ${petition.timestamp}`}</p>
        <button className="petition-card__like" onClick={handleLikeClick}>{`Likes: ${petition.likes.length}`}</button>
        <p className="petition-card__tag">{`Тэг: ${petition.petitionTag}`}</p>
        <div className="petition-card__poem">
          <p>{petition.petition[0]}</p>
          <p>{petition.petition[1]}</p>
        </div>
      </div>
    </li>
  );
}

export default PetitionCard;