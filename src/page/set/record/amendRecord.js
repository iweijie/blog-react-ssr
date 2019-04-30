import React, { Component } from 'react';
import {
    message,
    Input,
    Radio,
    Form,
    Modal,
    Select,
    DatePicker,
    InputNumber
} from "antd"
import { distinct } from "tool/baseTool"

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea
const Option = Select.Option


const style = {
    w100: {
        width: "100%"
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

    UNSAFE_componentWillMount() {
    }
    UNSAFE_componentWillReceiveProps(next) {
    }
    handleCancel = () => {
        const { onCancel } = this.props;
        const { resetFields } = this.props.form
        resetFields()
        onCancel && onCancel()
    }
    handleOk = () => {
        const { handleOk, onCancel } = this.props;
        const { validateFields } = this.props.form
        validateFields((err, value) => {
            if (err) return;
            handleOk && handleOk(value)
            onCancel && onCancel()
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
        let title = data ? "编辑" : "新增";
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
                    <FormItem label="分类" {...this.formItemLayout}>
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: '请输入分类' }],
                            initialValue: data.tagName || undefined
                        })(
                            <Input maxLength={10} placeholder="分类名称" />
                        )}
                    </FormItem>
                    <FormItem label="标签"  {...this.formItemLayout}>
                        {getFieldDecorator('tag', {
                            rules: [{ required: !disabled, message: '请输入标签' }],
                            initialValue: data.tags
                        })(
                            <Select>
                                <Option value={1}>是的方式发生</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="时间"  {...this.formItemLayout}>
                        {getFieldDecorator('unit', {
                            rules: [{ required: true, message: '请输入单位' }],
                            initialValue: data.unit
                        })(
                            <DatePicker style={style.w100} />
                        )}
                    </FormItem>
                    <FormItem label="值"  {...this.formItemLayout}>
                        {getFieldDecorator('value', {
                            rules: [{ required: true, message: '请输入' }],
                            initialValue: 0
                        })(
                            <InputNumber min={0} style={style.w100} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AddRecord)
