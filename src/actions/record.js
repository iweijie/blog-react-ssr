// 

import config from "config"
var { basicsUrl } = config

import axios from "tool/axios"
import { promiseCatch } from 'tool/baseTool'

export const getRecordCategoryList = "getRecordCategoryList"
export const getRecordList = "getRecordList"


// 菜单
const addRecordCategoryAsyncAction = (params) => () => {
    return axios.post(`${basicsUrl}/api/record/category/add`, params)
        .then(data => {
            debugger
            return data
        }).catch(promiseCatch)
}

const getRecordCategoryListAction = value => ({
    type: getRecordCategoryList,
    payload: value
})
const getRecordCategoryListAsyncAction = (params) => (dispatch) => {
    return axios.post(`${basicsUrl}/api/record/category/list`, params)
        .then(data => {
            const { state, result } = data
            if (state === 1) {
                result.forEach(v => {
                    v._tags = v.tags.join(" ")
                })
                dispatch(getRecordCategoryListAction(result))
            }
            return data
        }).catch(promiseCatch)
}

const addRecordAsyncAction = (params) => () => {
    return axios.post(`${basicsUrl}/api/record/add`, params)
        .then(data => {
            return data
        }).catch(promiseCatch)
}
const getRecordListAction = value => ({
    type: getRecordList,
    payload: value
})
const getRecordListAsyncAction = (params) => (dispatch) => {
    return axios.post(`${basicsUrl}/api/record/list`, params)
        .then(data => {
            const { state, result } = data
            if (state === 1) {
                dispatch(getRecordListAction(result))
            }
            return data
        }).catch(promiseCatch)
}


export default {
    getRecordListAction,
    addRecordAsyncAction,
    getRecordListAsyncAction,
    addRecordCategoryAsyncAction,
    getRecordCategoryListAction,
    getRecordCategoryListAsyncAction
}