import React, { PureComponent } from 'react';
import { timestampFromat } from "util/baseTool"
import {
    Table,
} from "antd"


class TableCom extends PureComponent {
    constructor(props) {
        super(props);
    }
    state = {
    }
    columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '分类',
        dataIndex: 'fileType',
        key: 'fileType',
    }, {
        title: '权限',
        dataIndex: 'limit',
        key: 'limit',
        render: (text) => {
            switch (text) {
                case 0:
                    return "公开";
                case 1:
                    return "登入可见";
                case 2:
                    return "私有";
            }
        }
    }, {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
    }, {
        title: 'MIME类型',
        dataIndex: 'mimeType',
        key: 'mimeType'
    }, {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => {
            return timestampFromat(text)
        }
    }, {
        title: '操作',
        key: 'handle',
        render: (t, r) => {
            let { creatorId } = r;
            let { userId } = this.props.userInfo;
            return creatorId === userId ? <span className="set-tags-edit" onClick={() => this.editHandle(r)}>编辑</span> : ""
        }
    }];
    render() {
        let { list } = this.props
        return (
            <div className="set-tags-wrap">
                <Table
                    size={"small"}
                    bordered
                    pagination={false}
                    dataSource={list}
                    columns={this.columns} />
            </div>
        );
    }
}

export default TableCom
