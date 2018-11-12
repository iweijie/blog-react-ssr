import React, { Component } from 'react';
import {
    Button,
    Table,
    Icon
} from "antd"
import Modal from "./modal"

class App extends Component {
    constructor(props) {
        super(props);
    }

    columns = [
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            render: (data, row) => {
                var level = row.level,
                    is = !!(row.childrens && row.childrens.length);
                var style = {
                    width: "90%",
                    margin: "0 auto",
                    textAlign: "left",
                    paddingLeft: (level - 1) * 30 + "px"
                }
                var styleIcon = {
                    fontSize: "12px",
                    marginRight: "10px"
                }
                return <div style={style}>
                    {is ? <Icon style={styleIcon} type="plus-circle-o" /> : <Icon style={styleIcon} type="minus-circle-o" />}
                    {data}
                </div>
            }
        }, {
            title: '路径',
            dataIndex: 'url',
            key: 'url',
            width: 150,
            render: (text) => <div className="text-left padding-sm-left">{text}</div>
        }, {
            title: '分类字段',
            dataIndex: 'classify',
            key: 'classify',
            width: 100,
        }, {
            title: '展示类型',
            dataIndex: 'manner',
            key: 'manner',
            width: 100,
        }, {
            title: '公开性',
            dataIndex: 'isPublic',
            key: 'isPublic',
            width: 100,
            render: (data) => {
                return data ? "公开" : "不公开"
            }
        }, {
            title: '操作',
            key: 'handle',
            width: 150,
            render: (rowdata, rowdatab) => {
                return <div className="handle">
                    <Button size="small" onClick={() => this.add(rowdatab)}>新增子项</Button>
                    <Button size="small" onClick={() => this.amend(rowdatab)}>修改</Button>
                    <Button size="small" onClick={() => this.remove(rowdatab._id)}>删除</Button>
                </div>
            }
        }
    ];
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    /**
     * 新增配置
     */
    add = (params) => {
        window.observer.emit("addModal", params)
    }
    /**
     * 修改配置
     */
    amend = (params) => {
        var { menuInfos } = this.props
        var data = menuInfos.menuList;
        window.observer.emit("amendModal", { params, data })
    }
    /**
     * 删除配置
     */
    remove = (_id) => {
        window.observer.emit("removeModal", _id)
    }
    render() {
        var { menuInfos } = this.props
        var data = menuInfos.linearArr;
        return (
            <div className="configTable">
                <div className="configtitle">
                    菜单设置
                    <Button onClick={() => this.add({ isPublic: true })}>新增</Button>
                </div>
                <Table
                    bordered
                    dataSource={data}
                    pagination={false}
                    columns={this.columns} />
                <Modal {...this.props} />
            </div>
        );
    }
}

export default App
