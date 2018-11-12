import React from "react"
import { connect } from 'react-redux';
import history from "util/history"

class Verification extends React.Component {

    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        if (this.check(this.props)) {
            window.Pace.start()
        }
    }
    UNSAFE_componentWillReceiveProps(newPros) {
        var p = this.props
        if (newPros.menuInfos != p.menuInfos || newPros.userInfo != p.userInfo) {
            this.check(newPros)
        }

    }
    //不需要登入
    chekeother = [
        /^\/article\/detail\/[A-z0-9]+$/,
    ]
    //需要登入
    chekeLoginother = [
        /^\/edit\/article\/[A-z0-9]+$/,
    ]
    check = (props) => {
        var { menuInfos, userInfo } = props;
        var isLogin = userInfo.isLogin;
        var pathList = menuInfos.menuPath;
        if (!pathList.length) return true
        var location = history.location
        var url = location.pathname;
        for (var i = 0, l = this.chekeother.length; i < l; i++) {
            if (this.chekeother[i].test(url)) return true
        }
        for (i = 0, l = this.chekeLoginother.length; i < l; i++) {
            if (isLogin && this.chekeLoginother[i].test(url)) return true
        }
        if (!pathList.includes(url)) {
            history.replace("/404")
            return false
        }
        return true
    }

    render() {
        return (
            this.props.children
        )
    }
}
const mapStateToProps = (store) => {
    return {
        menuInfos: store.menuInfos,
        userInfo: store.userInfoModel
    }
}
export default connect(mapStateToProps)(Verification)