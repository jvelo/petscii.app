import React from 'react';

class Char extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let node = React.findDOMNode(this.refs.char);

        this.onTouchStartListener = this.onTouchStart.bind(this);
        node.addEventListener("touchstart", this.onTouchStartListener);
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.onTouchStartListener);
    }

    onTouchStart() {
        console.log("Touched", this.props);
        this.props.onCharDrawed(this.props.index);
    }

    render() {
        return (
            <div ref="char" className={'char'}>
                {this.props.children}
            </div>
        )
    }
}

export default Char;
