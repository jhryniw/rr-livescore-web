import React, { Component } from 'react';
import firebase from 'firebase';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { getDefaultState, attachState, getJewelScore } from './score';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.activeRefs = [];

        this.matchRoot = firebase.database().ref('/current-match');
        this.state = getDefaultState();
    }

    componentWillMount() {
        firebase.auth().signInAnonymously()
            .catch(error => {
                console.log(error);
            });

        this.activeRefs = attachState(this.matchRoot, this.setState.bind(this));
    }

    render() {
        const jewelScoreRed = getJewelScore(this.state, 'red');
        const jewelScoreBlue = getJewelScore(this.state, 'blue');

        return (
            <div className="App">
                <Grid fluid>
                    <Row>
                        <Col xs={2} />
                        <Col xs={10}>
                            <h1 className="App-title">Live Unofficial Score</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <div className="title-score-section">
                                <h2>
                                    Autonomous<br/>
                                    Period
                                </h2>
                            </div>
                        </Col>
                        <Col xs={3.3} className="red-score-section">
                            <p>{jewelScoreRed}</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                        </Col>
                        <Col xs={3.3} className="middle-score-section">
                            <p>Jewels</p>
                            <p>Glyphs</p>
                            <p>Key Column Bonus</p>
                            <p>Safe zones</p>
                        </Col>
                        <Col xs={3.3} className="blue-score-section">
                            <p>{jewelScoreBlue}</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col xs={2}>
                            <div className="title-score-section">
                                <h2>
                                    Driver<br/>
                                    Controlled
                                </h2>
                            </div>
                        </Col>
                        <Col xs={3.3} className="red-score-section">
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                        </Col>
                        <Col xs={3.3} className="middle-score-section">
                            <p>Glyphs</p>
                            <p>Row Bonus</p>
                            <p>Column Bonus</p>
                            <p>Cipher Bonus</p>
                            <p>Relic</p>
                            <p>Balancing Platform</p>
                        </Col>
                        <Col xs={3.3} className="blue-score-section">
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    componentWillUnmount() {
        this.activeRefs.forEach((l => l.off('value')));
        this.activeRefs = [];
    }
}

export default App;
