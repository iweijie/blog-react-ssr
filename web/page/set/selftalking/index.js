import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import { timestampFormat } from '../../../utils/index';
import SetLayout from '../SetLayout';
import { Button, Table, message, Input, Row, Col, Form, Modal } from 'antd';
import './css.less';
const { TextArea } = Input;

const FormItem = Form.Item;

class Selftalking extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
  };
  columns = [
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      render: (text) => {
        return timestampFormat(text, false);
      },
    },
  ];
  // UNSAFE_componentWillMount() {
  //   this.getSelftalkingList();
  // }
  controlModel = (flag = true) => {
    this.setState({
      visible: flag,
    });
  };
  componentWillUnmount() {}
  // getSelftalkingList = (page = 1, pageSize = 999) => {
  //   let { selftalkingListActionAsync } = this.props;
  //   selftalkingListActionAsync({ page, pageSize });
  // };
  handleOk = () => {
    const { validateFields } = this.props.form;
    let { userInfo, dispatch, addSelftalkingAsync } = this.props;

    if (!userInfo.isLogin) return;
    validateFields((err, value) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'home/addSelftalking',
        payload: value,
      }).then((result) => {
          message.success("添加成功");
          this.handleCancel();
      });
    });
  };
  handleCancel = () => {
    this.controlModel(false);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selftalking } = this.props;
    let { data } = this.state;
    if (!data) data = {};
    return (
      <div className="set-selftalking-wrap">
        <div className="set-selftalking-add">
          <Button icon="plus" type="primary" onClick={() => this.controlModel(true)}>
            创建
          </Button>
        </div>
        <Table
          size={'small'}
          bordered
          pagination={false}
          rowKey={(v) => v._id}
          dataSource={selftalking}
          columns={this.columns}
        />
        <Modal
          width={500}
          className="set-selftalking-modal"
          title={'新增碎碎念记录'}
          destroyOnClose
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Row type="flex" justify="space-between">
              <Col span={24} style={{ position: 'relative' }}>
                <FormItem>
                  {getFieldDecorator('content', {
                    rules: [{ required: true, message: 'Please input content!' }],
                  })(<TextArea maxLength={100} rows={4} placeholder="碎碎念" />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

Selftalking.getInitialProps = async (ctx) => {
  const { store } = ctx;
  const { dispatch, getState } = store;
  const { article, home, common } = getState();

  const { selftalking } = home;

  const requestList = [];

  if (isEmpty(selftalking)) {
    requestList.push(
      dispatch({
        type: 'home/getSelftalkingList',
      }),
    );
  }

  await Promise.all(requestList);
};

const mapStateToProps = (store) => {
  return {
    userInfo: store.common.userInfo,
    selftalking: store.home.selftalking,
  };
};

export default SetLayout(connect(mapStateToProps)(Form.create()(Selftalking)));
