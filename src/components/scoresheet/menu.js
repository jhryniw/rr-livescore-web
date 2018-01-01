import React, { Component } from 'react';
import firebase from 'firebase';

class ScoresheetMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            isLoaded: false,
        }
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
    }

    render() {

        if (this.state.matches.length === 0) {
            return (
                <div style={{ margin: 10 }}>
                    <h2>Match List</h2>
                    <p>{ this.state.isLoaded ? 'No matches to show' : 'Loading...' }</p>
                </div>
            );
        }

        return (
            <div style={{ margin: 10 }}>
                <h2>Match List</h2>
                <ul>
                    {this.state.matches.map((match) => (
                        <li key={match}>
                            <a href={`/scoresheet/${match}`}>{`Match ${match.toString().toUpperCase()}`}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ScoresheetMenu;
