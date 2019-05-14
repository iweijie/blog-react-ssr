import { getRecordCategoryList, getRecordList } from "actions/record"


function recordCategoryList(state = [], action) {
    switch (action.type) {
        case getRecordCategoryList:
            return action.payload
        default:
            return state;
    }
}

function recordList(state = {
    list: [],
    params: {}
}, action) {
    switch (action.type) {
        case getRecordList:
            return action.payload
        default:
            return state;
    }
}

export default {
    recordList,
    recordCategoryList
}