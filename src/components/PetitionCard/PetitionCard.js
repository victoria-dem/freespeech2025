import React, {useContext, useEffect, useState} from 'react';
import './petition-card.css';
import {pictureUpload} from '../../utils/firebase';
import {v4 as uuidv4} from 'uuid';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import SimpleDateTime  from 'react-simple-timestamp-to-date';

const PetitionCard = ({petition, onLikeClick, onDislikeClick, isLoggedIn, nickname}) => {
    const [url, setUrl] = useState('');
    const currentUser = useContext(CurrentUserContext);
    const [isOwn, setIsOwn] = useState(false);
    const [isOnModeration, setIsOnModeration] = useState(false);
    const isLiked = petition.data.likes.some((i) => i.uid === currentUser.uid);
    const petitionLikeButtonClassName = (
        `petition-card__like ${isLiked ?
            'petition-card__like_active' :
            'petition-card__like_inactive'}`
    );
    const likeChallenge = 20;

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

    let time = Number(petition.data.timestamp);
    let futureTime = petition.data.futureTime;
    if(futureTime) {console.log('sec',futureTime.seconds);}

    return (
        <div className="petition-card">
            <div className="petition-card__image" style={{
                background: `center/cover url(${url})`
            }}/>
            <div className="petition-card__info">
                <p className="petition-card__name">{nickname}</p>
                <SimpleDateTime className="petition-card__timestamp" format="DMY"
                    dateSeparator="-" format="MYD" timeSeparator=":" meridians="1">
                        {/* {futureTime ? Number(futureTime.seconds): (time/1000)} */}
                        {Number(time/1000)}
                </SimpleDateTime>
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
                <p className="petition-card__challenge">До продвижения осталось: {likeChallenge - petition.data.likes.length}</p>
                <button className={petitionLikeButtonClassName}
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