import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import history from "util/history"
import {
    Form,
    Modal,
    Input,
    Icon,
    Checkbox,
    Button,
    message
} from "antd"
import "./css.css"
var FormItem = Form.Item
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    state = {
        visible: true
    }
    limit = true
    show = () => {
        this.setState({
            visible: true
        })
        var timerId = setInterval(() => {
            var username = document.querySelector("#username");
            if (!username) return
            username.focus()
            document.addEventListener("keydown", this.enterHandler)
            clearInterval(timerId)
        }, 200)
    }
    enterHandler = (e) => {
        if (e.keyCode == 13) {
            this.handleOk(e)
        }
    }
    handleOk = (e) => {
        if (!this.limit) return
        var { syncuserInfoAction } = this.props
        e.preventDefault();
        var data = this.props.form.getFieldsValue(["username", "password", "remember"])
        for (var k in data) {
            var val = data[k]
            if (val === undefined || val === "" || val === null) {
                return message.warning("请填写完整")
            }
        }
        this.limit = false
        syncuserInfoAction(data)
            .then(result => {
                this.limit = true
                if (result) {
                    if (result.state) {
                        message.success(result.msg || "登入成功")
                        setTimeout(() => {
                            window.location.replace("/")
                        }, 1500)
                    } else {
                        message.warning(result.msg)
                    }
                } else {
                    message.success("登入失败")
                }
            })
            .catch(err => {
                this.limit = true
                message.success(err.message)
            })
    }
    handleCancel = () => {
        document.removeEventListener("keydown", this.enterHandler);
        history.go(-1)
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        var isLogin = this.props.userInfo.isLogin
        const content = (
            <div className={isLogin ? "login hide" : "login"}>
                <Modal
                    width={348}
                    className="login-modal"
                    title="登入"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                        </FormItem>

                        <FormItem>
                            <Button type="primary" onClick={this.handleOk} className="login-form-button">
                                Log in
                                    </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>)

        return (
            content
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel
    }
}

export default connect(mapStateToProps, dispatchAction)(Form.create()(App))