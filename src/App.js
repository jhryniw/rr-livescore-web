import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Livescore from './components/livescore';
import ScoresheetMenu from './components/scoresheet/menu';
import Scoresheet from './components/scoresheet/scoresheet';
import './App.css';

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Livescore} />
            <Route exact path="/scoresheet" component={ScoresheetMenu} />
            <Route path="/scoresheet/:match" component={Scoresheet} />
        </div>
    </Router>
);

export default App;
