import React, { Component } from 'react';
import {
    message,
    Input,
    Radio,
    Form,
    Modal
} from "antd"
import { distinct } from "tool/baseTool"

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea


const style = {
    p: {
        fontSize: "12px",
        color: "red",
        lineHeight: '20px'
    }
}

class AddRecord extends Component {

    state = {
        disabled: false
    }

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }
    handleCancel = () => {
        const { onCancel } = this.props;
        const { resetFields } = this.props.form
        resetFields()
        onCancel && onCancel()
    }
    handleOk = () => {
        const { handleOk } = this.props;
        const { validateFields } = this.props.form
        validateFields((err, value) => {
            if (err) return;
            if (value.tags) {
                value.tags = distinct(value.tags.split(/\s/).filter(v => v))
            }
            handleOk && handleOk(value)
            this.handleCancel()
        })
    }
    radioChange = (e) => {
        const { setFieldsValue } = this.props.form;
        const v = e.target.value
        if (!v) {
            setFieldsValue({ 'tags': undefined })
        }
        this.setState({
            disabled: !v
        })

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { data, visible } = this.props;
        const { disabled } = this.state
        let title = data ? "编辑分类" : "新增分类";
        data = data || {}
        return (
            <Modal
                width={500}
                className="set-record-modal"
                title={title}
                destroyOnClose
                maskClosable={false}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form >
                    <FormItem label="分类名称" {...this.formItemLayout}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入分类名称' }],
                            initialValue: data.tagName || undefined
                        })(
                            <Input maxLength={10} placeholder="分类名称" />
                        )}
                    </FormItem>
                    <FormItem label="是否有标签"  {...this.formItemLayout}>
                        {getFieldDecorator('hasTag', {
                            rules: [{ required: true, message: '请选择标签是否存在' }],
                            initialValue: data.type || true
                        })(
                            <RadioGroup onChange={this.radioChange}>
                                <Radio value>有</Radio>
                                <Radio value={false}>无</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="标签"  {...this.formItemLayout}>
                        {getFieldDecorator('tags', {
                            rules: [{ required: !disabled, message: '请输入标签' }],
                            initialValue: data.tags
                        })(
                            <TextArea disabled={disabled} maxLength={100} autosize={{ minRows: 2, maxRows: 6 }} placeholder="标签名称，请用空格隔开" />
                        )}
                        <p style={style.p}>注：多个标签之间请使用空格隔开</p>
                    </FormItem>
                    <FormItem label="图形展示方式"  {...this.formItemLayout}>
                        {getFieldDecorator('graph', {
                            rules: [{ required: true, message: '请选择类型' }],
                            initialValue: data.graph || 1
                        })(
                            // 1 : 条形图 ； 2 饼状图 ； 3 散点图
                            <RadioGroup >
                                <Radio value={1}>条形图</Radio>
                                <Radio value={2}>饼状图</Radio>
                                <Radio value={3}>散点图</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="类型"  {...this.formItemLayout}>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择类型' }],
                            initialValue: data.type || 1
                        })(
                            <RadioGroup >
                                <Radio value={1}>公开</Radio>
                                <Radio value={2}>私有</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="单位"  {...this.formItemLayout}>
                        {getFieldDecorator('unit', {
                            rules: [{ required: true, message: '请输入单位' }],
                            initialValue: data.unit
                        })(
                            <Input placeholder="单位" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AddRecord)
