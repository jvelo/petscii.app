import React from 'react';

class Char extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var classNames = React.addons.classSet({
            'char': true,
            'selected': this.props.activeChar === this.props.children,
            'hover' : this.props.hoveredChar === this.props.children
        });
        return (
            <div data-char={this.props.children} className={classNames}>
                {this.props.children}
            </div>
        )
    }
}

export default Char;
