import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { timestampFromat, popUpImage } from "../../utils/index";
import Messageboard from "./messageBoard";
import TopNav from "../comom/topNav";
import Aside from "./aside";
import { Helmet } from "react-helmet";
import "./index.less";
import { Icon } from "antd";

class ArticleDetail extends Component {
    state = {
        isShowNav: true,
    };

    componentDidMount() {
        this.toTop();
    }

    popUpImage = (event) => {
        if (event.target.tagName === "IMG") {
            const src = event.target.src;
            popUpImage(src, true);
        }
    };

    toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    goBack = () => {
        const { history } = this.props;
        history.goBack();
    };
    toggleNav = () => {
        let { isShowNav } = this.state;
        this.setState({
            isShowNav: !isShowNav,
        });
    };
    render() {
        const data = this.props.detial;
        const { isShowNav } = this.state;
        const { __html, __nav } = data;
        if (!data._id) return null;
        return (
            <div>
                <TopNav isFixed></TopNav>
                <Helmet>
                    <title>{data.title}</title>
                    <meta name="keywords" content={data.description} />
                </Helmet>
                <h1 className="display-none">{data.title}</h1>
                <div
                    className="article-detail-warp"
                    style={isShowNav ? null : { paddingRight: 0 }}
                >
                    <div className="article-detail">
                        <div
                            onClick={this.popUpImage}
                            className="box-shadow box-shadow-mb"
                        >
                            <div className="article-title">
                                <div className="item-title">{data.title}</div>
                                <div className="item-author">
                                    <span className="mr10">
                                        <Icon className="pr5" type="user" />
                                        {data.autor && data.autor.name}
                                    </span>
                                    <span className="mr10">
                                        <Icon className="pr5" type="calendar" />
                                        发表于{timestampFromat(data.createTime)}
                                    </span>
                                    <span className="item-tag">
                                        <Icon type="tag-o" className="pr5" />
                                        {data.tags && data.tags.join("，")}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="article-detail-content"
                                dangerouslySetInnerHTML={__html}
                            ></div>
                        </div>
                        <div className="box-shadow">
                            <Messageboard {...this.props}></Messageboard>
                        </div>
                    </div>
                    <div
                        className="article-aside-warp"
                        style={isShowNav ? null : { right: "-300px" }}
                    >
                        <Aside nav={__nav} />
                        <div className="article-aside-control">
                            <div onClick={this.toTop} className="goTop">
                                Top
                            </div>
                            <div onClick={this.goBack} className="goBack">
                                Back
                            </div>
                            <ul onClick={this.toggleNav} className="toggle">
                                <li
                                    className={
                                        isShowNav
                                            ? "toggle-1 action"
                                            : "toggle-1"
                                    }
                                ></li>
                                <li
                                    className={
                                        isShowNav
                                            ? "toggle-2 action"
                                            : "toggle-2"
                                    }
                                ></li>
                                <li
                                    className={
                                        isShowNav
                                            ? "toggle-3 action"
                                            : "toggle-3"
                                    }
                                ></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ArticleDetail.getInitialProps = async (ctx) => {
    const { store } = ctx;
    const id = __isBrowser__ ? ctx.match.params.id : ctx.params.id;

    await store.dispatch({
        type: "article/getArticleDetails",
        payload: {
            id,
        },
    });
};

const mapStateToProps = (store) => {
    return {
        detial: store.article.articleDetials,
        userInfo: store.common.userInfo,
    };
};
export default connect(mapStateToProps)(withRouter(ArticleDetail));
