import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import dispatchAction from "tool/dispatchAction"
import Graph from './graph'
import AddRecord from './addRecord'
import Search from './search'
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
        graph: {
            1: '条形图',
            2: '饼状图',
            3: '散点图'
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
        title: '图形',
        dataIndex: 'graph',
        key: 'graph',
        render: (t) => this.state.graph[t]
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
        this.getCategoryList()
            .then(data => {
                const { state, result } = data
                if (state === 1) {
                    const params = {
                        time: [this.toFormat(moment().subtract(1, 'month')), this.toFormat(moment())]
                    }
                    if (result && result.length) {
                        params.category = result[0]._id
                    }
                    this.getList(params)
                }
            })
    }
    controlModel = (flag = true, data = null) => {
        this.setState({
            visible: flag,
            data
        })
    }
    // 获取记录列表
    getList = (params) => {
        const { getRecordListAsyncAction, recordListParams } = this.props
        getRecordListAsyncAction(params || recordListParams)
    }
    // 获取分类列表
    getCategoryList = () => {
        const { getRecordCategoryListAsyncAction } = this.props
        return getRecordCategoryListAsyncAction()
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

    toFormat = (mo) => {
        const obj = mo.toObject()
        let { years, months, date } = obj
        years += ""
        months += 1
        months = months > 9 ? "" + months : "0" + months
        date = date > 9 ? "" + date : "0" + date
        return Number(years + months + date)
    }
    // 时间拆分
    splitTime = (time) => {
        return `${Math.floor(time / 10000)}-${Math.floor(time % 10000 / 100)}-${Math.floor(time % 100)}`
    }
    render() {
        let { recordCategoryList, recordList, recordListParams } = this.props;
        let { data, visible, visibleCategory } = this.state;
        if (!data) data = {};
        const search = (<Search recordListParams={recordListParams} toFormat={this.toFormat} recordCategoryList={recordCategoryList} getList={this.getList} />)
        return (
            <div className="record-wrap">
                <Tabs
                    defaultActiveKey={"1"}
                    animated={false}
                    onChange={this.tabsChange}
                >
                    <TabPane tab="图表" key={"1"}>
                        {search}
                        <Graph
                            recordList={recordList}
                            toFormat={this.toFormat}
                            recordListParams={recordListParams}
                            recordCategoryList={recordCategoryList}
                        />
                    </TabPane>
                    <TabPane tab="记录列表" key={"2"}>
                        <div className="record-btn-wrap">
                            {search}
                            <Button icon="plus" type="primary" onClick={() => this.setState({ visible: true })}>新增</Button>
                        </div>
                        <Table
                            size={"small"}
                            bordered
                            pagination={false}
                            dataSource={recordList}
                            rowKey={r => r._id}
                            columns={this.columns} />
                    </TabPane>
                    <TabPane tab="分类列表" key={"3"}>
                        <div className="record-category-btn-wrap">
                            <Button icon="plus" type="primary" onClick={() => this.setState({ visibleCategory: true })}>新增</Button>
                        </div>
                        <Table
                            size={"small"}
                            bordered
                            pagination={false}
                            dataSource={recordCategoryList}
                            rowKey={r => r._id}
                            columns={this.columns1} />
                    </TabPane>
                </Tabs>
                <AddRecord toFormat={this.toFormat} recordCategoryList={recordCategoryList} visible={visible} handleOk={this.addRecord} onCancel={this.handleCancel} />
                <AddRecordCategory visible={visibleCategory} handleOk={this.addcategory} onCancel={this.handleCancel} />
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        recordCategoryList: store.recordCategoryList,
        recordList: store.recordList.list,
        recordListParams: store.recordList.params,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)
