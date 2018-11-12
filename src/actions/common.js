import config from "config"
var {basicsUrl} = config

import {filterMenu} from "util/baseTool"
import axios from "util/axios"

export const menuInfo = "menuInfo"
export const userInfo = "userInfo"
export const mannerInfo = "mannerInfo"
export const menutoggle = "menutoggle"
export const resize = "resize"

import { message } from 'antd';

// 菜单格式化
var getList = (data,keyname) =>{
    var arr = [];
    for(var l = data.length,i=0;i<l;i++){
        data[i].key = keyname+"-"+i
        arr.push(data[i])
        if(data[i].childrens && data[i].childrens.length){
            arr.push( ...(getList(data[i].childrens,data[i].key)))
        }
    }
    return arr
}

// 菜单
const menuAction = value => ({
    type: menuInfo,
    payload: value
})
const syncMenuAction = (flag) => (dispatch) => {
    return axios.get(`${basicsUrl}/api/menu/list`)
        .then(data => {
                if(data.state){
                    var menu = filterMenu(data.result,flag)
                    var linearArr = getList(menu.origin,"menu")
                    menu.linearArr = linearArr
                    dispatch(menuAction(menu))
                }
                return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 菜单切换
const menutoggleAction = value=>({
    type: menutoggle,
    payload: value
})
// 用户信息Action
const userInfoAction = value => ({
    type: userInfo,
    payload: value
})
// 获取用户信息
const syncuserInfoAction = (params) => (dispatch) => {
    return axios.post(`${basicsUrl}/api/login/account`,params)
        .then(data => {
            if(data.state){
                dispatch(userInfoAction({
                    isLogin:true,
                    userId:data._id,
                    userName:data.userName,
                }))
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 核实用户信息
const syncuserInfoCheckAction = (params) => (dispatch) => {
    return axios.post(`${basicsUrl}/api/login/check`,params)
        .then(data => {
            if(data._id){
                dispatch(userInfoAction({
                    isLogin:true,
                    userId:data._id,
                    userName:data.userName,
                }))
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

//菜单分类配置项
const mannerAction = value => ({
    type: mannerInfo,
    payload: value
})
// 浏览器 resize
const resizeAction = value => ({
    type:resize ,
    payload: value
})

export default {
    menuAction,
    syncMenuAction,
    menutoggleAction,
    userInfoAction,
    syncuserInfoAction,
    syncuserInfoCheckAction,
    mannerAction,
    resizeAction
}