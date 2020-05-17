import React, { Component } from 'react';
import {
    Table,
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
import moment from 'moment';

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
        disabled: false,
        list: [{ id: 0 }]
    }
    uid = 1

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }


    columns = [
        {
            title: <span className="ant-form-item-required">分类</span>,
            dataIndex: 'category',
            key: 'category',
            width: 100,
            render: (t, r) => {
                const { recordCategoryList } = this.props;
                const { getFieldDecorator } = this.props.form
                return <FormItem>
                    {getFieldDecorator(`[${r.id}].category`, {
                        rules: [{ required: true, message: '请选择分类' }],
                    })(
                        <Select style={style.w100}>
                            {
                                recordCategoryList.map(v => <Option key={v._id} value={v._id}>{v.name}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            }
        },
        {
            title: <span className="ant-form-item-required">标签</span>,
            dataIndex: 'tag',
            key: 'tag',
            width: 100,
            render: (t, r) => {
                const { recordCategoryList } = this.props;
                const { getFieldDecorator, getFieldValue } = this.props.form
                const c = getFieldValue(`[${r.id}].category`)
                const item = recordCategoryList.find(v => v._id === c)
                let list = [], disabled = true;
                if (item) {
                    list = item.tags
                    disabled = !item.hasTag
                }
                return <FormItem>
                    {getFieldDecorator(`[${r.id}].tag`, {
                        rules: [{ required: !disabled, message: '选择标签' }],
                    })(
                        <Select disabled={disabled} style={style.w100}>
                            {
                                list.map(v => <Option key={v} value={v}>{v}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            }
        },
        {
            title: <span className="ant-form-item-required">值</span>,
            dataIndex: 'value',
            key: 'value',
            width: 100,
            render: (t, r) => {
                const { getFieldDecorator } = this.props.form
                return <FormItem>
                    {getFieldDecorator(`[${r.id}].value`, {
                        rules: [{ required: true, message: '请输入值' }],
                    })(
                        <InputNumber min={0} style={style.w100} />
                    )}
                </FormItem>
            }
        },
        {
            title: <span className="ant-form-item-required">时间</span>,
            dataIndex: 'time',
            key: 'time',
            width: 100,
            render: (t, r) => {
                const { getFieldDecorator } = this.props.form
                return <FormItem>
                    {getFieldDecorator(`[${r.id}].time`, {
                        rules: [{ required: true, message: '请选择时间' }],
                        initialValue: moment()
                    })(
                        <DatePicker style={style.w100} />
                    )}
                </FormItem>
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: (t, r) => {
                const { list } = this.state
                if (r === list[0]) return <a className="blue fs12" href="javascript:;" onClick={this.add}>添加</a>
                return <a className="blue fs12" href="javascript:;" onClick={() => this.remove(r)}>删除</a>
            }
        }
    ];

    add = () => {
        const { list } = this.state
        list.push({ id: this.uid++ })
        this.setState({
            list
        })
    }

    remove = (r) => {
        const { list } = this.state
        const i = list.findIndex(v => v === r)
        if (i !== -1) {
            list.splice(i, 1)
            this.setState({
                list
            })
        }
    }

    handleCancel = () => {
        const { onCancel } = this.props;
        const { resetFields } = this.props.form
        resetFields()
        onCancel && onCancel()
    }

    handleOk = () => {
        const { handleOk, toFormat } = this.props;
        const { validateFields } = this.props.form
        validateFields((err, value) => {
            if (err) return;
            let data = Object.keys(value).map(v => {
                const d = value[v];
                d.time = toFormat(d.time)
                return d
            })
            handleOk && handleOk(data)
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
        let { visible } = this.props;
        const { list } = this.state
        return (
            <Modal
                width={800}
                className="record-add-modal"
                title="新增记录"
                destroyOnClose
                maskClosable={false}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Table
                    className="table-fixed"
                    size={"small"}
                    bordered
                    pagination={false}
                    dataSource={list}
                    rowKey={r => r.id}
                    columns={this.columns} />
            </Modal>
        );
    }
}

export default Form.create()(AddRecord)