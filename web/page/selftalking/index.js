import React, { Component } from "react";
import { connect } from "react-redux";
import TopNav from "../comom/topNav";
import { timestampFormat } from "../../utils/index";
import { first, map } from "lodash";
import "./css.less";

class App extends Component {
    constructor(props) {
        super(props);
    }
    page = 1;
    pageSize = 999;
    getSelftalkingList = (page, pageSize) => {
        let { selftalkingListActionAsync } = this.props;
        selftalkingListActionAsync({ page, pageSize });
    };
    pagination = (total) => {
        let { page, pageSize } = this;
        let max = Math.ceil(total / pageSize);
        if (max <= page) return;
        this.getSelftalkingList(++this.page, pageSize);
    };
    render() {
        let { height = 0 } = this.props.browserInfo || {};
        console.log(this.props.browserInfo);
        console.log(height);
        let { homeBgList, selftalking } = this.props;
        let src = (first(homeBgList) || { fullUrl: "" }).fullUrl;

        const styles = {
            background: `url(${src}) no-repeat fixed top`,
        };

        if (height) {
            styles.minHeight = height - 56 + "px";
        }

        const content = (
            <div className="selftalking">
                <TopNav isFixed />
                <div className="selftalking-wrap" style={styles}>
                    <div className="selftalking-content">
                        <ul className="selftalking-content-ul">
                            <div className="selftalking-content-line"></div>
                            {map(selftalking, (v, k) => {
                                let className =
                                    k % 2 === 0
                                        ? "selftalking-content-text-left"
                                        : "selftalking-content-text-right";
                                return (
                                    <li key={v._id} className={className}>
                                        <p>{v.content}</p>
                                        <span>
                                            {timestampFormat(v.createTime)}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );

        return content;
    }
}
const mapStateToProps = (store) => {
    return {
        browserInfo: store.common.browserInfo,
        userInfo: store.common.userInfo,
        homeBgList: store.home.homeBgList,
        selftalking: store.home.selftalking,
    };
};

export default connect(mapStateToProps)(App);
