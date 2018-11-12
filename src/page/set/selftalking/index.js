import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import observer from "util/observer"
import { timestampFromat } from "util/baseTool"
import {
    Button,
    Table,
    message,
    Input,
    Row,
    Col,
    Form,
    Modal
} from "antd"
import "./css.scss"
const { TextArea } = Input;

const FormItem = Form.Item


class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible: false,
    }
    columns = [{
        title: '内容',
        dataIndex: 'content',
        key: 'content',
    }, {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
        width:100,
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width:200,
        render:(text)=>{
            return timestampFromat(text,false)
        }
    }];
    UNSAFE_componentWillMount() {
        this.getSelftalkingList()
    }
    controlModel = (flag = true) => {
        this.setState({
            visible:flag
        })
    }
    componentWillUnmount() {
    }
    getSelftalkingList = (page =1,pageSize =999) => {
        let { selftalkingListActionAsync } = this.props;
        selftalkingListActionAsync({page,pageSize})
    }
    handleOk = ()=>{
        const { validateFields } = this.props.form;
        let { userInfo ,addSelftalkingAsync} = this.props;
        if(!userInfo.isLogin) return
        validateFields((err,value)=>{
            if(err){
                return
            }
            addSelftalkingAsync(value)
            .then(result=>{
                if(result){
                    message.success(result.msg)
                    this.handleCancel()
                    this.getSelftalkingList()
                }
            })
        })
    }
    handleCancel=()=>{
        this.controlModel(false)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { selftalking } = this.props;
        let {result} = selftalking
        let { data } = this.state;
        if(!data) data = {} ;
        result.forEach(v => {
            v.key = v._id
        })
        return (
            <div className="set-selftalking-wrap">
                <div className="set-selftalking-add">
                    <Button icon="plus" type="primary" onClick={()=>this.controlModel(true)}>创建</Button>
                </div>
                <Table
                    size={"small"}
                    bordered
                    pagination={false}
                    dataSource={result}
                    columns={this.columns} />
                <Modal
                    width={500}
                    className="set-selftalking-modal"
                    title={"新增碎碎念记录"}
                    destroyOnClose
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                <Form>
                    <Row type="flex" justify="space-between">
                        <Col span={24} style={{ position: "relative" }}>
                            <FormItem>
                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: 'Please input content!' }],
                                })(
                                    <TextArea  maxLength={100} rows={4} placeholder="碎碎念" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        selftalking: store.selftalkingListModel,
    }
}

export default connect(mapStateToProps, dispatchAction)(Form.create()(App))
