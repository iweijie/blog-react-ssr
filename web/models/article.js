import apis from "../apis";
import { getRandomBgColor } from "../utils/index";
import parseArticleDetail from "../utils/parseArticleDetail";
import get from "lodash/get";

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
        editArticle: {
            isAdd: false,
        },
    },

    effects: {
        /**  文章  */
        async getArticleDetails({ payload }, { call, push }) {
            const data = await apis.getArticleDetails(payload);
            const result = get(data, "result", {});
            const { html, nav } = parseArticleDetail(result.content || "");
            result.__html = html;
            result.__nav = nav;
            push({ type: "article/setArticleDetials", payload: result });
        },

        async getArticleList({ state, call, select, put }, payload) {
            console.log(JSON.stringify(payload));
            const oldResult = state.articleList.result;
            const data = await apis.getArticleList(payload);
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

            result = page === 1 ? result : [...oldResult, ...result];

            push({
                type: "article/setArticleList",
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
            const data = yield call(apis.getTagList, payload);
            yield put({
                type: "setTagsList",
                payload: get(data, "result", []),
            });
        },
        *getTagsDetailList({ payload }, { call, put }) {
            const data = yield call(apis.getDetailTagList);
            yield put({
                type: "setTagsDetailList",
                payload: get(data, "result", []),
            });
        },
    },

    reducers: {
        setTagsList(state, action) {
            return { ...state, tagsList: action.payload };
        },
        setTagsDetailList(state, action) {
            return { ...state, tagsDetailList: action.payload };
        },
        setArticleDetials(state, action) {
            return { ...state, articleDetials: action.payload };
        },
        setArticleList(state, action) {
            // const { payload, isAppend } = action
            return { ...state, articleList: action.payload };
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
