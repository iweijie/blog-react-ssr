import React, { Component } from "react";
import throttle from "lodash/throttle";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import size from "lodash/size";
import { handleFormatList } from "../../models/article";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { connect } from "react-redux";
import Bg from "./components/homeBg";
import Topnav from "../comom/topNav";
import Recommend from "./components/recommend";
import ArticleList from "../comom/articleList/index";
import Whisper from "./components/whisper";
import Calendar from "./components/calendar";
import Tags from "./components/tags";
import { Helmet } from "react-helmet";
import Icon from "../../components/Icon";
import "./index.less";
import apis from "../../apis";

class Home extends Component {
    constructor() {
        super();
        this.timerId = null;
        this.timerTIme = 3;
        this.state = {};
    }

    componentDidMount() {
        if (__isBrowser__) {
            this.scrollHandle();
            window.addEventListener("scroll", this.scroll);
            this.timerId = setTimeout(this.setLabelFixed, 100);
        }
    }

    getArticleList = (page) => {

        setTimeout(() => {});
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scroll);
        clearInterval(this.timerId);
    }

    setLabelFixed = () => {
        if (!this.label) return;

        const top = this.getTopPoint(this.label);
        const left = this.getLeftPoint(this.label);
        this.setState({
            labelTop: top,
            labelLeft: left,
        });
    };

    resetWidthAndHeight = () => {
        let height =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        let width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        this.props.resizeAction({
            height,
            width,
        });
    };
    scrollHandle = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "home/setHomeScrollTopAction",
            payload:
                document.documentElement.scrollTop || document.body.scrollTop,
        });
    };
    scroll = throttle(this.scrollHandle, 100);

    getTopPoint = (obj) => {
        let t = obj.offsetTop;
        while ((obj = obj.offsetParent)) {
            t += obj.offsetTop;
        }
        return t;
    };
    getLeftPoint = (obj) => {
        let t = obj.offsetLeft;
        while ((obj = obj.offsetParent)) {
            t += obj.offsetLeft;
        }
        return t;
    };

    paginationItemRender = (index, type, reactDom) => {
        const { dispatch, articleList, match } = this.props;
        const id = get(match, "params.id");

        const page = get(articleList, "page");

        if (type === "prev") {
            const index = page - 1;

            const to = id ? `/tags/${id}/${index}` : `/page/${index}`;
            return (
                <div className="pagination-item" title="上一页">
                    <Link to={to}>{<Icon type="iconicon-test7"></Icon>}</Link>
                </div>
            );
        }

        if (type === "next") {
            const index = page + 1;

            const to = id ? `/tags/${id}/${index}` : `/page/${index}`;
            return (
                <div className="pagination-item" title="下一页">
                    <Link to={to}>{<Icon type="iconicon-test9"></Icon>}</Link>
                </div>
            );
        }

        if (type === "page") {
            const to = id ? `/tags/${id}/${index}` : `/page/${index}`;
            return (
                <div className="pagination-item" title={`第${index}页`}>
                    <Link to={to}>{index}</Link>
                </div>
            );
        }

        return null;
    };

    render() {
        const {
            homeBgList,
            browserInfo,
            homeScrollToTop,
            articleList,
            tags,
            userInfo,
            selftalking,
            recommendList,
            match,
        } = this.props;
        const { labelTop, labelLeft } = this.state;
        const {
            result,
            total,
            page,
            pageSize,
            currentTag,
            hasMore,
        } = articleList;

        const isFixed = browserInfo.height - homeScrollToTop <= 56;

        return (
            <div className="home">
                <Helmet>
                    <title>iweijie</title>
                    <meta
                        name="keywords"
                        content="iweijie与小凤凤的个人小网站，怀抱着对于未来的无限期待！"
                    />
                </Helmet>
                <Bg list={homeBgList} browserInfo={browserInfo}></Bg>
                <Topnav userInfo={userInfo} isFixed={isFixed} />
                <div style={{ backgroundColor: "#f1f1f1" }}>
                    <div className="home-content">
                        <div className="home-content-left">
                            <Whisper
                                list={selftalking}
                                isLogin={!!userInfo.userId}
                            ></Whisper>
                            <ArticleList userInfo={userInfo} list={result} />

                            <div className="pagination">
                                {total / pageSize > 1 ? (
                                    <Pagination
                                        current={page}
                                        total={total}
                                        itemRender={this.paginationItemRender}
                                        onChange={this.getArticleList}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className="home-content-right">
                            <Recommend list={recommendList}></Recommend>
                            <div
                                id="label"
                                ref={(ref) => (this.label = ref)}
                                className={`unification-title  mb20 `}
                                style={{ left: labelLeft }}
                            >
                                <p>
                                    <Icon type="iconread" theme="filled" /> 标签
                                </p>
                                <Tags
                                    currentTag={currentTag}
                                    list={tags}
                                ></Tags>
                            </div>

                            <div className="unification-title mb20">
                                <p>
                                    <Icon
                                        type="iconcreditcard-fill"
                                        theme="filled"
                                    />
                                    备忘录
                                </p>
                                <Calendar changeDate={this.changeDate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.getInitialProps = async (ctx) => {
    const { id = "", page = 1 } = __isBrowser__ ? ctx.match.params : ctx.params;
    const { store } = ctx;
    const { dispatch } = store;
    const payload = { page, pageSize: 10, tag: encodeURIComponent(id) };
    const empty = undefined;
    const other = __isBrowser__ ? {} : { ctx };
    const requestList = [];

    const state = store.getState();

    const { article, home } = state;

    if (
        +payload.page !== +get(article, "articleList.page") ||
        payload.id !==
            encodeURIComponent(get(article, "articleList.currentTag"))
    ) {
        requestList.push(
            apis.getArticleList(payload, other).then((data) => {
                let { page, pageSize, tag } = payload;

                page = Number(page);

                let { total = 0, result = [] } = data;
                result = handleFormatList(result);
                dispatch({
                    type: "article/articleList",
                    payload: {
                        currentTag: tag ? decodeURIComponent(tag) : "",
                        result,
                        page,
                        pageSize,
                        total,
                        loading: false,
                    },
                });
            })
        );
    }

    if (isEmpty(get(article, "tagsList"))) {
        requestList.push(
            apis.getTagList(empty, other).then((data) => {
                dispatch({
                    type: "article/tagsList",
                    payload: get(data, "result", []),
                });
            })
        );
    }

    // const hasHomeBg = size(get(home, "homeBgList")) > 1;

    // if (!hasHomeBg) {
    //     requestList.push(
    //     );
    // }

    if (isEmpty(get(home, "recommendList"))) {
        requestList.push(
            apis.getRecommendArticle(empty, other).then((data) => {
                dispatch({
                    type: "home/recommendList",
                    payload: get(data, "result", []),
                });
            })
        );
    }

    if (isEmpty(get(home, "selftalking"))) {
        requestList.push(
            apis
                .getSelftalkList(
                    {
                        page: 1,
                        pageSize: 999,
                    },
                    other
                )
                .then((data) => {
                    dispatch({
                        type: "home/selftalking",
                        payload: get(data, "result", []),
                    });
                })
        );
    }

    try {
        await Promise.all(requestList);
    } catch (err) {
        console.log("home", err);
    }
};

const mapStateToProps = (store) => {
    return {
        ...store.home,
        browserInfo: store.common.browserInfo,
        userInfo: store.common.userInfo,
        tags: store.article.tagsList,
        articleList: store.article.articleList,
    };
};

export default connect(mapStateToProps)(Home);
