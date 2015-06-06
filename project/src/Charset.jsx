import React from 'react';
import Router from 'react-router';

import Char from './Char';

class Charset extends React.Component {

    constructor(props) {
        super(props);
    }

    chars() {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    }

    render() {
        return (
            <div className={'charset'}>
                { this.chars().map(char => <Char {...this.props} key={char}>{char}</Char>) }
            </div>
        )
    }
}

export default Charset;
