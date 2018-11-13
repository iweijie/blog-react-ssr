import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from "tool/history";
import { Router, Switch, Route } from 'react-router-dom';
import routers from './routers'
import { throttle } from "tool/baseTool"
import dispatchAction from "tool/dispatchAction"
// import AnimatedRouter from 'react-animated-router';
// import 'react-animated-router/animate.css';
// import io from "tool/socket"
// import "tool/observer"

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    UNSAFE_componentWillMount() {
        this.props.syncuserInfoCheckAction()
        this.props.getHomeBgImageActionASync()
    }
    componentDidMount() {
        window.addEventListener("resize", throttle(() => {
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let widht = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.props.resizeAction({
                height,
                widht
            })
        }, 100))
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {routers.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </Router>
        );
    }
}
const mapStateToProps = () => {
    return {}
}
export default connect(mapStateToProps, dispatchAction)(App)





//  () => (
//     <Router history={history}>
//         <Switch>
//             {routes.map((route, i) => (
//                 <Route key={i} {...route} />
//             ))}
//         </Switch>
//     </Router>
// )