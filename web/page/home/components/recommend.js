/**
 *作者: weijie
 *功能描述: 渲染入口文件
 *参数说明:
 *时间: 2018/4/16 10:48
 */
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import map from "lodash/map";
import Icon from "../../../components/Icon";

class Recommend extends PureComponent {
    render() {
        let { list } = this.props;
        let recommend = (
            <div className="home-recommend unification-title">
                <p>
                    <Icon type="iconfire1" /> 群魔乱舞
                </p>
                <ul>
                    {map(list, (v, k) => {
                        return (
                            <li key={v._id}>
                                <span>{k + 1}</span>
                                <Link to={"/article/detail/" + v._id}>
                                    {v.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
        return recommend;
    }
}

export default Recommend;
