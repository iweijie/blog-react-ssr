/**
 *作者: weijie
 *功能描述: axios请求数据配置文件
 *参数说明:
 *时间: 2018/4/2 14:25
 */
import axios from 'axios'
// import observer from 'tool/observer'
import { log, promiseCatch } from './baseTool'
import history from "tool/history"
import isServer from "tool/env"

axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"

// //修改请求配置
// axios.interceptors.request.use();

// //修改响应配置
axios.interceptors.response.use(response => {
    var data = response.data;
    if (response.status == 200 && data && data.state == 1) {
        return data
    }
    if (response.status == 200 && data && data.state == 2) {
        if (!isServer) {
            history.replace("/404")
        } else {
            return data
        }
    }
    if (response.status == 200 && data && data.state == 0) {
        if (!data.noTip) {
            log.error(data.msg)
        }
        return data
    }
}, promiseCatch);

// 动态添加cookie 用于服务端渲染

export const setAxiosCookie = (cookie) => {
    return axios.interceptors.request.use(
        function (config) {
            config.headers.cookie = cookie
            return config
        },
        function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        }
    )
}
export default axios