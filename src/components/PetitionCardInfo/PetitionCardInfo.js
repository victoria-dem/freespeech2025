import React, { useContext, useEffect, useState } from 'react';
import '../PetitionCard/petition-card.css';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import like from '../../images/like.svg';
import { capitalize } from '../../utils/utils';

const PetitionCardInfo = ({ petition, onLikeClick, isLoggedIn }) => {
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

  const likeContainerClassName = (
    `petition-card__like-container ${isOnModeration ?
      'petition-card__like-container_hidden' :
      'petition-card__like-container_visible'}`
  );

  const challengeContainerClassName = (
    `petition-card__challenge-container ${isOnModeration ?
      'petition-card__challenge-container_hidden' :
      'petition-card__challenge-container_visible'}`
  );

  const likeChallenge = 20;

  const handleLikeClick = () => {
    onLikeClick(petition);
  }

  useEffect(() => {
    setIsOnModeration(!petition.data.isPublic);
  }, []);

  let time = new Date(Number(petition.data.timestamp));
  time.setFullYear(2025);

  return (
    <div className="petition-card__info">
      <p className="petition-card__name">{petition.data.nick ? petition.data.nick : ''}</p>
      <p className="petition-card__timestamp">
        <SimpleDateTime dateFormat="DMY" dateSeparator="." showTime="0">
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
      <div className={likeContainerClassName}>
        <div className="petition-card__poem-blur"></div>
        <p className="petition-card__like-text">{`Согласны с инициативой: `}</p>
        <button className={petitionLikeButtonClassName} onClick={handleLikeClick} disabled={!isLoggedIn}>
        </button>
        <p className="petition-card__like-text petition-card__like-text_count">{petition.data.likes.length}</p>
      </div>
      <div className={challengeContainerClassName}>
        <p className="petition-card__like-text">До рассмотрения осталось: </p>
        <p className="petition-card__challenge">{likeChallenge - petition.data.likes.length}</p>
      </div>

    </div>
  );
}

export default PetitionCardInfo;