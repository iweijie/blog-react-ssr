// 核实是否登入
import React from "react"
import { connect } from 'react-redux';
import history from "util/history"

class Verification extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        sign: null
    }
    delayed = 2000;

    UNSAFE_componentWillMount() {
        let { verify, userInfo } = this.props;
        window.Pace.start()
        if (verify && !userInfo.isLogin) {
            let tmp = setTimeout(() => {
                history.replace("/404")
            }, this.delayed)
            this.setState({
                sign: tmp
            })
        }
    }
    UNSAFE_componentWillReceiveProps(newPros) {
        var p = this.props
        if (newPros.userInfo != p.userInfo && newPros.userInfo && newPros.userInfo.isLogin) {
            clearTimeout(this.state.sign)
            this.setState({
                sign: null
            })
        }

    }

    render() {
        let { sign } = this.state;
        return !!sign ? null : this.props.children
    }
}
const mapStateToProps = (store, own) => {
    return {
        userInfo: store.userInfoModel,
        verify: own.verify
    }
}
export default connect(mapStateToProps)(Verification)