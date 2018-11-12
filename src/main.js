import React, { Component } from 'react';
import { connect } from 'react-redux';
import routers from './routers'
import { throttle } from "util/baseTool"
import dispatchAction from "util/dispatchAction"
// import AnimatedRouter from 'react-animated-router';
// import 'react-animated-router/animate.css';
// import io from "util/socket"
// import "util/observer"
import "util/love"

const router = routers();

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
            router
        );
    }
}
const mapStateToProps = () => {
    return {}
}
export default connect(mapStateToProps, dispatchAction)(App)





