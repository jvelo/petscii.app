require('es5-shim');
require('es6-shim');

var React = require('react/addons');
var Router = require('react-router');

var App = require('./App');
var Editor = require('./Editor');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

require('viewport-units-buggyfill').init();

// Initialize Routes

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Editor}/>
    </Route>
);

function init() {
    React.initializeTouchEvents(true);
    Router.run(routes, (Handler, state) => {
        var params = state.params;
        React.render(<Handler params={params} path={state.path}/>, document.getElementById('content'), () => {
            !!window.cordova && setTimeout(() => {
                navigator.splashscreen.hide();
            }, 0);
        });
    });
}

!window.cordova ? init() : document.addEventListener("deviceready", init, false);