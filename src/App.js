import './App.css';
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";
import React from "react";
// import manageJson from "./utils/manageJson"   /* util for loading json to firebase */

function App() {
//     /* uncomment if needed to load json into firebase.database */
// React.useEffect(() => {
//     manageJson();
// },[]);

    return (
        <div className="App">
            <header className="App-header">
                FREE SPEECH 2025 SITE IS HERE -)))))
            </header>
            <Auth/>
            <Form/>
        </div>
    );
}

export default App;
