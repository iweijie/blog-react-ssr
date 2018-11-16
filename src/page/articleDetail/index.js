
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "tool/dispatchAction"
import { timestampFromat } from "tool/baseTool"
import Messageboard from "./messageBoard"
import TopNav from "../comom/topNav"
import Aside from "./aside"
import history from "tool/history"
import isServer from "tool/env"
import marked from "marked"
import {
    Icon,
} from "antd"
// import { setLocation, getLocation } from "tool/baseTool"
import highlight from "tool/highlight/highlight.pack"
import "tool/highlight/styles/arta.css"
import "./css.scss"

// if (isServer) {
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    },
    pedantic: false,
    // headerPrefix: "mk-wj",
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: false
});
// }

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        html: { __html: "" },
        nav: null,
        isShowNav: true
    }
    UNSAFE_componentWillMount() {
        var { getArticleDetails, match, detial } = this.props;
        var id = match.params.id;
        if (!id) {
            return history.push("/404")
        }
        if (isServer) {
            this.setHtml(detial)
        } else if (!detial || !detial._id) {
            getArticleDetails({ id })
        } else {
            this.setHtml(detial)
        }
        // marked.setOptions({
        //     renderer: new marked.Renderer(),
        //     highlight: function (code) {
        //         return highlight.highlightAuto(code).value;
        //     },
        //     pedantic: false,
        //     // headerPrefix: "mk-wj",
        //     gfm: true,
        //     tables: true,
        //     breaks: false,
        //     sanitize: false,
        //     smartLists: true,
        //     smartypants: true,
        //     xhtml: false
        // });
    }
    match = (html) => {
        var arr = [];
        var uid = 0;
        var prefix = "md-wj-"
        var newStr = html.replace(/<h[1-6]{1} id="(\S*?)">(.*?)<\/h[1-6]{1}>/g, function (str, matchId, matchName) {
            uid++;
            var id = prefix + uid;
            var num = Number(str.match(/<h([1-6]{1}).*?>/)[1])
            arr.push({ level: num, id, name: matchName })
            return str.replace(matchId, id)
        })
        return {
            html: newStr,
            nav: this.formatRight(arr)
        }
    }
    formatRight = (arr) => {
        for (var i = 0; i < arr.length; i++) {
            if (i + 1 >= arr.length) continue;
            var data = arr[i];
            var next = arr[i + 1];
            if (data.level === next.level) continue;
            if (next.level > data.level) {
                if (!data.child) {
                    data.child = []
                }
                if (data.child.length && next.level > data.child[data.child.length - 1].level) {
                    if (!data.child[data.child.length - 1].child) {
                        data.child[data.child.length - 1].child = []
                    }
                    data.child[data.child.length - 1].child.push(next)
                } else {
                    data.child.push(next)
                }
                arr.splice(i + 1, 1)
                i--;
            }
        }
        return arr
    }
    // updateTime = (id, time) => {
    //     var { asyncArticlTime } = this.props
    //     if (!localStorage) {
    //         asyncArticlTime({ id, time })
    //     }
    //     var timeId = "timeId"
    //     var ids = getLocation(timeId)
    //     if (!ids) {
    //         ids = {}
    //     }
    //     var now = +new Date()
    //     if (!ids[id] || (ids[id] + 60 * 60 * 1000) <= now) {
    //         ids[id] = now
    //         setLocation(timeId, ids)
    //         asyncArticlTime({ id, time })
    //     }
    // }
    setATagBlank = (temp) => {
        var a;
        while (a = temp.match(/<a href=.*?>.*?<\/a>/)) {
            if (a) {
                var str = a[0]
                var arr = str.split(" ")
                arr.splice(1, 0, "target=_blank")
                var newstr = arr.join(" ")
                temp = temp.replace(str, newstr)
            }
        }
        return temp
    }
    getContent = (temp) => {
        var template = marked(temp)
        template = this.setATagBlank(template)
        return this.match(template);
    }
    componentWillUnmount() {
        this.props.articleDetailsAction({})
    }
    UNSAFE_componentWillReceiveProps(next) {
        if (next.detial != this.props.detial) {
            this.setHtml(next.detial)
        }
    }

    setHtml = (data) => {
        var obj = this.getContent(data.content)
        this.setState({
            html: { __html: obj.html },
            nav: obj.nav
        })
    }

    toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    goBack = () => {
        history.goBack();
    }
    toggleNav = () => {
        let { isShowNav } = this.state;
        this.setState({
            isShowNav: !isShowNav
        })
    }
    render() {
        var data = this.props.detial;
        var { html, nav, isShowNav } = this.state
        if (!data._id) return null;
        return (
            <div>
                <TopNav isFixed></TopNav>
                <h1 className="display-none">{data.title}</h1>
                <div className="article-detail-warp" style={isShowNav ? null : { paddingRight: 0 }}>
                    <div className="article-detail">
                        <div className="box-shadow box-shadow-mb">
                            <div className="article-title">
                                <div className="item-title">
                                    {data.title}
                                </div>
                                <div className="item-author">
                                    <span className="mr10"><Icon className="pr5" type="user" />{data.autor && data.autor.name}</span>
                                    <span className="mr10"><Icon className="pr5" type="calendar" />发表于{timestampFromat(data.createTime)}</span>
                                    <span className="item-tag">
                                        <Icon type="tag-o" className="pr5" />
                                        {data.tags && data.tags.join("，")}
                                    </span>
                                </div>
                            </div>
                            <div className="article-detail-content" dangerouslySetInnerHTML={html}></div>
                        </div>
                        <div className="box-shadow">
                            <Messageboard {...this.props}></Messageboard>
                        </div>
                    </div>
                    <div className="article-aside-warp" style={isShowNav ? null : { right: "-300px" }}>
                        <Aside nav={nav} />
                        <div className="article-aside-control">
                            <div onClick={this.toTop} className="goTop">Top</div>
                            <div onClick={this.goBack} className="goBack">Back</div>
                            <ul onClick={this.toggleNav} className="toggle">
                                <li className={isShowNav ? "toggle-1 action" : "toggle-1"}></li>
                                <li className={isShowNav ? "toggle-2 action" : "toggle-2"}></li>
                                <li className={isShowNav ? "toggle-3 action" : "toggle-3"}></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        detial: store.articleDetialsModel,
        userInfo: store.userInfoModel
    }
}
export default connect(mapStateToProps, dispatchAction)(ArticleDetail)
