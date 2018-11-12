/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { Component } from 'react';
import observer from "util/observer"
import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css"
import marked from "marked"
import highlight from "util/highlight/highlight.pack"
import "util/highlight/styles/arta.css"
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
class App extends Component {
    constructor(props) {
        super(props);
    }
    editor = null;
    state = {
        temp: null
    }
    timerId = null
    setDefaultValueTimerId = null
    componentDidMount() {
        // var {defualtvalue} = this.props
        this.setEditor()
        // this.setDefaultValue(defualtvalue)
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        });
    }
    setEditor = () => {
        this.timerId = setInterval(() => {
            var textarea = document.querySelector("#editor")
            if (!textarea) return
            this.editor = CodeMirror.fromTextArea(textarea, {
                lineNumbers: true,
                mode: "text/javascript",
            })
            observer.on("addArticleEdit", this.getValue)
            clearInterval(this.timerId)
        }, 200)
    }
    getValue = () => {
        return this.editor.getValue()
    }
    preview = (key) => {
        if (key == "Preview") {
            var temp = this.getValue();
            this.setState({
                temp: this.getContent(temp)
            })
        }
    }
    getContent = (temp) => {
        var template = marked(temp)
        return { __html: template };
    }
    setDefaultValue = (value) => {

        clearInterval(this.setDefaultValueTimerId)
        this.setDefaultValueTimerId = setInterval(() => {
            if (!this.editor) return
            this.editor && this.editor.setValue(value)
            clearInterval(this.setDefaultValueTimerId)
        }, 200)
    }
    UNSAFE_componentWillReceiveProps(next) {
        if (next.defualtvalue != this.props.defualtvalue) {
            this.setDefaultValue(next.defualtvalue)
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
        clearInterval(this.setDefaultValueTimerId)
        observer.remove("addArticleEdit", this.getValue)
    }
    render() {
        return (
            <div className="CodeMirrorEditWrap">
                <p>请使用markdown语法编写</p>
                <div className="content">
                    <Tabs type="card" onChange={this.preview}>
                        <TabPane tab={<span><Icon type="edit" />Edit</span>} key="Edit">
                            <textarea id="editor" name="editor"></textarea>
                        </TabPane>
                        <TabPane className="article-detail" tab={<span><Icon type="file" />Preview</span>} key="Preview">
                            <div className="article-detail-content" dangerouslySetInnerHTML={this.state.temp}></div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default App
