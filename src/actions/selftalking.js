import axios from "tool/axios"
import config from "config"
// import {message} from "antd"
import { log, promiseCatch } from 'tool/baseTool'

export const selftalkingList = "selftalkingList"

const addSelftalkingAsync = (params)=>()=>{
    return axios.post(`${config.basicsUrl}/api/selftalking/add`,params)
        .then(data => {
            if(data.state){
                return data
            }
        }).catch(promiseCatch)
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
        }).catch(promiseCatch)
}

export default  {
    addSelftalkingAsync,
    selftalkingListAction,
    selftalkingListActionAsync
}