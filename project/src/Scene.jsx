import React from 'react';

import SceneChar from './SceneChar';

class Scene extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let node = React.findDOMNode(this.refs.scene);

        this.onTouchStartListener = this.onDrawingChar.bind(this);
        this.onTouchMoveListener = this.onDrawingChar.bind(this);
        this.onTouchEndListener = this.onDrawingChar.bind(this);
        node.addEventListener("touchstart", this.onTouchStartListener);
        node.addEventListener("touchmove", this.onTouchMoveListener);
        node.addEventListener("touchend", this.onTouchEndListener);
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.onTouchStartListener);
        window.removeEventListener('touchmove', this.onTouchMoveListener);
        window.removeEventListener('touchend', this.onTouchEndListener);
    }

    onDrawingChar(event) {
        let [x, y] = this.getPositionForTouch(event);
        
        if (!!x && !!y) {
            this.props.onCharDrawed(x, y);
        }
    }

    getPositionForTouch(event) {
        let touch = event.changedTouches[0],
            elem = document.elementFromPoint(touch.clientX, touch.clientY);
        return elem ? [elem.dataset.x, elem.dataset.y] : undefined;
    }

    render() {
        return (
            <div ref="scene" className={'scene'}>
              { this.props.drawing.map((row, y) => {
                      return (
                          <div className={'row'}>
                            { row.map((char, x) =>
                                <SceneChar
                                    key={x}
                                    x={x}
                                    y={y}>
                                {char}
                                </SceneChar>)
                            }
                          </div>
                      )
                  })
              }
            </div>
        )
    }
}

export default Scene;
