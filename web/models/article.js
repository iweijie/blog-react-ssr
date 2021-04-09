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
        async getArticleDetails({ call, put }, payload) {
            const data = await apis.getArticleDetails(payload);
            const result = get(data, "result", {});
            const { html, nav } = parseArticleDetail(result.content || "");
            result.__html = html;
            result.__nav = nav;
            put({ type: "article/articleDetials", payload: result });
        },

        async getArticleList({ state, put }, payload) {
            const data = await apis.getArticleList(payload);
            let { page, pageSize, tag } = payload;

            page = Number(page);

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

            put({
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
        },

        *addArticle({ payload }, { call, put }) {
            yield call(apis.addArticle, payload);
        },
        /**  标签  */
        async getTagList({ call, put }, payload) {
            const data = await apis.getTagList(payload);
            put({
                type: "article/tagsList",
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
        setTagsList(state, payload) {
            return { ...state, tagsList: payload };
        },
        setTagsDetailList(state, payload) {
            return { ...state, tagsDetailList: payload };
        },
        setArticleDetials(state, payload) {
            return { ...state, articleDetials: payload };
        },
        setArticleList(state, payload) {
            return { ...state, articleList: payload };
        },
        setInitArticleList(state) {
            return {
                page: 0,
                pageSize: 10,
                result: [],
                total: 0,
            };
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {},
    },
};
