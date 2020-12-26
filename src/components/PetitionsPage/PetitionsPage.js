import './petitions-page.css';
import {NavLink} from 'react-router-dom';
import PetitionCard from '../PetitionCard/PetitionCard';
import {v4 as uuidv4} from 'uuid';
import {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import logoPoet from "../../images/logoPoet.svg";
import userIcon from "../../images/userIcon.svg";
import { auth } from '../../utils/firebase'

function PetitionsPage ({
                           petitions, onLikeClick, onDislikeClick, isLoggedIn, onReturn,
                           onDeletePetition
                       })  {
    const [nick,setNick] = useState('')
    const currentUser = useContext(CurrentUserContext);

    useEffect(function () {
        if (currentUser.uid) {
            setNick( auth.currentUser.displayName);
        }
    })
    
    const userNickname = nick.split(' ');
    //TODO попробовать переиспользовать компонент header
    return (
        <div className="petitions-page">
            {/*<Header handleAccountBtnClick={()=>console.log('TODO:добавить обработчик логин-кнопки')}*/}
            {/*  nickname={''} showMenu={false}/>*/}
            <header className='header_petition'>
                <img src={logoPoet} alt="Logo" className="logo-pet"/>
                <div>
                    {nick ?
                        <div className="header__nickname-petition">
                            <div className="header__nickname-text ">
                                <p className="header__nickname-title">Ваш псевдоним на сайте:</p>
                                <p className="header__nickname-pet">{userNickname[0]}</p>
                                <p className="header__nickname-pet">{userNickname[1]}</p>
                            </div>
                            <img src={userIcon} alt="User Icon" className="header__user-icon-petition"/>
                        </div> : null}
                </div>
            </header>
            <NavLink to="/main" className="petitions-page__return-link" onClick={onReturn}/>
            <h1 className="petitions-page__title">
                <a id="all-petitions" name="all-petitions"/>
                Все инициативы</h1>
            <p className="petitions-page__count">Всего: {petitions.length}</p>
            <div className="petitions-page__petitions">
                {
                    petitions.map((petition) => {
                        return (
                            <PetitionCard key={uuidv4()} petition={petition} onLikeClick={onLikeClick}
                                          onDislikeClick={onDislikeClick} isLoggedIn={isLoggedIn} nickname={nick}
                                          onDeletePetition={onDeletePetition}/>
                        )
                    })
                }
            </div>
            <Footer/>
        </div>
    );
}

export default PetitionsPage;
