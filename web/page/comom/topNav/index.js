import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Icon from "../../../components/Icon";

import "./css.less";
/**
 *state 状态 ：
 *      1 : 所有状态都展示
 *      2 : 登入状态展示
 *      3 : 非登入状态展示
 */
const json = [
    {
        name: "首页",
        url: "/tags/all/1",
        icon: "iconhome",
        state: 1,
    },
    {
        name: "游戏",
        url: "/game",
        icon: "iconziyuan1",
        state: 1,
    },
    {
        name: "设置",
        url: "/set/selftalking",
        icon: "iconshezhi",
        state: 2,
    },
    {
        name: "关于",
        url: "/about",
        icon: "iconcaidaniconwodehui",
        state: 1,
    },
    {
        name: "登入",
        url: "/login",
        icon: "iconlogin",
        state: 3,
    },
];

class TopNav extends React.PureComponent {
    getCurrentJson = (userInfo) => {
        let flag = userInfo.isLogin;
        if (flag) {
            return json.filter((v) => {
                return v.state !== 3;
            });
        } else {
            return json.filter((v) => {
                return v.state !== 2;
            });
        }
    };

    render() {
        let { isFixed, userInfo } = this.props;
        let className = isFixed ? "top-nav-fixed top-nav" : "top-nav";
        let json = this.getCurrentJson(userInfo);
        return (
            <nav id="nav">
                <ul className={className}>
                    {isFixed ? <h2 className="name">weijie</h2> : null}
                    {json.map((v) => {
                        return (
                            <li key={v.url}>
                                <Link to={v.url}>
                                    <Icon
                                        type={v.icon}
                                        style={{ marginRight: "5px" }}
                                    />
                                    {v.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (store, own) => {
    return {
        userInfo: store.common.userInfo,
        isFixed: own.isFixed,
    };
};
export default connect(mapStateToProps)(TopNav);
