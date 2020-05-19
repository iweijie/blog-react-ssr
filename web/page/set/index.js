import React, { Component } from "react";
import { connect } from "react-redux";
import Topnav from "../comom/topNav";
import LeftNav from "./leftNav";
import { Switch, Route, Redirect } from "react-router-dom";
import AsyncArticle from "./addArticle";
// import {
//   AsyncArticle,
//   AsyncTags,
//   AsyncSelftalking,
//   AsyncFile,
//   AsyncRecord
// } from "./routers";
import "./css.less";

let url = "/set";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="set">
        <Topnav isFixed />
        <div className="set-wrap">
          <div className="set-left">
            <LeftNav />
          </div>
          <div className="set-right">
            <Switch>
              <Route
                key="AsyncArticleAdd"
                exact
                path={`${url}/article/add`}
                component={AsyncArticle}
              />
              {/* <Route key="AsyncArticleEdit" exact path={`${url}/article/edit/:id`} component={AsyncArticle} />
                            <Route key="AsyncSelftalking" exact path={`${url}/selftalking`} component={AsyncSelftalking} />
                            <Route key="AsyncFile" exact path={`${url}/upload`} component={AsyncFile} />
                            <Route key="Asynctags" exact path={`${url}/tags`} component={AsyncTags} />
                            <Route key="AsyncRecord" exact path={`${url}/record`} component={AsyncRecord} /> */}
              <Redirect to={`${url}/selftalking`} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    // userInfo: store.userInfoModel,
  };
};

export default connect(mapStateToProps)(App);
