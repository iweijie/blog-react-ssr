import axios from "tool/axios"
import config from "config"
// import { message } from "antd"
import { log, promiseCatch } from 'tool/baseTool'

export const config_menu = "config_menu"
export const config_manner = "config_manner"


// 菜单配置项
const menuConfigAction = value => ({
    type: config_menu,
    payload: value
})
const menuConfigActionSync = (params) => () => {
    return axios.post(`${config.basicsUrl}/api/config/menu`, params)
        .then(data => {
            if (data.state) {
                log.success(data.msg)
            }
            return data.state
        }).catch(promiseCatch)
}

export default {
    menuConfigAction,
    menuConfigActionSync,
}