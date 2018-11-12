
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Icon
} from "antd"

class Left extends Component {
    constructor(props) {
        super(props);
    }
    menu = [
        {
            name: "文章",
            path: "/set/article/add",
            icon: "plus",
        },
        {
            name: "标签",
            path: "/set/tags",
            icon: "book"
        },
        {
            name: "碎碎念",
            path: "/set/selftalking",
            icon: "message"
        },
        {
            name: "文件上传",
            path: "/set/upload",
            icon: "upload"
        },
        {
            name: "备忘录",
            path: "/set/memo",
            icon: "dashboard"
        },
    ]
    render() {
        let islogin = this.props.islogin;
        const content = (
            <ul className="set-left-nav">
                {
                    this.menu.map(v => {
                        return <li key={v.path}>
                            <Link to={v.path}><Icon type={v.icon} theme="outlined" />{v.name}</Link>
                        </li>
                    })
                }
            </ul>
        )

        return (
            content
        );
    }
}

export default Left