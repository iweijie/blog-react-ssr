import axios from "util/axios"
import config from "config"
import { message } from "antd"
export const appendArticleList = "appendArticleList"
export const replaceArticleList = "replaceArticleList"
export const cleararticleList = "cleararticleList"
export const articleDetials = "articleDetials"
export const articlesubmit = "articlesubmit"
export const pushReview = "pushReview"
export const tagsList = "tagsList"
export const detailTagsList = "detailTagsList"
export const currentTag = "getCurrentTag"
export const recommendList = "recommendList"


// 清空文章列表
const clearArticleListAction = () => ({
    type: cleararticleList
})
// 文章列表(替换)
const replaceArticleListAction = value => ({
    type: replaceArticleList,
    payload: value
})
// 文章列表(追加)
const appendArticleListAction = value => ({
    type: appendArticleList,
    payload: value
})
// 默认追加模式
const getArticleListAsync = (params, pattern) => (dispatch) => {
    return axios.get(`${config.basicsUrl}/api/article/list`, { params })
        .then(data => {
            if (data.state == 1) {
                pattern ? dispatch(replaceArticleListAction(data)) : dispatch(appendArticleListAction(data));
                return data
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 文章详情
const articleDetailsAction = value => ({
    type: articleDetials,
    payload: value
})
const getArticleDetails = (params) => (dispatch) => {
    return axios.get(`${config.basicsUrl}/api/article/get`, {
        params
    })
        .then(data => {
            if (data.state == 1) {
                let resdata = data.result;
                dispatch(articleDetailsAction(resdata))
                return resdata
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

// 文章 新增与修改
const articlesubmitAction = value => ({
    type: articleDetials,
    payload: value
})
const syncArticlesubmit = (params) => () => {
    return axios.post(`${config.basicsUrl}/api/article/add`, params)
        .then(data => {
            if (data.state == 1) {
                message.success(data.msg)
            }
            return data.state
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 添加留言
const syncArticleLeave = (value) => {
    return {
        type: pushReview,
        payload: value
    }
}
const syncArticleLeavesubmit = (params) => (dispatch) => {
    return axios.post(`${config.basicsUrl}/api/article/review/add`, params)
        .then(data => {
            if (data.state == 1) {
                message.success(data.msg)
                dispatch(syncArticleLeave(data.result))
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 更新查看次数
const asyncArticlTime = (params) => () => {
    return axios.post(`${config.basicsUrl}/api/article/time`, params)
        .then(data => {
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 新增 or 编辑 标签 
const asyncSetTag = (params) => () => {
    return axios.post(`${config.basicsUrl}/api/tags/add`, params)
        .then(data => {
            if (data.state == 1) {
                return data
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 获取标签列表
const getTagsList = (value) => {
    return {
        type: tagsList,
        payload: value
    }
}
const asyncGetTagsList = (params) => (dispatch) => {
    return axios.post(`${config.basicsUrl}/api/tags/list`, params)
        .then(data => {
            if (data.state == 1) {
                dispatch(getTagsList(data.result))
            }
            return data.result
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 获取标签列表详细信息
const getDetailTagsList = (value) => {
    return {
        type: detailTagsList,
        payload: value
    }
}
const asyncGetDetailTagsList = (params) => (dispatch) => {
    return axios.post(`${config.basicsUrl}/api/tags/detailList`, params)
        .then(data => {
            if (data.state == 1) {
                dispatch(getDetailTagsList(data.result))
            }
            return data.result
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 设置当前标签
const setCurrentTag = (value) => {
    return {
        type: currentTag,
        payload: value
    }
}
// 推荐列表
const recommendListAction = (value) => {
    return {
        type: recommendList,
        payload: value
    }
}
const AsyncrecommendList = (params) => (dispatch) => {
    return axios.post(`${config.basicsUrl}/api/article/recommend`, params)
        .then(data => {
            if (data.state == 1) {
                dispatch(recommendListAction(data.result))
                return data
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

export default {
    clearArticleListAction,
    appendArticleListAction,
    replaceArticleListAction,
    getArticleListAsync,
    articleDetailsAction,
    getArticleDetails,
    articlesubmitAction,
    syncArticlesubmit,
    syncArticleLeavesubmit,
    asyncArticlTime,
    syncArticleLeave,
    asyncGetTagsList,
    getTagsList,
    setCurrentTag,
    asyncGetDetailTagsList,
    getDetailTagsList,
    asyncSetTag,
    AsyncrecommendList,
    recommendListAction
}