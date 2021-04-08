import { createStore, applyMiddleware, compose } from "redux";
import assign from "lodash/assign";
import models from "./models/index";
import enhanceRedux from "./utils/enhanceRedux/index";

export const REDUX_STORE_ = "_REDUX_STORE_";

export default (states = {}) => {
    if ( __isBrowser__ && window[REDUX_STORE_]) {
        states = assign(states, window[REDUX_STORE_]);
        delete window[REDUX_STORE_];
    }

    const option = {
        states,
    };

    // {
    //     store, reducers, register, unRegister;
    // }

    return enhanceRedux(models, option);
};
