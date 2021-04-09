import apis from "../apis";

export default {
    namespace: "common",

    state: {
        browserInfo: __isBrowser__
            ? {
                  height:
                      window.innerHeight ||
                      document.documentElement.clientHeight ||
                      document.body.clientHeight,
                  width:
                      window.innerWidth ||
                      document.documentElement.clientWidth ||
                      document.body.clientWidth,
              }
            : {},
        isLoading: false,
        userInfo: {
            isLogin: false,
        },
    },

    effects: {
        async getUserInfo({ call, put }) {
            // eslint-disable-line
            const data = await apis.getUserInfo();
            put({
                type: "common/userInfo",
                payload: {
                    isLogin: !!data._id,
                    userId: data._id || "",
                    userName: data.userName || "",
                },
            });
        },
    },

    reducers: {
        setInitBrowserInfo(state) {
            return {
                ...state,
                browserInfo: __isBrowser__
                    ? {
                          height:
                              window.innerHeight ||
                              document.documentElement.clientHeight ||
                              document.body.clientHeight,
                          width:
                              window.innerWidth ||
                              document.documentElement.clientWidth ||
                              document.body.clientWidth,
                      }
                    : {},
            };
        },
        setUserInfo(state, action) {
            return { ...state, userInfo: action.payload };
        },
    },
};
