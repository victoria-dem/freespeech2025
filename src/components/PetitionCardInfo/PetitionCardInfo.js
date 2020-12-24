import React, { useContext, useEffect, useState } from 'react';
import '../PetitionCard/petition-card.css';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import like from '../../images/like.svg';

const PetitionCardInfo = ({ petition, onLikeClick, isLoggedIn, nickname }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isOwn, setIsOwn] = useState(false);
  const [isOnModeration, setIsOnModeration] = useState(false);
  const isLiked = petition.data.likes.some((i) => i.uid === currentUser.uid);
  const petitionLikeButtonClassName = (
    `petition-card__like ${isLiked ?
      'petition-card__like_active' :
      'petition-card__like_inactive'}`
  );

  const moderationClassName = (
    `petition-card__moderation ${isOnModeration ?
      'petition-card__moderation_in-progress' :
      'petition-card__moderation_done'}`
  );
  const likeChallenge = 20;

  const handleLikeClick = () => {
    onLikeClick(petition);
  }

  useEffect(() => {
    setIsOnModeration(!petition.data.isPublic);
  }, []);

  let time = Number(petition.data.timestamp);
  let futureTime = petition.data.futureTime;
  // if(futureTime) {console.log('sec',futureTime.seconds);}

  const capitalize = (str) => {
    let newStr = '';
    if (str !== '') {
      newStr = str.trim().split(' ').map((element) => element.charAt(0).toUpperCase() + element.slice(1));
      newStr = newStr.join(' ');
    }

    return newStr;
  }

  return (
    <div className="petition-card__info">
      <p className="petition-card__name">{petition.data.nick ? petition.data.nick : ''}</p>
      <p className="petition-card__timestamp">
        <SimpleDateTime dateFormat="DMY" dateSeparator="." showTime="0">
          {/* {futureTime ? Number(futureTime.seconds): (time/1000)} */}
          {Number(time / 1000)}
        </SimpleDateTime>
        <span className={moderationClassName}>&bull; На модерации</span>
      </p>
      <p className="petition-card__tag">{`${capitalize(petition.data.petitionTag)}`}</p>
      <ul className="petition-card__poem">
        {
          Array.isArray(petition.data.petition) ?
            petition.data.petition.map((line) => {
              return <p key={uuidv4()} className="petition-card__poem-line">{line}</p>
            }) :
            'Вы не ввели жалобу'
        }
      </ul>
      <div className="petition-card__like-container">
        <p className="petition-card__like-text">{`Согласны с инициативой: `}</p>
        <button className={petitionLikeButtonClassName} onClick={handleLikeClick} disabled={!isLoggedIn}
          // style={{ background: `center/contain url(${like}) no-repeat` }}
          >
        </button>
        <p className="petition-card__like-text petition-card__like-text_count">{petition.data.likes.length}</p>
      </div>
      <div className="petition-card__challenge-container">
        <p className="petition-card__like-text">До рассмотрения осталось: </p>
        <p className="petition-card__challenge">{likeChallenge - petition.data.likes.length}</p>
      </div>

    </div>
  );
}

export default PetitionCardInfo;