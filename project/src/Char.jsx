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
        this.props.onCharSelected(this.props.children);
    }

    render() {

        return (
            <div ref="char" className={'char ' + (this.props.activeChar === this.props.children ? 'selected' : '' )}>
                {this.props.children}
            </div>
        )
    }
}

export default Char;
