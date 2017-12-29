import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var config = {
    apiKey: "AIzaSyAqMTcwkd1EeOHvCgxIIr3Jk3KZlW8XAlU",
    authDomain: "rr-livescore.firebaseapp.com",
    databaseURL: "https://rr-livescore.firebaseio.com",
    projectId: "rr-livescore",
    storageBucket: "rr-livescore.appspot.com",
    messagingSenderId: "823219110305"
};
firebase.initializeApp(config);

ReactDOM.render(
    <App/>,
    document.getElementById('root'));

registerServiceWorker();
