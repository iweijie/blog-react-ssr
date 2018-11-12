import {
    homeBgImage,
    homeScroll
} from "actions/home"
/**
*作者: weijie
*功能描述: home 背景
*参数说明:
*/

function homeBgList(state = [], action) {
    switch (action.type) {
        case homeBgImage:
            return action.payload;
        default:
            return state;
    }
}
function homeScrollToTop(state = 0, action) {
    switch (action.type) {
        case homeScroll:
            return action.payload;
        default:
            return state;
    }
}
export default {
    homeBgList,
    homeScrollToTop
}