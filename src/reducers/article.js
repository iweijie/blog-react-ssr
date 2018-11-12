import {
    appendArticleList,
    replaceArticleList,
    articleDetials,
    cleararticleList,
    pushReview,
    tagsList,
    detailTagsList,
    currentTag,
    recommendList
} from "actions/article"
function articleListModel(state = {
    result: [],
    total: 0
}, action) {
    switch (action.type) {
        case appendArticleList:
            return {
                result: [...state.result,...action.payload.result],
                total: action.payload.total
            }
        case replaceArticleList:
            return action.payload
        case cleararticleList:
            return {
                result: [],
                total: 0
            }
        default:
            return state;
    }
}
function articleDetialsModel(state = {}, action) {
    switch (action.type) {
        case articleDetials:
            return action.payload;
        case pushReview:
            state.review.push(action.payload)
            return {
                ...state
            };
        default:
            return state;
    }
}
function tagsListModel(state = [],action){
    switch (action.type) {
        case tagsList:
            return action.payload;
        default:
            return state;
    }
}
function tagsDetailListModel(state = [],action){
    switch (action.type) {
        case detailTagsList:
            return action.payload;
        default:
            return state;
    }
}

function getCurrentTag(state = "",action){
    switch (action.type) {
        case currentTag:
            return action.payload;
        default:
            return state;
    }
}
function recommendListModel(state = [],action){
    switch (action.type) {
        case recommendList:
            return action.payload;
        default:
            return state;
    }
}
export default {
    articleListModel,
    articleDetialsModel,
    tagsListModel,
    getCurrentTag,
    tagsDetailListModel,
    recommendListModel
}