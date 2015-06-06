import React from 'react';

import Router from 'react-router';

var RouteHandler = Router.RouteHandler;

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <RouteHandler {...this.props} />
            </div>
        )
    }
}

App.contextTypes = {
    router: React.PropTypes.func
};

export default App;
