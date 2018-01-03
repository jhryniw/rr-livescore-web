import React, { Component } from 'react';
import firebase from 'firebase';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { getDefaultState, attachState, getJewelScore, getSafeZoneScore, getAutonomousGlyphScore, getAutonomousKeyBonus,
         getTeleopGlyphScore, getRowBonus, getColBonus, getCipherBonus, getRelicScore, getUprightScore, getBalanceScore, getTotalScore
       } from '../utils/score';

import '../App.css';

const TitleSection = (props) => (
    <Col xs={2}>
        <div className="title-score-section">
            <h2>{props.title}</h2>
        </div>
    </Col>
);

class LivescorePage extends Component {

    constructor(props) {
        super(props);
        this.activeRefs = [];

        this.matchRoot = firebase.database().ref('/current-match');

        this.state = getDefaultState();
    }

    componentWillMount() {
        this.activeRefs = attachState(this.matchRoot, this.setState.bind(this));
    }

    render() {
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

        let redPercent = totalRed + totalBlue > 0
            ? totalRed / (totalRed + totalBlue) * 100
            : 0;

        let bluePercent = totalRed + totalBlue > 0 ? 100 - redPercent : 0;

        let strRedPercent = `${redPercent}%`;
        let strBluePercent = `${bluePercent}%`;

        return (
            <Grid fluid className="App">
                <Row>
                    <Col xs={2}/>
                    <Col xs={10}>
                        <h1 className="App-title">Live Unofficial Score</h1>
                    </Col>
                </Row>
                <Row>
                    <TitleSection title="Autonomous" />
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
        );
    };

    componentWillUnmount() {
        this.activeRefs.forEach((l => l.off('value')));
        this.activeRefs = [];
    }
}

export default LivescorePage;
