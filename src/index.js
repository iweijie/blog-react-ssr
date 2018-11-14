/**
*作者: weijie
*功能描述: 渲染主页面文件
*参数说明:
*时间: 2018/4/16 10:53
*/
import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import Main from './main'
import configureStore from './store'
import "tool/pace.js"
import "tool/pace/themes/blue/pace-theme-minimal.css"
import "style/basics.scss"
import "./font/Offline-Rough.otf"
import "tool/love"

const App = (
    <Provider store={configureStore()}>
        <Main />
    </Provider>
)

const root = document.querySelector('#root');

// render(App, root)

if (root.hasChildNodes() === true) {
    // If it's an SSR, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(App, root);
    });
} else {
    // If we're not running on the server, just render like normal
    render(App, root);
}