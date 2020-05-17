import apis from "../apis";
import { getRandomBgColor } from "../utils/index";
import parseArticleDetail from "../utils/parseArticleDetail";
import { get } from "lodash";

export default {
  namespace: "article",

  state: {
    articleList: {
      page: 0,
      pageSize: 10,
      result: [],
      total: 0,
      hasMore: true,
      loading: false,
      currentTag: "",
    },
    articleDetials: {},
    tagsList: [],
    tagsDetailList: [],
    recommendList: [],
  },

  effects: {
    /**  文章  */
    *getArticleDetails({ payload }, { call, put }) {
      const data = yield call(apis.getArticleDetails, payload);
      const { content = "", ...other } = get(data, "result", {});
      const { html, nav } = parseArticleDetail(content);
      other.__html = html;
      other.__nav = nav;
      yield put({ type: "setArticleDetials", payload: other });
    },

    *getArticleList({ payload }, { call, select, put }) {
      const data = yield call(apis.getArticleList, payload);
      const { page, pageSize, tag } = payload;
      let { total = 0, result = [] } = data;
      result = result.map((v) => {
        const bg = getRandomBgColor();
        // 背景色
        // v._bg = `rgba(${bg[0]},${bg[1]},${bg[2]},${bg[3]})`
        v._bg = `rgba(${bg.join(",")})`;
        // 字体色
        v._fc = "#fff";
        // v._fc = isLight(bg) ? "#333" : "#fff"
        return v;
      });

      const oldResult = yield select(
        (state) => state.article.articleList.result
      );

      result = page === 1 ? result : [...oldResult, ...result];

      yield put({
        type: "setArticleList",
        payload: {
          currentTag: tag ? decodeURIComponent(tag) : "",
          result,
          page,
          pageSize,
          total,
          hasMore: page * pageSize < total,
          loading: false,
        },
      });
    },

    *addArticle({ payload }, { call, put }) {
      yield call(apis.addArticle, payload);
    },
    /**  标签  */
    *getTagList({ payload }, { call, put }) {
      const data = yield call(apis.getTagList);
      yield put({ type: "setTagsList", payload: get(data, "result", []) });
    },
  },

  reducers: {
    setTagsList(state, action) {
      return { ...state, tagsList: action.payload };
    },
    setArticleDetials(state, action) {
      return { ...state, articleDetials: action.payload };
    },
    setArticleList(state, action) {
      // const { payload, isAppend } = action
      return { ...state, articleList: action.payload };
    },
    setHomeScrollTopAction(state, action) {
      return { ...state, homeScrollToTop: action.payload };
    },
    setInitArticleList(state) {
      return {
        page: 0,
        pageSize: 10,
        result: [],
        total: 0,
        hasMore: true,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },
};
