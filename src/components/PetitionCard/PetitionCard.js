import React, {useContext, useEffect, useState} from 'react';
import './petition-card.css';
import {pictureUpload} from '../../utils/firebase';
import {v4 as uuidv4} from 'uuid';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

const PetitionCard = ({petition, onLikeClick, onDislikeClick, isLoggedIn, nickname}) => {
    const [url, setUrl] = useState('');
    const currentUser = useContext(CurrentUserContext);
    const [isOwn, setIsOwn] = useState(false);
    const [isOnModeration, setIsOnModeration] = useState(false);
    
    //получение ссылки на картинку
    useEffect(() => {
        let cleanUp = false;
        pictureUpload(petition.data.picFullPath)
            .then((url) => {
                if (!cleanUp) {
                    setUrl(url);
                    setIsOwn(petition.data.uid === currentUser.uid);
                    setIsOnModeration(!petition.data.isPublic);
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
            <div className="petition-card__image" style={{
                background: `center/cover url(${url})`
            }}/>
            <div className="petition-card__info">
                <p className="petition-card__name">{nickname}</p>
                <p className="petition-card__timestamp">{`Time: ${petition.data.timestamp}`}</p>
                {/* <p className='petition-card_is-own'>{isOwn ? 'Моя петиция' : ''}</p> */}
                {isOnModeration ?
                    <p className="petition-card__moderation petition-card__moderation_in-progress">
                        На модерации</p> :
                    <p className="petition-card__moderation petition-card__moderation_done">
                        Проверено&#10004;</p>
                }
                <p className="petition-card__tag">{`Тэг: ${petition.data.petitionTag}`}</p>
                <ul className="petition-card__poem">
                    {
                        Array.isArray(petition.data.petition) ?
                            petition.data.petition.map((line) => {
                                return <p key={uuidv4()}>{line}</p>
                            }) :
                            'Вы не ввели жалобу'
                    }
                </ul>
                <button className="petition-card__reaction petition-card__reaction_type_like"
                        onClick={handleLikeClick} disabled={!isLoggedIn}>
                    {`Likes: ${petition.data.likes.length}`}
                </button>
                {/* <button className="petition-card__reaction petition-card__reaction_type_dislike"
                        onClick={handleDisLikeClick} disabled={!isLoggedIn}>
                    {`Dislikes: ${petition.data.disLikes.length}`}
                </button> */}
            </div>
        </div>
    );
}

export default PetitionCard;