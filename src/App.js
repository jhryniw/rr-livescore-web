import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Media from 'react-media'
import Livescore, { MiniLivescore } from './components/livescore';
import ScoresheetMenu from './components/scoresheet/menu';
import Scoresheet from './components/scoresheet/scoresheet';
import './App.css';

const ScoringPage = () => {
    return (
        <div>
            <Media query="(max-width: 825px)">
                {matches =>
                    matches ? (
                        <MiniLivescore />
                    ) : (
                        <Livescore/>
                    )
                }
            </Media>
        </div>
    )
};

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={ScoringPage}/>
            <Route exact path="/scoresheet" component={ScoresheetMenu} />
            <Route path="/scoresheet/:match" component={Scoresheet} />
        </div>
    </Router>
);

export default App;
