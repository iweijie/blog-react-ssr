import React, { Component } from 'react';
import {
    Form,
    Select,
    DatePicker,
    Row,
    Col
} from "antd"
import { debounce } from "tool/baseTool"
import moment from 'moment';

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker

const style = {
    p: {
        fontSize: "12px",
        color: "red",
        lineHeight: '20px'
    },
    w100: {
        width: '100%'
    }
}

class Search extends Component {

    state = {
        disabled: false
    }

    onSearch = debounce(() => {
        const { toFormat, getList } = this.props
        const { getFieldsValue } = this.props.form;
        const value = getFieldsValue()
        const params = this.filter(value)
        if (params.time && params.time.length) {
            params.time = [toFormat(params.time[0]), toFormat(params.time[1])]
        }
        getList(params)
    }, 500)

    filter = (obj) => {
        const p = {}
        Object.keys(obj).forEach(v => {
            if (obj[v] !== undefined && obj[v] !== "") {
                p[v] = obj[v]
            }
        })
        return p
    }

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }
    formItemLayout1 = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }

    categoryChange = () => {
        const { setFieldsValue } = this.props.form
        setFieldsValue({
            tag: undefined
        })
        this.onSearch()
    }

    toMoment = (num) => {
        let str = num + ''
        str = `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6)}`
        return moment(str)
    }

    render() {
        const { toMoment } = this
        const { recordCategoryList, recordListParams } = this.props
        const { getFieldDecorator } = this.props.form
        const c = recordListParams.category
        const item = recordCategoryList.find(v => v._id === c)
        let list = [], disabled = true;
        if (item) {
            list = item.tags
            disabled = !item.hasTag
        }
        let time;
        if (recordListParams.time && recordListParams.time.length) {
            time = [toMoment(recordListParams.time[0]), toMoment(recordListParams.time[1])]
        }
        return (
            <Row className="set-record-search">
                <Col span={6}>
                    <FormItem label="分类" {...this.formItemLayout}>
                        {getFieldDecorator('category', {
                            initialValue: recordListParams.category
                        })(
                            <Select
                                style={style.w100}
                                placeholder="分类"
                                onChange={this.categoryChange}
                            >
                                {
                                    recordCategoryList.map(v => <Option key={v._id} value={v._id}>{v.name}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem label="标签"  {...this.formItemLayout}>
                        {getFieldDecorator('tag', {
                            initialValue: recordListParams.tag
                        })(
                            <Select
                                allowClear
                                placeholder="标签"
                                disabled={disabled}
                                style={style.w100}
                                onChange={this.onSearch}
                            >
                                {
                                    list.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={10}>
                    <FormItem label="时间"  {...this.formItemLayout1}>
                        {getFieldDecorator('time', {
                            initialValue: time
                        })(
                            <RangePicker allowClear={false} onChange={this.onSearch} style={style.w100} />
                        )}
                    </FormItem>
                </Col>
            </Row>
        );
    }
}

export default Form.create()(Search)
