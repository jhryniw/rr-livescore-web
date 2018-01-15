import React, { Component } from 'react';
import firebase from 'firebase';
import { Grid, Row, Col } from 'react-flexbox-grid';

const NoMatchesMessage = ({ isLoaded }) => (
    <p>{ isLoaded ? 'No matches to show' : 'Loading...' }</p>
);

const MatchList = ({matches}) => (
    <ul>
        {matches.map((match) => (
            <li key={match}>
                <a href={`/scoresheet/${match}`}>{`Match ${match.toString().toUpperCase()}`}</a>
            </li>
            ))
        }
    </ul>
);

const isValidPassword = (password) => {
    let pwdRef = firebase.database().ref('/auth/pwd');

    return new Promise((resolve, reject) => {
        pwdRef.once(
            'value',
            (snapshot) => {
                if (snapshot.val()) {
                    let validPwd = snapshot.val();
                    resolve(password === validPwd);
                }
                else {
                    reject('Password does not exist!');
                }
            })
    });
};

class ScoresheetMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            isLoaded: false,
            isAuthed: false,
            pwd: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentWillMount() {
        let matchRef = firebase.database().ref('matches');
        let matchQuery = matchRef.orderByKey();

        let callback = (snapshot) => {
            let newMatches = [];
            snapshot.forEach((match) => { newMatches.push(match.key); });
            this.setState({ matches: newMatches, isLoaded: true });
        };

        matchQuery.once(
            'value',
            callback.bind(this)
        );

        let setState = this.setState.bind(this);
        firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    setState({ isAuthed: true });
                }
                else {
                    setState({ isAuthed: false });
                }
            });
    }

    handleChange(event) {
        this.setState({ pwd: event.target.value });
    }

    signIn(event) {
        let setState = this.setState.bind(this);

        isValidPassword(this.state.pwd)
            .then(isValid => {
                if(isValid) {
                    firebase.auth().signInAnonymously()
                        .catch(error => console.error(error));
                }
                else {
                    console.log('Invalid password.');
                    setState({ pwd: '' });
                }
            })
            .catch(error => console.error(error));

        event.preventDefault();
    }

    signOut(event) {
        console.log('signing out');
        firebase.auth().signOut();
    }

    render() {
        return (
            <div style={{ margin: 10 }}>
                <Grid fluid>
                    <Row left="xs">
                        <Col xs={3} style={{ margin: "0 -15px" }}>
                            <h2>Match List</h2>
                        </Col>
                        <Col xsOffset={6} xs={3}>
                            { this.state.isAuthed ?
                                <button style={{marginTop: 25}} onClick={this.signOut}>Sign Out</button> :
                                <div style={{marginTop: 10}}>
                                    <span style={{ display: "inline-block" }}>Secret Password: </span>
                                    <input
                                        style={{ marginRight: 10 }}
                                        type="password"
                                        value={this.state.pwd}
                                        onChange={this.handleChange} />
                                    <button onClick={this.signIn}>Sign In</button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Grid>
                { this.state.matches.length === 0 ?
                    <NoMatchesMessage isLoaded={this.state.isLoaded}/> :
                    <MatchList matches={this.state.matches} />
                }
            </div>
        )
    }
}

export default ScoresheetMenu;
