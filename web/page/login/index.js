import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Modal, Input, Icon, Checkbox, Button, message } from "antd";
import apis from "../../apis";
import "./css.css";
const FormItem = Form.Item;

class App extends Component {
    constructor() {
        super();
        this.limit = true;
    }
    state = {
        visible: true,
    };
    show = () => {
        this.setState({
            visible: true,
        });
        var timerId = setInterval(() => {
            clearInterval(timerId);
            var username = document.querySelector("#username");
            if (!username) return;
            username.focus();
            document.addEventListener("keydown", this.enterHandler);
        }, 200);
    };
    enterHandler = (e) => {
        if (e.keyCode == 13) {
            this.handleOk(e);
        }
    };
    handleOk = (e) => {
        if (!this.limit) return;
        this.limit = false;
        e.preventDefault();
        const data = this.props.form.getFieldsValue([
            "username",
            "password",
            "remember",
        ]);
        for (var k in data) {
            var val = data[k];
            if (val === undefined || val === "" || val === null) {
                return message.warning("请填写完整");
            }
        }
        apis.login(data)
            .then((result) => {
                if (result) {
                    if (result.state) {
                        message.success(result.msg || "登入成功");
                        setTimeout(() => {
                            window.location.replace("/");
                        }, 1500);
                    } else {
                        message.warning(result.msg);
                    }
                } else {
                    message.success("登入失败");
                }
            })
            .catch((err) => {
                message.success(err.message);
            })
            .finally(() => {
                this.limit = true;
            });
    };
    handleCancel = () => {
        document.removeEventListener("keydown", this.enterHandler);
        history.go(-1);
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        var isLogin = this.props.userInfo.isLogin;

        return (
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
                            {getFieldDecorator("username", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Username"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("remember", {
                                valuePropName: "checked",
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                        </FormItem>

                        <FormItem>
                            <Button
                                type="primary"
                                onClick={this.handleOk}
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.common.userInfo,
    };
};

export default connect(mapStateToProps)(Form.create()(App));
