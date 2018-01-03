import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {getDefaultState, attachState, getJewelCount, getAutonomousGlyphCount, getKeyColumnBonusCount, getSafeZoneCount, getTeleopGlyphCount, getRowBonusCount,
        getColBonusCount, getCipherBonusCount, getRelicZone1Count, getRelicZone2Count, getRelicZone3Count, getUprightBonusCount, getBalanceCount
    } from '../../utils/score';
import './scoresheet.css';

const HeaderRow = (props) => {
    const { title, isBlue } = props;
    let headerClass = isBlue ? "ss-header blue" : "ss-header red";

    return (
        <Row className={headerClass}>
            <Col xs={12} >
                <span>{title}</span>
            </Col>
        </Row>
    );
};

HeaderRow.propTypes = {
    title: PropTypes.string.isRequired,
    isBlue: PropTypes.bool,
};

HeaderRow.defaultProps = {
    isBlue: false,
};

const AutoRow = (props) => {
    const { label, data } = props;

    return (
        <Row style={{ marginTop: 10, marginBottom: 10 }}>
            <Col xs={12}>
                <div style={{ float: "right" }}>
                    <span className="ss-label">{label}</span>
                    <div className="ss-databox" style={{ float: "right" }}>
                        <span>{data.toString()}</span>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

AutoRow.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.number.isRequired,
};


class Scoresheet extends Component {

    constructor(props) {
        super(props);

        this.isBlue = props.alliance === "blue";
        this.activeRefs = [];

        this.matchRoot = firebase.database().ref('/current-match');

        this.state = getDefaultState();
    }

    componentWillMount() {
        console.log('mounting');
        this.activeRefs = attachState(this.matchRoot, this.setState.bind(this));
    }

    render() {
        const { match } = this.props;

        let subheaderClass = this.isBlue ? "ss-subheader light-blue" : "ss-subheader light-red";
        let headerClass = this.isBlue ? "ss-title blue" : "ss-title red";
        let alliance = this.isBlue ? 'blue' : 'red';
        
        const jewelCount = getJewelCount(this.state, alliance);
        const autonomousGlyphCount = getAutonomousGlyphCount(this.state, alliance);
        const keyColumnBonusCount = getKeyColumnBonusCount(this.state, alliance);
        const safeZoneCount = getSafeZoneCount(this.state, alliance);
        const teleOpGlyphCount = getTeleopGlyphCount(this.state, alliance);
        const rowBonusCount = getRowBonusCount(this.state, alliance);
        const colBonusCount = getColBonusCount(this.state, alliance);
        const cipherBonusCount = getCipherBonusCount(this.state, alliance);
        const relicZone1Count = getRelicZone1Count(this.state, alliance);
        const relicZone2Count = getRelicZone2Count(this.state, alliance);
        const relicZone3Count = getRelicZone3Count(this.state, alliance);
        const uprightBonusCount = getUprightBonusCount(this.state, alliance);
        const balanceCount = getBalanceCount(this.state, alliance);

        return (
            <Grid fluid style={{ textAlign: "center" }}>
                <Row center="xs" style={{ marginTop: 20, marginBottom: 20 }}>
                    <Col xs={6} className={headerClass}>
                        <h1 style={{ marginTop: 10, marginBottom: 10 }}>
                            { this.isBlue ? "Blue" : "Red"}<br />
                            Alliance
                        </h1>
                    </Col>
                </Row>
                <Row center="xs" style={{ marginBottom: 20 }}>
                    <Col xs={6} className="ss-match-label">
                        <span>Match: </span><span style={{ textDecoration: "underline" }}>{match}</span>
                    </Col>
                    <Col xs={6} className="ss-match-label">
                        <span>Field: </span><span style={{ textDecoration: "underline" }}>#1</span>
                    </Col>
                </Row>
                <HeaderRow title="Autonomous Period" isBlue={this.isBlue}/>
                <AutoRow label="Jewels Remaining" data={jewelCount}/>
                <AutoRow label="Glyphs in Cryptobox" data={autonomousGlyphCount}/>
                <AutoRow label="Cryptobox Keys" data={keyColumnBonusCount}/>
                <AutoRow label="Robots in Safe Zone" data={safeZoneCount}/>

                <HeaderRow title="Driver Controlled Period" isBlue={this.isBlue}/>
                <div className="ss-flex-container">
                    <Row style={{ margin: 0, width: "100%", marginRight: 40, flexBasis: "25%" }}>
                        <Col style={{ width: "100%" }}>
                            <Row>
                                <Col xs={12} className={subheaderClass}>
                                    <span>Glyphs</span>
                                </Col>
                            </Row>
                            <Row center="xs" style={{ marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10 }}>
                                <Col style={{ width: "100%" }}>
                                    <span>Scored</span>
                                    <div className="ss-databox" style={{ width: "100%" }}>
                                        <span>{teleOpGlyphCount}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ margin: 0, flexBasis: "75%" }}>
                        <Col style={{ width: "100%" }} >
                            <Row>
                                <Col xs={12} className={subheaderClass}>
                                    <span>Completed</span>
                                </Col>
                            </Row>
                            <Row between="xs" style={{ marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10 }}>
                                <Col style={{ marginRight: 20, flexBasis: "28%" }}>
                                    <span>Rows</span>
                                    <div className="ss-databox" style={{ width: "100%" }}>
                                        <span>{rowBonusCount}</span>
                                    </div>
                                </Col>
                                <Col style={{ marginRight: 20, flexBasis: "28%" }}>
                                    <span>Columns</span>
                                    <div className="ss-databox" style={{ width: "100%" }}>
                                        <span>{colBonusCount}</span>
                                    </div>
                                </Col>
                                <Col style={{ flexBasis: "28%" }}>
                                    <span>Ciphers</span>
                                    <div className="ss-databox" style={{ width: "100%" }}>
                                        <span>{cipherBonusCount}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <HeaderRow title="End Game Period" isBlue={this.isBlue}/>
                <Row>
                    <Col xs={12} className={subheaderClass}>
                        <span>Relics</span>
                    </Col>
                </Row>
                <Row between="xs" style={{ marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10 }}>
                    <Col style={{ flexBasis: "22%" }}>
                        <span>Zone 1</span>
                        <div className="ss-databox" style={{ width: "100%" }}>
                            <span>{relicZone1Count}</span>
                        </div>
                    </Col>
                    <Col style={{ flexBasis: "22%" }}>
                        <span>Zone 2</span>
                        <div className="ss-databox" style={{ width: "100%" }}>
                            <span>{relicZone2Count}</span>
                        </div>
                    </Col>
                    <Col style={{ flexBasis: "22%" }}>
                        <span>Zone 3</span>
                        <div className="ss-databox" style={{ width: "100%" }}>
                            <span>{relicZone3Count}</span>
                        </div>
                    </Col>
                    <Col style={{ flexBasis: "22%" }}>
                        <span>Upright</span>
                        <div className="ss-databox" style={{ width: "100%" }}>
                            <span>{uprightBonusCount}</span>
                        </div>
                    </Col>
                </Row>
                <AutoRow label="Robots Balanced" data={balanceCount} />
            </Grid>
        );


    };

    componentWillUnmount() {
        this.activeRefs.forEach((l => l.off('value')));
        this.activeRefs = [];
    }

}

Scoresheet.propTypes = {
    match: PropTypes.string.isRequired,
    alliance: PropTypes.string,
};

Scoresheet.defaultProps = {
    alliance: "blue",
};

const ScoresheetPage = (props) => {

    let match = props.match.params.match.toUpperCase();

    return (
        <Grid fluid>
            <Row between="xs">
                <Col xs={6}>
                    <Scoresheet match={match} alliance="red"/>
                </Col>
                <Col xs={6}>
                    <Scoresheet match={match} alliance="blue"/>
                </Col>
            </Row>
        </Grid>
    );
};

export default ScoresheetPage;