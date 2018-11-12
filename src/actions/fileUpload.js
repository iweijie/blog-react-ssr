/**
 * 文件上传
 */
import axios from "util/axios"
import config from "config"
import {message} from "antd"

const uploadAsync = (params)=>()=>{
    return axios.post(`${config.basicsUrl}/api/fileupload`,params,{
        "Content-Type":"multipart/form-data"
    })
        .then(data => {
            if(data.state === 1){
                message.success(data.msg)
                return data
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
export default  {
    uploadAsync
}