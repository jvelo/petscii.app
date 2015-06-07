import React from 'react';
import Router from 'react-router';

import Charset from './Charset';
import Scene from './Scene';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        let nbsp = String.fromCharCode(160),
            emptyMatrix = Array.apply(null, {length: 10}).map(
                row => {
                    return Array.apply(null, {length: 20}).map(entry => nbsp)
                }
        );

        this.state = {
            activeChar: undefined,
            drawing: emptyMatrix
        };
    }

    onCharSelected(char) {
        this.setState({
            activeChar: char
        });
    }

    onCharDrawn(x, y) {
        if (!!this.state.activeChar) {
            let newMatrix = this.state.drawing.slice();
            let newRow = newMatrix[y].slice();
            newRow[x] = this.state.activeChar;
            newMatrix[y] = newRow;
            this.setState({
                drawing: newMatrix
            });
        }
    }

    render() {
        return (
            <div className={'editor'}>
                <Charset
                    onCharSelected={this.onCharSelected.bind(this)}
                    activeChar={this.state.activeChar}>
                </Charset>
                <Scene
                    drawing={this.state.drawing}
                    onCharDrawed={this.onCharDrawn.bind(this)}>
                </Scene>
            </div>
        )
    }
}

export default Editor;
