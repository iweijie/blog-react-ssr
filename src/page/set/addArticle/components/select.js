/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { Component } from 'react';
import observer from "util/observer"
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Radio
} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input
const RadioGroup = Radio.Group;

class SelectDate extends Component {
    constructor(props) {
        super(props);
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    componentDidMount() {
        observer.on("addArticleSelect", this.getValue)
    }
    componentWillUnmount(){
        observer.remove("addArticleSelect", this.getValue)
    }
    getValue = () => {
        var { getFieldsValue } = this.props.form
        return getFieldsValue()
    }
    render() {
        var { getFieldDecorator } = this.props.form
        var { defualtvalue,tagsList } = this.props
        var { title, tags, description, ispublic } = defualtvalue
        var options = tagsList.map(v => <Option key={v.tagCode} value={v.tagCode}>{v.tagName}</Option>)
        return (
            <Form className="form-select">
                <Row type="flex" justify="space-between">
                    <Col span={24} style={{ paddingLeft: "40px", position: "relative" }}>
                        <label className="select-label">标题：</label>
                        <FormItem>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input title!' }],
                                initialValue: title,
                            })(
                                <Input placeholder="标题" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} style={{ paddingLeft: "40px", position: "relative" }}>
                        <label className="select-label">标签：</label>
                        <FormItem>
                            {getFieldDecorator('tags', {
                                rules: [{ required: true, message: 'Please input title!' }],
                                initialValue: tags,
                            })(
                                <Select
                                    mode="multiple"
                                    placeholder="标签">
                                    {options}
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={24} style={{ paddingLeft: "40px", position: "relative" }}>
                        <label className="select-label">描述：</label>
                        <FormItem>
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please input description!' }],
                                initialValue: description,
                            })(
                                <TextArea rows={2} placeholder="描述" />
                            )}
                        </FormItem>
                    </Col>

                    <Col md={11} span={24} style={{ paddingLeft: "80px", position: "relative" }}>
                        <label className="select-label">是否公开：</label>
                        <FormItem>
                            {getFieldDecorator('ispublic', {
                                initialValue: ispublic !== undefined ? ispublic : 0,
                            })(
                                <RadioGroup >
                                    <Radio value={0}>公开</Radio>
                                    <Radio value={1}>登入可见</Radio>
                                    <Radio value={2}>私有</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(SelectDate)
