import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import IntroPage from './components/IntroPage/IntroPage';
import Main from './components/Main/Main';
import { useTransition, animated } from 'react-spring';
import { Switch, Route } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { db, getPetitionsFromDb } from './utils/firebase';
import { v4 as uuidv4 } from 'uuid';

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

    const { location } = useContext(__RouterContext);
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: "translate(100%, 0)", display: "none" },
        enter: { opacity: 1, transform: "translate(0%, 0)", display: "flex " },
        leave: { opacity: 0, transform: "translate(-50%, 0)", display: "none" }
    });

    const handleUserUpdate = (user) => {
        setCurrentUser(user);
        user.uid ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
    }

    useEffect(() => {
        // console.log('user log in', isUserLoggedIn);
    }, [isUserLoggedIn]);

    useEffect(() => {
        getPetitionsFromDb()
            .then(newPetitions => {
                newPetitions.forEach(doc => {
                    setPetitions(petitions => [...petitions, { data: doc.data(), id: doc.id }])
                });
            })
            .catch(err => console.log(err));
    }, []);

    const handleAddPetition = (petition) => {
        setPetitions(petitions => [petition, ...petitions])
    }

    //добавление петиции после обновления инфо в ней (лайки)
    const updatePetitions = (petition) => db.collection("petitions")
        .doc(petition.id).onSnapshot((doc) => {
            setPetitions(petitions.map((p) => p.id === petition.id ? { data: doc.data(), id: doc.id } : p));
        });

    //лайк петиции
    const handleLikeClick = (petition) => {
        if(currentUser.uid) {
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
        if(currentUser.uid) {
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


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {transitions.map(({ item, props, key }) => (
                    <animated.div key={key} style={props}>
                        <Switch location={item}>
                            {/* Вступительная страница с кнопкой "Поехали" */}
                            <Route exact path="/">
                                <IntroPage />
                            </Route>
                            {/* Страница 2025 года - пока там хедер и форма авторизации */}
                            <Route exact path="/main">
                                <Main onUpdateUser={handleUserUpdate} isLoggedIn={isUserLoggedIn} petitions={petitions}
                                    onLikeClick={handleLikeClick} onDislikeClick={handleDislikeClick} onAddPetition={handleAddPetition} />
                            </Route>
                        </Switch>
                    </animated.div>
                ))}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
