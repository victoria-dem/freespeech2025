import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import IntroPage from './components/IntroPage/IntroPage';
import Main from './components/Main/Main';
import { useTransition, animated } from 'react-spring';
import { Switch, Route } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { db, getPetitionsFromDb } from './utils/firebase';

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

    const handleLikeClick = (petition) => {
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
            .then((res) => {
                console.log(res);
                // const newPetitions = petitions.slice();
                // setPetitions(petitions.map((p) => p.data.uid === petition.data.uid ? petition : p));
                //setPetitions(petitions.slice());
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDislikeClick = (petition) => {
        const isDisliked = petition.data.disLikes.some(i => i.uid === currentUser.uid);
        return db.collection("petitions")
            .doc(petition.id)
            .update({
                disLikes: isDisliked ?
                    petition.data.disLikes.filter(i => i.uid !== currentUser.uid) :
                    [...petition.data.disLikes, { uid: currentUser.uid }],
                likes: !isDisliked ? petition.data.likes.filter(i => i.uid !== currentUser.uid) :
                    [...petition.data.likes]
            })
            .then(() => {
                // setPetitions(petitions.map((p) => p.data.uid === petition.data.uid ? petition : p));
            })
            .catch((err) => {
                console.log(err);
            });


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
                                    onLikeClick={handleLikeClick} onDislikeClick={handleDislikeClick} />
                            </Route>
                        </Switch>
                    </animated.div>
                ))}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
