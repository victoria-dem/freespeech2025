import './App.css';
import React, {useState, useContext} from 'react';
import IntroPage from './components/IntroPage/IntroPage';
import FuturePage from './components/FuturePage/FuturePage';
import {useTransition, animated} from 'react-spring';
import {Switch, Route} from 'react-router-dom';
import {__RouterContext} from 'react-router';
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";

// import manageJson from "./utils/manageJson"   /* util for loading json to firebase */

function App() {
    //     /* uncomment if needed to load json into firebase.database */
// React.useEffect(() => {
//     manageJson();
// },[]);
    
    const {location} = useContext(__RouterContext);
    const transitions = useTransition(location, location => location.pathname, {
        from: {opacity: 0, transform: "translate(100%, 0)", display: "none"},
        enter: {opacity: 1, transform: "translate(0%, 0)", display: "flex "},
        leave: {opacity: 0, transform: "translate(-50%, 0)", display: "none"}
    });
    
    return (
        <div className="App">
            {transitions.map(({item, props, key}) => (
                <animated.div key={key} style={props}>
                    <Switch location={item}>
                        {/* Вступительная страница с кнопкой "Поехали" */}
                        <Route exact path="/">
                            <IntroPage/>
                        </Route>
                        
                        {/* Страница 2025 года - пока там хедер и форма авторизации */}
                        <Route exact path="/future">
                            <FuturePage/>
                        </Route>
                    </Switch>
                </animated.div>
            ))}
            {/*<Form/>*/}
        </div>
    );
}

export default App;