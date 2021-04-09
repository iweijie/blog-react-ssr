import apis from "../apis";
import get from "lodash/get";

export default {
    namespace: "home",

    state: {
        homeBgList: [
            {
                fullUrl:
                    "http://h1.ioliu.cn/bing/QingMingHuangShan_ZH-CN12993895964_1920x1080.jpg?imagesl",
            },
        ],
        homeScrollToTop: 0,
        selftalking: [],
        recommendList: [],
    },

    effects: {
        async getBgImageList({ call, put }, payload) {
            const data = await apis.getBgImageList(payload);
            put({
                type: "home/homeBgList",
                payload: get(data, "result", []),
            });
        },
        async getRecommendArticl({ call, put }, payload) {
            const data = await apis.getRecommendArticl(payload);
            put({
                type: "home/recommendList",
                payload: get(data, "result", []),
            });
        },
        async getSelftalkingList({ call, put }, payload) {
            const data = await apis.getSelftalkingList({
                page: 1,
                pageSize: 999,
            });
            put({
                type: "home/selftalking",
                payload: get(data, "result", []),
            });
        },
        async addSelftalking({ call, put }, payload) {
            await apis.addSelftalking(payload);
            await call({ type: "home/getSelftalkingList" });
        },
    },

    reducers: {
        setHomeScrollTopAction({ state }, payload) {
            return { ...state, homeScrollToTop: payload };
        },
        setHomeBgList({ state }, payload) {
            return { ...state, homeBgList: payload };
        },
        setRecommendList({ state }, payload) {
            return { ...state, recommendList: payload };
        },
        setSelftalkingList({ state }, payload) {
            return { ...state, selftalking: payload };
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            // eslint-disable-line
        },
    },
};
