import { createStore, applyMiddleware, compose } from "redux";
import assign from "lodash/assign";
import models from "./models/index";
import enhanceRedux from "./utils/enhanceRedux/index";

export const __INITIAL_DATA__ = "___INITIAL_DATA__";

export default (states) => {
    return enhanceRedux(models, { states });
};
