
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "util/axios"
import dispatchAction from "util/dispatchAction"
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    Button
} from "antd"
// const FormItem = Form.Item
class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        files:[]
    }
    UNSAFE_componentWillMount() {
    }
    componentWillUnmount() {
    }
    addFile = (event)=>{
        var eventFiles =  event.target.files;
        if(!eventFiles || !eventFiles.length) return ;
        var {files} = this.state
        this.setState({
            files:[
                ...files,
                ...eventFiles
            ]
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var {files} = this.state
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          console.log(values)
        });
        console.log(files)
        var formData = new FormData();
        files.forEach(v=>{
            console.log(v.name)
            formData.append("file",v,v.name)
        })
        axios.post("http://localhost:8001/api/fileupload",formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result=>{
            console.log(result);
        })
      }
    render() {
        // const {getFieldDecorator} = this.props.form
        const content = (
            <Modal
                style={{ top: "20px" }}
                className="modal"
                title={name}
                visible
                onOk={this.ok}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
            >
                <Form ref="form" className="menu-config">
                    <Row type="flex" justify="space-between">
                        <Col span={24} style={{ position: "relative" }}>
                            <Input type={"file"}  onChange={this.addFile}/>
                        </Col>
                    </Row>
                    <Button onClick={this.handleSubmit}>提交</Button>
                </Form>
            </Modal>
        )
        return (
            content
        );
    }
}
const mapStateToProps = (store) => {
    return {
        menuInfos: store.menuInfos,
        userInfo: store.userInfoModel
    }
}

export default connect(mapStateToProps, dispatchAction)(Form.create()(App))
