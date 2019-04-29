import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "tool/dispatchAction"
// import observer from "tool/observer"
import { timestampFromat } from "tool/baseTool"
import {
    Button,
    Table,
    message,
    Input,
    Row,
    Col,
    Radio,
    Form,
    Modal
} from "antd"
import "./css.scss"

const FormItem = Form.Item
const RadioGroup = Radio.Group;


class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        type: {
            1: "公开",
            2: "私有",
        },
        visible: false,
        data: null
    }
    columns = [{
        title: '分类',
        dataIndex: 'category',
        key: 'category',
    }, {
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
    }, {
        title: '值',
        dataIndex: 'value',
        key: 'value',
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    }];

    UNSAFE_componentWillMount() {
    }
    UNSAFE_componentWillReceiveProps(next) {
    }
    controlModel = (flag = true, data = null) => {
        this.setState({
            visible: flag,
            data
        })
    }
    componentWillUnmount() {
    }
    getTags = () => {
        let { asyncGetDetailTagsList } = this.props;
        asyncGetDetailTagsList()
    }
    handleOk = () => {
        const { validateFields } = this.props.form;
        let { userInfo, asyncSetTag } = this.props;
        if (!userInfo.isLogin) return
        let { data } = this.state
        validateFields((err, value) => {
            if (err) {
                return
            }
            if (data) {
                value.id = data._id
                value.creator = userInfo.userId
            }
            asyncSetTag(value)
                .then(result => {
                    if (result) {
                        message.success(result.msg)
                        this.handleCancel()
                        this.getTags()
                    }
                })
        })
    }
    handleCancel = () => {
        this.controlModel(false, null)
    }
    editHandle = (r) => {
        this.controlModel(true, r)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { tagsList } = this.props;
        let { data } = this.state;
        let title = data ? "编辑标签" : "新增标签";
        if (!data) data = {};
        tagsList.forEach(v => {
            v.key = v.tagCode
        })
        return (
            <div className="set-tags-wrap">
                <div className="set-tags-add">
                    <Button icon="plus" type="primary" onClick={() => this.controlModel(true)}>创建</Button>
                </div>
                <Table
                    size={"small"}
                    bordered
                    pagination={false}
                    dataSource={tagsList}
                    columns={this.columns} />
                <Modal
                    width={500}
                    className="set-tags-modal"
                    title={title}
                    destroyOnClose
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Row type="flex" justify="space-between">
                            <Col span={24}>
                                <label className="select-label">分类名称：</label>
                                <FormItem>
                                    {getFieldDecorator('tagName', {
                                        rules: [{ required: true, message: 'Please input tagName!' }],
                                        initialValue: data.tagName || undefined
                                    })(
                                        <Input maxLength={10} placeholder="标签名称" />
                                    )}
                                </FormItem>
                            </Col>
                                <FormItem label="类型">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: 'Please select type!' }],
                                        initialValue: data.type || 1
                                    })(
                                        <RadioGroup >
                                            <Radio value={1}>公开</Radio>
                                            <Radio value={2}>私有</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            <Col span={24}>
                                <label className="select-label">标签编码：</label>
                                <FormItem>
                                    {getFieldDecorator('tagCode', {
                                        rules: [{ required: true, message: 'Please input tagCode!' }],
                                        initialValue: data.tagCode || undefined
                                    })(
                                        <Input maxLength={20} placeholder="标签编码" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <label className="select-label">描述：</label>
                                <FormItem>
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: 'Please input description!' }],
                                        initialValue: data.description || undefined
                                    })(
                                        <Input maxLength={30} placeholder="描述" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
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

export default connect(mapStateToProps, dispatchAction)(Form.create()(App))
