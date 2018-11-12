import {selftalkingList} from "actions/selftalking"

function selftalkingListModel(state ={
    page : 1,
    pageSize : 20,
    result : [],
    count : 0
}, action) {
    switch (action.type) {
        case selftalkingList:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default {
    selftalkingListModel
}