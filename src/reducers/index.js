/**
 *作者: weijie
 *功能描述: 菜单数据
 *参数说明:
 *时间: 2018/4/16 10:52
 */
import {
    combineReducers
} from 'redux'
import {
    userInfo,
    // menutoggle
} from "actions/common"
import menuInfos from "./menu"
import home from "./home"
import article from "./article"
import common from "./common"
import selftalking from "./selftalking"

function userInfoModel(state = {
    isLogin: false,
}, action) {
    switch (action.type) {
        case userInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

// function menutoggleModel(state = false, action) {
//     switch (action.type) {
//         case menutoggle:
//             return action.payload;
//         default:
//             return state;
//     }
// }
const rootReducer = combineReducers({
    // menutoggleModel,
    userInfoModel,
    ...menuInfos,
    ...home,
    ...article,
    ...common,
    ...selftalking
})

export default rootReducer