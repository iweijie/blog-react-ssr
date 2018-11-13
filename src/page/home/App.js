
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "tool/dispatchAction"
import Bg from "./components/homeBg"
import Topnav from "../comom/topNav"
import Recommend from "./components/recommend"
import ArticleList from "../comom/articleList/index"
import { throttle } from "tool/baseTool"
import Whisper from "./components/whisper"
import Calendar from "./components/calendar"
import Tags from "./components/tags"
import {
    Icon
} from "antd"
import "./css.scss"

class Home extends Component {
    constructor(props) {
        super(props);
    }
    flag = true
    page = 1
    pageSize = 10
    UNSAFE_componentWillMount() {
        this.init(this.props)
        let { selftalking,selftalkingListActionAsync,AsyncrecommendList,recommendListModel } = this.props;
        if (!recommendListModel || !recommendListModel.length) {
            AsyncrecommendList()
        }
        if (!selftalking.count || !selftalking.result.length) {
            selftalkingListActionAsync({page:1,pageSize:999})
        }
    }
    init = (params) => {
        let { tags, asyncGetTagsList } = params;
        if (!tags || !tags.length) {
            asyncGetTagsList()
        }
        this.getArticleList(params)
    }
    getArticleList = (params) => {
        let { articleList, total, match, currentTag, setCurrentTag } = params;
        let id = match.params.id;
        let { page, pageSize, flag } = this
        if (flag && ((id && id !== currentTag) || (id === undefined && currentTag))) {
            this.flag = false
            let params = { page: 1, pageSize }
            setCurrentTag(id || "")
            this.page = 1;
            if (id) {
                params.tag = id
            }
            this.props.getArticleListAsync(params, true)
                .then(() => {
                    this.flag = true
                })
                .catch(() => {
                    this.flag = true
                })
        } else {
            if (flag && (!total || !articleList || !articleList.length)) {
                this.flag = false
                setCurrentTag(id || "")
                let params = {
                    page, pageSize
                }
                if (id) {
                    params.tag = id
                }
                this.props.getArticleListAsync(params, true)
                    .then(() => {
                        this.flag = true
                    })
                    .catch(() => {
                        this.flag = true
                    })
            } else {
                this.page = Math.ceil(articleList.length / pageSize)
            }
        }
    }
    changeDate = (time) => {
        console.log(time)
    }
    pagination = (total) => {
        let { page, pageSize } = this;
        let max = Math.ceil(total / pageSize);
        if (max <= page) return;
        this.props.getArticleListAsync({
            page: ++this.page, pageSize
        })
    }
    componentDidMount() {
        window.addEventListener("scroll", this.scroll)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scroll)
    }
    UNSAFE_componentWillReceiveProps(next) {
        let { match } = next;
        let id = match.params.id;
        if (next.userInfo !== this.props.userInfo) {
            this.init(next)
        }
        if (id !== this.tag) {
            this.getArticleList(next)
        }
    }
    scrollHandle = () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        this.props.homeScrollTopAction(top)
    }
    scroll = throttle(this.scrollHandle, 100);
    render() {
        let { homeBgList, browserInfo, homeScrollToTop, articleList, total, tags ,userInfo,selftalking,recommendList } = this.props;
        let { page, pageSize } = this
        let isFixed = browserInfo.height - homeScrollToTop <= 56;
        const content = (
            <div ref="home" className="home">
                <Bg list={homeBgList} browserInfo={browserInfo}></Bg>
                <Topnav userInfo={userInfo} isFixed={isFixed} />
                <div style={{ backgroundColor: "#f1f1f1" }}>
                    <div className="home-content">
                        <div className="home-content-left">
                            <Whisper list={selftalking.result}></Whisper>
                            <ArticleList userInfo={userInfo} list={articleList} />
                            {
                                total && total > (page * pageSize) ?
                                    <p className="pagination" onClick={() => this.pagination(total)}>
                                        或许有更多
                                </p>
                                    :
                                    <p className="pagination disabled">
                                        这是我的底线
                                </p>
                            }
                        </div>
                        <div className="home-content-right">
                            <Recommend list={recommendList}></Recommend>
                            <div className="unification-title mb20">
                                <p><Icon type="credit-card" theme="filled" /> 备忘录</p>
                                <Calendar changeDate={this.changeDate} />
                            </div>

                            <div className="unification-title ">
                                <p><Icon type="read" theme="filled" /> 标签</p>
                                <Tags list={tags}></Tags>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            content
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        homeBgList: store.homeBgList,
        browserInfo: store.browserInfo,
        homeScrollToTop: store.homeScrollToTop,
        articleList: store.articleListModel.result,
        total: store.articleListModel.total,
        tags: store.tagsListModel,
        currentTag: store.getCurrentTag,
        selftalking: store.selftalkingListModel,
        recommendList: store.recommendListModel
    }
}

export default connect(mapStateToProps, dispatchAction)(Home)

// <Carousel list={homeBgList}></Carousel>

// <Carousel list={homeBgList} browserInfo={browserInfo}></Carousel>
