import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Livescore from './components/livescore';
import ScoreSheet from './components/scoresheet/scoresheet';
import './App.css';

const App = () => (
    <Router>
        <div className="App">
            <Route exact path="/" component={Livescore} />
            <Route path="/scoresheet/:match" component={ScoreSheet} />
        </div>
    </Router>
);

export default App;
