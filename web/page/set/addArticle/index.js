import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
// import dispatchAction from "tool/dispatchAction"
import Edit from './components/edit';
import Select from './components/select';
import observer from '../../../utils/observer';
import SetLayout from '../SetLayout';
import { Button, message, Modal } from 'antd';
import apis from '../../../apis/index';
import './css.less';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setDefault: false,
      defaultData: null,
    };
    this.timerId = null;
    this.when = false;
    this.isAdd = true;
  }

  componentDidMount() {
    if (__isBrowser__) {
      const { match, dispatch } = this.props;
      var reg = /^\/set\/article\/edit\/([A-z0-9]+)$/;
      let id;
      if (match.url == '/set/article/add') {
        this.isAdd = true;
      } else if (match.url.match(reg)) {
        this.isAdd = false;
        id = match.params.id;
      }
      if (id && !this.isAdd) {
        dispatch({
          type: 'article/getArticleDetails',
          payload: { id },
        });
      } else {
        var data = localStorage.getItem('addarticle');
        if (data) {
          this.setState({
            setDefault: true,
          });
        }
      }
      dispatch({
        type: 'article/getTagsDetailList',
      });
      this.timerId = setInterval(this.saveLocal, 2 * 60 * 1000);
    }
  }

  submitHandle = () => {
    var { match } = this.props;
    let id = match.params.id;
    var params = this.getContent();
    if (!this.isAdd) {
      params.id = id;
    }
    for (var k in params) {
      if (params[k] === '' || params[k] === undefined) {
        return message.warning(k + '  不能为空');
      }
    }
    apis.addArticle(params).then((result) => {
      if (result.state === 1) {
        this.when = true;
        localStorage.removeItem('addarticle');

        message.success(result.msg, 2, () => {
          history.go(-1);
        });
        return;
      }
      message.error(result.msg || '新增文章错误');
    });
  };
  getContent = () => {
    var { userInfo } = this.props;
    var content = observer.emit('addArticleEdit')[0];
    var params = observer.emit('addArticleSelect')[0];
    params.content = content;
    params.autor = userInfo.userId;
    return params;
  };
  saveLocal = () => {
    var params = this.getContent();
    delete params.autor;
    var str = JSON.stringify(params);
    localStorage.setItem('addarticle', str);
  };
  location = (location) => {
    if (!location.pathname.match(/\/set\/article\/.+/)) {
      if (this.when) {
        return true;
      }
      return '当前文章没有保存，请先保存在离开哦！是否离开？';
    }
    return true;
  };
  handleOk = () => {
    try {
      var data = JSON.parse(localStorage.getItem('addarticle'));
      this.setState({
        defaultData: data,
        setDefault: false,
      });
    } catch (err) {
      console.log(err);
      message.error(err.messgae);
    }
  };
  handleCancel = () => {
    this.setState({
      setDefault: false,
    });
  };
  componentWillUnmount() {
    this.props.dispatch({
      type: 'article/setArticleDetials',
      payload: {},
    });
    clearInterval(this.timerId);
  }
  render() {
    var { detial } = this.props;
    var { defaultData } = this.state;
    var headtitle, defualtvalue, params;
    if (this.isAdd) {
      if (defaultData) {
        defualtvalue = defaultData;
      } else {
        defualtvalue = {};
      }
      headtitle = '新增界面';
    } else {
      defualtvalue = detial;
      headtitle = '修改界面';
    }
    console.log('defualtvalue:', defualtvalue);
    let { tags = [], content, description, ispublic, title } = defualtvalue;
    params = { tags, description, ispublic, title };

    return (
      <div className="edit-wrap">
        <Prompt message={this.location} />
        <h3>{headtitle}</h3>
        <Select defualtvalue={params} {...this.props} />
        <Edit defualtvalue={content} />
        <Button onClick={this.submitHandle} type="primary" className="edit-submit mt20">
          提交
        </Button>
        <Modal
          width={348}
          className="login-modal"
          title="提示"
          visible={this.state.setDefault}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>是否启用上次本地以保存的新增数据</p>
        </Modal>
      </div>
    );
  }
}

App.getInitialProps = async (ctx) => {};

const mapStateToProps = (store, own) => {
  return {
    ...own,
    userInfo: store.common.userInfo,
    detial: store.article.articleDetials,
    tagsList: store.article.tagsDetailList,
  };
};

export default SetLayout(connect(mapStateToProps)(App));
