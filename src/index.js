/**
*作者: weijie
*功能描述: 渲染主页面文件
*参数说明:
*时间: 2018/4/16 10:53
*/
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './main'
import configureStore from './store'
import "util/pace.js"
import "util/pace/themes/blue/pace-theme-minimal.css"
import "style/basics.scss"
import "./font/Offline-Rough.otf"

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')  
)