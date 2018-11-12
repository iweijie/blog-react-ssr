import axios from "util/axios"
import config from "config"
import {message} from "antd"

export const config_menu = "config_menu"
export const config_manner = "config_manner"


// 菜单配置项
const menuConfigAction = value => ({
    type: config_menu,
    payload: value
})
const menuConfigActionSync = (params)=>()=>{
    return axios.post(`${config.basicsUrl}/api/config/menu`,params)
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

export default  {
    menuConfigAction,
    menuConfigActionSync,
}