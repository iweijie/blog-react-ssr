import axios from "util/axios"
import config from "config"
import {message} from "antd"

export const selftalkingList = "selftalkingList"

const addSelftalkingAsync = (params)=>()=>{
    return axios.post(`${config.basicsUrl}/api/selftalking/add`,params)
        .then(data => {
            if(data.state){
                return data
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
const selftalkingListAction = (value) => ({
    type: selftalkingList,
    payload:value
})
const selftalkingListActionAsync = (params)=>(dispatch)=>{
    return axios.post(`${config.basicsUrl}/api/selftalking/list`,params)
        .then(data => {
            if(data.state){
                dispatch(selftalkingListAction({
                    ...params,
                    count:data.count,
                    result:data.result
                }))
                return data
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

export default  {
    addSelftalkingAsync,
    selftalkingListAction,
    selftalkingListActionAsync
}