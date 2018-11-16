import { serverActionInfo, resetServerInfo } from "actions/server"

function serverInfo(state = {
    isSSR: false,
    isRedirect: false,
    path: ''
}, action) {
    switch (action.type) {
        case serverActionInfo:
            return action.payload;
        case resetServerInfo:
            return {
                isSSR: false,
                isRedirect: false,
                path: ''
            }
        default:
            return state;
    }
}
export default {
    serverInfo
}