import React from 'react';

class Char extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div ref="char"
                 data-x={this.props.x}
                 data-y={this.props.y}
                 className={'char'}>
                {this.props.children}
            </div>
        )
    }
}

export default Char;
