import {recordConfigInfo,recordlistInfo,clearRecordInfo} from "actions/record"

function recordconfModel(state = {
    showField:[]
}, action) {
    switch (action.type) {
        case recordConfigInfo:
            return action.payload;
        case clearRecordInfo:
            return {
                showField:[]
            }
        default:
            return state;
    }
}
function recordListModel(state =[], action) {
    switch (action.type) {
        case recordlistInfo:
            return action.payload;
        case clearRecordInfo:
            return []
        default:
            return state;
    }
}

export default {
    recordconfModel,
    recordListModel
}