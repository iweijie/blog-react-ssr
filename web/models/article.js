import apis from "../apis";
import { getRandomBgColor } from "../utils/index";
import parseArticleDetail from "../utils/parseArticleDetail";
import get from "lodash/get";

export const handleFormatList = (result) => {
    return result.map((v) => {
        const bg = getRandomBgColor();
        // 背景色
        // v._bg = `rgba(${bg[0]},${bg[1]},${bg[2]},${bg[3]})`
        v._bg = `rgba(${bg.join(",")})`;
        // 字体色
        v._fc = "#fff";
        // v._fc = isLight(bg) ? "#333" : "#fff"
        return v;
    });
};

export default {
    namespace: "article",

    state: () => ({
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
        editArticle: {
            isAdd: false,
        },
    }),

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
            result = handleFormatList(result);
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

        async addArticle({ call, put }, payload) {
            await apis.addArticle(payload)
        },
        /**  标签  */
        async getTagList({ call, put }, payload) {
            const data = await apis.getTagList(payload);
            put({
                type: "article/setTagsList",
                payload: get(data, "result", []),
            });
        },
        async getTagsDetailList({ call, put }, payload) {
            const data = await apis.getDetailTagList();
            put({
                type: "article/tagsDetailList",
                payload: get(data, "result", []),
            });
        },
    },

    reducers: {
        setTagsList({ state }, payload) {
            return { ...state, tagsList: payload };
        },
        setTagsDetailList({ state }, payload) {
            debugger
            return { ...state, tagsDetailList: payload };
        },
        setArticleDetails({ state }, payload) {
            return { ...state, articleDetials: payload };
        },
        setArticleList({ state }, payload) {
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
