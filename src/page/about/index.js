import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import history from "util/history"
import Topnav from "../comom/topNav"
import logo from "../../images/logo.jpg"
import bgAbout from "../../images/bg-about.jpg"
import "./css.scss"
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    tagsListPromise = null
    UNSAFE_componentWillMount() {
    }
    goback = () => {
        history.go(-1)
    }
    render() {
        let { height } = this.props.browserInfo;
        return (
            <div>
                <Topnav isFixed />
                <div className="pt20" style={{ minHeight: height - 56 + "px",backgroundImage: " linear-gradient(to right, rgb(23,44,60) 0%, #517fa4 100%)"  }}>
                    <div className="about-wrap">
                        <div className="user-via tac">
                            <img src={logo} alt="" />
                        </div>
                        <p className="about-author-name">weijie</p>
                        <p className="tac">一个很怂很怂的渣渣前端</p>
                        <i className="about-line"></i>
                        <p >理想：不闻不问，不管不顾，做一个安安静静的咸鱼</p>
                        <div className="user-hobby">
                            <div>喜好：</div>
                            <ul>
                                <li>健身（如果我能坚持的话）</li>
                                <li>看书（希望每次不要睡的那么死）</li>
                                <li>睡觉（因为每晚失眠 o(╥﹏╥)o）</li>
                                <li>吃（也就每月发工资的那天可以吃好吃的）</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        browserInfo: store.browserInfo,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)

// background: `url(${bgAbout}) no-repeat fixed top`