import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
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

const Scoresheet = (props) => {
    let isBlue = props.alliance === "blue";

    const { match } = props;

    let subheaderClass = isBlue ? "ss-subheader light-blue" : "ss-subheader light-red";
    let headerClass = isBlue ? "ss-title blue" : "ss-title red";

    return (
        <Grid fluid style={{ textAlign: "center" }}>
            <Row center="xs" style={{ marginTop: 20, marginBottom: 20 }}>
                <Col xs={6} className={headerClass}>
                    <h1 style={{ marginTop: 10, marginBottom: 10 }}>
                        { isBlue ? "Blue" : "Red"}<br />
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
            <HeaderRow title="Autonomous Period" isBlue={isBlue}/>
            <AutoRow label="Jewels Remaining" data={0}/>
            <AutoRow label="Glyphs in Cryptobox" data={0}/>
            <AutoRow label="Cryptobox Keys" data={0}/>
            <AutoRow label="Robots in Safe Zone" data={0}/>

            <HeaderRow title="Driver Controlled Period" isBlue={isBlue}/>
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
                                    <span>0</span>
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
                                    <span>0</span>
                                </div>
                            </Col>
                            <Col style={{ marginRight: 20, flexBasis: "28%" }}>
                                <span>Columns</span>
                                <div className="ss-databox" style={{ width: "100%" }}>
                                    <span>0</span>
                                </div>
                            </Col>
                            <Col style={{ flexBasis: "28%" }}>
                                <span>Ciphers</span>
                                <div className="ss-databox" style={{ width: "100%" }}>
                                    <span>0</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <HeaderRow title="End Game Period" isBlue={isBlue}/>
            <Row>
                <Col xs={12} className={subheaderClass}>
                    <span>Relics</span>
                </Col>
            </Row>
            <Row between="xs" style={{ marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10 }}>
                <Col style={{ flexBasis: "22%" }}>
                    <span>Zone 1</span>
                    <div className="ss-databox" style={{ width: "100%" }}>
                        <span>0</span>
                    </div>
                </Col>
                <Col style={{ flexBasis: "22%" }}>
                    <span>Zone 2</span>
                    <div className="ss-databox" style={{ width: "100%" }}>
                        <span>0</span>
                    </div>
                </Col>
                <Col style={{ flexBasis: "22%" }}>
                    <span>Zone 3</span>
                    <div className="ss-databox" style={{ width: "100%" }}>
                        <span>0</span>
                    </div>
                </Col>
                <Col style={{ flexBasis: "22%" }}>
                    <span>Upright</span>
                    <div className="ss-databox" style={{ width: "100%" }}>
                        <span>0</span>
                    </div>
                </Col>
            </Row>
            <AutoRow label="Robots Balanced" data={0} />
        </Grid>
    );
};

Scoresheet.propTypes = {
    alliance: PropTypes.string,
};

Scoresheet.defaultProps = {
    alliance: "blue",
};

const ScoresheetPage = (props) => {

    console.log(props);
    console.log(props.match);
    let match = props.match.params.match.toUpperCase();

    return (
        <Row between="xs">
            <Col xs={6}>
                <Scoresheet match={match} alliance="red"/>
            </Col>
            <Col xs={6}>
                <Scoresheet match={match} alliance="blue"/>
            </Col>
        </Row>
    );
};

export default ScoresheetPage;