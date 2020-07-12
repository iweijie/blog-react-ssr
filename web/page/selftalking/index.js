import React, { Component } from "react";
import { connect } from "react-redux";
import Topnav from "../comom/topNav";
import { timestampFromat } from "../../utils";
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import map from 'lodash/map'
import "./css.less";

class Selftalking extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { height } = this.props.browserInfo;
    let { homeBgList, selftalking } = this.props;
    let src = get(homeBgList, "1.fullUrl", "");
    const content = (
      <div className="selftalking">
        <Topnav isFixed />
        <div
          className="selftalking-wrap"
          style={{
            background: `url(${src}) no-repeat fixed top`,
          }}
        >
          <div className="selftalking-content">
            <ul className="selftalking-content-ul">
              <div className="selftalking-content-line"></div>
              {map(selftalking, (v, k) => {
                let className =
                  k % 2 === 0
                    ? "selftalking-content-text-left"
                    : "selftalking-content-text-right";
                return (
                  <li key={v._id} className={className}>
                    <p>{v.content}</p>
                    <span>{timestampFromat(v.createTime)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );

    return content;
  }
}

Selftalking.getInitialProps = async (ctx) => {
  const { dispatch, getState } = ctx.store;
  const { article, home, common } = getState();
  const { homeBgList } = home;
  const requestList = [];
  if (isEmpty(homeBgList)) {
    requestList.push(
      dispatch({
        type: "home/getBgImageList",
      })
    );
  }
  if (isEmpty(get(home, "selftalking.result"))) {
    requestList.push(
      dispatch({
        type: "home/getSelftalkingList",
      })
    );
  }

  await Promise.all(requestList);
};

const mapStateToProps = (store) => {
  return {
    browserInfo: store.common.browserInfo,
    homeBgList: store.home.homeBgList,
    selftalking: store.home.selftalking,
  };
};

export default connect(mapStateToProps)(Selftalking);
