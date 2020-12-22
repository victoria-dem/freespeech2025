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

    
    // если юзер изменился и нинайм есть то есть надо убить никней
    // проверяю есть ли у меня юзер и если есть, то есть ли у него displayName?
    useEffect(() => {
        if (currentUser.uid) {
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

    const setPetitionList = (petitionsToRender) => {
        petitionsToRender.forEach(doc => {
            setPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
        })
    }

    //получить последние по дате публикации 6 петиций и добавить их в стейт petitions
    const setLatestPetitions = () => {
        //только после проверки на авторизацию
        if (hasCheckedLogin) {
            //если залогинен, то отображаем и последние 6 петиций и последние 3 карточки пользователя
            if (isUserLoggedIn) {
                Promise.all([
                    db.collection("petitions")
                        .where("uid", "==", currentUser.uid)
                        .orderBy("timestamp", "desc")
                        .limit(3)
                        .get(),
                    db.collection('petitions')
                        .where("isPublic", "==", true)
                        .orderBy("timestamp", "desc")
                        .limit(6)
                        .get()])
                    .then((values) => {
                        const [curUserPetitions, latestPetitions] = values;
                        // if (isUserLoggedIn) {
                        setPetitions([]);
                        curUserPetitions.forEach(doc => {
                            if (!doc.data().isPublic) {
                                setPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                            }
                            setMyPetitions(petitions => [{ data: doc.data(), id: doc.id }, ...petitions]);
                            setMyPetitions(myPetitions.filter((p) => p.id !== doc.id));

                        })
                        // }
                        // setPetitionList(latestPetitions);
                        latestPetitions.forEach(doc => {
                            setPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                        });
                    })
                    .catch(err => console.log(err));
            } else {
                //если незалогинен, то отображаем только последние 6 петиций
                db.collection('petitions')
                    .where("isPublic", "==", true)
                    .orderBy("timestamp", "desc")
                    .limit(6)
                    .get()
                    .then(newPetitions => {
                        setPetitions([]);
                        setPetitionList(newPetitions);
                    })
            }
        }
    }

    //получить петиции текущего юзера и добавить их в стейт myPetitions
    const setUserPetitions = () => {
        db.collection("petitions")
            .where("uid", "==", currentUser.uid)
            .orderBy("timestamp", "desc")
            .get()
            .then((myPetitions) => {
                myPetitions.forEach(doc => {
                    setMyPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }]);
                });
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        // setNickname(getNicknames())
    }, [isUserLoggedIn]);


    useEffect(() => {
        setLatestPetitions();
    }, [hasCheckedLogin, isUserLoggedIn]);

    //добавление новой петиции на страницу
    const handleAddPetition = (petition) => {
        setPetitions([petition, ...petitions]);
    }

    //добавление петиции после обновления инфо в ней (лайки)
    const updatePetitions = (petition) => db.collection("petitions")
        .doc(petition.id).onSnapshot((doc) => {
            if (!areMyPetitionsChosen) {
                setPetitions(petitions.map((p) => p.id === petition.id ? { data: doc.data(), id: doc.id } : p));
            } else {
                setMyPetitions(myPetitions.map((p) => p.id === petition.id ? { data: doc.data(), id: doc.id } : p));
            }

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
                        nickname={nickname}
                    />
                </Route>
                {/*</Switch>*/}
                {/*</animated.div>*/}
                {/*))}*/}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
