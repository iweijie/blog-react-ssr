import React, { Component } from 'react';
import Share from './page/comom/share'
import Loading from './page/comom/loading'
// import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import routers from './routers'
// import dispatchAction from "tool/dispatchAction"
// import AnimatedRouter from 'react-animated-router';
// import 'react-animated-router/animate.css';
// import io from "tool/socket"
// import "tool/observer"

export default class Main extends Component {

    render() {
        return (
            <div>
                <Share />
                <Loading />
                <Switch>
                    {
                        routers.map((route, i) => (
                            <Route key={i} exact={route.exact} path={route.path} component={route.component} />
                        ))
                    }
                </Switch>
            </div>
        )

    }
}