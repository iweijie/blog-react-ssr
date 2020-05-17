import React, { Component } from "react";
import { size, throttle, get, isEmpty } from "lodash";
import { connect } from "dva";
import Bg from "./components/homeBg";
import Topnav from "../comom/topNav";
import Recommend from "./components/recommend";
import ArticleList from "../comom/articleList/index";
import Whisper from "./components/whisper";
import Calendar from "./components/calendar";
import Tags from "./components/tags";
import { Icon } from "antd";
import "./index.less";

class Home extends Component {
  componentDidMount() {
    this.scrollHandle();
    window.addEventListener("scroll", this.scroll);
  }

  getArticleList = (isChangeTag) => {
    const { dispatch, articleList, match } = this.props;
    const { result, total, hasMore, page, pageSize } = articleList;
    const id = get(match, "params.id");
    dispatch({
      type: "article/getArticleList",
      payload: {
        page: isChangeTag ? 1 : page + 1,
        pageSize,
        tag: id,
      },
    });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scroll);
  }
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
      payload: document.documentElement.scrollTop || document.body.scrollTop,
    });
  };
  scroll = throttle(this.scrollHandle, 100);

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
    } = this.props;
    const { result, total, page, pageSize, currentTag, hasMore } = articleList;
    const isFixed = browserInfo.height - homeScrollToTop <= 56;
    return (
      <div ref="home" className="home">
        <Bg list={homeBgList} browserInfo={browserInfo}></Bg>
        <Topnav userInfo={userInfo} isFixed={isFixed} />
        <div style={{ backgroundColor: "#f1f1f1" }}>
          <div className="home-content">
            <div className="home-content-left">
              <Whisper list={selftalking} isLogin={!!userInfo.userId}></Whisper>
              <ArticleList userInfo={userInfo} list={result} />
              {hasMore ? (
                <p
                  className="pagination"
                  onClick={() => this.getArticleList(false)}
                >
                  或许有更多
                </p>
              ) : (
                <p className="pagination disabled">这是我的底线</p>
              )}
            </div>
            <div className="home-content-right">
              <Recommend list={recommendList}></Recommend>
              <div className="unification-title mb20">
                <p>
                  <Icon type="credit-card" theme="filled" /> 备忘录
                </p>
                <Calendar changeDate={this.changeDate} />
              </div>
              <div className="unification-title ">
                <p>
                  <Icon type="read" theme="filled" /> 标签
                </p>
                <Tags currentTag={currentTag} list={tags}></Tags>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.getInitialProps = async (ctx) => {
  const id = __isBrowser__ ? ctx.match.params.id : ctx.params.id;
  const { store } = ctx;
  const { dispatch, getState } = store;
  const { article, home, common } = getState();

  const { homeBgList, selftalking, recommendList } = home;
  const { tagsList, articleList } = article;
  const { page, pageSize, total, currentTag } = articleList;

  const d = Date.now();
  const requestList = [];
  if (total <= 0 || ((currentTag || id) && currentTag != id)) {
    const payload = {
      page: 1,
      pageSize,
    };
    if (id) {
      payload.tag = encodeURIComponent(id);
    }
    requestList.push(
      dispatch({
        type: "article/getArticleList",
        payload,
      })
    );
  }

  if (isEmpty(tagsList)) {
    requestList.push(
      dispatch({
        type: "article/getTagList",
      })
    );
  }

  // homeBgList, selftalking, recommendList
  if (isEmpty(homeBgList)) {
    requestList.push(
      dispatch({
        type: "home/getBgImageList",
      })
    );
  }

  if (isEmpty(recommendList)) {
    requestList.push(
      dispatch({
        type: "home/getRecommendArticl",
      })
    );
  }

  if (isEmpty(selftalking.result)) {
    requestList.push(
      dispatch({
        type: "home/getSelftalkingList",
      })
    );
  }

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
