const RED = 'red';
const BLUE = 'blue';
const FRONT = 'front';
const BACK = 'back';

const alliances = [RED, BLUE];
const cryptoboxIds = [FRONT, BACK];

const getVarName = (alliance, id, varName, countId) => {
    if (countId !== 'count') {
        let camelCountId = countId.charAt(0).toUpperCase() + countId.slice(1);
        return varName + alliance + id + camelCountId;
    }
    
    return varName + alliance + id;
};

const getCallback = (setState, strVar) => {
    return (snapshot) => {
        if(snapshot.val()) {
            setState({ [strVar]: snapshot.val() });
        }
        else {
            setState({ [strVar]: 0 });
        }
    };
};

const attachCallback = (rootRef, setState, alliance, id, varName, countId, type='on') => {
    const path = [alliance.toLowerCase(), id.toLowerCase(), varName, countId].join('/');
    const strVar = getVarName(alliance, id, varName, countId);
    const ref = rootRef.child(path);

    const callback = getCallback(setState, strVar);

    if (type === 'once') {
        ref.once(
            'value',
            callback
        );
    }
    else {
        ref.on(
            'value',
            callback
        );
    }
};

const makeGet = (varName, countId='count') => {
    const redFrontVar = getVarName('Red', 'Front', varName, countId);
    const redBackVar = getVarName('Red', 'Back', varName, countId);
    const blueFrontVar = getVarName('Blue', 'Front', varName, countId);
    const blueBackVar = getVarName('Blue', 'Back', varName, countId);

    return (state, alliance) => {
        if (alliance === RED) {
            console.log(redFrontVar, redBackVar, state[redFrontVar], state[redBackVar]);
            return state[redFrontVar] + state[redBackVar];
        }
        else {
            return state[blueFrontVar] + state[blueBackVar];
        }
    }
};

function Node(ref, callback) {
    this.ref = ref;
    this.callback = callback;
}

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
    balanceScoreRedFront: 0,
	
    jewelBlueFrontBlueCount: 0,
    jewelBlueFrontRedCount: 0,
    jewelBlueBackBlueCount: 0,
    jewelBlueBackRedCount: 0,
    jewelRedFrontBlueCount: 0,
    jewelRedFrontRedCount: 0,
    jewelRedBackBlueCount: 0,
    jewelRedBackRedCount: 0,
	
	autonomousCryptoboxBlueBackAutonomousGlyphCount: 0,
	autonomousCryptoboxBlueFrontAutonomousGlyphCount: 0,
	autonomousCryptoboxRedBackAutonomousGlyphCount: 0,
	autonomousCryptoboxRedFrontAutonomousGlyphCount: 0,
	
	autonomousCryptoboxBlueBackKeyColumnCount: 0,
	autonomousCryptoboxBlueFrontKeyColumnCount: 0,
	autonomousCryptoboxRedBackKeyColumnCount: 0,
	autonomousCryptoboxRedFrontKeyColumnCount: 0,
	
	safeZoneBlueBackCount: 0,
	safeZoneBlueFrontCount: 0,
	safeZoneRedBackCount: 0,
	safeZoneRedFrontCount: 0,
	
	teleopCryptoboxBlueBackTeleopGlyphCount: 0,
	teleopCryptoboxBlueFrontTeleopGlyphCount: 0,
	teleopCryptoboxRedBackTeleopGlyphCount: 0,
	teleopCryptoboxRedFrontTeleopGlyphCount: 0,
	
	teleopCryptoboxBlueBackRowCount: 0,
	teleopCryptoboxBlueFrontRowCount: 0,
	teleopCryptoboxRedBackRowCount: 0,
	teleopCryptoboxRedFrontRowCount: 0,
	
	teleopCryptoboxBlueBackColCount: 0,
	teleopCryptoboxBlueFrontColCount: 0,
	teleopCryptoboxRedBackColCount: 0,
	teleopCryptoboxRedFrontColCount: 0,
	
	teleopCryptoboxBlueBackCipherCount: 0,
	teleopCryptoboxBlueFrontCipherCount: 0,
	teleopCryptoboxRedBackCipherCount: 0,
	teleopCryptoboxRedFrontCipherCount: 0,
	
	relicBlueBackZone1Count: 0,
	relicBlueFrontZone1Count: 0,
	relicRedBackZone1Count: 0,
	relicRedFrontZone1Count: 0,
	
	relicBlueBackZone2Count: 0,
	relicBlueFrontZone2Count: 0,
	relicRedBackZone2Count: 0,
	relicRedFrontZone2Count: 0,
	
	relicBlueBackZone3Count: 0,
	relicBlueFrontZone3Count: 0,
	relicRedBackZone3Count: 0,
	relicRedFrontZone3Count: 0,
	
	uprightBlueBackCount: 0,
	uprightBlueFrontCount: 0,
	uprightRedBackCount: 0,
	uprightRedFrontCount: 0,
	
	balanceBlueBackCount: 0,
	balanceBlueFrontCount: 0,
	balanceRedBackCount: 0,
    balanceRedFrontCount: 0
	
});

export const attachState = (rootRef, setState) => {
    const nodes = [];

    nodes.push.apply(nodes, attachAllListeners(rootRef, setState));

    return nodes;
};

