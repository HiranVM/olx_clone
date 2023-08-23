import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseContext } from './store/Context';
import Context from './store/Context'
import firebase  from './firebase/config'

ReactDOM.render(
    <Router>
        <FirebaseContext.Provider value={firebase}>
            <Context>
                <App/>
            </Context>
        </FirebaseContext.Provider>
    </Router>,
    document.getElementById('root'));
