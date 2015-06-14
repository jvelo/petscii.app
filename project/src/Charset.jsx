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

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.onTouchStartListener);
        window.removeEventListener('touchmove', this.onTouchMoveListener);
        window.removeEventListener('touchend', this.onTouchEndListener);
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
        return [
            "\u00A0!\"#$%&'()*+,"         .split(''),
            "-./:;<=>?@[&]"      .split(''),
            "\u2191\u2190\u2500\u2660\u2502\u2501\ue064\ue065\ue066\ue067\ue068\u256e\u2570".split(''),
            "\u256f\ue06c\u2572\u2571\ue06f\ue070\u2022\ue072\u2665\ue074\u256d\u2573\u25cb".split(''),
            "\u2663\ue079\u2666\u253c\ue07c\u2502\u03c0\u25e5\u258c\u2584\u2594\u2581\u258e".split(''),
            "\u2592\ue0a7\ue0a8\u25e4\ue0aa\u251c\u2597\u2514\u2510\u2582\u250c\u2534\u252c".split(''),
            "\u2524\u258e\u258d\ue0b6\ue0b7\ue0b8\u2583\ue0ba\u2596\u259d\u2518\u2598\u259a".split(''),
            "0123456789"     .split(''),
            "ABCDEFGHIJKLM"  .split(''),
            "NOPQRSTUVWXYZ"  .split('')
        ];

        //return "ABCDEFGHIJKLMNOPQRSTUVWXYZ\u2665\u2660\u2666\u2022\u25cb\u2663\u03c0\u002a".split("");
    }

    render() {
        return (
            <div className={'charset'} ref='charset'>
                { this.chars().map(row =>
                    <div className={'row'}>
                        { row.map(char => {
                            return (
                                <Char activeChar={this.props.activeChar}
                                      hoveredChar={this.state.hoveredChar}
                                      key={char}>
                                  {char}
                                </Char>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}

export default Charset;
