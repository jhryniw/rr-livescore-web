import React, { Component } from 'react';
import firebase from 'firebase';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Modal from 'react-responsive-modal';
import { getDefaultState, attachState, getJewelScore, getSafeZoneScore, getAutonomousGlyphScore, getAutonomousKeyBonus,
         getTeleopGlyphScore, getRowBonus, getColBonus, getCipherBonus, getRelicScore, getUprightScore, getBalanceScore,
         getAutonomousScore, getTeleopScore, getTotalScore
       } from '../utils/score';

import '../App.css';

const getPercentages = (totalRed, totalBlue) => {
    const redPercent = totalRed + totalBlue > 0
        ? totalRed / (totalRed + totalBlue) * 100
        : 0;

    const bluePercent = totalRed + totalBlue > 0 ? 100 - redPercent : 0;

    // Return as percentage strings
    return [redPercent, bluePercent, `${redPercent}%`, `${bluePercent}%`];
};

const saveMatch = (matchId) => {
    let database = firebase.database();
    let currentMatchRef = database.ref('/current-match');
    let savedMatchRef = database.ref(`/matches/${matchId}`);

    return new Promise(resolve => {
        currentMatchRef.once('value', (snapshot) => {
            if (snapshot.val()) {
                savedMatchRef.set( snapshot.val(), function(error) {
                    if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
                });

                resolve();
            }
        })
    });
};

const TitleSection = (props) => (
    <Col xs={2}>
        <div className="title-score-section">
            <h2>{props.title}</h2>
        </div>
    </Col>
);

const ScoreSection = ({ redScore, blueScore }) => (
    <Col xs={10}>
        <Row center="xs" style={{ alignItems: "stretch" }}>
            <Col xs={5}>
                <span style={{display: "block"}} className="red-score-total">{redScore}</span>
            </Col>
            <Col xs={5}>
                <span className="blue-score-total">{blueScore}</span>
            </Col>
        </Row>
    </Col>
);

export class MiniLivescore extends Component {

    constructor(props) {
        super(props);
        this.activeNodes = [];

        this.matchRoot = firebase.database().ref('/current-match');

        this.state = getDefaultState();
        this.setState = this.setState.bind(this);
    }

    componentWillMount() {
        this.activeNodes = attachState(this.matchRoot, this.setState);
    }

    render() {
        const autoRed = getAutonomousScore(this.state, 'red');
        const autoBlue = getAutonomousScore(this.state, 'blue');

        const teleRed = getTeleopScore(this.state, 'red');
        const teleBlue = getTeleopScore(this.state, 'blue');

        const totalRed = getTotalScore(this.state, 'red');
        const totalBlue = getTotalScore(this.state, 'blue');

        const [strRedPercent, strBluePercent] = getPercentages(totalRed, totalBlue).slice(2);

        return (
            <div>
                <Grid fluid className="App">
                    <Row>
                        <Col xsOffset={2} xs={10}>
                            <h1 className="App-title">Live Unofficial Score</h1>
                        </Col>
                    </Row>
                    <Row>
                        <TitleSection title="Auto"/>
                        <ScoreSection redScore={autoRed} blueScore={autoBlue} />
                    </Row>
                    <Row style={{marginTop: 20}}>
                        <TitleSection title="Driver"/>
                        <ScoreSection redScore={teleRed} blueScore={teleBlue} />
                    </Row>
                    <Row style={{marginTop: 20}}>
                        <TitleSection title="Total"/>
                        <ScoreSection redScore={totalRed} blueScore={totalBlue} />
                    </Row>
                    <Row className="score-box-container" style={{ marginTop: 10, marginRight: -15 }}>
                        <Col xsOffset={2} xs={10}>
                            <div className="red-score-box" style={{width: strRedPercent}}/>
                            <div className="blue-score-box" style={{width: strBluePercent}}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    };

    componentWillUnmount() {
        this.activeNodes.forEach(node => node.ref.off('value', node.callback));
        this.activeNodes = [];
    }
}

class LivescorePage extends Component {

