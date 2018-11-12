import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom'
import dispatchAction from "util/dispatchAction"
import Edit from "./components/edit"
import Select from "./components/select"
import observer from "util/observer"
import {
    Button,
    message,
    Modal
} from "antd"
import "./css.scss"

class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        setDefault: false,
        defaultData: null
    }
    timerId = null ;
    when = false ;
    isAdd = false;
    UNSAFE_componentWillMount() {
        var { getArticleDetails, match } = this.props;
        var reg = /^\/set\/article\/edit\/([A-z0-9]+)$/;
        let id;
        if (match.url == "/set/article/add") {
            this.isAdd = true
        }else if(match.url.match(reg)){
            id = match.params.id
        }
        if (id && !this.isAdd) {
            getArticleDetails({ id })
        } else {
            var data = localStorage.getItem("addarticle")
            if (data) {
                this.setState({
                    setDefault: true
                })
            }
        }
        this.timerId = setInterval(this.saveLocal, 2 * 60 * 1000)
        this.getTags()
    }
    UNSAFE_componentWillReceiveProps(next) {
        if (next.userInfo !== this.props.userInfo) {
            this.getTags()
        }
    }
    getTags = () => {
        let { asyncGetDetailTagsList } = this.props;
        asyncGetDetailTagsList()
    }
    submitHandle = () => {
        var { match } = this.props;
        let id = match.params.id
        var params = this.getContent();
        if (!this.isAdd) {
            params.id = id
        }
        for (var k in params) {
            if (params[k] === "" || params[k] === undefined) {
                return message.warning(k + "  不能为空")
            }
        }
        this.props.syncArticlesubmit(params)
            .then(result => {
                if (result == 1) {
                    this.when = true;
                    localStorage.removeItem("addarticle")
                    setTimeout(() => {
                        history.go(-1)
                    }, 1500)
                }
            })
    }
    getContent = () => {
        var { userInfo } = this.props;
        var content = observer.emit("addArticleEdit")[0]
        var params = observer.emit("addArticleSelect")[0]
        params.content = content
        params.autor = userInfo.userId
        return params
    }
    saveLocal = () => {
        var params = this.getContent()
        delete params.autor
        var str = JSON.stringify(params)
        localStorage.setItem("addarticle", str)
    }
    location = (location) => {
        if (!location.pathname.match(/\/set\/article\/.+/)) {
            if (this.when) {
                return true
            }
            return "当前文章没有保存，请先保存在离开哦！是否离开？"
        }
        return true
    }
    handleOk = () => {
        try {
            var data = JSON.parse(localStorage.getItem("addarticle"))
            this.setState({
                defaultData: data,
                setDefault: false
            })
        }
        catch (err) {
            console.log(err)
            message.error(err.messgae)
        }
    }
    handleCancel = () => {
        this.setState({
            setDefault: false
        })
    }
    componentWillUnmount() {
        this.props.articleDetailsAction({})
        clearInterval(this.timerId)
    }
    render() {
        var { detial } = this.props;
        var { defaultData } = this.state
        var headtitle, defualtvalue, params;
        if (this.isAdd) {
            defaultData ? defualtvalue = defaultData : defualtvalue = {}
            headtitle = "新增界面"
        } else {
            defualtvalue = detial
            headtitle = "修改界面"
        }
        let { tags, content, description, ispublic, title } = defualtvalue;
        params = { tags, description, ispublic, title }

        return (
            <div className="edit-wrap">
                <Prompt message={this.location} />
                <h3>{headtitle}</h3>
                <Select defualtvalue={params} {...this.props} />
                <Edit defualtvalue={content} />
                <Button onClick={this.submitHandle} type="primary" className="edit-submit mt20">提交</Button>
                <Modal
                    width={348}
                    className="login-modal"
                    title="提示"
                    visible={this.state.setDefault}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>是否启用上次本地以保存的新增数据</p>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        detial: store.articleDetialsModel,
        tagsList: store.tagsDetailListModel,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)
