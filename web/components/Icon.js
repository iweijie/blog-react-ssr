import React from "react";
import classnames from "classnames";

export default (props) => {
    const { className = "", type, ...other } = props;
    return (
        <i className={classnames("iconfont", type, className)} {...other}></i>
    );
};
