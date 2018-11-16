/**
 * 文件上传
 */
import axios from "tool/axios"
import config from "config"
// import { message } from "antd"
import { log, promiseCatch } from 'tool/baseTool'

const uploadAsync = (params) => () => {
    return axios.post(`${config.basicsUrl}/api/fileupload`, params, {
        "Content-Type": "multipart/form-data"
    })
        .then(data => {
            if (data.state === 1) {
                log.success(data.msg)
                return data
            }
        }).catch(promiseCatch)
}
export default {
    uploadAsync
}