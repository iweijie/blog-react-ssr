import apis from "../apis";
import { get, size } from "lodash";
export default {
  namespace: "home",

  state: {
    homeBgList: [],
    homeScrollToTop: 0,
    selftalking: [],
    recommendList: [],
  },

  effects: {
    *getBgImageList({ payload }, { call, put }) {
      const data = yield call(apis.getBgImageList, payload);
      yield put({ type: "setHomeBgList", payload: get(data, "result", []) });
    },
    *getRecommendArticl({ payload }, { call, put }) {
      const data = yield call(apis.getRecommendArticl, payload);
      yield put({ type: "setRecommendList", payload: get(data, "result", []) });
    },
    *getSelftalkingList({ payload }, { call, put }) {
      const data = yield call(apis.getSelftalkingList, payload);
      yield put({
        type: "setSelftalkingList",
        payload: get(data, "result", []),
      });
    },
  },

  reducers: {
    setHomeScrollTopAction(state, action) {
      return { ...state, homeScrollToTop: action.payload };
    },
    setHomeBgList(state, action) {
      return { ...state, homeBgList: action.payload };
    },
    setRecommendList(state, action) {
      return { ...state, recommendList: action.payload };
    },
    setSelftalkingList(state, action) {
      return { ...state, selftalking: action.payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },
};