import React from 'react';
import Router from 'react-router';

import Charset from './Charset';
import Scene from './Scene';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        let nbsp = String.fromCharCode(160),
            emptyDrawing = Array.apply(null, {length: 128}).map(entry => nbsp);

        this.state = {
            activeChar: undefined,
            drawing: emptyDrawing
        };
    }

    onCharSelected(char) {
        this.setState({
            activeChar: char
        });
    }

    onCharDrawn(position) {
        if (!!this.state.activeChar) {
            let drawing = this.state.drawing.slice();
            drawing[position] = this.state.activeChar;
            this.setState({
                drawing: drawing
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
