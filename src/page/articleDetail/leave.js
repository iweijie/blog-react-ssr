
import React, {PureComponent} from 'react';
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
    UNSAFE_componentWillMount(){
    }
    componentWillUnmount(){
    }
    submit = ()=>{
        var {userInfo,syncArticleLeavesubmit,detial} = this.props
        var {getFieldsValue} = this.props.form;
        var data = getFieldsValue(["name","leave"])
        var params = {articleId:detial._id}
        if(userInfo.isLogin){
            params.userId = userInfo.userId
            params.name = userInfo.userName
        }else {
            params.name = data.name
        }
        params.leave = encodeURIComponent(data.leave)
        for(var k in params){
            if(!params[k]) return message.warning("请填写完整参数")
        }
        syncArticleLeavesubmit(params)
    }
    render() {
        var data = this.props.detial;
        var {userInfo} = this.props;
        var getFieldDecorator = this.props.form.getFieldDecorator
        if(!data._id) return null;
        return (
            <div>
                <Form className="form-select">
                    <Row type="flex" justify="space-between">
                        {
                            userInfo.isLogin?null:
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label">姓名：</label>
                                <FormItem>
                                    {getFieldDecorator('name')(
                                        <Input placeholder="姓名" />
                                    )}
                                </FormItem>
                            </Col>
                        }
                        <Col span={24} style={{position:"relative"}}>
                            <label className="select-label">留言：</label>
                            <FormItem>
                                {getFieldDecorator('leave')(
                                    <TextArea rows={3} placeholder="留言" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Button onClick={this.submit}>提交</Button>
                </Row>
            </div>
        );
    }
}
export default Form.create()(App)
