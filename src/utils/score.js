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
	
	autonomousGlyphScoreBlueBack: 0,
	autonomousGlyphScoreBlueFront: 0,
	autonomousGlyphScoreRedBack: 0,
	autonomousGlyphScoreRedFront: 0,
	
	keyColumnBonusBlueBack: 0,
	keyColumnBonusBlueFront: 0,
	keyColumnBonusRedBack: 0,
	keyColumnBonusRedFront: 0,
	
	safeZoneBlueBack: 0,
	safeZoneBlueFront: 0,
	safeZoneRedBack: 0,
	safeZoneRedFront: 0,
	
	teleopGlyphScoreBlueBack: 0,
	teleopGlyphScoreBlueFront: 0,
	teleopGlyphScoreRedBack: 0,
	teleopGlyphScoreRedFront: 0,
	
	rowBonusBlueBack: 0,
	rowBonusBlueFront: 0,
	rowBonusRedBack: 0,
	rowBonusRedFront: 0,
	
	colBonusBlueBack: 0,
	colBonusBlueFront: 0,
	colBonusRedBack: 0,
	colBonusRedFront: 0,
	
	cipherBonusBlueBack: 0,
	cipherBonusBlueFront: 0,
	cipherBonusRedBack: 0,
	cipherBonusRedFront: 0,
	
	relicScoreBlueBack: 0,
	relicScoreBlueFront: 0,
	relicScoreRedBack: 0,
	relicScoreRedFront: 0,
	
	uprightScoreBlueBack: 0,
	uprightScoreBlueFront: 0,
	uprightScoreRedBack: 0,
	uprightScoreRedFront: 0,
	
	balanceScoreBlueBack: 0,
	balanceScoreBlueFront: 0,
	balanceScoreRedBack: 0,
	balanceScoreRedFront: 0
	
});

export const attachState = (rootRef, setState) => {
    let refs = [];

    refs.push.apply(refs, attachAllListeners(rootRef, setState));

    return refs;
};

const attachAllListeners = (rootRef, setState) => {
    let refs = [];
    for (let a of alliances) {
        for (let id of cryptoboxIds) {
            refs.push(attachAutonomousGlyphListener(rootRef, setState, a, id));
            refs.push(attachAutonomousKeyListener(rootRef, setState, a, id));
            refs.push(attachSafeZoneListener(rootRef, setState, a, id));
            refs.push(attachTeleopGlyphListener(rootRef, setState, a, id));
            refs.push(attachRowListener(rootRef, setState, a, id));
            refs.push(attachColumnListener(rootRef, setState, a, id));
            refs.push(attachCipherListener(rootRef, setState, a, id));
            refs.push(attachRelicListener(rootRef, setState, a, id));
            refs.push(attachUprightListener(rootRef, setState, a, id));
            refs.push(attachBalanceListener(rootRef, setState, a, id));
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
	
	//console.log(path);

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

const attachAutonomousGlyphListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/autonomousCryptobox/autonomousGlyphScore`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar= `autonomousGlyphScore${strAlliance}${strId}`;
	
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

const attachAutonomousKeyListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/autonomousCryptobox/keyColumnBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar= `keyColumnBonus${strAlliance}${strId}`;
	
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

const attachSafeZoneListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/safeZone/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `safeZone${strAlliance}${strId}`;
	
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

const attachTeleopGlyphListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/teleopGlyphScore`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `teleopGlyphScore${strAlliance}${strId}`;
	
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
const attachRowListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/rowBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `rowBonus${strAlliance}${strId}`;
	
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
const attachColumnListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/colBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `colBonus${strAlliance}${strId}`;
	
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
const attachCipherListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/cipherBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `cipherBonus${strAlliance}${strId}`;
	
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
const attachRelicListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/relic/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `relicScore${strAlliance}${strId}`;
	
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

const attachUprightListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/upright/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `uprightScore${strAlliance}${strId}`;
	
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

const attachBalanceListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/balance/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `balanceScore${strAlliance}${strId}`;
	
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

export const getAutonomousGlyphScore = (state, alliance) => {
    if (alliance === RED) {
        return state.autonomousGlyphScoreRedFront
             + state.autonomousGlyphScoreRedBack;
    }
    else {
        return state.autonomousGlyphScoreBlueFront
            + state.autonomousGlyphScoreBlueBack;
    }
};

export const getAutonomousKeyBonus = (state, alliance) => {
    if (alliance === RED) {
        return state.keyColumnBonusRedFront
             + state.keyColumnBonusRedBack;
    }
    else {
        return state.keyColumnBonusBlueFront
            + state.keyColumnBonusBlueBack;
    }
};


export const getSafeZoneScore = (state, alliance) => {
    if (alliance === RED) {
        return state.safeZoneRedFront
             + state.safeZoneRedBack;
    }
    else {
        return state.safeZoneBlueFront
            + state.safeZoneBlueBack;
    }
};

export const getTeleopGlyphScore = (state, alliance) => {
    if (alliance === RED) {
        return state.teleopGlyphScoreRedFront
             + state.teleopGlyphScoreRedBack;
    }
    else {
        return state.teleopGlyphScoreBlueFront
            + state.teleopGlyphScoreBlueBack;
    }
};

export const getRowBonus = (state, alliance) => {
    if (alliance === RED) {
        return state.rowBonusRedFront
             + state.rowBonusRedBack;
    }
    else {
        return state.rowBonusBlueFront
            + state.rowBonusBlueBack;
    }
};

export const getColBonus = (state, alliance) => {
    if (alliance === RED) {
        return state.colBonusRedFront
             + state.colBonusRedBack;
    }
    else {
        return state.colBonusBlueFront
            + state.colBonusBlueBack;
    }
};

export const getCipherBonus = (state, alliance) => {
    if (alliance === RED) {
        return state.cipherBonusRedFront
             + state.cipherBonusRedBack;
    }
    else {
        return state.cipherBonusBlueFront
            + state.cipherBonusBlueBack;
    }
};

export const getRelicScore = (state, alliance) => {
    if (alliance === RED) {
        return state.relicScoreRedFront
             + state.relicScoreRedBack;
    }
    else {
        return state.relicScoreBlueFront
            + state.relicScoreBlueBack;
    }
	
};

export const getUprightScore = (state, alliance) => {
    if (alliance === RED) {
        return state.uprightScoreRedFront
             + state.uprightScoreRedBack;
    }
    else {
        return state.uprightScoreBlueFront
            + state.uprightScoreBlueBack;
    }
};

export const getBalanceScore = (state, alliance) => {
    if (alliance === RED) {
        return state.balanceScoreRedFront
             + state.balanceScoreRedBack;
    }
    else {
        return state.balanceScoreBlueFront
            + state.balanceScoreBlueBack;
    }
};
