
import React, { Component } from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    Radio,
    message
} from "antd"
const FormItem = Form.Item
const RadioGroup = Radio.Group;
class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible: false,
        removeVisible: false,
        params: {}
    }
    // 添加菜单配置
    add = (params) => {
        params = params || {}
        params.type = "add"
        this.setState({
            visible: true,
            params
        })
    }
    // 修改菜单配置
    amend = (payload) => {
        var { params, data } = payload
        var { setFieldsValue } = this.props.form
        params = params || {}
        params.type = "amend"

        var parentObj = "";
        if (params.parent) {
            parentObj = this.getParent(params.parent, data)
        }
        params.parentObj = parentObj
        this.setState({
            visible: true,
            params
        })
        var { title, url, isPublic, classify, manner } = params
        url = url.replace(parentObj.url, "")
        setFieldsValue({
            url, title, isPublic, classify, manner
        })
    }
    // 修改菜单时获取父级菜单
    getParent = (_id, list) => {
        for (var i = 0, l = list.length; i < l; i++) {
            if (_id == list[i]._id) return list[i]
            var childs = list[i].childrens
            if (childs && childs.length) {
                var parent = this.getParent(_id, childs)
                if (parent) return parent
            }

        }
    }

    // 取消事件
    cancel = () => {

        this.props.form.resetFields()
        this.setState({
            visible: false,
            params: {}
        })
    }
    // 提交事件
    ok = () => {
        var { getFieldsValue } = this.props.form;
        var { menuConfigActionSync } = this.props
        var { type } = this.state.params
        var data = getFieldsValue()

        var { _id, url, title, isPublic, classify, manner } = data
        _id = _id || ""
        if (!title) {
            return message.wraning("请填写标题")
        }
        if (!url) return message.wraning("路径不能为空")
        url = url.trim()
        if (!/^\/[A-z0-9]+/.test(url)) {
            return message.wraning("路径格式不对")
        }

        var params = { _id, url, title, isPublic, type, classify, manner }

        menuConfigActionSync(params)
            .then(result => {
                this.cancel()
                this.resetMenu(result)
            })
    }
    // 重置菜单数据 
    resetMenu = (result) => {
        if (!result) return
        var { syncMenuAction, userInfo } = this.props;
        var isLogin = userInfo.isLogin
        syncMenuAction(isLogin)
    }

    remove = (_id) => {
        if (!_id) return message.wraning("ID 为必传字段")
        this.setState({
            removeVisible: true,
            params: {
                _id: _id,
                type: "remove"
            }
        })
    }
    // 删除 取消事件
    removeCancel = () => {
        this.props.form.resetFields()
        this.setState({
            removeVisible: false,
            params: {}
        })
    }
    // 删除 确认事件
    removeOk = () => {
        var params = this.state.params
        var { menuConfigActionSync } = this.props
        menuConfigActionSync(params)
            .then(result => {
                this.removeCancel()
                this.resetMenu(result)
            })
    }
    componentDidMount() {
        window.observer.on("addModal", this.add)
        window.observer.on("amendModal", this.amend)
        window.observer.on("removeModal", this.remove)
    }
    levels = ["一", "二", "三", "四", "五", "六"]
    render() {
        var { level, _id, title, url, isPublic, type, parentObj } = this.state.params

        var { getFieldDecorator } = this.props.form

        var num, name, parentTitle, parentUrl;
        if (type == "add") {
            parentTitle = title
            parentUrl = url
            num = level ? this.levels[level] : this.levels[0]
            name = "添加" + num + "级菜单"
        } else if (type == "amend") {
            parentTitle = parentObj.title
            parentUrl = parentObj.url
            num = level ? this.levels[level - 1] : this.levels[0]
            name = "修改" + num + "级菜单"
        }

        return (
            <div>
                <Modal
                    style={{ top: "20px" }}
                    className="modal"
                    title={name}
                    visible={this.state.visible}
                    onOk={this.ok}
                    onCancel={this.cancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form className="menu-config">
                        <Row type="flex" justify="space-between">
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">标题：</label>
                                <FormItem>
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Please input title!' }],
                                    })(
                                        <Input placeholder="标题" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">路径：</label>
                                <FormItem>
                                    {getFieldDecorator('url', {
                                        rules: [{ required: true, message: 'Please input url!' }],
                                    })(
                                        <Input placeholder="路径" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">分类名称：</label>
                                <FormItem>
                                    {getFieldDecorator('classify', {
                                        rules: [{ required: true, message: 'Please input classify!' }],
                                    })(
                                        <Input placeholder="分类名称" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">父级菜单标题：</label>
                                <FormItem>
                                    <div className="ant-input ant-input-disabled">{parentTitle}</div>
                                </FormItem>
                            </Col>
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">父级菜单路径：</label>
                                <FormItem>
                                    <div className="ant-input ant-input-disabled">{parentUrl}</div>
                                </FormItem>
                            </Col>
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">是否公开：</label>
                                {
                                    isPublic ?
                                        <FormItem>
                                            {getFieldDecorator('isPublic', {
                                                rules: [{ required: true, message: 'Please input keyword!' }],
                                                initialValue: isPublic
                                            })(
                                                <RadioGroup>
                                                    <Radio value>公开</Radio>
                                                    <Radio value={false}>不公开</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        :
                                        <FormItem>
                                            {getFieldDecorator('isPublic', {
                                                rules: [{ required: true, message: 'Please input keyword!' }],
                                                initialValue: isPublic
                                            })(
                                                <RadioGroup>
                                                    <Radio disabled={type == "add"} value>公开</Radio>
                                                    <Radio value={false}>不公开</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                }

                            </Col>
                            <FormItem style={{ margin: 0 }}>
                                {getFieldDecorator('_id', {
                                    initialValue: _id
                                })(
                                    <Input type="hidden" />
                                )}
                            </FormItem>
                        </Row>
                    </Form>
                </Modal>
                <Modal
                    style={
                        {
                            top: "20px"
                        }
                    }
                    title={"提示"}
                    visible={this.state.removeVisible}
                    onOk={this.removeOk}
                    onCancel={this.removeCancel}
                    okText="确认"
                    cancelText="取消">
                    <span>是否删除（会删除当前项及其子项）</span>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(App)
