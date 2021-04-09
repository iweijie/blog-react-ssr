import React, { Component } from "react";
import throttle from "lodash/throttle";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
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
        // isChangeTag

        const { dispatch, articleList, match } = this.props;
        const { result, total, pageSize } = articleList;
        const id = get(match, "params.id");
        dispatch({
            type: "article/getArticleList",
            payload: {
                page,
                pageSize,
                tag: id,
            },
        }).then((data) => {
            // 回到顶部
            setTimeout(() => {});
        });
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
        if (type === "prev")
            return (
                <div className="pagination-item">
                    <Icon type="iconicon-test7"></Icon>
                </div>
            );
        if (type === "next")
            return (
                <div className="pagination-item">
                    <Icon type="iconicon-test9"></Icon>
                </div>
            );

        if (type === "page")
            return (
                <div className="pagination-item">
                    <Link to={`/page/${index}`}>{index}</Link>
                </div>
            );

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
                                <Pagination
                                    current={page}
                                    total={total}
                                    itemRender={this.paginationItemRender}
                                    onChange={this.getArticleList}
                                />
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
    const { id, page } = __isBrowser__ ? ctx.match.params : ctx.params;
    const { store } = ctx;

    const cookies = get(ctx, "req.headers.cookie", "");

    const { dispatch } = store;

    const payload = { page, pageSize: 10, id };

    const requestList = [];

    requestList.push(
        dispatch({
            type: "article/getArticleList",
            payload,
            cookies,
        })
    );

    requestList.push(
        dispatch({
            type: "article/getTagList",
            cookies,
        })
    );

    requestList.push(
        dispatch({
            type: "home/getBgImageList",
            cookies,
        })
    );

    requestList.push(
        dispatch({
            type: "home/getRecommendArticl",
            cookies,
        })
    );

    requestList.push(
        dispatch({
            type: "home/getSelftalkingList",
            cookies,
        })
    );
    await Promise.all(requestList);
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
