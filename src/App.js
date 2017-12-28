import React, {Component} from 'react';
import logo from './logo.svg';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="App-title">Live Unofficial Score</h1>
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            <h2>
                                Auto<br/>
                                Period
                            </h2>
                        </Col>
                        <Col xs={3.3} className="red-score-section">
                            <p>0</p>
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
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col xs={2}>
                            <h2>
                                Driver<br/>
                                Controlled
                            </h2>
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
}

export default App;
