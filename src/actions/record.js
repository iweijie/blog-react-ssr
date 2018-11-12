import axios from "util/axios"
import config from "config"
import {message} from "antd"

export const recordConfigInfo = "recordConfigInfo" 
export const recordlistInfo = "recordlistInfo" 
export const clearRecordInfo = "clearRecordInfo" 

//清除数据
const clearRecordAction = () => ({
    type: clearRecordInfo,
})
// 设置配置表
const recordConfigActionSync = (params)=>(dispatch)=>{
    return axios.post(`${config.basicsUrl}/api/record/creation`,params)
        .then(data => {
            if(data.state){
                message.success(data.msg)
                dispatch(recordConfigAction(data.result))
            }
            return data.state
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 删除配置项
// const delRecordConfigActionSync = (params)=>(dispatch)=>{
//     return axios.post(`${config.basicsUrl}/api/record/deletconfig`,params)
//         .then(data => {
//             if(data.state){
//                 message.success(data.msg)
//             }
//             return data.state
//         }).catch(e => {
//             console.log(e);
//             message.error(e.messgae)
//         })
// }
//获取配置项
const recordConfigAction = value => ({
    type: recordConfigInfo,
    payload: value
})
const getRecordConfigActionSync = (params)=>(dispatch)=>{
    return axios.post(`${config.basicsUrl}/api/record/getconfiguration`,params)
        .then(data => {
            if(data.state){
                dispatch(recordConfigAction(data.result))
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
//设置记录
const setRecordListActionSync = (params)=>()=>{
    return axios.post(`${config.basicsUrl}/api/record/setrecord`,params)
        .then(data => {
            if(data.state){
                message.success(data.msg)
            }
            return data.state
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

//获取记录
const recordListAction = value => ({
    type: recordlistInfo,
    payload: value
})
const getRecordListActionSync = (params)=>(dispatch)=>{
    return axios.post(`${config.basicsUrl}/api/record/getlist`,params)
        .then(data => {
            if(data.state){
                message.success(data.msg)
                dispatch(recordListAction(data.result))
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

export default  {
    clearRecordAction,
    recordConfigAction,
    recordConfigActionSync,
    // delRecordConfigActionSync,
    getRecordConfigActionSync,
    setRecordListActionSync,
    recordListAction,
    getRecordListActionSync
}