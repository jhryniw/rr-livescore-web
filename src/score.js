const RED = 'red';
const BLUE = 'blue';
const FRONT = 'front';
const BACK = 'back';

const alliances = [RED, BLUE];
const cryptoboxIds = [FRONT, BACK];

export const getDefaultState = () => ({
    jewelBlueFrontBlue: 0,
    jewelBlueFrontRed: 0,
    jewelBlueBackBlue: 0,
    jewelBlueBackRed: 0,
    jewelRedFrontBlue: 0,
    jewelRedFrontRed: 0,
    jewelRedBackBlue: 0,
    jewelRedBackRed: 0,
});

export const attachState = (rootRef, setState) => {
    let refs = [];

    refs.push.apply(refs, attachAllJewelListeners(rootRef, setState));

    return refs;
};



const attachAllJewelListeners = (rootRef, setState) => {
    let refs = [];
    for (let a of alliances) {
        for (let id of cryptoboxIds) {
            for (let sa of alliances) {
                refs.push(attachJewelListener(rootRef, setState, a, id, sa));
            }
        }
    }

    return refs;
};

const attachJewelListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/jewel/${scoreAlliance}Score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    let strScoreAlliance = scoreAlliance === BLUE ? 'Blue' : 'Red';
    var strVar = `jewel${strAlliance}${strId}${strScoreAlliance}`;

    ref.on(
        'value',
        (snapshot) => {
            if(snapshot.val()) {
                setState({ [strVar]: snapshot.val() })
            }
            else {
                setState({ [strVar]: 0 });
            }
        }
    );

    return ref;
};

export const getJewelScore = (state, alliance) => {
    if (alliance === RED) {
        return state.jewelBlueFrontRed
             + state.jewelBlueBackRed
             + state.jewelRedFrontRed
             + state.jewelRedBackRed;
    }
    else {
        return state.jewelBlueFrontBlue
            + state.jewelBlueBackBlue
            + state.jewelRedFrontBlue
            + state.jewelRedBackBlue;
    }
};
