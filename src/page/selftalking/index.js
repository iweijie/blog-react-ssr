
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Topnav from "../comom/topNav"
import { timestampFromat } from "util/baseTool"
import "./css.scss"


class App extends Component {
    constructor(props) {
        super(props);
    }
    page = 1;
    pageSize = 999;
    UNSAFE_componentWillMount() {
        let { selftalking } = this.props;
        if (selftalking.count && selftalking.result.length) {
            this.page = selftalking.page
            this.pageSize = selftalking.pageSize
        } else {
            this.getSelftalkingList(this.page, this.pageSize)
        }
    }
    getSelftalkingList = (page, pageSize) => {
        let { selftalkingListActionAsync } = this.props;
        selftalkingListActionAsync({ page, pageSize })
    }
    pagination = (total) => {
        let { page, pageSize } = this;
        let max = Math.ceil(total / pageSize);
        if (max <= page) return;
        this.getSelftalkingList(++this.page, pageSize)
    }
    render() {
        let { height } = this.props.browserInfo;
        let { homeBgList, selftalking } = this.props;
        let { result} = selftalking
        let src = homeBgList && homeBgList.length && homeBgList[1].fullUrl || ""
        const content = (
            <div className="selftalking" >
                <Topnav isFixed />
                <div className="selftalking-wrap" style={{ minHeight: height - 56 + "px", background: `url(${src}) no-repeat fixed top` }}>
                    <div className="selftalking-content">
                        <ul className="selftalking-content-ul">
                            <div className="selftalking-content-line"></div>
                            {
                                result.map((v, k) => {
                                    let className = k % 2 === 0 ? "selftalking-content-text-left" : "selftalking-content-text-right"
                                    return <li key={v._id} className={className}>
                                        <p>{v.content}</p>
                                        <span>{timestampFromat(v.createTime)}</span>
                                    </li>
                                })
                            }
                        </ul>

                        {
                            // count && count > (page * pageSize) ?
                            //     <p className="pagination" onClick={() => this.pagination(count)}>
                            //         或许有更多
                            // </p>
                            //     :
                            //     <p className="pagination disabled">
                            //         这是我的底线
                            // </p>
                        }
                    </div>
                </div>
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        browserInfo: store.browserInfo,
        homeBgList: store.homeBgList,
        selftalking: store.selftalkingListModel
    }
}

export default connect(mapStateToProps, dispatchAction)(App)