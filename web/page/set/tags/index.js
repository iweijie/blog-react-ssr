import React, { Component } from 'react';
import { connect } from 'react-redux';
// import observer from "tool/observer"
import apis from '../../../apis/index';
import { timestampFromat } from '../../../utils/index';
import isEmpty from 'lodash/isEmpty'
import SetLayout from '../SetLayout';
import { Button, Table, message, Input, Row, Col, Radio, Form, Modal } from 'antd';
import './css.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    ispublic: {
      0: '公开',
      1: '登入可见',
      2: '私有',
    },
    visible: false,
    data: null,
  };
  columns = [
    {
      title: '名称',
      dataIndex: 'tagName',
      key: 'tagName',
    },
    {
      title: '编码',
      dataIndex: 'tagCode',
      key: 'tagCode',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '类型',
      dataIndex: 'ispublic',
      key: 'ispublic',
      render: (text) => {
        return this.state.ispublic[text || 0];
      },
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return timestampFromat(text);
      },
    },
    {
      title: '操作',
      key: 'handle',
      render: (t, r) => {
        let { creatorId } = r;
        let { userId } = this.props.userInfo;
        return creatorId === userId ? (
          <span className="set-tags-edit" onClick={() => this.editHandle(r)}>
            编辑
          </span>
        ) : (
          ''
        );
      },
    },
  ];

  controlModel = (flag = true, data = null) => {
    this.setState({
      visible: flag,
      data,
    });
  };
  componentWillUnmount() {}
  getTags = () => {
    this.props.dispatch({
      type: 'article/getTagsDetailList',
    });
  };
  handleOk = () => {
    const { validateFields } = this.props.form;
    let { userInfo, asyncSetTag } = this.props;
    if (!userInfo.isLogin) return;
    let { data } = this.state;
    validateFields((err, value) => {
      if (err) {
        return;
      }
      if (data) {
        value.id = data._id;
        value.creator = userInfo.userId;
      }
      apis.addOrUpdateTag(value).then((result) => {
        if (result) {
          message.success(result.msg);
          this.handleCancel();
          this.getTags();
        }
      });
    });
  };
  handleCancel = () => {
    this.controlModel(false, null);
  };
  editHandle = (r) => {
    this.controlModel(true, r);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let { tagsList } = this.props;
    let { data } = this.state;
    let title = data ? '编辑标签' : '新增标签';
    if (!data) data = {};
    // tagsList.forEach((v) => {
    //   v.key = v.tagCode;
    // });
    return (
      <div className="set-tags-wrap">
        <div className="set-tags-add">
          <Button icon="plus" type="primary" onClick={() => this.controlModel(true)}>
            创建
          </Button>
        </div>
        <Table
          size={'small'}
          rowKey={(v) => v.tagCode}
          bordered
          pagination={false}
          dataSource={tagsList}
          columns={this.columns}
        />
        <Modal
          width={500}
          className="set-tags-modal"
          title={title}
          destroyOnClose
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Row type="flex" justify="space-between">
              <Col span={24} style={{ position: 'relative' }}>
                <label className="select-label">标签名称：</label>
                <FormItem>
                  {getFieldDecorator('tagName', {
                    rules: [{ required: true, message: 'Please input tagName!' }],
                    initialValue: data.tagName || undefined,
                  })(<Input maxLength={10} placeholder="标签名称" />)}
                </FormItem>
              </Col>

              <Col span={24} style={{ position: 'relative' }}>
                <label className="select-label">标签编码：</label>
                <FormItem>
                  {getFieldDecorator('tagCode', {
                    rules: [{ required: true, message: 'Please input tagCode!' }],
                    initialValue: data.tagCode || undefined,
                  })(<Input maxLength={20} placeholder="标签编码" />)}
                </FormItem>
              </Col>
              <Col span={24} style={{ position: 'relative' }}>
                <label className="select-label">描述：</label>
                <FormItem>
                  {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input description!' }],
                    initialValue: data.description || undefined,
                  })(<Input maxLength={30} placeholder="描述" />)}
                </FormItem>
              </Col>
              <Col span={24} style={{ position: 'relative' }}>
                <label className="select-label">类型：</label>
                <FormItem>
                  {getFieldDecorator('ispublic', {
                    rules: [{ required: true, message: 'Please select type!' }],
                    initialValue: data.ispublic || 0,
                  })(
                    <RadioGroup>
                      <Radio value={0}>公开</Radio>
                      <Radio value={1}>登入可见</Radio>
                      <Radio value={2}>私有</Radio>
                    </RadioGroup>,
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

App.getInitialProps = async (ctx) => {
  const { store } = ctx;
  const { dispatch, getState } = store;
  const { article } = getState();

  const requestList = [];
  if (isEmpty(article.tagsDetailList)) {
    requestList.push(
      dispatch({
        type: 'article/getTagsDetailList',
      }),
    );
  }

  await Promise.all(requestList);
};

const mapStateToProps = (store) => {
  return {
    userInfo: store.common.userInfo,
    tagsList: store.article.tagsDetailList,
  };
};

export default SetLayout(connect(mapStateToProps)(Form.create()(App)));
