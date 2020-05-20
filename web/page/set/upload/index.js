import React, { Component } from 'react';
import { connect } from 'react-redux';
// import dispatchAction from "tool/dispatchAction"
import Add from "./add"
import TableCom from "./table"
import {
    Tabs
} from "antd"

import "./css.less"
const TabPane = Tabs.TabPane;


class App extends Component {
    constructor(props) {
        super(props);
    }

    tabList = [
        {
            name: "Image",
            field: "image"
        },
        {
            name: "PDF",
            field: "pdf"
        }
    ]

    state = {
        ispublic: {
            0: "公开",
            1: "登入可见",
            2: "私有",
        },
        type: 'image',
        statePage: 1,
        statePageSize: 10,
        count: 0,
        list: []
    }
    UNSAFE_componentWillMount() {
        this.getList()
    }
    UNSAFE_componentWillReceiveProps() {
    }
    componentWillUnmount() {
    }
    getList = (page, pageSize) => {
        const { statePage, statePageSize, type } = this.state;
        const { getUploadFileListAsync } = this.props;
        page = page || statePage;
        pageSize = pageSize || statePageSize;
        getUploadFileListAsync({
            page,
            pageSize,
            type
        })
            .then(result => {
                if (result && result.result && result.result.length) {
                    this.setState({
                        list: result.result.map(v => {
                            v.key = v._id;
                            return v
                        }),
                        count: result.count,
                        statePage: page,
                        statePageSize: pageSize
                    })
                }
            })
    }
    tabsChange = (key) => {
        let type = this.tabList[Number(key)].field;
        this.setState({
            statePage: 1,
            statePageSize: 10,
            type
        },this.getList)
    }
    render() {
        let { userInfo, uploadAsync } = this.props;
        let { list, statePage, statePageSize, count } = this.state;
        return (
            <div className="set-upload-wrap">
                <Add userInfo={userInfo} uploadAsync={uploadAsync}></Add>
                <div>
                    <Tabs defaultActiveKey={"0"} onChange={this.tabsChange}>
                        {
                            this.tabList.map((v, index) => <TabPane tab={v.name} key={String(index)}></TabPane>)
                        }
                    </Tabs>
                    <TableCom
                        list={list}
                        statePage={statePage}
                        statePageSize={statePageSize}
                        count={count}
                        getList={this.getList}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.common.userInfo
    }
}

export default connect(mapStateToProps)(App)