import React from 'react';
import Router from 'react-router';

import Char from './Char';

class Charset extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hoveredChar: undefined
        };
    }

    componentDidMount() {
        let node = React.findDOMNode(this.refs.charset);

        this.onTouchStartListener = this.onHoverChar.bind(this);
        this.onTouchMoveListener = this.onHoverChar.bind(this);
        this.onTouchEndListener = this.onTouchEnd.bind(this);

        node.addEventListener('touchstart', this.onTouchStartListener);
        node.addEventListener('touchmove', this.onTouchMoveListener);
        node.addEventListener('touchend', this.onTouchEndListener);
    }

    onTouchEnd(event) {
        event.preventDefault();
        event.stopPropagation();
        var char = this.getCharForTouchEvent(event);

        if (!!char) {
            this.props.onCharSelected(char);
        }

        this.setState({
            hoveredChar: undefined
        });
    }

    onHoverChar(event) {
        event.preventDefault();
        event.stopPropagation();

        var char = this.getCharForTouchEvent(event);

        this.setState({
            hoveredChar: char
        });
    }

    getCharForTouchEvent(event) {
        let touch = event.changedTouches[0],
            elem = document.elementFromPoint(touch.clientX, touch.clientY);
        return elem ? elem.dataset.char : undefined;
    }

    chars() {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    }

    render() {
        return (
            <div className={'charset'} ref='charset'>
                { this.chars().map(char =>
                    <Char activeChar={this.props.activeChar}
                          hoveredChar={this.state.hoveredChar}
                          key={char}>
                      {char}
                    </Char>
                )}
            </div>
        )
    }
}

export default Charset;
