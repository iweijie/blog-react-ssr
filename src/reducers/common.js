/**
*作者: weijie
*功能描述: 一些公共信息存放
*/
import {
    resize,
    serverInfo,
    isLoadingInfo
} from "actions/common"
import isServer from "tool/env"


const info = !isServer ? {
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
} : {}

function browserInfo(state = info, action) {
    switch (action.type) {
        case resize:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

function isServerRendering(state = false, action) {
    switch (action.type) {
        case serverInfo:
            return action.payload;
        default:
            return state;
    }
}
function isLoading(state = false, action) {
    switch (action.type) {
        case isLoadingInfo:
            return action.payload;
        default:
            return state;
    }
}

export default {
    browserInfo,
    isServerRendering,
    isLoading
}