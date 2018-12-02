import config from "config"
var {basicsUrl} = config

import {filterMenu} from "tool/baseTool"
import axios from "tool/axios"
import { promiseCatch } from 'tool/baseTool'

export const menuInfo = "menuInfo"
export const userInfo = "userInfo"
export const mannerInfo = "mannerInfo"
export const menutoggle = "menutoggle"
export const resize = "resize"
export const serverInfo = "serverInfo"
export const isLoadingInfo = "isLoadingInfo"

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
        }).catch(promiseCatch)
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
        }).catch(promiseCatch)
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
        }).catch(promiseCatch)
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
// 判断是否服务端渲染
const serverAction = value => {
    return {
        type:serverInfo ,
        payload: value
    }
}
// 加载动画
const isLoadingAction = value => ({
    type:isLoadingInfo ,
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
    resizeAction,
    serverAction,
    isLoadingAction
}