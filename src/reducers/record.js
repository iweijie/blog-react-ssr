import { getRecordCategoryList, getRecordList } from "actions/record"


function memoCategoryList(state = [], action) {
    switch (action.type) {
        case getRecordCategoryList:
            return action.payload
        default:
            return state;
    }
}

function memoList(state = [], action) {
    switch (action.type) {
        case getRecordList:
            return action.payload
        default:
            return state;
    }
}

export default {
    memoList,
    memoCategoryList
}