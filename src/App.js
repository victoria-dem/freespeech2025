import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import IntroPage from './components/IntroPage/IntroPage';
import Main from './components/Main/Main';
import { useTransition, animated } from 'react-spring';
import { Switch, Route } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { db } from './utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { auth } from './utils/firebase';
import Auth from './components/Auth/Auth';
import getNicknames from "./utils/getNicknames";
import PetitionsPage from './components/PetitionsPage/PetitionsPage';

// import manageJson from "./utils/manageJson"   /* util for loading json to firebase */
// import manageJson from "./utils/loadAuthorData"   /* util for loading json to firebase */

function App() {

    // uncomment if needed to load json into firebase.database
    // React.useEffect(() => {
    //     manageJson();
    // },[]);

    // uncomment if needed to load authors into firebase */
    // React.useEffect(() => {
    //     loadAuthorData();
    // },[]);


    const [currentUser, setCurrentUser] = useState({}); // {email: ... , uid: ... }
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [petitions, setPetitions] = useState([]);
    const [areMyPetitionsChosen, setAreMyPetitionsChosen] = useState(false);
    const [myPetitions, setMyPetitions] = useState([]);
    const [allPetitions, setAllPetitions] = useState([]);
    const [allPetitionsChosen, setAllPetitionsChosen] = useState(false);
    const [hasCheckedLogin, setHasCheckedLogin] = useState(false);
    const [nickname, setNickname] = useState('');
    const [tempNickname, setTempNickname] = useState('');
    const [nicknameStatus, setNicknameStatus] = useState(false);
    const { location } = useContext(__RouterContext);
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: "translate(100%, 0)", display: "none" },
        enter: { opacity: 1, transform: "translate(0%, 0)", display: "flex " },
        leave: { opacity: 0, transform: "translate(-50%, 0)", display: "none" }
    });

    // console.log(tempNickname, nickname)

    // генерация псевдонима на всякий случай
    useEffect(() => (
        setTempNickname(getNicknames())
    ), [])

    useEffect(() => {
        setTimeout(() => {
            setTempNickname('')
        }, 5000)
    }, [])

    // если юзер изменился и нинайм есть то есть надо убить никней
    // проверяю есть ли у меня юзер и если есть, то есть ли у него displayName?
    useEffect(() => {
        if (currentUser.uid && tempNickname !== '') {
            const user = auth.currentUser
            if (user.displayName === null) {
                user.updateProfile({
                    displayName: tempNickname,
                }).then(function () {
                    setNicknameStatus(!nicknameStatus)
                }).catch(function (error) {
                    console.log(error)
                });
            } else {
                setNicknameStatus(!nicknameStatus)
            }
        } else {
            setNicknameStatus(!nicknameStatus)
        }
    }, [currentUser])


    useEffect(() => {
        const user = auth.currentUser
        if (user !== null) {
            if (user.displayName !== null) {
                setNickname(user.displayName)
            }
        } else {
            setNickname('')
        }
    }, [nicknameStatus])

    const handleUserUpdate = (user) => {
        setCurrentUser(user);
        user.uid ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
    }

    //определяем проверена ли авторизация на сайте
    const handleCheckLogin = () => {
        setHasCheckedLogin(true);
    }

    //получить последние по дате публикации 6 петиций и добавить их в стейт petitions
    const setLatestPetitions = () => {
        let cleanUp = false;
        //только после проверки на авторизацию
        if (hasCheckedLogin) {

            Promise.all([
                db.collection("petitions")
                    .orderBy("timestamp", "desc")
                    .limit(8)
                    .get(),
                db.collection('petitions')
                    .where("isPublic", "==", true)
                    .orderBy("timestamp", "desc")
                    .limit(8)
                    .get()
            ]).then(values => {
                    setPetitions([]);
                    const [allLatestPetitions, onlyPublicPetitions] = values;
                    const ids = [];
                    if (isUserLoggedIn) {
                        allLatestPetitions.forEach((doc) => {
                            if (doc.data().isPublic || (currentUser.uid && doc.data().uid === currentUser.uid)) {
                                setPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                                ids.push(doc.id);
                            }
                        });

                        //если среди последних петиций не хватает публичных или созданных пользователем
                        //добавляем последние публичные
                        if (ids.length < 8) {
                            onlyPublicPetitions.forEach((doc) => {
                                if(!ids.includes(doc.id) && ids.length < 8) {
                                    setPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                                    ids.push(doc.id);
                                }
                            });
                            ids.length=0;
                        }
                    } else {
                        setPetitions([]);
                        onlyPublicPetitions.forEach((doc) => {
                            setPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                        });
                    }
            })
            .catch(err => console.log(err));       
        }
    }

    //получить петиции текущего юзера и добавить их в стейт myPetitions
    const setUserPetitions = () => {
        setMyPetitions([]);
        db.collection("petitions")
            .where("uid", "==", currentUser.uid)
            .orderBy("timestamp", "desc")
            .get()
            .then((petitions) => {
                petitions.forEach(doc => {
                    setMyPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                    //setMyPetitions([{ data: doc.data(), id: doc.id },...myPetitions]);
                })
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        // setNickname(getNicknames())
    }, [isUserLoggedIn]);


    useEffect(() => {
        setLatestPetitions();
    }, [hasCheckedLogin, isUserLoggedIn, currentUser]);

    //получить все петиции из базы данных для страницы PetitionsPage
    useEffect(() => {
        if (hasCheckedLogin) {
            setAllPetitions([]);
            db.collection("petitions")
                .orderBy("timestamp", "desc")
                .get()
                .then((petitions) => {
                    petitions.forEach(doc => {
                        if (doc.data().isPublic || (currentUser.uid && doc.data().uid === currentUser.uid)) {
                            setAllPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                        }
                    });
                    // console.log(petitions.length)
                })
        }
    }, [hasCheckedLogin, isUserLoggedIn]);

    //добавление новой петиции на страницу
    const handleAddPetition = (petition) => {
        setPetitions([petition, ...petitions]);
        setAllPetitions([petition, ...allPetitions]);
    }

    //добавление петиции после обновления инфо в ней (лайки)
    const updatePetitions = (petition) => db.collection("petitions")
        .doc(petition.id).onSnapshot((doc) => {
            if (!areMyPetitionsChosen) {
                setPetitions(petitions.map((p) => p.id === petition.id ? { data: doc.data(), id: doc.id } : p));
            } else {
                setMyPetitions(myPetitions.map((p) => p.id === petition.id ? { data: doc.data(), id: doc.id } : p));
            }

            setAllPetitions(allPetitions.map((p) => p.id === petition.id ? { data: doc.data(), id: doc.id } : p));
        });

    //лайк петиции
    const handleLikeClick = (petition) => {
        if (currentUser.uid) {
            const isLiked = petition.data.likes.some(i => i.uid === currentUser.uid);
            db.collection("petitions")
                .doc(petition.id)
                .update({
                    likes: isLiked ?
                        petition.data.likes.filter(i => i.uid !== currentUser.uid) :
                        [...petition.data.likes, { uid: currentUser.uid }],
                    disLikes: !isLiked ? petition.data.disLikes.filter(i => i.uid !== currentUser.uid) :
                        [...petition.data.disLikes]
                })
                .then(() => {
                    updatePetitions(petition);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('please log in');
        }

    }

    //дислайк петиции
    const handleDislikeClick = (petition) => {
        if (currentUser.uid) {
            const isDisliked = petition.data.disLikes.some(i => i.uid === currentUser.uid);
            db.collection("petitions")
                .doc(petition.id)
                .update({
                    disLikes: isDisliked ?
                        petition.data.disLikes.filter(i => i.uid !== currentUser.uid) :
                        [...petition.data.disLikes, { uid: currentUser.uid }],
                    likes: !isDisliked ? petition.data.likes.filter(i => i.uid !== currentUser.uid) :
                        [...petition.data.likes]
                })
                .then(() => {
                    updatePetitions(petition);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('please log in');
        }
    }

    //обработчик выбора опции "Мои инициативы"
    const handleMyPetitionsChoose = () => {
        setAreMyPetitionsChosen(true);
        if (currentUser.uid) {
            setUserPetitions();
        } else {
            setMyPetitions([]);
        }
    }

    //обработчик выбора опции "Актуальные инициативы"
    const handleActualPetitionsChoose = () => {
        setAreMyPetitionsChosen(false);
        setLatestPetitions();
    }

    const handleAllPetitionsChoose = () => {
        setAllPetitionsChosen(true);
    }

    const handleReturn = () => {
        setAllPetitionsChosen(false);
        setAreMyPetitionsChosen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Auth
                onUpdateUser={handleUserUpdate}
                isLoggedIn={isUserLoggedIn}
                onCheckLogin={handleCheckLogin}
            />
            <div className="App">
                {/*{transitions.map(({ item, props, key }) => (*/}
                {/*    <animated.div key={key} style={props}>*/}
                {/*        <Switch location={item}>*/}
                {/*             Вступительная страница с кнопкой "Поехали"*/}
                <Route exact path="/">
                    <IntroPage />
                </Route>
                {/* Страница 2025 года - пока там хедер и форма авторизации */}
                <Route exact path="/main">
                    <Main
                        onUpdateUser={handleUserUpdate}
                        isLoggedIn={isUserLoggedIn}
                        petitions={areMyPetitionsChosen ? myPetitions : petitions}
                        onLikeClick={handleLikeClick} onDislikeClick={handleDislikeClick}
                        onAddPetition={handleAddPetition}
                        onMyPetitionsChoose={handleMyPetitionsChoose}
                        onActualPetitionsChoose={handleActualPetitionsChoose}
                        nickname={nickname} onAllPetitionsChoose={handleAllPetitionsChoose}
                    />
                </Route>
                <Route exact path="/petitions">
                    <PetitionsPage petitions={allPetitions} onLikeClick={handleLikeClick}
                        onDislikeClick={handleDislikeClick} isLoggedIn={isUserLoggedIn} nickname={nickname}
                        onReturn={handleReturn} />
                </Route>
                {/*</Switch>*/}
                {/*</animated.div>*/}
                {/*))}*/}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
