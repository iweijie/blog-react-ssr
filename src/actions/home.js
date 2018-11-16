import axios from "tool/axios"
import config from "config"
// import { message } from "antd"
import { log, promiseCatch } from 'tool/baseTool'

export const homeBgImage = "HomeBgImage"
export const homeScroll = "homeScroll"
// 首页背景图
const getHomeBgImageAction = value => ({
    type: homeBgImage,
    payload: value
})
const getHomeBgImageActionASync = () => (dispatch) => {
    return axios.get(`${config.basicsUrl}/api/recommend/image/zr`)
        .then(data => {
            if (data.state === 1) {
                dispatch(getHomeBgImageAction(data.result))
            }
            return data
        }).catch(promiseCatch)
}
const homeScrollTopAction = (value) => {
    return {
        type: homeScroll,
        payload: value
    }
}
export default {
    homeScrollTopAction,
    getHomeBgImageAction,
    getHomeBgImageActionASync,
}