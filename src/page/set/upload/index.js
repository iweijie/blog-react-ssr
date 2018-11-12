import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import { timestampFromat } from "util/baseTool"
import Add from "./add"
import {
    Button,
    Table,
    message,
    Input,
    Row,
    Col,
    Radio,
    Form,
    Modal,
    Tabs
} from "antd"

import "./css.scss"
const TabPane = Tabs.TabPane;
const FormItem = Form.Item
const RadioGroup = Radio.Group;


class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        ispublic: {
            0: "公开",
            1: "登入可见",
            2: "私有",
        }
    }
    columns = [{
        title: '名称',
        dataIndex: 'tagName',
        key: 'tagName',
    }, {
        title: '编码',
        dataIndex: 'tagCode',
        key: 'tagCode',
    }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: '类型',
        dataIndex: 'ispublic',
        key: 'ispublic',
        render: (text) => {
            return this.state.ispublic[text || 0]
        }
    }, {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => {
            return timestampFromat(text)
        }
    }, {
        title: '操作',
        key: 'handle',
        render: (t, r) => {
            let { creatorId } = r;
            let { userId } = this.props.userInfo;
            return creatorId === userId ? <span className="set-tags-edit" onClick={() => this.editHandle(r)}>编辑</span> : ""
        }
    }];
    UNSAFE_componentWillMount() {
    }
    UNSAFE_componentWillReceiveProps() {
    }
    componentWillUnmount() {
    }
    render() {
        let { tagsList,userInfo,uploadAsync } = this.props;
        tagsList.forEach(v => {
            v.key = v.tagCode
        })
        return (
            <div className="set-upload-wrap">
                <Add userInfo={userInfo} uploadAsync={uploadAsync}></Add>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        tagsList: store.tagsDetailListModel,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)

// <Tabs type="card">
//                     <TabPane tab="Tab 1" key="1">
//                         <Table
//                             size={"small"}
//                             bordered
//                             pagination={false}
//                             dataSource={tagsList}
//                             columns={this.columns} />
//                     </TabPane>
//                     <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
//                     <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
//                 </Tabs>