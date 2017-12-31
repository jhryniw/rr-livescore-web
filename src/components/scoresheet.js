import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Scoresheet = (props) => {
    let isBlue = props.alliance === "blue";

    return (
        <div><p>Hello!</p></div>
    );
};

Scoresheet.propTypes = {
    alliance: PropTypes.string.isRequired,
};

export default Scoresheet;