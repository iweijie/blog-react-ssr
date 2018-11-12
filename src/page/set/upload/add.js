import React, { Component } from 'react';
import {
    Button,
    Input,
    Row,
    Col,
    Radio,
    Form,
    Modal,
    Icon,
    message
} from "antd"
const FormItem = Form.Item
const RadioGroup = Radio.Group;


class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible: false,
        fileList : [],
        fileMap:{}
    }
    lock = true ;
    controlModel = (flag = true) => {
        this.setState({
            visible: flag
        })
    }
    componentWillUnmount() {
    }
    handleOk = () => {
        const { validateFields } = this.props.form;
        let {fileList} = this.state;
        let { userInfo,uploadAsync } = this.props;
        if (!userInfo.isLogin) return message.success("请先登入");
        validateFields((err, value) => {
            if (err) {
                return
            }
            if(!fileList.length) return message.warning("请先选择文件");
            var formData = new FormData()
            for(var k in value){
                formData.append(k,value[k])
            }
            fileList.forEach(v=>{
                formData.append("file",v)
            })
            if(!this.lock) return ;
            this.lock = false ;
            message.info("文件正在上传中");
            uploadAsync(formData)
            .then(data=>{
                if(data){
                    this.handleCancel()
                }
            })
            .finally(()=>{
                this.lock = true ;
            })
        })
    }
    handleCancel = () => {
        this.controlModel(false)
        this.setState({
            fileList:[],
            fileMap:{}
        })
    }
    arouseInput = ()=>{
        let input = document.querySelector("#set-upload-input");
        input.click()
    }
    inputChange = ()=>{
        let input = document.querySelector("#set-upload-input");
        let {fileList,fileMap} = this.state;
        let len = input.files.length
        if(len){
            for(var i=0;i<len;i++){
                let data = input.files[i];
                if(!fileMap[data.name]){
                    fileMap[data.name] = 1 ;
                    fileList.push(data)
                }else {
                    message.warning(`${data.name}已存在`)
                }
            }
            this.setState({
                fileList,
                fileMap
            })
        }
        input.value = "";
    }
    clearFile = (data)=>{
        let {fileList,fileMap} = this.state
        let index = fileList.indexOf(data);
        if(index !== -1){
            fileList.splice(index,1);
            delete fileMap[data.name]
            this.setState({
                fileList,fileMap
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { userInfo } = this.props;
        let { userId, userName } = userInfo;
        let {fileList} = this.state
        return (
            <div className="set-upload--add-wrap">
                <div className="set-upload-add">
                    <Button icon="plus" type="primary" onClick={() => this.controlModel(true)}>Add</Button>
                </div>
                <Modal
                    width={500}
                    className="set-upload-modal"
                    title={"文件上传"}
                    destroyOnClose
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Row type="flex" justify="space-between">
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">选择文件：</label>
                                <FormItem>
                                    <Button className="set-upload-btn" onClick={this.arouseInput} type="primary" icon="plus">添加文件</Button>
                                    <input multiple onChange={this.inputChange} id="set-upload-input" type="file" title=""/>
                                    {
                                        fileList.length ?
                                        <ul className="set-upload-selected-file">
                                            {
                                                fileList.map((v,k)=>{
                                                    return <li key={k}>{v.name}<Icon onClick={()=>this.clearFile(v)} type="close" theme="outlined" /></li>
                                                })
                                            }
                                        </ul>
                                        :null
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between">
                            {getFieldDecorator('creator', {
                                initialValue: userName
                            })(
                                <Input hidden />
                            )}
                            {getFieldDecorator('creatorId', {
                                initialValue: userId
                            })(
                                <Input hidden />
                            )}
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">类型：</label>
                                <FormItem>
                                    {getFieldDecorator('limit', {
                                        initialValue: 0,
                                        rules: [{ required: true, message: 'Please select type!' }]
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
                </Modal>
            </div>
        );
    }
}

export default Form.create()(App)

// {
//     <span className="set-upload-btn">
                                        
//                                     </span>
// }