    constructor(props) {
        super(props);
        this.activeNodes = [];

        this.state = getDefaultState();
        this.state.isAuthed = firebase.auth().currentUser != null;
        this.state.modalOpen = false;
        this.state.match = '';

        this.matchRoot = firebase.database().ref('/current-match');

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillMount() {
        this.activeNodes = attachState(this.matchRoot, this.setState.bind(this));

        firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    this.setState({ isAuthed: true });
                }
                else {
                    this.setState({ isAuthed: false });
                }
            });
    }

    onOpenModal() {
        this.setState({ modalOpen: true });
    }

    handleChange(event) {
        this.setState({ match: event.target.value });
    }

    onCloseModal() {
        this.setState({ modalOpen: false });
    }

    onSave() {
        console.log('saving');
        let matchId = this.state.match;

        if (matchId.length === 0) {
            return;
        }

        saveMatch(matchId)
            .then(() => this.setState({ match: '', modalOpen: false }));
    }

    render() {
        const { modalOpen, match } = this.state;

        const jewelScoreRed = getJewelScore(this.state, 'red');
        const jewelScoreBlue = getJewelScore(this.state, 'blue');
        const autonomousGlyphScoreRed = getAutonomousGlyphScore(this.state, 'red');
        const autonomousGlyphScoreBlue = getAutonomousGlyphScore(this.state, 'blue');
        const autonomousKeyBonusRed = getAutonomousKeyBonus(this.state, 'red');
        const autonomousKeyBonusBlue = getAutonomousKeyBonus(this.state, 'blue');
        const safeZoneScoreRed = getSafeZoneScore(this.state, 'red');
        const safeZoneScoreBlue = getSafeZoneScore(this.state, 'blue');
        const teleOpGlyphScoreRed = getTeleopGlyphScore(this.state, 'red');
        const teleOpGlyphScoreBlue = getTeleopGlyphScore(this.state, 'blue');
        const rowBonusRed = getRowBonus(this.state, 'red');
        const rowBonusBlue = getRowBonus(this.state, 'blue');
        const colBonusRed = getColBonus(this.state, 'red');
        const colBonusBlue = getColBonus(this.state, 'blue');
        const cipherBonusRed = getCipherBonus(this.state, 'red');
        const cipherBonusBlue = getCipherBonus(this.state, 'blue');
        const relicScoreRed = getRelicScore(this.state, 'red');
        const relicScoreBlue = getRelicScore(this.state, 'blue');
        const uprightScoreRed = getUprightScore(this.state, 'red');
        const uprightScoreBlue = getUprightScore(this.state, 'blue');
        const balanceScoreRed = getBalanceScore(this.state, 'red');
        const balanceScoreBlue = getBalanceScore(this.state, 'blue');

        const totalRed = getTotalScore(this.state, 'red');
        const totalBlue = getTotalScore(this.state, 'blue');

        const [redPercent, bluePercent, strRedPercent, strBluePercent] = getPercentages(totalRed, totalBlue);

        return (
            <div>
                <Grid fluid className="App">
                    <Row>
                        <Col xsOffset={this.state.isAuthed ? 5 : 2} xs={this.state.isAuthed ? 4 : 10}>
                            <h1 className="App-title">Live Unofficial Score</h1>
                        </Col>
                        { this.state.isAuthed ?
                            <Col xs={3}>
                                <a href="/scoresheet" style={{ lineHeight: "3.6em", marginRight: 20 }}>Scoresheets</a>
                                <button onClick={this.onOpenModal} style={{ lineHeight: "3.6em" }}>Save Match</button>
                            </Col>
                            : <div />
                        }
                    </Row>
                    <Row>
                        <TitleSection title="Auto Period" />
                        <Col xs={3.3} className="red-score-section">
                            <p>{jewelScoreRed}</p>
                            <p>{autonomousGlyphScoreRed}</p>
                            <p>{autonomousKeyBonusRed}</p>
                            <p>{safeZoneScoreRed}</p>
                        </Col>
                        <Col xs={3.3} className="middle-score-section">
                            <p>Jewels</p>
                            <p>Glyphs</p>
                            <p>Key Column Bonus</p>
                            <p>Safe zones</p>
                        </Col>
                        <Col xs={3.3} className="blue-score-section">
                            <p>{jewelScoreBlue}</p>
                            <p>{autonomousGlyphScoreBlue}</p>
                            <p>{autonomousKeyBonusBlue}</p>
                            <p>{safeZoneScoreBlue}</p>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                        <TitleSection title="Driver Controlled" />
                        <Col xs={3.3} className="red-score-section">
                            <p>{teleOpGlyphScoreRed}</p>
                            <p>{rowBonusRed}</p>
                            <p>{colBonusRed}</p>
                            <p>{cipherBonusRed}</p>
                            <p>{relicScoreRed}</p>
                            <p>{uprightScoreRed}</p>
                            <p>{balanceScoreRed}</p>
                        </Col>
                        <Col xs={3.3} className="middle-score-section">
                            <p>Glyphs</p>
                            <p>Row Bonus</p>
                            <p>Column Bonus</p>
                            <p>Cipher Bonus</p>
                            <p>Relic</p>
                            <p>Upright Bonus</p>
                            <p>Balancing Platform</p>
                        </Col>
                        <Col xs={3.3} className="blue-score-section">
                            <p>{teleOpGlyphScoreBlue}</p>
                            <p>{rowBonusBlue}</p>
                            <p>{colBonusBlue}</p>
                            <p>{cipherBonusBlue}</p>
                            <p>{relicScoreBlue}</p>
                            <p>{uprightScoreBlue}</p>
                            <p>{balanceScoreBlue}</p>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <TitleSection title="Total Score" />
                        <Col xs={10}>
                            <Row between="xs">
                                <Col xs={4}>
                                    <span className="red-score-total">{totalRed}</span>
                                </Col>
                                <Col xs={4}>
                                    <span className="blue-score-total">{totalBlue}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="score-box-container" style={{ marginTop: 5 }}>
                        <Col xsOffset={2} xs={10} style={{ position: "relative" }}>
                            <div classID="divider"
                                 className={ redPercent !== 0 || bluePercent !== 0 ? "divider-total" : "" } />
                            <div className="red-score-box" style={{ width: strRedPercent }}/>
                            <div className="blue-score-box" style={{ width: strBluePercent }}/>
                        </Col>
                    </Row>
                </Grid>
                <Modal open={modalOpen} onClose={this.onCloseModal} little>
                    <h3>Enter the match identifier: (ex. Q2)</h3>
                    <input type="text" value={match} onChange={this.handleChange} />
                    <button onClick={this.onSave}>Save</button>
                </Modal>
            </div>
        );
    };

    componentWillUnmount() {
        this.activeNodes.forEach(node => node.ref.off('value', node.callback));
        this.activeNodes = [];
    }
}

export default LivescorePage;
