import React from 'react';

import SceneChar from './SceneChar';

class Scene extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div ref="scene" className={'scene'}>
              { this.props.drawing.map((char, index) =>
                  <SceneChar {...this.props} key={index} index={index}>{char}</SceneChar>) }
            </div>
        )
    }
}

export default Scene;
