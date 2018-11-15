// 核实是否登入
import React from "react"
import dispatchAction from "tool/dispatchAction"
import { connect } from 'react-redux';
import { throttle } from "tool/baseTool"
import isServer from 'tool/env'

class Verification extends React.Component {

    UNSAFE_componentWillMount() {
        const { browserInfo, homeBgList, userInfo } = this.props;
        if (!userInfo.isLogin) {
            this.props.syncuserInfoCheckAction()
        }
        if (!homeBgList || !homeBgList.length) {
            this.props.getHomeBgImageActionASync()
        }
        if (!isServer && !browserInfo.widht) {
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let widht = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.props.resizeAction({
                height,
                widht
            })
        }
    }
    componentDidMount() {
        window.addEventListener("resize", throttle(() => {
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let widht = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.props.resizeAction({
                height,
                widht
            })
        }, 100))
    }
    render() {
        return null;
    }
}
const mapStateToProps = (store) => {
    return {
        browserInfo: store.browserInfo,
        homeBgList: store.homeBgList,
        userInfo: store.userInfoModel,
    }
}
export default connect(mapStateToProps, dispatchAction)(Verification)