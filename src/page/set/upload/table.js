import React, { PureComponent } from 'react';
import { timestampFromat, copyToShearplate } from "tool/baseTool"
import {
    Table,
    Pagination,
    message,
    Button
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
        render: (text) => {
            return <Button type="primary" size="small" onClick={() => this.copyText(text)}>复制路径</Button>
        }
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
    }];

    style = { margin: '10px 0', textAlign: 'right' }

    copyText = (path) => {
        copyToShearplate(`http://file.iweijie.cn${path}`)
        message.success("复制成功")
    }

    render() {
        let { list, statePage, count, getList } = this.props
        return (
            <div className="set-tags-table-wrap">
                <Table
                    size={"small"}
                    bordered
                    pagination={false}
                    dataSource={list}
                    columns={this.columns} />
                <Pagination
                    style={this.style}
                    size="small"
                    showQuickJumper
                    defaultCurrent={statePage}
                    total={count}
                    onChange={getList}
                />
            </div>
        );
    }
}

export default TableCom