const attachAllListeners = (rootRef, setState) => {
    let nodes = [];
    for (let a of alliances) {
        let strAlliance = a === BLUE ? 'Blue' : 'Red';
        for (let id of cryptoboxIds) {
            let strId = id === FRONT ? 'Front' : 'Back';
            nodes.push(attachAutonomousGlyphListener(rootRef, setState, a, id));
            nodes.push(attachAutonomousKeyListener(rootRef, setState, a, id));
            nodes.push(attachSafeZoneListener(rootRef, setState, a, id));
            nodes.push(attachTeleopGlyphListener(rootRef, setState, a, id));
            nodes.push(attachRowListener(rootRef, setState, a, id));
            nodes.push(attachColumnListener(rootRef, setState, a, id));
            nodes.push(attachCipherListener(rootRef, setState, a, id));
            nodes.push(attachRelicListener(rootRef, setState, a, id));
            nodes.push(attachUprightListener(rootRef, setState, a, id));
            nodes.push(attachBalanceListener(rootRef, setState, a, id));

            attachCallback(rootRef, setState, strAlliance, strId, 'jewel', 'redCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'jewel', 'blueCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'autonomousCryptobox', 'autonomousGlyphCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'autonomousCryptobox', 'keyColumnCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'safeZone', 'count', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'teleopCryptobox', 'teleopGlyphCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'teleopCryptobox', 'rowCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'teleopCryptobox', 'colCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'teleopCryptobox', 'cipherCount', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'relic', 'zone1Count', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'relic', 'zone2Count', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'relic', 'zone3Count', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'upright', 'count', 'once');
            attachCallback(rootRef, setState, strAlliance, strId, 'balance', 'count', 'once');

            for (let sa of alliances) {
                nodes.push(attachJewelListener(rootRef, setState, a, id, sa));
            }
        }
    }

    return nodes;
};

const attachJewelListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/jewel/${scoreAlliance}Score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    let strScoreAlliance = scoreAlliance === BLUE ? 'Blue' : 'Red';
    var strVar = `jewel${strAlliance}${strId}${strScoreAlliance}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};

const attachAutonomousGlyphListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/autonomousCryptobox/autonomousGlyphScore`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar= `autonomousGlyphScore${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};

const attachAutonomousKeyListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/autonomousCryptobox/keyColumnBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar= `keyColumnBonus${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};

const attachSafeZoneListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/safeZone/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `safeZone${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};

const attachTeleopGlyphListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/teleopGlyphScore`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `teleopGlyphScore${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};
const attachRowListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/rowBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `rowBonus${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};
const attachColumnListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/colBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `colBonus${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};
const attachCipherListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/teleopCryptobox/cipherBonus`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `cipherBonus${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};
const attachRelicListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/relic/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `relicScore${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};

const attachUprightListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/upright/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `uprightScore${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
};

const attachBalanceListener = (rootRef, setState, alliance, id, scoreAlliance) => {
    let path = `${alliance}/${id}/balance/score`;
    let ref = rootRef.child(path);

    let strAlliance = alliance === BLUE ? 'Blue' : 'Red';
    let strId = id === FRONT ? 'Front' : 'Back';
    var strVar = `balanceScore${strAlliance}${strId}`;

    const callback = getCallback(setState, strVar);

    ref.on(
        'value',
        callback
    );

    return new Node(ref, callback);
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

export const getJewelCount = (state, alliance) => {
    if (alliance === RED) {
        return state.jewelBlueFrontRedCount
             + state.jewelBlueBackRedCount
             + state.jewelRedFrontRedCount
             + state.jewelRedBackRedCount;
    }
    else {
        return state.jewelBlueFrontBlueCount
            + state.jewelBlueBackBlueCount
            + state.jewelRedFrontBlueCount
            + state.jewelRedBackBlueCount;
    }
};

export const getAutonomousGlyphCount = makeGet("autonomousCryptobox", "autonomousGlyphCount");
export const getKeyColumnBonusCount = makeGet("autonomousCryptobox", "keyColumnCount");
export const getSafeZoneCount = makeGet("safeZone");
export const getTeleopGlyphCount = makeGet("teleopCryptobox", "teleopGlyphCount");
export const getRowBonusCount = makeGet("teleopCryptobox", "rowCount");
export const getColBonusCount = makeGet("teleopCryptobox", "colCount");
export const getCipherBonusCount = makeGet("teleopCryptobox", "cipherCount");
export const getRelicZone1Count = makeGet("relic", "zone1Count");
export const getRelicZone2Count = makeGet("relic", "zone2Count");
export const getRelicZone3Count = makeGet("relic", "zone3Count");
export const getUprightBonusCount = makeGet("upright");
export const getBalanceCount = makeGet("balance");

export const getAutonomousScore = (state, alliance) => {
    return getAutonomousGlyphScore(state, alliance) 
        + getAutonomousKeyBonus(state, alliance)
        + getJewelScore(state, alliance)
        + getSafeZoneScore(state, alliance);
};

export const getTeleopScore = (state, alliance) => {
    return getTeleopGlyphScore(state, alliance)
        + getRowBonus(state, alliance)
        + getColBonus(state, alliance)
        + getCipherBonus(state, alliance)
        + getRelicScore(state, alliance)
        + getUprightScore(state, alliance)
        + getBalanceScore(state, alliance)
};

export const getTotalScore = (state, alliance) => {
    return getAutonomousScore(state, alliance) 
        + getTeleopScore(state, alliance);
};
