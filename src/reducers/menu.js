import { menuInfo } from "actions/common"
/**
*作者: weijie
*功能描述: 左侧菜单数据
*参数说明:
*/
function menuInfos(state = {
    menuList: [],
    menuPath: [],
    linearArr: [],
    origin: []
}, action) {
    switch (action.type) {
        case menuInfo:
            return {
                ...state,
                ...action.payload,

            };
        default:
            return state;
    }
}

export default {
    menuInfos
}