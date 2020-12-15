import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import IntroPage from './components/IntroPage/IntroPage';
import FuturePage from './components/FuturePage/FuturePage';
import { useTransition, animated } from 'react-spring';
import { Switch, Route } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";
import { CurrentUserContext } from './contexts/CurrentUserContext';

// import manageJson from "./utils/manageJson"   /* util for loading json to firebase */

function App() {
    //     /* uncomment if needed to load json into firebase.database */
    // React.useEffect(() => {
    //     manageJson();
    // },[]);
    const [currentUser, setCurrentUser] = useState({}); // {email: ... , uid: ... }
    const [isUserLoggedIn, setIsUserLoggedin] = useState(false);
    const { location } = useContext(__RouterContext);
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: "translate(100%, 0)", display: "none" },
        enter: { opacity: 1, transform: "translate(0%, 0)", display: "flex " },
        leave: { opacity: 0, transform: "translate(-50%, 0)", display: "none" }
    });

    console.log('app user uid', currentUser.uid);

    // const checkIsUserLoggedIn = () => {
    //     if (!currentUser.uid) {
    //         setIsUserLoggedin(false);
    //     } else {
    //         setIsUserLoggedin(true);
    //     }
    //     console.log('user log in',isUserLoggedIn.toString());
    // }

    const handleUserUpdate = (user) => {
        setCurrentUser(user);
        user.uid ? setIsUserLoggedin(true) : setIsUserLoggedin(false);
    }

    useEffect(() => {
        console.log('user log in', isUserLoggedIn);
    }, [isUserLoggedIn]);

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
                            <Route exact path="/future">
                                <FuturePage onUpdateUser={handleUserUpdate} isLoggedIn={isUserLoggedIn}/>
                            </Route>
                        </Switch>
                    </animated.div>
                ))}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;