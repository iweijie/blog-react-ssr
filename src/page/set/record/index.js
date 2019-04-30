import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "tool/dispatchAction"
import Graph from './graph'
import AddRecord from './addRecord'
import AddRecordCategory from './addRecordCategory'
import {
    Button,
    Table,
    Tabs,
    message,
} from "antd"
import "./css.scss"


const TabPane = Tabs.TabPane;

class App extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }
    state = {
        type: {
            1: "公开",
            2: "私有",
        },
        visible: false,
        visibleCategory: false,
        data: null
    }
    columns = [{
        title: '分类',
        dataIndex: 'category',
        key: 'category',
        render: (t) => t && t.name
    }, {
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
    }, {
        title: '值',
        dataIndex: 'value',
        key: 'value',
        render: (t, r) => {
            const { category } = r
            if (category && category.unit) {
                return `${t} ${category.unit}`
            }
            return t
        }
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: (t) => this.splitTime(t)
    }];
    columns1 = [{
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (t) => t === 1 ? '公开' : '私有'
    }, {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render: (t, r) => r._tags
    }, {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
    }];
    componentDidMount() {
        debugger
        this.getList()
        this.getCategoryList()
    }
    controlModel = (flag = true, data = null) => {
        this.setState({
            visible: flag,
            data
        })
    }
    // 获取记录列表
    getList = () => {
        const { getRecordListAsyncAction } = this.props
        getRecordListAsyncAction()
    }
    // 获取分类列表
    getCategoryList = () => {
        const { getRecordCategoryListAsyncAction } = this.props
        getRecordCategoryListAsyncAction()
    }
    // 新增分类
    addcategory = (value) => {
        let { userInfo, addRecordCategoryAsyncAction } = this.props;
        if (!userInfo.isLogin) return
        addRecordCategoryAsyncAction(value)
            .then((r) => {
                if (r && r.state === 1) {
                    this.getCategoryList()
                }
            })
    }
    // 新增记录
    addRecord = (value) => {
        let { userInfo, addRecordAsyncAction } = this.props;
        if (!userInfo.isLogin) return
        addRecordAsyncAction({ list: value })
            .then((r) => {
                if (r && r.state === 1) {
                    this.getList()
                }
            })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            visibleCategory: false,
            data: null
        })
    }
    // 时间才分
    splitTime = (time) => {
        return `${Math.floor(time / 10000)}-${Math.floor(time % 10000 / 100)}-${Math.floor(time % 100)}`
    }
    render() {
        let { memoCategoryList, memoList } = this.props;
        let { data, visible, visibleCategory } = this.state;
        if (!data) data = {};
        return (
            <div className="record-wrap">
                <Tabs
                    defaultActiveKey={"1"}
                    animated={false}
                    onChange={this.tabsChange}
                >
                    <TabPane tab="图" key={"1"}>
                        <Graph />
                    </TabPane>
                    <TabPane tab="记录列表" key={"2"}>
                        <div className="record-btn-wrap">
                            <Button icon="plus" type="primary" onClick={() => this.setState({ visible: true })}>新增</Button>
                        </div>
                        <Table
                            size={"small"}
                            bordered
                            pagination={false}
                            dataSource={memoList}
                            rowKey={r => r._id}
                            columns={this.columns} />
                    </TabPane>
                    <TabPane tab="分类列表" key={"3"}>
                        <div className="record-btn-wrap">
                            <Button icon="plus" type="primary" onClick={() => this.setState({ visibleCategory: true })}>新增</Button>
                        </div>
                        <Table
                            size={"small"}
                            bordered
                            pagination={false}
                            dataSource={memoCategoryList}
                            rowKey={r => r._id}
                            columns={this.columns1} />
                    </TabPane>
                </Tabs>
                <AddRecord memoCategoryList={memoCategoryList} visible={visible} handleOk={this.addRecord} onCancel={this.handleCancel} />
                <AddRecordCategory visible={visibleCategory} handleOk={this.addcategory} onCancel={this.handleCancel} />
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        memoCategoryList: store.memoCategoryList,
        memoList: store.memoList,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)
