/**
*作者: weijie
*功能描述: 一些公共信息存放
*/
import {resize} from "actions/common"


function browserInfo(state ={
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    widht: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}, action) {
    switch (action.type) {
        case resize:
            return {
                ...state,
                ...action.payload
            } ;
        default:
            return state;
    }
}

export default {
    browserInfo
}