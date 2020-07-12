import React, { Component } from 'react';
import { connect } from 'react-redux';
// import dispatchAction from "tool/dispatchAction"
import Add from './add';
import TableCom from './table';
import { Tabs } from 'antd';
import apis from '../../../apis/index';
import SetLayout from '../SetLayout';
import get from 'lodash/get'
import map from 'lodash/map'

import './css.less';
const TabPane = Tabs.TabPane;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ispublic: {
        0: '公开',
        1: '登入可见',
        2: '私有',
      },
      type: 'image',
      statePage: 1,
      statePageSize: 10,
      count: 0,
      list: [],
    };
    this.tabList = [
      {
        name: 'Image',
        field: 'image',
      },
      {
        name: 'PDF',
        field: 'pdf',
      },
    ];
  }

  componentDidMount() {
    if (__isBrowser__) {
      this.getList();
    }
  }

  componentWillUnmount() {}

  getList = (page, pageSize) => {
    const { statePage, statePageSize, type } = this.state;
    page = page || statePage;
    pageSize = pageSize || statePageSize;
    apis
      .getUploadFileList({
        page,
        pageSize,
        type,
      })
      .then((result) => {
        if (get(result, 'state') !== 1) {
          message.error(get(result, 'msg') || '文件列表获取错误');
          return;
        }
        this.setState({
          list: map(get(result, 'result', []), (v) => {
            v.key = v._id;
            return v;
          }),
          count: result.count,
          statePage: page,
          statePageSize: pageSize,
        });
      });
  };
  tabsChange = (key) => {
    let type = this.tabList[Number(key)].field;
    this.setState(
      {
        statePage: 1,
        statePageSize: 10,
        type,
      },
      this.getList,
    );
  };
  render() {
    let { userInfo, uploadAsync } = this.props;
    let { list, statePage, statePageSize, count } = this.state;
    return (
      <div className="set-upload-wrap">
        <Add userInfo={userInfo} getList={this.getList} uploadAsync={uploadAsync}></Add>
        <div>
          <Tabs defaultActiveKey={'0'} onChange={this.tabsChange}>
            {this.tabList.map((v, index) => (
              <TabPane tab={v.name} key={String(index)}></TabPane>
            ))}
          </Tabs>
          <TableCom
            list={list}
            statePage={statePage}
            statePageSize={statePageSize}
            count={count}
            getList={this.getList}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    userInfo: store.common.userInfo,
  };
};

export default SetLayout(connect(mapStateToProps)(App));
