import React, { PureComponent } from 'react';
import { timestampFromat } from "util/baseTool"
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    message
} from "antd"

const FormItem = Form.Item;
const { TextArea } = Input
class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    state = {
        replyIndex: null,
        replyName: null,
        replyUserId: null
    }
    UNSAFE_componentWillMount() { }
    submit = () => {
        var name = localStorage.getItem("leaveName")
        var { userInfo, syncArticleLeavesubmit, detial, articleDetailsAction } = this.props
        var { replyName, replyUserId } = this.state
        var { getFieldsValue, setFieldsValue } = this.props.form;
        var data = getFieldsValue(["name", "leave"])
        var params = { articleId: detial._id }
        if (userInfo.isLogin) {
            params.userId = userInfo.userId
            params.name = userInfo.userName
        } else if (name) {
            params.name = name
        } else {
            params.name = data.name
        }
        params.leave = data.leave || "";
        for (var k in params) {
            if (!params[k]) return message.warning("请填写完整参数")
        }
        if (replyName) {
            params.replyName = replyName
        }
        if (replyUserId) {
            params.replyUserId = replyUserId
        }
        syncArticleLeavesubmit(params)
            .then(result => {
                if (result.state) {
                    if (!userInfo.isLogin && !name) {
                        localStorage.setItem("leaveName", data.name)
                    }
                    detial.leave = result.result
                    articleDetailsAction({ ...detial })
                    this.close()
                    setFieldsValue({
                        "name": "", "leave": ""
                    })
                }
            })
    }
    componentWillUnmount() { }
    reply = (k, name, id) => {
        this.setState({
            replyIndex: k,
            replyName: name,
            replyUserId: id
        })
    }
    close = () => {
        this.setState({
            replyIndex: null,
            replyName: null,
            replyUserId: null
        })
    }
    render() {
        var data = this.props.detial;
        if (!data._id) return null;
        var { userInfo } = this.props;
        var getFieldDecorator = this.props.form.getFieldDecorator
        var leavedata = data.review || []
        var { replyIndex, replyName } = this.state
        var name = localStorage.getItem("leaveName")
        var replyInput = (
            <div style={replyIndex !== null ? { padding: "20px 0" } : null}>
                {
                    replyName ?
                        <div>回复：<span className="green">{replyName}</span></div>
                        : null
                }
                <Form className="form-select">
                    <Row type="flex" justify="space-between">
                        {
                            userInfo.isLogin || name ? null :
                                <Col span={24} style={{ position: "relative" }}>
                                    <FormItem>
                                        {getFieldDecorator('name')(
                                            <Input maxLength="10" placeholder="姓名" />
                                        )}
                                    </FormItem>
                                </Col>
                        }
                        <Col span={24} style={{ position: "relative" }}>
                            <FormItem>
                                {getFieldDecorator('leave')(
                                    <TextArea maxLength="150" rows={3} placeholder="评论留言区，请轻喷" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    <Button className="mr20" onClick={this.submit}>提交</Button>
                    {
                        replyIndex === null ?
                            null :
                            <Button onClick={this.close}>取消</Button>
                    }
                </Row>
            </div>
        )
        var leaveList = leavedata.map((v, k) => {
            let html=  { __html: v.content }
            return <li key={v._id || k}>
                <p>
                    {
                        v.replyName ?
                            <span>回复  <span className="green">{v.replyName}</span>：</span>
                            : null
                    }
                    <span style={v.replyName ? { padding: "0 20px" } : { paddingRight: "20px" }} dangerouslySetInnerHTML={html}></span>
                    —
                    <span className="green mr10"> {v.name} </span>
                    <span>{timestampFromat(v.createTime)}</span>
                    {
                        (userInfo.userId && v.userId === userInfo.userId) || (!userInfo.isLogin && name === v.name) ? null :
                            <span className="reply" onClick={() => this.reply(k, v.name, v.userId)}>
                                回复
                                </span>
                    }
                </p>
                {replyIndex === k && replyInput}
            </li>
        })
        return (
            <div style={{ backgroundColor: "#fff", borderRadius: 5 }}>
                <ul className="message-board">
                    {leaveList}
                </ul>
                {replyIndex === null && replyInput}
            </div>
        );
    }
}
export default Form.create()(App)