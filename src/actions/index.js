/**
*作者: weijie
*功能描述: action 集合
*时间: 2018/4/16 10:50
*/
import common from "./common"
import articleAction from "./article"
import configAction from "./config"
import home from "./home"
import fileUpload from "./fileUpload"
import selftalking from "./selftalking"


const actions = {
    ...common,
    ...articleAction,
    ...configAction,
    ...home,
    ...fileUpload,
    ...selftalking
}

export default actions




